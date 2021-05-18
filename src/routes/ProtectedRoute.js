import React from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';

import authService from '../services/authentication.service';
import AddProduct from '../components/AddProduct';
import ListProduct from '../components/ListProduct';
import BuyProduct from '../components/BuyProduct'
import EditProduct from '../components/EditProduct'
import UserProfile from '../components/UserProfile'
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
      <Route path='/user/me'>
            <UserProfile />
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
      <Route path="*" component={() => (<>
          <h2>404 NOT FOUND:</h2> 
          <h1>Please go <Link style={{"text-decoration": "underline"}} 
          to={{ pathname: "/listproduct"}}>back</Link> to the product page  :^)</h1>
          </> 
      )}/>

    </Switch>
  );
};

export default ProtectedRoute;
