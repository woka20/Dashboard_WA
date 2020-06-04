import React from 'react'
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
    componentDidMount=()=>{
        try{
            if (localStorage.getItem("token")===null){
                this.props.history.push("/login")
            }
        }
        catch(err){
            this.props.history.push("/login")
        }
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
                 <Container fluid>
                     <Row>
                         <Col md="2">
                            <Dropdown>
                                <DropdownButton variant="danger" title={this.props.BulkOrNot}>
                                    <Dropdown.Item onClick={event=>store.setState({BulkOrNot:"Single"})}> Single</Dropdown.Item>
                                    <Dropdown.Item onClick={event=>store.setState({BulkOrNot:"Bulk"})}>Bulk </Dropdown.Item>
                                </DropdownButton>
                            </Dropdown>
                       </Col>
                       <Col md="2">
                            <Dropdown>
                                <DropdownButton variant="danger"  title={this.props.typeMsg}>
                                    <Dropdown.Item onClick={event=>store.setState({typeMsg:"text"})}> Text</Dropdown.Item>
                                    <Dropdown.Item onClick={event=>store.setState({typeMsg:"image"})}>Image</Dropdown.Item>
                                    <Dropdown.Item onClick={event=>store.setState({typeMsg:"file"})}>File</Dropdown.Item>
                                
                                </DropdownButton>
                            </Dropdown>
                            <Col sm="2">
                               <Button variant="primary" onClick={event=>this.generateForm(this.props.BulkOrNot, this.props.typeMsg)}>Confirm</Button>
                            </Col>
                       </Col>
        
                     </Row>
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