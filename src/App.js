import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import Login from './components/Login';
import Register from './components/Register';

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
        </Switch>
        </div>
      </div>
    </div>
  </Router>
  );
}

export default App;