import React from 'react'
import {connect} from 'unistore/react'
import {withRouter} from 'react-router-dom'
import {store,actions} from '../store'
import {Form,
        FormGroup,
        Button,
        Dropdown,
        DropdownButton} from 'react-bootstrap'


class NonTextMessage extends React.Component{
  
    
    render(){
        return (
            <React.Fragment>
                 <Form>
                     <FormGroup>
                     <Form.Label>Sender Name</Form.Label>
                     <Dropdown>
                         <DropdownButton variant="warning" title={this.props.sender_name}>
                         {this.props.productTab.map(index=>
                         <Dropdown.Item onClick={event=>store.setState({sender_id:index.id,from_number:index.phone_number,sender_name:index.name})} name="sender_id">{index.name}</Dropdown.Item>)}
                         </DropdownButton>
                     </Dropdown>
                     </FormGroup>
                     <FormGroup>
                         <Form.Label>From Number</Form.Label>
                         <Form.Control type='text' name="from_number"  placeholder={this.props.from_number}></Form.Control>
                     </FormGroup>
                     <FormGroup>
                         <Form.Label>Receiver Name</Form.Label>
                         <Form.Control type='text' name="receiver" onChange={event=>this.props.handleSetGlobal(event)} placeholder='Nama Penerima'></Form.Control>
                     </FormGroup>
                     <FormGroup>
                         <Form.Label>To Number</Form.Label>
                         <Form.Control type='text' name="to_number" onChange={event=>this.props.handleSetGlobal(event)} placeholder='Masukan Nomor Tujuan'></Form.Control>
                     </FormGroup>
                     <FormGroup>
                         <Form.Label>Media URL</Form.Label>
                         <Form.Control type='text' name="media_url" onChange={event=>this.props.handleSetGlobal(event)} placeholder="URL Image"></Form.Control>
                     </FormGroup>
                     <FormGroup>
                         <Form.Label>Caption</Form.Label>
                         <Form.Control type='text' name="caption" onChange={event=>this.props.handleSetGlobal(event)} placeholder="Caption For Image"></Form.Control>
                     </FormGroup>
                     <Button variant="primary" onClick={event=>this.props.handleSendMessage(event)}>Sent</Button>
                 </Form>
            </React.Fragment>
        )
    }
}

export default connect('sender_id,from_number,to_number,media_url,caption, productTab, sender_id,sender_name, from_number',actions)(withRouter(NonTextMessage))