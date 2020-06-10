// Import some packages and modules
import React from 'react'
import {connect} from 'unistore/react'
import {withRouter, Link} from 'react-router-dom'
import {store, actions} from '../store'
import '../styles/bootstrap.min.css';
import '../styles/header.css'

class HomepageHeader extends React.Component{
    render(){
        return (
            <React.Fragment>
                <div className = 'container-fluid'>
                    <div className = 'row header-container'>
                        <div className = 'col-md-4 col-sm-12 header-company-name'>
                            Hedwig Microservices
                            <span className = 'homepage-header-title-span'><br />By Alterra Indonesia</span>
                        </div>
                        <div className = 'col-md-7 col-sm-12'></div>
                        <div className = 'col-md-1 col-sm-12 header-menu-container'>
                            <ul className = "header-menu">
                                <li><Link to = {`/login`}>Masuk</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className = "header-white-space"></div>
            </React.Fragment>
        )
    }
}

export default connect('',actions)(withRouter(HomepageHeader))