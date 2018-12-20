import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class Signin extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          token: ''
        }
    
        this.sign = this.sign.bind(this)
      }
     sign(e) {
        e.preventDefault();
        document.cookie = `token=${this.state.token};path=/`
        console.log(document.cookie)
     }
  render() {
    return (
      <div className="grid-container">
        <div className="grid-x">
          <header className="header"> </header>
        </div>
        <div className="grid-x">
          <div className="cell medium-8 medium-offset-2 large-6 large-offset-3">
            <div className="portlet">
              <form>
                  <input type="text" value={this.state.token} onChange={e => this.setState({token: e.target.value})} />
                  <button type="submit" className="button primary" onClick={this.sign}>Sign</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Signin);
