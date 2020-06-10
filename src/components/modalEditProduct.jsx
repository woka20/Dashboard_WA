import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'unistore/react';
import {actions, store} from '../store';
import {
    Modal,
    Input,
    Grid,
    Button,
    Form,
    Dropdown,
    Icon,
} from 'react-bootstrap';
import "../styles/bootstrapModal.min.css";
import '../styles/modal.css';

class ModalEditProduct extends Component {
    render() {
        return (
            <React.Fragment>
                <div className = 'modal fade'
                    data-backdrop = "static"
                    tabindex = "-1"
                    role = "dialog"
                    aria-labelledby = "staticBackdropLabel"
                    aria-hidden = "true"
                    id = 'modalEditProduct'
                >
                    <div className = 'modal-dialog modal-dialog-centered' role = 'document'>
                        <div className = 'modal-content'>
                            <div className = 'modal-header'>
                                <div className = 'container-fluid'>
                                    <div className = 'row'>
                                        <div className = 'col-12' style = {{textAlign: 'center'}}>
                                            <h5 className = "edit-product-title" id = "staticBackdropLabel">Ubah Produk</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className = 'modal-body'>
                                <div className = 'container-fluid'>
                                    <div className = 'row'>
                                        <div className = 'col-12' style = {{marginBottom: '20px'}}>
                                            <Form>
                                                <Form.Group style = {{textAlign: 'left'}}>
                                                    <Form.Label>Nama Produk</Form.Label>
                                                    <Form.Control value = {this.props.modalEditProductName} type = 'text' name = "modalEditProductName" onChange = {event => this.props.handleSetGlobal(event)} placeholder = 'Masukkan Nama Produk'></Form.Control>
                                                </Form.Group>
                                                <Form.Group style = {{textAlign: 'left'}}>
                                                    <Form.Label>Nomor Handphone</Form.Label>
                                                    <Form.Control value = {this.props.modalEditPhone} type = 'text' name = "modalEditPhone" onChange = {event => this.props.handleSetGlobal(event)} placeholder = 'Masukkan Nomor Handphone'></Form.Control>
                                                </Form.Group>
                                                <Form.Group style = {{textAlign: 'left'}}>
                                                    <Form.Label>API Key</Form.Label>
                                                    <Form.Control value = {this.props.modalEditApiKey} type = 'text' name = "modalEditApiKey" onChange = {event => this.props.handleSetGlobal(event)} placeholder = 'Masukkan API Key'></Form.Control>
                                                </Form.Group>
                                            </Form>
                                        </div>
                                        <div className = 'col-12 col-md-2'></div>
                                        <div className = 'col-12 col-md-8' style = {{textAlign: 'center'}}>
                                            <button style = {{marginRight: '20px', width: '100px'}} onClick = {() => this.props.editProduct(this.props.dataProduct.id)} data-dismiss = "modal" className = "btn btn-primary">Simpan</button>
                                            <button style = {{width: '100px'}} class = "close" data-dismiss = "modal" aria-label = "Close" className = "btn btn-danger">Batal</button>
                                        </div>
                                        <div className = 'col-12 col-md-2'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default connect('modalEditProductId, modalEditProductName, modalEditPhone, modalEditApiKey', actions)(withRouter(ModalEditProduct));