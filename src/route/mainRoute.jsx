import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Provider} from 'unistore/react'
import SendingForm from '../pages/sendForms'
import Dashboard from '../pages/dashboard'
import Register from "../pages/register"
import AddProduct from "../pages/addProduct"
import TableProduct from '../pages/productTable'
import {store} from '../store'

const MainRoute=()=>{
    return(
        <Provider store={store}>
            <BrowserRouter>
            <Switch>
                <Route exact path='/sending' component={SendingForm}/>
                <Route exact path='/dashboard' component={Dashboard}/>
                <Route exact path='/register' component={Register}/>
                <Route exact path='/product' component={AddProduct}/>
                <Route exact path='/tableproduct' component={TableProduct}/>
            </Switch>
            </BrowserRouter>
        </Provider>
    )

}

export default(MainRoute)