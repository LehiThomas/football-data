import React, { Component } from "react";

import logo from './logo.svg';
import './App.css';
import * as consts from "./util/consts";

import Table from "./components/Table";
import Checkbox from "./components/Checkbox";
import Chart from "./components/Chart";

import snapCountService from "./services/SnapCountService";

class App extends Component {
  constructor() {
    super();
    this.state = {
      checkedItems: new Map(),
      selectedPlayers: new Map(),
      data: [],
      filter: "none"
    };
  }

  componentDidMount() {
    this.getData('eagles').then(res => {
      this.setData(res);
    });
  }

  getData = async () => {
    let data = await snapCountService.getSnapCounts('eagles');
    return data;
  }

  setData = data => {
    this.setState({data})
  }

  handleChange = event => {
    this.setState({
      checkedItems: new Map(),
      filter: event.target.value
    });
  }

  handlePositionCheckboxChange = e => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
  }

  handlePlayerCheckboxChange = e => {
    const item = e.target.value;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ selectedPlayers: prevState.selectedPlayers.set(item, isChecked) }));
  }

  getFilteredData = () => {
    let data = this.state.data
    if (this.state.checkedItems.size > 0) {
      data = this.state.data.filter(row => this.state.checkedItems.has(row.position) && this.state.checkedItems.get(row.position));
    } else if (this.state.checkedItems.size === 0 && this.state.filter === "offense") {
      data = this.state.data.filter(row => consts.offensePositions.includes(row.position));
    } else if (this.state.checkedItems.size === 0 && this.state.filter === "defense") {
      data = this.state.data.filter(row => consts.defensePositions.includes(row.position));
    }
    return data
  }

  createPositionCheckboxes = positions => {
    return (
      <div>
        {
          positions.map(position => (
            <label key={position}>
              {position}
              <Checkbox name={position} checked={this.state.checkedItems.get(position)} onChange={this.handlePositionCheckboxChange} />
            </label>
          ))
        }
      </div>
    )
  }

  getChartData = () => {
    return this.state.data.filter(player => {
      return this.state.selectedPlayers.has(player.full_name) && (this.state.selectedPlayers.get(player.full_name) === true)
    })
  }

  render(){
    return (
      <div className="App">
        { this.state.selectedPlayers.size > 0 &&
          <Chart data={this.getChartData()} />
        }

        <label>
          <input
            type="radio"
            value="none"
            checked={this.state.filter === "none"}
            onChange={this.handleChange}
          />
            All
          </label>
          <label>
            <input
              type="radio"
              value="offense"
              checked={this.state.filter === "offense"}
              onChange={this.handleChange}
            />
            Offense
          </label>
          <label>
            <input
              type="radio"
              value="defense"
              checked={this.state.filter === "defense"}
              onChange={this.handleChange}
            />
            Defense
          </label>
          {
            this.state.filter ==="offense" && this.createPositionCheckboxes(consts.offensePositions)
          }
          {
            this.state.filter ==="defense" && this.createPositionCheckboxes(consts.defensePositions)
          }
        <Table data={this.getFilteredData()} selectedPlayers={this.state.selectedPlayers} onChange={this.handlePlayerCheckboxChange}/>
      </div>
    );
  }
}

export default App;
