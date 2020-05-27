import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {store} from '../store';
import {Provider} from 'unistore/react'
import Dashboard from '../pages/dashboard'

const MainRoute=()=>{
    return(
        <Provider store = {store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/dashboard' component={Dashboard}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    )

}

export default(MainRoute)