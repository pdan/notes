import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Root from './Root';
import Signin from './Signin';
import SecuredRoute from './SecuredRoute';

const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div className="app-container">
          {/* <SecuredRoute path="/projects" component={Projects} />
          <SecuredRoute path="/project/:id" component={Project} />
          <Route path="/user/signin" component={Signin} />
          <Route path="/user/signup" component={Signup} /> */}
          {/* <Redirect from="/" to="/notes" /> */}
          <SecuredRoute exact={true} path="/" component={Root} />
          <Route path="/user/signin" component={Signin} />
      </div>
    </Router>
  </Provider>
)

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App
