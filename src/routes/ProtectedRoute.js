import React from 'react';
import { Route, Redirect, Switch } from "react-router-dom";

import authService from '../services/authentication.service'
import Login from '../components/Login';

const ProtectedRoute = () => {
  const currentUser = authService.currentUser()
  console.log(currentUser)
  if (!currentUser) {
    return <Redirect to={{pathname: './login'}}/>
  }
  return (
      <Switch>
      <Route path='/test'>
        <p>dfdsf</p>
      </Route>
      <Route exact={true} path='/test2'></Route>
      <Route path="*" component={() => "404 NOT FOUND"} />

      </Switch>
      
    
  )
}

export default ProtectedRoute;