import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Product from './components/Product';
import Login from './components/Login';
import Register from './components/Register';

function App() {

  return (
    <Router>
      <div className="App">
        <div className="outer">
          <div className="inner">
            <Switch>
              <Route path='/' exact={true}>
                <Login/>
              </Route>
              <Route path='/product'>
                <Product/>
              </Route>
              <Route path='/login'>
                <Login/>
              </Route>
              <Route path='/register'>
                <Register/>
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;