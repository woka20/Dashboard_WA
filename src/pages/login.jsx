import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {connect} from 'unistore/react'
import {store,actions} from '../store'
import {Container,
        Col,
        Row,
        Form,
        FormGroup,
        Button} from 'react-bootstrap'

class Login extends React.Component{

}

export default connect('', actions)(withRouter(Login)