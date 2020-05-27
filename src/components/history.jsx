// Import some packages and modules
import React from 'react'
import {connect} from 'unistore/react'
import {withRouter, Link} from 'react-router-dom'
import {store, actions} from '../store'
import {Table} from 'react-bootstrap'
import '../styles/bootstrap.min.css';
import '../styles/history.css'

class History extends React.Component{
    render(){
        // Get all histories
        let histories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

        // Define JSX variable which build the table rows
        let historiesTable = histories.map((record, index) => {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
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
                                        <th>ID Pesan</th>
                                        <th>No. Pengirim</th>
                                        <th>No. Penerima</th>
                                        <th>Isi Pesan</th>
                                        <th>Status</th>
                                        <th>Waktu Terkirim / Terima</th>
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

export default connect('',actions)(withRouter(History))