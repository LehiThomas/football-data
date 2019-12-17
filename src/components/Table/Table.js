import React, { Component } from 'react';

import "./Table.css";

class Table extends Component {
  constructor(props){
    super(props)
  }

  renderSnapRowData = (snaps, snap_percentage) => {
    return snaps.map((week, index) => {
      return <td>{week} <br/> {snap_percentage[index]}</td>
    })
  }

  renderTableData = () => {
    return this.props.data.map((player, index) => {
       const { id, full_name, position, total, weeks, snap_percentage_by_week} = player
       return (
          <tr key={id}>
             <td>{full_name}</td>
             <td>{position}</td>
             {this.renderSnapRowData(weeks, snap_percentage_by_week)}
             <td></td>
             <td></td>
             <td>{total}</td>
          </tr>
       )
    })
 }

 render() {
    return (
       <div>
          <h1 id='title'>Eagles Snap Counts</h1>
          <table id='snapCounts'>
             <tbody>
                <tr>
                  <th>Name</th>
                  <th>Pos</th>
                  <th>Wk 1</th>
                  <th>Wk 2</th>
                  <th>Wk 3</th>
                  <th>Wk 4</th>
                  <th>Wk 5</th>
                  <th>Wk 6</th>
                  <th>Wk 7</th>
                  <th>Wk 8</th>
                  <th>Wk 9</th>
                  <th>Wk 10</th>
                  <th>Wk 11</th>
                  <th>Wk 12</th>
                  <th>Wk 13</th>
                  <th>Wk 14</th>
                  <th>Wk 15</th>
                  <th>Wk 16</th>
                  <th>Wk 17</th>
                  <th>Total</th>
                </tr>
                {this.renderTableData()}
             </tbody>
          </table>
       </div>
    )
 }
}


export default Table;