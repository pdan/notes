import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchCategories } from '../actions/index';

class Category extends Component {
  constructor(props) {
    super(props)

    this.state = {
      //   content: ''
      categories: [],
      newCategory: '',
      selected: []
    }

    this.items = this.items.bind(this)
    this.addItem = this.addItem.bind(this)

  }

  handleChange = (e) => {
    var options = e.target.options;
    var selected = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        selected.push({value: options[i].value});
      }
    }

    this.props.onCategoriesChange(selected)
  };

  items() {
    try {
      return this.state.categories.map((v, i) => {
        return <option key={i} value={v.value}>{v.value}</option>
      })
    } catch (error) {
      return
    }
  }

  addItem() {
    this.setState({
      categories: [...this.state.categories, { value: this.state.newCategory }]
    })

    this.state.newCategory = '';
  }

  render() {
    return (
      <div className="categories">
        <fieldset className="fieldset">
          <legend>Categories</legend>
          <div className="input-group">
            <span className="input-group-label"><i className="fas fa-tags"></i></span>
            <input className="input-group-field" name="catergory" type="text" value={this.state.newCategory} onChange={e => this.setState({newCategory: e.target.value})}/>
            <div className="input-group-button">
              <input type="button" className="button secondary" name="addButton" value="+" onClick={this.addItem}/>
            </div>
          </div>

          <select multiple onChange={this.handleChange} name="categories" >
            {this.items()}
          </select>
        </fieldset>
      </div>
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
