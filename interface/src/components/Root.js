import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Notes from '../containers/Notes';

class Root extends Component {
  
  render() {
    return (
      <div className="grid-container">
        <div className="grid-x">
          <header className="header"> </header>
        </div>
        <div className="grid-x">
          <div className="cell medium-8 medium-offset-2 large-6 large-offset-3">
            <div className="portlet">
              <Notes />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Root);
