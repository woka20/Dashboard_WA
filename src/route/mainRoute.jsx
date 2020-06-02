import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Provider} from 'unistore/react'
import SendingForm from '../pages/sendForms'
import Dashboard from '../pages/dashboard'
import {store} from '../store'

const MainRoute=()=>{
    return(
        <Provider store={store}>
            <BrowserRouter>
            <Switch>
                <Route exact path='/sending' component={SendingForm}/>
                <Route exact path='/dashboard' component={Dashboard}/>
            </Switch>
            </BrowserRouter>
        </Provider>
    )

}

export default(MainRoute)