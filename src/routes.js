import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';

export default (
  <Switch>
    <Route path='/login' component={Login} />
    <Route path='/register' component={Register} />
  </Switch>
);