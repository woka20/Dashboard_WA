// Import some packages and modules
import React from 'react'
import {connect} from 'unistore/react'
import {withRouter, Link} from 'react-router-dom'
import {store, actions} from '../store'
import '../styles/bootstrap.min.css';
import '../styles/header.css'

class Footer extends React.Component{
    render(){
        return (
            <React.Fragment>
                <div className = 'container-fluid' style = {{marginTop: '8px'}}>
                    <div className = 'row' style = {{backgroundColor: 'rgba(0, 0, 0, 0.05)', padding: '8px'}}>
                        <div className = 'col-5 col-md-3' style = {{fontWeight: 'bold'}}>
                            Hedwig Microservices
                        </div>
                        <div className = 'col-2 col-md-6'></div>
                        <div className = 'col-5 col-md-3' style = {{textAlign: 'right'}}>
                            &copy; Copyright 2020
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default connect('',actions)(withRouter(Footer))