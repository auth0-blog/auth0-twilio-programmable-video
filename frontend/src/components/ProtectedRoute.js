import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import auth0Client from '../Auth';

const ProtectRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => {
    if (auth0Client.isAuthenticated()) return <Component {...props} />;
    return <Redirect to="/"/>
  }}/>
);

export default ProtectRoute;
