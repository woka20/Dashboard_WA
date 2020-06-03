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


class Dashboard extends React.Component{
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
    goSending=()=>{
        this.props.history.push("/sending")
    }

    addingProduct=()=>{
        this.props.history.push("/product")
    }

    render(){
        if (this.props.logout===true){
            this.props.history.push("/login")
        }
        store.setState({redirect:false})
        return (
            <React.Fragment>
                 <Button variant="warning" onClick={event=>this.addingProduct()}>ADD PRODUCT</Button>
                 <br/>
                 <Button variant="success" onClick={event=>this.props.history.push("/sending")}>SENDING MESSAGE</Button>
                 <br/>
                 <Button variant="danger" onClick={event=>this.props.logOutFunc(event)}>LOGOUT</Button>
            </React.Fragment>
        )
    }
}

export default connect('typeMsg,BulkOrNot,redirect,logout,newForm',actions)(withRouter(Dashboard))