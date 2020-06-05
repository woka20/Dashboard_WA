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
    DropdownButton,
    Dropdown,
    Button} from 'react-bootstrap'

class MessageFilter extends React.Component{
    render(){
        return (
            <React.Fragment>
                <Form inline>
                    <FormGroup style = {{paddingLeft: "35px", width: "100%"}}>
                        <DropdownButton style = {{marginRight: "30px"}} id = "dropdown-basic-button" title = {this.props.filterType}>
                            <Dropdown.Item onClick = {event => store.setState({filterType: "ID Pesan", uuidFilterProps: "", keywordFilter: ""})}>ID Pesan</Dropdown.Item>
                            <Dropdown.Item onClick = {event => store.setState({filterType: "Nomor Handphone", phoneFilterProps: "", keywordFilter: ""})}>Nomor Handphone</Dropdown.Item>
                        </DropdownButton>
                        {
                            this.props.filterType === 'ID Pesan' ?
                            <Form.Control className = "message-filter-input" placeholder = {"Masukkan " + this.props.filterType} value = {this.props.keywordFilter} type = "text" onChange = {(e) => this.props.uuidFilter(e)}></Form.Control>:
                            <Form.Control className = "message-filter-input" placeholder = {"Masukkan " + this.props.filterType} value = {this.props.keywordFilter} type = "text" onChange = {(e) => this.props.phoneFilter(e)}></Form.Control>
                        }
                    </FormGroup>
                </Form>
            </React.Fragment>
        )
    }
}

export default connect('uuidFilterProps, phoneFilterProps, filterType, keywordFilter', actions)(withRouter(MessageFilter))