import React from 'react'
import {store,actions} from '../store'
import {withRouter} from 'react-router-dom'
import {connect} from 'unistore/react'
import {Container,
        Col,
        Row,
        Form,
        FormGroup,
        Button} from 'react-bootstrap'


class RegisterForm extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Container>
                    <Form>
                        <FormGroup>
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control type="text" name="company_name"></Form.Control>
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username"></Form.Control>
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="text" name="password"></Form.Control>
                        </FormGroup>
                        <Button variant="primary">Register</Button>
                    </Form>
                </Container>
            </React.Fragment>
        ) 

    }

}

export default connect('',actions)(withRouter(RegisterForm))