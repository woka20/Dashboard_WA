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
import '../styles/bootstrap.min.css'
import '../styles/dashboard.css'
import Header from '../components/header'
import History from '../components/history'

class Dashboard extends React.Component{
    render(){
        return (
            <React.Fragment>
                <Header menuActive = {'/dashboard'} />
                <Container className = 'dashboard-title-container'>
                    <Row>
                        <Col md = "3" sm = "12"></Col>
                        <Col md = "6" sm = "12">
                            <span className = 'dashboard-history-title'>RIWAYAT PERCAKAPAN</span>
                        </Col>
                        <Col md = "3" sm = "12"></Col>
                    </Row>
                </Container>
                <History />
            </React.Fragment>
        )
    }
}

export default connect('',actions)(withRouter(Dashboard))