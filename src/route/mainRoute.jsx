import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Provider} from 'unistore/react'
import SendingForm from '../pages/sendForms'
const MainRoute=()=>{
    return(
        <Provider>
            <BrowserRouter>
            <Switch>
                <Route exact path='/sending' component={SendingForm}/>
            </Switch>
            </BrowserRouter>
        </Provider>
    )

}

export default(MainRoute)