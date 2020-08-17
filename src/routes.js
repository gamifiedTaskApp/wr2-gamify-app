import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from "./components/Login/Login"
import Tasks from './components/Tasks/Tasks';
import Store from './components/Store/Store';
import Profile from './components/Profile/Profile';
import Rewards from './components/Rewards/Rewards';

export default (
  <Switch>
    <Route path='/login' component={Login} />
    <Route path='/register' component={Register} />
    <Route path='/tasks' component={Tasks} />
    <Route path='/store' component={Store} />
    <Route path='/profile' component={Profile} />
    <Route path='/rewards' component={Rewards} />
  </Switch>
);