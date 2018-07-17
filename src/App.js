import React, { Component } from 'react'
import './App.css'
import Posts from './components/Posts'
import {Link} from 'react-router-dom'
import Commonheader from './components/Commonheader'


class App extends Component {
  render() {
    return (
      <div>
        <Commonheader />
        <div className="container">
          <Posts/>
        </div>
      </div>
    );
  }
}

export default App;
