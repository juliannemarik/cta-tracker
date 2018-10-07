import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import AllTrains from './components/AllTrains'

class App extends Component {
  constructor () {
    super();
    this.state  = {
      runningTrains: {
        'red': [],
      }
    }
  }
  async componentDidMount() {
    const trainLines = ['red', 'blue', 'brn', 'g', 'org', 'pink'];
    const trainLineData = [];
    const allTrains = {}
    try {
      for(let i = 0; i < trainLines.length; i++){
        trainLineData.push(await axios.get(`/api/1.0/ttpositions.aspx?key=617671a8d9104a95a0bde1954211c533&rt=${trainLines[i]}&outputType=JSON`))
      }
      trainLineData.forEach((line) => {
        const trainName = line.data.ctatt.route[0][`@name`];
        const runningTrains = line.data.ctatt.route[0].train;
        allTrains[trainName] = runningTrains
      })
      this.setState({
        runningTrains: allTrains
      })
    } catch (error) {
      console.log('=======failure======')
      console.log(error);
    }
  }

  render() {
    const runningTrains = this.state.runningTrains;
    console.log('TRAINS', runningTrains)

    if (runningTrains[`red`].length > 0){
      return (
        <div id='main'>
          <h2>CURRENTLY OPERATING TRAINS</h2>
          <AllTrains runningTrains = {runningTrains}/>
        </div>
      );
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default App;
