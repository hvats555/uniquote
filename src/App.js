import './App.css';
import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Header from './components/UI/Header';
import Home from './components/Home';
import AllProducts from './components/Products/AllProducts';
import ProductForm from './components/Products/ProductForm';
import AllQuotations from './components/Quotations/AllQuotations';
import QuotationForm from './components/Quotations/QuotationForm';
import Layout from './components/UI/Layout/Layout';
import QuotationTemplate from './components/QuotationTemplate/QuotationTemplate';


function App() {

  return (
    <Router>
      <div className="App">
        <Header />
            <Layout>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/quotations" exact component={AllQuotations}/>
                <Route path="/quotations/new" exact component={QuotationForm}/>
                <Route path="/products" exact component={AllProducts} />
                <Route path="/products/new" exact component={ProductForm} />
                <Route path="/products/new" exact component={ProductForm} />
                <Route path="/quotations/final" exact component={QuotationTemplate} />
              </Switch>
            </Layout>
      </div>
    </Router>
  );
}

export default App;
