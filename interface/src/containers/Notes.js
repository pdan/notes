import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchNotesList } from '../actions/index';

class Notes extends Component {

  constructor(props) {
    super(props)

    this.state = {
      content: ''
    }

    this.addNote = this.addNote.bind(this)
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
        const response = await fetch(`/api/note`, {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({content: this.state.content})
        });
        this.setState({content: ''})
        this.props.fetchNotesList('')
        
      } catch (error) {
        console.log(error)
      }
  }

  notesList() {
    
    if (this.props.notesList === undefined) {
      return
    }
    
    return this.props.notesList.map((data, i) => {
      return <div key={i}>{i + ' - '+data.content}</div>
    })
  }

  render() {
      return (
          <div className="notes">
            <form className="add-note">
              <label>
                What books did you read over summer break?
                <textarea placeholder="Write down here" rows="3" value={this.state.content} onChange={e => this.setState({content: e.target.value})}></textarea>
                <button type="submit" className="button primary" onClick={this.addNote}>Submit</button>
              </label>
            </form>
          
            <div className="list">
              {this.notesList()}
            </div>
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

