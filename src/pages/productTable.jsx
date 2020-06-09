import React from 'react'
import {store, actions} from '../store'
import {withRouter} from 'react-router-dom'
import {connect} from 'unistore/react'
import axios from 'axios'
import {Container,
        Col,
        Row,
        Table,
        Button} from 'react-bootstrap'
import Header from '../components/header'
import "../styles/bootstrapModal.min.css";
import '../styles/productTable.css'
import edit from '../images/edit.png'
import ModalEditProduct from '../components/modalEditProduct'


class ShowTable extends React.Component{
    componentDidMount=async()=>{
  
        try{
            if (localStorage.getItem("token")===null){
                this.props.history.push("/login")
            }
        }
        catch(err){
            this.props.history.push("/login")
        }
        
        const req={
            method:"get",
            url:"http://127.0.0.1:5000/product",
            headers:{"Access-Control-Allow-Origin":"*",'Authorization':'Bearer ' + localStorage.getItem("token"),'Content-Type': 'application/json'}
        }
        await axios(req)
        .then((response)=>{
            store.setState({productTab:response.data})

        })
        .catch((error)=>{
            alert(error)
        })

    }

    render(){
        return (
            <React.Fragment>
                <Header menuActive = {'/tableproduct'} />
                <Container className = 'product-table-container'>
                    <div className = 'product-table-title'>DAFTAR PRODUK</div>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Phone Number</th>
                                <th>API KEY</th>
                                <th>Created At</th>
                                <th>Ubah</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.productTab.map(index=>
                            <tr>
                                <td>{index.id}</td>
                                <td>{index.name}</td>
                                <td>{index.phone_number}</td>
                                <td>{index.api_key}</td>
                                <td>{index.created_at}</td>
                                <td>
                                    <button onClick = {() => this.props.activateModal(index)} data-toggle = "modal" data-target = "#modalEditProduct" className = "product-table-modal-button">
                                        <img style = {{width: "20px", height: "20px"}} src = {edit}/>
                                    </button>
                                </td>
                            </tr>)}
                        </tbody>
                    </Table>
                </Container>
                <ModalEditProduct/>
            </React.Fragment>
        )
    }
}

export default connect('productTab',actions)(withRouter(ShowTable))