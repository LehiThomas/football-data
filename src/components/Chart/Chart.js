import React, { Component } from "react";
import { LineChart, PieChart } from 'react-chartkick'
import 'chart.js'

class Chart extends Component {


  prepareData = () => {
    return this.props.data.map(piece => {
      return {
        name: piece.full_name,
        "data":  piece.weeks.reduce((acc, elem, index) => {
          let key = `week${index + 1}`
          acc[key] = elem // or what ever object you want inside
          return acc
        }, {})
      }
    })
  }

  render() {
    let data = this.prepareData();

    return(
      <LineChart data={data} width="1200px" height="400px" />
    )
  }
}
export default Chart