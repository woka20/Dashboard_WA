import React from 'react'
import {connect} from 'unistore/react'
import {withRouter} from 'react-router-dom'
import {store,actions} from '../store'
import {Form,
        FormGroup,
        Button} from 'react-bootstrap'


class BulkMessage extends React.Component{
    
    render(){
        return (
            <React.Fragment>
                 <Form>
                     <FormGroup>
                         <Form.Label>Input CSV FIle Here</Form.Label>
                         <br/>
                         <input type="file" name="file" onChange={(event)=>this.props.handleFileUpload(event)}></input>
                     </FormGroup>
                    
                     <Button variant="primary" onClick={event=>this.props.handleBulkMessage(event)}>Sent</Button>
                 </Form>
            </React.Fragment>
        )
    }
}

export default connect('file',actions)(withRouter(BulkMessage))
// export default(FormMessage)