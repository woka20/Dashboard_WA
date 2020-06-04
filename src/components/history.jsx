// Import some packages and modules
import React from 'react'
import {connect} from 'unistore/react'
import {withRouter, Link} from 'react-router-dom'
import {store, actions} from '../store'
import axios from 'axios'
import {Table} from 'react-bootstrap'
import '../styles/bootstrap.min.css'
import '../styles/history.css'

class History extends React.Component{
    /**
     * The following method is designed to get appropriate message type
     * 
     * @param {string} messageType Type of the message
     */
    getMessageType = (messageType) => {
        if (messageType === 'text') {
            return 'Teks'
        } else if (messageType === 'image') {
            return 'Gambar'
        } else {
            return 'File'
        }
    }

    /**
     * The following method is designed to get appropriate status type
     * 
     * @param {string} messageStatus Status of the message
     */
    getMessageStatus = (messageStatus) => {
        if (messageStatus === 'sent' || messageStatus === 'submitted' || messageStatus === 'ON PROCESS') {
            return 'Dalam Proses'
        } else if (messageStatus === 'delivered') {
            return 'Diterima'
        } else if (messageStatus === 'read') {
            return 'Dibaca'
        } else if (messageStatus === 'rejected') {
            return 'Ditolak'
        } else if (messageStatus === 'undeliverable' || messageStatus === 'failed') {
            return 'Gagal'
        } else {
            return messageStatus
        }
    }
    
    componentDidMount = async () => {
        // Define some variables needed
        let baseUrl = this.props.baseUrl
        
        /**
        * Hit related API to get all messaging history from database
        */
        // Define object that will be passed as an argument to axios function
        const axiosArgs = {
            method: "get",
            url: baseUrl + "message/history",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            params: {
                p: 1,
                rp: 100
            },
            validateStatus: (status) => {
                return status < 500
            }
        };

        // Hit related API (passed axiosArgs as the argument) and manage the response
        await axios(axiosArgs)
        .then(response => {
            // Set the store using the data returned by the API
            store.setState({
                historyList: response.data,
                latestUpdate: Date().toString()
            })
        })
        .catch(error => {
            console.warn(error);
        });
    }
    
    render(){
        // Get all histories
        let histories = this.props.historyList

        // Define JSX variable which build the table rows
        let historiesTable = histories.map((record) => {
            // Define what will be on 'ID Pesan'
            let uuid = (
                <span>{record.uuid}</span>
            )
            if (record.uuid === 'Error') {
                uuid = (
                    <div style = {{fontStyle: 'italic', textAlign: 'center', opacity: '0.4'}}>
                        Error
                    </div>
                )
            }
            
            // Define what will be on 'Pengirim' column
            let sender = ''
            if (record.sender_name === '' || record.sender_name === null || record.sender_name === 'None') {
                sender = <span>{record.from_number}</span>
            } else {
                sender = (
                    <React.Fragment>
                        <span style = {{fontWeight: 'bold'}}>{record.sender_name}</span><br />
                        <span>{record.from_number}</span>
                    </React.Fragment>
                )
            }

            // Define what will be on 'Penerima' column
            let receiver = ''
            if (record.receiver === '' || record.receiver === null || record.receiver === 'None') {
                receiver = <span>{record.to_number}</span>
            } else {
                receiver = (
                    <React.Fragment>
                        <span style = {{fontWeight: 'bold'}}>{record.receiver}</span><br />
                        <span>{record.to_number}</span>
                    </React.Fragment>
                )
            }
            
            // Define what will be on 'Isi Pesan' if the type of the message is image or file
            let messageContent = record.text_message
            if (record.message_type === 'image' || record.message_type === 'file') {
                messageContent = (
                    <React.Fragment>
                        <span style = {{fontWeight: "bold"}}>Media URL</span><br />
                        <span>{record.media_url}</span><br />
                        <span style = {{fontWeight: "bold"}}>Keterangan</span><br />
                        <span>{record.caption}</span><br />
                    </React.Fragment>
                )
            }

            // Define what will be on 'Isi Pesan' if the type of the message is text but the text is empty   
            if (record.message_type === 'text' && record.text_message === null) {
                messageContent = (
                    <div style = {{textAlign: 'center', opacity: '0.4', fontStyle: 'italic'}}>
                        Tidak bisa membaca pesan
                    </div>
                )
            }

            return (
                <tr>
                    <td className = 'history-vertical-align'>{uuid}</td>
                    <td className = 'history-vertical-align'>{sender}</td>
                    <td className = 'history-vertical-align'>{receiver}</td>
                    <td className = 'history-vertical-align'>{this.getMessageType(record.message_type)}</td>
                    <td className = 'history-vertical-align' style = {{textAlign: "left"}}>{messageContent}</td>
                    <td className = 'history-vertical-align'>{this.getMessageStatus(record.status)}</td>
                    <td className = 'history-vertical-align'>{record.timestamp}</td>
                </tr>
            )
        })
        
        return (
            <React.Fragment>
                <div className = 'container-fluid'>
                    <div className = 'row'>
                        <div className = 'col-12 history-table-container'>
                            <Table responsive bordered hover>
                                <thead>
                                    <tr>
                                        <th className = 'history-vertical-align history-min-width-330'>ID Pesan</th>
                                        <th className = 'history-vertical-align history-min-width-130'>Pengirim</th>
                                        <th className = 'history-vertical-align history-min-width-130'>Penerima</th>
                                        <th className = 'history-vertical-align'>Tipe</th>
                                        <th className = 'history-vertical-align'>Isi Pesan</th>
                                        <th className = 'history-vertical-align'> Status</th>
                                        <th className = 'history-vertical-align history-min-width-130'>Waktu</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {historiesTable}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default connect('baseUrl, historyList, latestUpdate',actions)(withRouter(History))