import './App.css';
import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import AllProducts from './components/Products/AllProducts/AllProducts';
import AddProduct from './components/Products/AddProduct';
import AllQuotations from './components/Quotations/AllQuotations';
import AddQuotation from './components/Quotations/AddQuotation';
import Layout from './components/UI/Layout/Layout';


function App() {

  return (
    <Router>
      <div className="App">
            <Layout>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/quotations" exact component={AllQuotations}/>
                <Route path="/quotations/new" exact component={AddQuotation}/>
                <Route path="/products" exact component={AllProducts} />
                <Route path="/products/new" exact component={AddProduct} />
              </Switch>
            </Layout>
      </div>
    </Router>
  );
}

export default App;
