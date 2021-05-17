import Register from './components/Register';
import AddProduct from './components/AddProduct';
import ListProduct from './components/ListProduct';
import BuyProduct from './components/BuyProduct'
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {

  return (
<Router>
  <div className="App">
    <div className="outer">
      <div className="inner">
        <Switch>
          <Route path='/' exact={true}>
            <Login />
          </Route>
          <Route path='/addproduct'>
            <AddProduct />
          </Route>
          <Route path='/listproduct'>
            <ListProduct />
          </Route>
          <Route path='/buyproduct/:productId'>
            <BuyProduct />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
        </Switch>
      </div>
    </div>
  </div>
</Router>
  );
}

export default App;