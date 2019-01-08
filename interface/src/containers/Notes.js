import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchNotesList } from '../actions/index';
import Category from './Category'

class Notes extends Component {

  constructor(props) {
    super(props)

    this.state = {
      content: '',
      categories: []
    }

    this.addNote = this.addNote.bind(this)
    this.onCategoriesChange = this.onCategoriesChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchNotesList('')

  }

  async addNote(e) {
    e.preventDefault();
    if (!this.state.content) {
      return
    }

    try {
      const response = await fetch('/api/note', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: this.state.content, categories: this.state.categories })
      });
      this.setState({ content: '' })
      this.props.fetchNotesList('')

    } catch (error) {
      console.log(error)
    }
  }

  notesList() {

    if (this.props.notesList === undefined) {
      return
    }
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 100)
    return this.props.notesList.map((data, i) => {
      return <div className="note-item" key={i}>{data.content}</div>
    })
  }

  onCategoriesChange(categories) {
    this.setState({categories})
    console.log(categories)
  }

  render() {
    return (
      <div className="notes">
        <div className="list">
          {this.notesList()}
        </div>
        <form className="add-note" onSubmit={this.addNote}>
          <label>
            <Category onCategoriesChange={this.onCategoriesChange}/>
            <textarea placeholder="Write down here" rows="3" value={this.state.content} onChange={e => this.setState({content: e.target.value})}></textarea>
            <button type="submit" className="button primary">Submit</button>
          </label>
        </form>
      </div>
          
    );
  }
}

function mapStateToProps(state) {
  return { notesList: state.notesList.json }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchNotesList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
