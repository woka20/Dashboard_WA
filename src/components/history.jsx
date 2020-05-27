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
    componentDidMount = async () => {
        /**
        * Hit related API to get all messaging history from database
        */
        // Define object that will be passed as an argument to axios function
        const axiosArgs = {
            method: "get",
            url: this.props.baseUrl + "message/history",
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
                historyList: response.data
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
            return (
                <tr>
                    <td className = 'history-vertical-align'>{record.uuid}</td>
                    <td className = 'history-vertical-align'>{record.from_number}</td>
                    <td className = 'history-vertical-align'>{record.to_number}</td>
                    <td className = 'history-vertical-align'>{record.message_type}</td>
                    <td className = 'history-vertical-align' style = {{textAlign: "left"}}>{record.text_message}</td>
                    <td className = 'history-vertical-align'>{record.status}</td>
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
                                        <th className = 'history-vertical-align history-min-width-320'>ID Pesan</th>
                                        <th className = 'history-vertical-align history-min-width-130'>No. Pengirim</th>
                                        <th className = 'history-vertical-align history-min-width-130'>No. Penerima</th>
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

export default connect('baseUrl, historyList',actions)(withRouter(History))