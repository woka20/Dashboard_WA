// Import some packages and modules
import React from 'react'
import {connect} from 'unistore/react'
import {withRouter, Link} from 'react-router-dom'
import {store, actions} from '../store'
import '../styles/bootstrap.min.css';
import '../styles/header.css'

class MessageFilter extends React.Component{
    render(){
        return (
            <React.Fragment>

            </React.Fragment>
        )
    }
}

export default connect('', actions)(withRouter(MessageFilter))