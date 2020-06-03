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


class ShowTable extends React.Component{
    componentDidMount=async()=>{
        req={
            method:"get",
            url:"http://127.0.0.1:5000/product",
            headers:{"Access-Control-Allow-Origin":"*"}
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
                </Container>
            </React.Fragment>
        )
    }
}

export default connect('productTab',actions)(withRouter(ShowTable))