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

class SendingForm extends React.Component{
    render(){
        return (
            <React.Fragment>
                 <Container fluid>
                     <Row>
                         <Col md="3">
                         </Col>
                         <Col md="9">
                         </Col>
                     </Row>
                 </Container>
            </React.Fragment>
        )
    }
}

export default connect('',actions)(withRouter(SendingForm))