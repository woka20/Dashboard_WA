import React from 'react'
import {connect} from 'unistore/react'
import {withRouter} from 'react-router-dom'
import {store,actions} from '../store'
import {Form,
        FormGroup,
        Button} from 'react-bootstrap'


class FormMessage extends React.Component{
    render(){
        return (
            <React.Fragment>
                 <Form>
                 <FormGroup>
                         <Form.Label>Sender ID</Form.Label>
                         <Form.Control type='text' name="sender_id" onChange={event=>this.props.handleSetGlobal(event)}placeholder='Masukan Nomor Pengirim'></Form.Control>
                     </FormGroup>
                     <FormGroup>
                         <Form.Label>From Number</Form.Label>
                         <Form.Control type='text' name="from_number" onChange={event=>this.props.handleSetGlobal(event)}placeholder='Masukan Nomor Pengirim'></Form.Control>
                     </FormGroup>
                     <FormGroup>
                         <Form.Label>To Number</Form.Label>
                         <Form.Control type='text' name="to_number" onChange={event=>this.props.handleSetGlobal(event)} placeholder='Masukan Nomor Tujuan'></Form.Control>
                     </FormGroup>
                     <FormGroup>
                         <Form.Label>Text Message</Form.Label>
                         <Form.Control as='textarea' row="5" name="text_message" onChange={event=>this.props.handleSetGlobal(event)}></Form.Control>
                     </FormGroup>
                     <Button variant="primary" onClick={(event)=>this.props.handleSendMessage(event)}>Sent</Button>
                 </Form>
            </React.Fragment>
        )
    }
}

export default connect('',actions)(withRouter(FormMessage))
// export default(FormMessage)