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
                         <Form.Label>From Number</Form.Label>
                         <Form.Control type='text' placeholder='Masukan Nomor Pengirim'></Form.Control>
                     </FormGroup>
                     <FormGroup>
                         <Form.Label>To Number</Form.Label>
                         <Form.Control type='text' placeholder='Masukan Nomor Tujuan'></Form.Control>
                     </FormGroup>
                     <FormGroup>
                         <Form.Label>Text Message</Form.Label>
                         <Form.Control as='textarea' row="5"></Form.Control>
                     </FormGroup>
                     <Button variant="primary">Sent</Button>
                 </Form>
            </React.Fragment>
        )
    }
}

export default connect('',actions)(withRouter(FormMessage))
// export default(FormMessage)