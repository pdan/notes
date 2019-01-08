import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CreatableSelect from 'react-select/lib/Creatable';

import { fetchCategories } from '../actions/index';

const colourOptions = [
  { value: 'ocean', label: 'Ocean' },
  { value: 'blue', label: 'Blue', color: '#0052CC', disabled: true },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' },
];

class Category extends Component {
  constructor(props) {
    super(props)

    this.state = {
    //   content: ''
    }

  }
  
  handleChange = (newValue, actionMeta) => {
    // console.group('Value Changed');
    // console.log(newValue);
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();
    this.props.onCategoriesChange(newValue)
  };
  render() {
    return (
      <CreatableSelect
        isMulti
        onChange={this.handleChange}
        options={colourOptions}
      />
    );
  }
}

function mapStateToProps(state) {
  return { noteCategories: state.noteCategories.json }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCategories }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);