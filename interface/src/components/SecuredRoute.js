import React from 'react';
import {Route} from 'react-router-dom';
import auth from './Auth';

function SecuredRoute(props) {
  const {component: Component, path, exact} = props;
  return (
    <Route exact={exact} path={path} render={() => {
        if (!auth.isAuthenticated()) {
            window.location.href = '/user/signin'
          return <div></div>;
        }
        return <Component />
    }} />
  );
}

export default SecuredRoute;