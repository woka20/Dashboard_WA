// Import some packages and modules
import React from 'react'
import {connect} from 'unistore/react'
import {withRouter, Link} from 'react-router-dom'
import {store, actions} from '../store'
import '../styles/bootstrap.min.css';
import '../styles/header.css'

class Header extends React.Component{
    render(){
        return (
            <React.Fragment>
                <div className = 'container-fluid'>
                    <div className = 'row header-container'>
                        <div className = 'col-md-4 col-sm-12 header-company-name'>
                            Halo, Alterra!
                        </div>
                        <div className = 'col-md-2 col-sm-12'></div>
                        <div className = 'col-md-6 col-sm-12 header-menu-container'>
                            <ul className = "header-menu">
                                {this.props.menuActive === "/dashboard" ?
                                <li className="header-menu-active"><Link to = {`/dashboard`}>Beranda</Link></li>
                                :
                                <li><Link to = {`/dashboard`}>Beranda</Link></li>
                                }
                                {this.props.menuActive === "/sending" ?
                                <li className = "header-menu-active"><Link to = {`/sending`}>Kirim Pesan</Link></li>
                                :
                                <li><Link to = {`/sending`}>Kirim Pesan</Link></li>
                                }
                                {this.props.menuActive === "/product" ?
                                <li className = "header-menu-active"><Link to = {`/product`}>Tambah Produk</Link></li>
                                :
                                <li><Link to = {`/product`}>Tambah Produk</Link></li>
                                }
                                {this.props.menuActive === "/tableproduct" ?
                                <li className = "header-menu-active"><Link to = {`/tableproduct`}>Tabel Produk</Link></li>
                                :
                                <li><Link to = {`/tableproduct`}>Tabel Produk</Link></li>
                                }
                                <li>
                                    <Link onClick = {() => this.props.logOutFunc()} to = {'/login'}>Keluar</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className = "header-white-space"></div>
            </React.Fragment>
        )
    }
}

export default connect('',actions)(withRouter(Header))