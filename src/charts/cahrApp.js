import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios'
// import{LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import Chart from './Chart';
// import { timeFormat } from "d3-time-format";
import { timeParse } from "d3-time-format";


// import { getData } from "./utils"

import { TypeChooser } from "react-stockcharts/lib/helper";

const parseDate = timeParse("%Y-%m-%d");

class App extends Component {
  constructor(){
 super();
    this.state={
      apiData:null
  }
}
  
  componentWillMount(){
    // api_key='V9S1QKXT6DLLTBAO'
      // https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo
   var url='https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=EUR&to_symbol=USD&interval=1min&apikey=PRL4R08ODSP69T4G'

    axios({
      method: 'get',
    url:url
    }).then(res=>{
      console.log("res",res,url);
      this.setState({apiData:res.data["Time Series FX (1min)"]})
    });


  }

  render() {
    // let array=[]
    console.log(this.state.apiData)
    // var rsiData=this.state.apiData.
    let rsiData=[]
    for(var i in this.state.apiData){
      // console.log(i)

      rsiData.push({
        // RSI:parseFloat(this.state.apiData[i]["RSI"])
        date:new Date(i),
        open:parseFloat(this.state.apiData[i]["1. open"]),
        high:parseFloat(this.state.apiData[i]["2. high"]),
        low:parseFloat(this.state.apiData[i]["3. low"]),
        close:parseFloat(this.state.apiData[i]["4. close"]),
        volume:parseFloat(this.state.apiData[i]["5. volume"]),

      
      });
    }
    console.log(rsiData);
    let reverseData=[]
    for( i=rsiData.length-1;i>=0;i--){
      reverseData.push(rsiData[i]);
    }
//     const data = [
//       {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
//       {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
//       {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
// ];
if(reverseData[0]){
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        {/* <LineChart width={1200} height={300} data={rsiData}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="date"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Line type="monotone" dataKey="open" stroke="#8884d8" activeDot={{r: 8}}/>
       <Line type="monotone" dataKey="high" stroke="#82ca9d" />
       <Line type="monotone" dataKey="low" stroke="#82ca9d" />
       <Line type="monotone" dataKey="close" stroke="#82ca9d" />
       <Line type="monotone" dataKey="volume" stroke="#8021c7" />

      </LineChart> */}

      	<TypeChooser>
				{type => <Chart type={type} data={reverseData} />}
			</TypeChooser>
      </div>
    );
  }
  else
  return <div>loading...

  </div>
  }
}

export default App;
