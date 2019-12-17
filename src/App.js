import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';

import Table from "./components/Table";

import snapCountService from "./services/SnapCountService";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
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

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Click button to get data
          </p>
          <button onClick={() => {console.table(this.state.data); console.log(this.state.data)}}>
            Get Snaps
          </button>
        </header>
        <Table data={this.state.data}/>
      </div>
    );
  }
}

export default App;
