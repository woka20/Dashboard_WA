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

class Dashboard extends React.Component{
    render(){
        /**
         * Prepare and format the history data to be in csv format
         */
        // Preparing title and header
        let csvFile = [
            [""], // Left the first row empty
            ["", "Riwayat Percakapan"], // Give title
            ["", "Hingga tanggal 26 April 2020"], // The date of latest update
            [""], // Left empty
            ["", "ID Pesan", "Nama Pengirim", "Nomor Pengirim", "Nama Penerima", "Nomor Penerima", "Tipe Pesan", "Isi Pesan", "Status", "Waktu"], // Header,
        ]

        // Preparing history data
        let historyData = this.props.historyList.map((data) => {
            return [
                "",
                data.uuid,
                "Alterra Academy",
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
                        <Col md = "3" sm = "12"></Col>
                        <Col md = "6" sm = "12">
                            <span className = 'dashboard-history-title'>RIWAYAT PERCAKAPAN</span>
                        </Col>
                        <Col md = "3" sm = "12">
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

export default connect('historyList',actions)(withRouter(Dashboard))