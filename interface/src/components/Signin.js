import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Alert from './Alert';
import Auth from './Auth';

class Signin extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      alert: ''
    }

    this.sign = this.sign.bind(this)
  }
  async sign(e) {
    e.preventDefault();

    try {
      const response = await fetch('/api/user/signin', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      })
      const data = await response.json()
      if (!data.token)
        throw data
      Auth.signIn(data.token)
      this.props.history.push('/')

    } catch (error) {
      this.setState({ alert: error.message })
    }

  }
  render() {
    return (
      <div className="grid-container">
        <Alert message={this.state.alert}/>
        <div className="grid-x">
          <header className="header"> </header>
        </div>
        <div className="grid-x">
          <div className="cell medium-4 medium-offset-4 large-4 large-offset-4">
            <div className="portlet">
              <form onSubmit={this.sign}>
                  <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={e => this.setState({email: e.target.value})} />
                  <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={e => this.setState({password: e.target.value})} />
                  <button type="submit" className="button primary">Sign</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Signin);
