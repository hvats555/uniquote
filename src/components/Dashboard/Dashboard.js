import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from '../Home';
import AllProducts from '../Products/AllProducts/AllProducts';
import AddProduct from '../Products/AddProduct';
import AllQuotations from '../Quotations/AllQuotations';
import AddQuotation from '../Quotations/AddQuotation';
import Layout from '../UI/Layout/Layout';

function Dashboard() {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/quotations" exact component={AllQuotations}/>
                    <Route path="/quotations/new" exact component={AddQuotation}/>
                    <Route path="/products" exact component={AllProducts} />
                    <Route path="/products/new" exact component={AddProduct} />
                </Switch>
            </Layout>
        </Router>
    )
}

export default Dashboard
