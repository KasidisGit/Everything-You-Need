import RegisterComponent from './components/RegisterComponent.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Product from './components/Product';
import Login from './components/Login';

function App() {

  return (
<Router>
  <div className="App">
    <div className="outer">
      <div className="inner">
        <Switch>
          <Route path='/' exact={true} component={Login} />
          <Route path='/product' component={Product} />
          <Route path='/login' component={Login} />
          <Route path='/register'>
            <RegisterComponent />
          </Route>
        </Switch>
      </div>
    </div>
  </div>
</Router>
  );
}

export default App;