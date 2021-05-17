import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

import Login from './components/Login';
import Register from './components/Register';
import AddProduct from './components/AddProduct';
import ListProduct from './components/ListProduct';
import BuyProduct from './components/BuyProduct'
import ProtectedRoute from './routes/ProtectedRoute';

function App() {

  
  

  return (
<Router>
  <div className="App">
    <div className="outer">
      <div className="inner">
        <Switch>
          <Route path='/' exact={true} component={Login}>
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <ProtectedRoute path="/"></ProtectedRoute>
          <Route path='/addproduct'>
            <AddProduct />
          </Route>
          <Route path='/listproduct'>
            <ListProduct />
          </Route>
          <Route path='/buyproduct/:productId'>
            <BuyProduct />
          </Route>

          
        </Switch>
        </div>
      </div>
    </div>
  </Router>
  );
}

export default App;