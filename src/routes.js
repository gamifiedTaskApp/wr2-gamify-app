import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Register from './Components/Register/Register';
<<<<<<< HEAD
import Login from './Components/Login/Login';
=======
import Login from "./Components/Login/Login"
>>>>>>> master
import Tasks from './Components/Tasks/Tasks';
import Store from './Components/Store/Store';
import Profile from './Components/Profile/Profile';
import Rewards from './Components/Rewards/Rewards';

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