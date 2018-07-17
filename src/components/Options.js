import React, { Component } from 'react'
import axios from 'axios'

class Options extends Component {
  constructor(props){
    super(props)

    this.btnClick = this.btnClick.bind(this);
  }

  btnClick(){
    console.log("Clicking btn goes here");
    const id = this.props.option.id;
    axios.get(`http://localhost:4000/api/v1/ideas?val=${id}`)
    .then(response => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    // TODO section
    return (
      <div>
        <label className='label-title'>
          {this.props.option.title}
        </label>
        <button onClick={this.btnClick} className='option-btn'> Action btn </button>

      </div>
    );
  }
}

export default Options;
