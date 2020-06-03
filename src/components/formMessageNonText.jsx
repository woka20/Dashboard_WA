import React from 'react'
import {connect} from 'unistore/react'
import {withRouter} from 'react-router-dom'
import {store,actions} from '../store'
import {Form,
        FormGroup,
        Button} from 'react-bootstrap'


class NonTextMessage extends React.Component{
    
    render(){
        return (
            <React.Fragment>
                 <Form>
                     <FormGroup>
                         <Form.Label>Sender ID</Form.Label>
                         <Form.Control type="text" name="sender_id" onChange={event=>this.props.handleSetGlobal(event)}></Form.Control>
                     </FormGroup>
                     <FormGroup>
                         <Form.Label>From Number</Form.Label>
                         <Form.Control type='text' name="from_number"  onChange={event=>this.props.handleSetGlobal(event)} placeholder='Masukan Nomor Pengirim'></Form.Control>
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

export default connect('sender_id,from_number,to_number,media_url,caption',actions)(withRouter(NonTextMessage))