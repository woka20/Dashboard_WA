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
    /**
     * The following method is designed to export history into csv / xls file
     */
    exportCsv = () => {
    }

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
                        <Col md = "3" sm = "12">
                            <Button onClick = {() => this.exportCsv()}>Ekspor CSV / XLS</Button>
                        </Col>
                    </Row>
                </Container>
                <History />
            </React.Fragment>
        )
    }
}

export default connect('',actions)(withRouter(Dashboard))