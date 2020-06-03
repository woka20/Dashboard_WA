import React from 'react'
import {connect} from 'unistore/react'
import {withRouter} from 'react-router-dom'
import {store,actions} from '../store'
import axios from 'axios'
import {Container,
        Col,
        Row,
        Form,
        FormGroup,
        Button} from 'react-bootstrap'


class AddProduct extends React.Component{
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
    
    constructor(props){
        super(props)
        this.state={
            name_product:"",
            phone_product:"",
            api_key:['299a3afd:tchOyRAB5oEtSrBW']
        }
    }
    addProductFunc=async()=>{
        const req={
            method:"post",
            url:"http://127.0.0.1:5000/product",
            headers:{"Access-Control-Allow-Origin":"*",'Authorization':'Bearer ' + localStorage.getItem("token"),'Content-Type': 'application/json'},
            data:{
                name:this.state.name_product,
                phone_number:this.state.phone_product,
                api_key:this.state.api_key
            }
        }
        await axios(req)
        .then((response)=>{
            alert("Produk Berhasil Ditambahkan")
            this.props.history.push('/tableproduct')

        })
        .catch((error)=>{
            alert(error)
        })

    }
    render(){
        return(
            <React.Fragment>
                <Form>
                    <FormGroup>
                        <Form.Label>Nama Produk</Form.Label>
                        <Form.Control type="text" onChange={event=>this.setState({name_product:event.target.value})}></Form.Control>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Nomor Telepon</Form.Label>
                        <Form.Control type="text" onChange={event=>this.setState({phone_product:event.target.value})}></Form.Control>
                    </FormGroup>
                         <Form.Label>API KEY</Form.Label>
                         <Form.Control type="text" onChange={event=>this.setState({api_key:event.target.value})}></Form.Control> 
                    <Row>
                        <Col><Button variant="primary" onClick={event=>this.props.addProductFunc(event)}>ADD PRODUCT</Button></Col>
                        <Col> <Button variant="danger" onClick={event=>this.props.logOutFunc(event)}>LOGOUT</Button></Col>
                    </Row>
                    
                </Form>
              
            </React.Fragment>
        )
    }
}

export default connect('',actions)(withRouter(AddProduct))