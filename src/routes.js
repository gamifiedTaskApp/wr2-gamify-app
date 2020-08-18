import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Register from './ponents/Register/Register';
import Login from "./ponents/Login/Login"
import Tasks from './ponents/Tasks/Tasks';
import Store from './ponents/Store/Store';
import Profile from './ponents/Profile/Profile';
import Rewards from './ponents/Rewards/Rewards';
import Parent from './ponents/Parent/Parent';

export default (
  <Switch>
    <Route path='/login' component={Login} />
    <Route path='/register' component={Register} />
    <Route path='/tasks' component={Tasks} />
    <Route path='/store' component={Store} />
    <Route path='/profile' component={Profile} />
    <Route path='/rewards' component={Rewards} />
    <Route component={Login} />
  </Switch>
);