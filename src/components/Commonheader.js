import React, { Component } from 'react'
import '../App.css'
import {Link} from 'react-router-dom'

class Commonheader extends Component {
  render(){
    return(
      <nav className="navbar navbar-default">
          <div className="container-fluid">
              <div className="navbar-header">
                  <a className="navbar-brand" href="">New posts</a>
              </div>
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav">
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/images" >Upload image</Link></li>
                      <li><Link to="/searchable" >Searchable component</Link></li>
                  </ul>
              </div>
          </div>
      </nav>
    )
  }
}

export default Commonheader;
