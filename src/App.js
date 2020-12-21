import './App.css';
import React from 'react'
import Header from './components/UI/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Layout from './components/UI/Layout/Layout';
import Home from './components/Home';
import AllProducts from './components/Products/AllProducts/AllProducts';
import AddProduct from './components/Products/AddProduct';
import AllQuotations from './components/Quotations/AllQuotations';
import AddQuotation from './components/Quotations/AddQuotation';
import Login from './components/Auth/Login/Login';
import PrivateRoute from './components/PrivateRoute';
import {AuthProvider} from './contexts/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header />

        <Router>
          <Switch>
            <Route path="/login" exact component={Login}></Route>
          </Switch>

          <Layout>
              <Switch>
                  <PrivateRoute path="/" exact component={Home} />
                  <PrivateRoute path="/quotations" exact component={AllQuotations}/>
                  <PrivateRoute path="/quotations/new" exact component={AddQuotation}/>
                  <PrivateRoute path="/products" exact component={AllProducts} />
                  <PrivateRoute path="/products/new" exact component={AddProduct} />
              </Switch>
          </Layout>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
