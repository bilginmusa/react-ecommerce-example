import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ProtectedRoute from './pages/ProtectedRoute';

// pages
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Signin from './pages/Auth/SignIn';
import Signup from './pages/Auth/SignUp';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Basket from './pages/Basket';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <div>
        <Navbar />

        <div id="content">
          <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/product/:product_id" component={ProductDetail} />
            <ProtectedRoute path="/profile" component={Profile} />
            <Route path="/basket" component={Basket} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />

            <ProtectedRoute path="/admin" component={Admin} admin={true} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
