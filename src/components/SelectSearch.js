import React, { Component } from 'react'
import axios from 'axios'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import Options from '../components/Options'
import Commonheader from '../components/Commonheader'


// function HtmlRenderer({ focusedOption, focusedOptionIndex, focusOption, key, labelKey, option, options, selectValue, style, valueArray }) {
//   const flagImageUrl = 'https://cdn.rawgit.com/hjnilsson/country-flags/9e827754/svg/in.svg'
//
//   const classNames = ['flag-here'];
//
//   return (
//     <div
//       className={classNames.join(' ')}
//       key={key}
//       onClick={() => selectValue(option)}
//       onMouseEnter={() => focusOption(option)}
//       style={style}
//     >
//       <label className='label-title'>
//         {option.body}
//       </label>
//       <button onClick={btnClick}> Add qty here </button>
//
//     </div>
//   )
// }
//
// function btnClick(val){
//   console.log("Clicking btn goes here");
//   return false;
//   axios.get(`http://localhost:4000/api/v1/ideas?val=${val}`)
//   .then(response => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.log(error)
//   })
// }

class SelectSearch extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: '',
      searchedOptions: []
    }
    this.onChange = this.onChange.bind(this);
    this.gotoItem = this.gotoItem.bind(this);
    this.getList = this.getList.bind(this);
    this.renderOption = this.renderOption.bind(this);
  }

  onChange(value){
    this.setState({ value });
    console.log('on click of option/selecting option');
  }

  gotoItem(event){
    console.log("Do something on selected value Click goes here");
  }

  getList(input, callback) {

    if(!input){
      return Promise.resolve({options: []});
    }

    axios.get(`http://localhost:4000/api/v1/search?search=${input}`)
    .then(response => {
      this.setState({
        searchedOptions: response.data.ideas
      })
    })
    .catch((error) => {
      console.log(error)
    })
    callback(null, {
      options: this.state.searchedOptions,
    });
  }

  renderOption(input){
    const items = this.state.searchedOptions;
    // console.log(this.state.searchedOptions)
    return items.map((post) => {
      return(
        <div><p>{post.body}</p></div>
      )
    });
  }


  render() {

    return (
      <div>
        <Commonheader />
        
        <Select.Async
        backspaceRemoves={true}
        value={this.state.value}
        onChange={this.onChange}
        onValueClick={this.gotoItem}
        valueKey="id"
        labelKey="title"
        loadOptions={this.getList}
        optionComponent={Options}
        noResultsText={'No result found :('}
        cache={false}
        closeOnSelect={false}
        onSelectResetsInput={false}
        clearable={false}
        />
      </div>

    );
  }

}

export default SelectSearch;
