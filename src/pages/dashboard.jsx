// Import some packages and modules
import React from 'react'
import {connect} from 'unistore/react'
import {withRouter, Link} from 'react-router-dom'
import {store, actions} from '../store'
import {Container, 
        Row,
        Col,
        Form,
        FormGroup,
        Button} from 'react-bootstrap'
import { CSVLink } from "react-csv"
import '../styles/bootstrap.min.css'
import '../styles/dashboard.css'
import Header from '../components/header'
import History from '../components/history'
import MessageFilter from '../components/messageFilter'

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
        // Check whether the person who access has already logged in or not
        if (this.props.logout === true){
            this.props.history.push("/login")
        }
        store.setState({redirect: false})

        /**
         * Prepare and format the history data to be in csv format
         */
        // Formatting time
        let timeNow = this.props.latestUpdate
        let timeNowArray = timeNow.split(" ")
        let month = timeNowArray[1]
        let date = timeNowArray[2]
        let year = timeNowArray[3]
        let time = timeNowArray[4]
        let formattedString = "Hingga tanggal " + date + " " + month + " " + year + " "
        formattedString += ("pukul " + time)

        // Preparing title and header
        let csvFile = [
            [""], // Left the first row empty
            ["", "Riwayat Percakapan"], // Give title
            ["", formattedString], // The time of latest update
            [""], // Left empty
            ["", "ID Pesan", "Nama Pengirim", "Nomor Pengirim", "Nama Penerima", "Nomor Penerima", "Tipe Pesan", "Isi Pesan", "Status", "Waktu"], // Header,
        ]

        // Preparing history data
        let historyData = this.props.historyList.map((data) => {
            return [
                "",
                data.uuid,
                data.sender_name,
                data.from_number,
                data.receiver,
                data.to_number,
                data.message_type,
                data.text_message,
                data.status,
                data.timestamp
            ]
        })
        csvFile.push(...historyData)

        return (
            <React.Fragment>
                <Header menuActive = {'/dashboard'} />
                <Container fluid className = 'dashboard-title-container'>
                    <Row>
                        <Col sm = "12">
                            <span className = 'dashboard-history-title'>RIWAYAT PERCAKAPAN</span>
                        </Col>
                    </Row>
                    <Row style = {{paddingTop: "30px"}}>
                        <Col md = "8" sm = "12">
                            <MessageFilter />
                        </Col>
                        <Col md = "4" sm = "12" style = {{textAlign: 'right', paddingRight: '25px'}}>
                            <Button style = {{fontSize: "16px", marginRight: "25px"}} onClick = {() => this.props.updateTable()} >Perbarui</Button>
                            <CSVLink data = {csvFile} className = "btn btn-primary" filename = {"Riwayat Percakapan.csv"} style = {{fontSize: "16px", marginRight: "22px"}}>Ekspor CSV / XLS</CSVLink>
                        </Col>
                    </Row>
                </Container>
                <History />
            </React.Fragment>
        )
    }
}


export default connect('historyList, latestUpdate, typeMsg, BulkOrNot, redirect, newForm', actions)(withRouter(Dashboard))

