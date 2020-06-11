// Import some packages and modules
import React from 'react'
import {connect} from 'unistore/react'
import {withRouter, Link} from 'react-router-dom'
import {store, actions} from '../store'
import {Container, 
        Row,
        Col,
        Button} from 'react-bootstrap'
import '../styles/bootstrap.min.css'
import hedwigLogo from '../images/hedwig.jpg'
import vonageLogo from '../images/vonage.png'
import whatsappLogo from '../images/whatsapp.png'
import HomepageHeader from '../components/homepageHeader'
import Footer from '../components/footer'

class LandingPage extends React.Component{
    render(){
        return (
            <React.Fragment>
                <HomepageHeader />
                <Container fluid>
                    <Row>
                        <Col sm = "12" style = {{textAlign: 'center', padding: '80px 150px 80px 150px', backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
                            <h1 style = {{marginBottom: '30px'}}>Selamat Datang di Hedwig.</h1>
                            <p style = {{fontSize: '25px'}}>
                                Selamat datang di mikroservis Hedwig oleh Alterra Indonesia. Untuk informasi lebih lanjut, 
                                silahkan hubungi kami melalui email di hedwig-wa@markapersada.id
                            </p>
                        </Col>
                    </Row>
                    <Row style = {{padding: '30px'}}>
                        <Col sm = "12" md = "6">
                            <h2 style = {{textAlign: 'center'}}>About Us</h2>
                            <Container>
                                <Row>
                                    <Col sm = "12" md = "6">
                                        <img src = {hedwigLogo} alt = "Logo Hedwig" />
                                    </Col>
                                    <Col sm = "12" md = "6" style = {{paddingTop: '50px'}}>
                                        <p style = {{fontSize: '20px'}}>
                                            Hedwig (PT Marka Kreasi Persada) adalah perusahaan yang memberikan layanan jasa 
                                            konsultasi dan implementator di bidang IT.
                                        </p>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col sm = "12" md = "6">
                            <h2 style = {{textAlign: 'center'}}>Powered By</h2>
                            <Container style = {{paddingTop: '20px'}}>
                                <Row>
                                    <Col sm = "12" md = "6" style = {{textAlign: 'center'}}>
                                        <img style = {{width: '100%'}} src = {vonageLogo} alt = "Logo Vonage" />
                                        <div style = {{fontWeight: 'bold', fontSize: '18px', paddingTop: '10px'}}>Vonage</div>
                                    </Col>
                                    <Col sm = "12" md = "6" style = {{textAlign: 'center'}}>
                                        <img style = {{width: '68%'}} src = {whatsappLogo} alt = "Logo Whatsapp" />
                                        <div style = {{fontWeight: 'bold', fontSize: '18px', paddingTop: '10px'}}>Whatsapp</div>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </React.Fragment>
        )
    }
}


export default connect('', actions)(withRouter(LandingPage))

