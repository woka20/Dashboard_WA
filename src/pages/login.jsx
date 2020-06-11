import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {connect} from 'unistore/react'
import {store,actions} from '../store'
//Bootrsap For Layout
import {Container,
        Col,
        Row,
        Form,
        FormGroup,
        Button} from 'react-bootstrap'

class Login extends React.Component{
        //This function will send all state required to make request for login in BackEnd
        loginFunc=async()=>{
                const req={
                        method:"post",
                        url:"http://127.0.0.1:5000/login",
                        headers:{"Access-Control-Allow-Origin":"*"},
                        data:{username:this.props.user_log,
                              password:this.props.pass_log

                        }
                }
                //Using axios to make request
                await axios(req)
                .then((response)=>{
                        localStorage.setItem("token", response.data.token)
                        localStorage.setItem("company_name", response.data.company_name)
                        if (this.props.username === "admin" && this.props.pass_log==="admin"){
                                localStorage.setItem("log_as","admin")
                        }else{
                                localStorage.setItem("log_as","non-admin")
                        }
                        store.setState({logout:false})
                        alert("Anda Berhasil Login")
                        this.props.history.push("/dashboard")

                })
                .catch((error)=>{
                        alert(error)
                        this.props.history.push("/login")
                })

        }
        render(){
                return (
                //The interface for login form
                <React.Fragment>
                        <Container>
                                <Row>
                                        <Col md = "4" sm = "1"></Col>
                                        <Col md = "4" sm = "10" style = {{marginTop: '200px', padding: '30px', border: '1px solid black', borderRadius: '15px'}}>
                                                <Form>
                                                        <FormGroup>
                                                                <Form.Label>Username</Form.Label>
                                                                <Form.Control type="text" name="user_log" onChange={event=>this.props.handleSetGlobal(event)}></Form.Control>
                                                        </FormGroup>
                                                        <FormGroup>
                                                                <Form.Label>Password</Form.Label>
                                                                <Form.Control type="password" name="pass_log" onChange={event=>this.props.handleSetGlobal(event)}></Form.Control>
                                                        </FormGroup>
                                                        <Button variant="primary" onClick={()=>this.loginFunc()}>Login</Button>
                                                        </Form>
                                        </Col>
                                        <Col md = "4" sm = "1"></Col>
                                </Row>
                        </Container>

                </React.Fragment>
                )
        }

}
//enabling export teh class above
export default connect('user_log,pass_log,logout', actions)(withRouter(Login))