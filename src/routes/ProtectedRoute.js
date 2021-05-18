import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import authService from '../services/authentication.service';
import AddProduct from '../components/AddProduct';
import ListProduct from '../components/ListProduct';
import BuyProduct from '../components/BuyProduct';
import EditProduct from '../components/EditProduct';

const currentUser = authService.currentUser();

const ProtectedRoute = () => {
  if (!currentUser) {
    return <Redirect to={{ pathname: './login' }} />;
  }
  return (
    <Switch>
      <Route exact={true} path="/test2"></Route>

      <Route path="/listproduct">
        <ListProduct />
      </Route>
      <Route path="/buyproduct">
        <BuyProduct />
      </Route>
      <Route path="/buyproduct/:productId">
        <BuyProduct />
      </Route>
      
      {authService.isAdmin() && (
        <Switch>
          <Route path="/addproduct">
            <AddProduct />
          </Route>
          <Route path="/editproduct/:productId">
            <EditProduct />
          </Route>
        </Switch>
      )}

      <Route path="*" component={() => '404 NOT FOUND'} />

    </Switch>
  );
};

export default ProtectedRoute;
