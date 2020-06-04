// Import some packages and modules
import React from 'react'
import {connect} from 'unistore/react'
import {withRouter, Link} from 'react-router-dom'
import {store, actions} from '../store'
import '../styles/bootstrap.min.css';
import '../styles/messageFilter.css'
import {Container,
    Col,
    Row,
    Form,
    FormGroup,
    Button} from 'react-bootstrap'

class MessageFilter extends React.Component{
    render(){
        return (
            <React.Fragment>
                <Form inline>
                    <FormGroup style = {{paddingLeft: "35px", width: "100%"}}>
                        <Form.Control className = "message-filter-input" placeholder = "ID Pesan" type = "text" onChange = {(e) => this.props.uuidFilter(e)}></Form.Control>
                        <Form.Control className = "message-filter-input" placeholder = "Nomor HP" type = "text" onChange = {(e) => this.props.phoneFilter(e)}></Form.Control>
                    </FormGroup>
                </Form>
            </React.Fragment>
        )
    }
}

export default connect('uuidFilterProps, phoneFilterProps', actions)(withRouter(MessageFilter))