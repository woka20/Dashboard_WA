import React from 'react'
import axios from 'axios'
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
    Register=async()=>{
        req={method:"post",
             url:"http://127.0.0.1:5000/register",
             headers:{"Access-Control-Allow-Origin":"*"},
             data:{name:this.props.company_name,
                   username:this.props.username,
                   password:this.props.password
                }
            }
        await axios(req)
        .then((response)=>{
            alert(response.data)
            this.props.history.push("/login")

        })
        .catch((error)=>{
            alert(error)
        })
    }
    render(){
        return(
            <React.Fragment>
                <Container>
                    <Form>
                        <FormGroup>
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control type="text" name="company_name" onChange={event=>this.prop.handleSetGlobal(event)}></Form.Control>
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" onChange={event=>this.prop.handleSetGlobal(event)}></Form.Control>
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" onChange={event=>this.prop.handleSetGlobal(event)}></Form.Control>
                        </FormGroup>
                        <Button variant="primary" onClick={()=>this.Register()}>Register</Button>
                    </Form>
                </Container>
            </React.Fragment>
        ) 

    }

}

export default connect('company_name, username,password',actions)(withRouter(RegisterForm))