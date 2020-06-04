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


class ShowTable extends React.Component{
    componentDidMount=async()=>{
        if (localStorage.getItem("token")===false){
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
        if (localStorage.getItem("token")===false){
            this.props.history.push("/login")
        }
        return (
            <React.Fragment>
                <Header menuActive = {'/tableproduct'} />
                <Container>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Phone Number</th>
                                <th>API KEY</th>
                                <th>Created At</th>
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
                            </tr>)}
                        </tbody>
                    </Table>
                    <Row>
                        <Col><Button variant="primary" onClick={event=>this.props.history.push("/product")}>ADD PRODUCT</Button></Col>
                       <Col> <Button variant="success" onClick={event=>this.props.history.push("/sending")}>SENDING MESSAGE</Button></Col>
                      <Col><Button variant="danger" onClick={event=>this.props.logOutFunc(event)}>LOGOUT</Button></Col>
                   </Row>
                </Container>
            </React.Fragment>
        )
    }
}

export default connect('productTab,logout',actions)(withRouter(ShowTable))