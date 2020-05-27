// Import some packages and modules
import React from 'react'
import {connect} from 'unistore/react'
import {withRouter, Link} from 'react-router-dom'
import {store, actions} from '../store'
import {Container, 
        Row,
        Col, 
        Form,
        FormGroup,
        Button} from 'react-bootstrap'
import Header from '../components/header'

class Dashboard extends React.Component{
    render(){
        return (
            <React.Fragment>
                 <Header menuActive = {'/dashboard'} />
            </React.Fragment>
        )
    }
}

export default connect('',actions)(withRouter(Dashboard))