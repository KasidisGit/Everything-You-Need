import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import authService from '../services/authentication.service';
import Login from '../components/Login';
import AddProduct from '../components/AddProduct';
import ListProduct from '../components/ListProduct';
import BuyProduct from '../components/BuyProduct';

const ProtectedRoute = () => {
  const currentUser = authService.currentUser();
  console.log(currentUser);
  if (!currentUser) {
    return <Redirect to={{ pathname: './login' }} />;
  }
  return (
    <Switch>
      <Route exact={true} path='/test2'></Route>
      <Route path='/addproduct'>
            <AddProduct />
          </Route>
          <Route path='/listproduct'>
            <ListProduct />
          </Route>
          <Route path='/buyproduct'>
            <BuyProduct />
        </Route>
          <Route path='/buyproduct/:productId'>
            <BuyProduct />
        </Route>
      <Route path="*" component={() => "404 NOT FOUND"} />

      </Switch>
      
    
  )
}

export default ProtectedRoute;
