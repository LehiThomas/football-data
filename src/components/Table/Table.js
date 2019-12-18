import React, { Component } from 'react';

import Checkbox from "../Checkbox";

import "./Table.css";

class Table extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  renderSnapRowData = (snaps, snap_percentage) => {
    let length = snaps.length;
    if (snaps.length < 17) {
      snaps[16] = null;
      snaps.fill(null, length)
    }

    return snaps.map((week, index) => {
      return <td>{week} <br/> {snap_percentage[index]}</td>
    })
  }

  renderTableData = () => {
    return this.props.data.map((player) => {
       const { id, full_name, position, total, weeks, snap_percentage_by_week} = player
       return (
          <tr key={id}>
             <td>{full_name}</td>
             <td>
              <Checkbox value={full_name} checked={this.props.selectedPlayers.get(full_name)} onChange={this.props.onChange} />
             </td>
             <td>{position}</td>
             {this.renderSnapRowData(weeks, snap_percentage_by_week)}
             <td>{total}</td>
          </tr>
       )
    })
 }

 sortWeek = num => {
   let name = `week${num+1}`;
    if (this.state[name]) {
      this.props.data.sort((a, b) => (a.weeks[num] > b.weeks[num]) ? 1 : -1)
     } else {
      this.props.data.sort((a, b) => (a.weeks[num] < b.weeks[num]) ? 1 : -1)
     }

    this.setState({[name]: !this.state[name]});
 }

 sort = (sortBy, num = "") => {
   if (this.state[sortBy]) {
    this.props.data.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1)
   } else {
    this.props.data.sort((a, b) => (a[sortBy] < b[sortBy]) ? 1 : -1)
   }
   this.setState({[sortBy]: !this.state[sortBy]});
 }

 render() {
    return (
       <div>
          <h1 id='title'>Eagles Snap Counts</h1>
          <table id='snapCounts'>
             <tbody>
                <tr>
                  <th>
                    <button onClick={() => this.sort("full_name")}>Name</button>
                  </th>
                  <th>
                    <Checkbox checked={this.props.selectedPlayers.get("full_name")} onChange={this.props.handlePlayerCheckboxChange} />
                  </th>
                  <th>
                    <button onClick={() => this.sort("position")}>Pos</button>
                  </th>
                  <th>
                    <button onClick={() => this.sortWeek(0)}>Wk 1</button>
                  </th>
                  <th>
                    <button onClick={() => this.sortWeek(1)}>Wk 2</button>
                  </th>
                  <th>
                    <button onClick={() => this.sortWeek(2)}>Wk 3</button>
                  </th>
                  <th>
                    <button onClick={() => this.sortWeek(3)}>Wk 4</button>
                  </th>
                  <th>
                    <button onClick={() => this.sortWeek(4)}>Wk 5</button>
                  </th>
                  <th>
                    <button onClick={() => this.sortWeek(5)}>Wk 6</button>
                  </th>
                  <th>
                    <button onClick={() => this.sortWeek(6)}>Wk 7</button>
                  </th>
                  <th>
                    <button onClick={() => this.sortWeek(7)}>Wk 8</button>
                  </th>
                  <th>
                    <button onClick={() => this.sortWeek(8)}>Wk 9</button>
                  </th>
                  <th>
                    <button onClick={() => this.sortWeek(9)}>Wk 10</button>
                  </th>
                  <th>
                    <button onClick={() => this.sortWeek(10)}>Wk 11</button>
                  </th>
                  <th>
                    <button onClick={() => this.sortWeek(11)}>Wk 12</button>
                  </th>
                  <th>
                    <button onClick={() => this.sortWeek(12)}>Wk 13</button>
                  </th>
                  <th>
                    <button onClick={() => this.sortWeek(13)}>Wk 14</button>
                  </th>
                  <th>
                    <button onClick={() => this.sortWeek(14)}>Wk 15</button>
                  </th>
                  <th>
                    <button onClick={() => this.sortWeek(15)}>Wk 16</button>
                  </th>
                  <th>
                    <button onClick={() => this.sortWeek(16)}>Wk 17</button>
                  </th>
                  <th>
                    <button onClick={() => this.sort("total")}>Total</button>
                  </th>
                </tr>
                {this.renderTableData()}
             </tbody>
          </table>
       </div>
    )
 }
}


export default Table;