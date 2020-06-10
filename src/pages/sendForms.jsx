import React from 'react'
import axios from 'axios'
import {connect} from 'unistore/react'
import {withRouter, Link} from 'react-router-dom'
import {store, actions} from '../store'
import {Container, 
        Row,
        Col, 
        Dropdown,
        DropdownButton,
        Button} from 'react-bootstrap'
import Header from '../components/header'
import FormMessage from '../components/formMessage'
import NonTextMsg from '../components/formMessageNonText'
import BulkMessage from '../components/formBulkMsg'

class SendingForm extends React.Component{
    componentDidMount=async()=>{
        try{
            if (localStorage.getItem("token")===null){
                this.props.history.push("/login")
            }
        }
        catch(err){
            this.props.history.push("/login")
        }
      
        const req={ method:"get",
                    url:"http://127.0.0.1:5000/product",
                    headers:{"Access-Control-Allow-Origin":"*", "Authorization":"Bearer "+ localStorage.getItem("token"), "Content-Type":"application/json"},
                    }
                await axios(req)
                .then((response)=>{
                    store.setState({productTab:response.data})
                })
                .catch((error)=>{
                    alert(error)
                })
        
    }

    generateForm=(n1,n2)=>{
        if(n1==="Single"){
            if(n2==="text"){
                store.setState({newForm:<FormMessage/>})
            }else{
                store.setState({newForm:<NonTextMsg/>})
            }
        }else if(n1==="Bulk"){
            store.setState({newForm:<BulkMessage/>})
        }
    }
    render(){
        if (this.props.redirect===true){
            this.props.history.push("/dashboard")
        }else{
            console.log("OK")
        }
        return (
            <React.Fragment>
                <Header menuActive = {'/sending'}/>
                <br/>
                 <Container>
                     <Row>
                         <Col md="2">
                            
                            <Dropdown>
                            <p><strong>Ingin mengirim pesan satuan atau serentak (Bulk)? </strong></p>
                                <DropdownButton variant="danger" title={this.props.BulkOrNot}>
                                    <Dropdown.Item onClick={event=>store.setState({BulkOrNot:"Single"})}> Single</Dropdown.Item>
                                    <Dropdown.Item onClick={event=>store.setState({BulkOrNot:"Bulk"})}>Bulk </Dropdown.Item>
                                </DropdownButton>
                            </Dropdown>
                       </Col>
                       
                       <Col md="3">
                            <Dropdown>
                            <p><strong>Tipe pesan yang ingin dikirim?</strong>(Untuk "Bulk" silakan lewati bagian ini)</p>
                                <DropdownButton variant="danger"  title={this.props.typeMsg}>
                                    <Dropdown.Item onClick={event=>store.setState({typeMsg:"text"})}> Text</Dropdown.Item>
                                    <Dropdown.Item onClick={event=>store.setState({typeMsg:"image"})}>Image</Dropdown.Item>
                                    <Dropdown.Item onClick={event=>store.setState({typeMsg:"file"})}>File</Dropdown.Item>
                                
                                </DropdownButton>
                            </Dropdown>
                        </Col>
                        <Col md="2">
                               <Button variant="primary" onClick={event=>this.generateForm(this.props.BulkOrNot, this.props.typeMsg)}>Confirm</Button>
                        </Col>
                
        
                     </Row>
                     <br/>
                     <br/>
                     <br/>
                     <Row>
                         <Col md="3">
                         </Col>
                         <Col md="5">
                             {this.props.newForm}
                         </Col>
                     </Row>
                 </Container>
            </React.Fragment>
        )
    }
}

export default connect('typeMsg,BulkOrNot,redirect, file,newForm',actions)(withRouter(SendingForm))