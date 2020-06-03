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

    render(){
        store.setState({redirect:false})
        return (
            <React.Fragment>
                 <p>SUCCESS</p>
            </React.Fragment>
        )
    }
}

export default connect('typeMsg,BulkOrNot,redirect, newForm',actions)(withRouter(Dashboard))