import React , { Component} from 'react';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import NavLink from 'react-bootstrap/NavLink'

import Sidelogo from "../../components/Sidebar/Sidelogo"
import sidebar from "../../assets/sidebar-3.jpg";

import { alertout } from '../../store/actions/alertas/alerta'

import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

import { FaMedapps, FaJira, FaSitemap, FaSignal } from 'react-icons/fa';

const initialState = {
}

class NavbarP extends Component {

  constructor(props) {
    super(props)
    this.state = initialState
  }


  render(props) {
    return (
        <div className="sidebar-background" style={{height:"100vh", width:"20vw", opacity:"0.8", backgroundImage:"url(" + sidebar + ")",}}>
            <Sidelogo/>
            <div style={{height:"100vh", width:"20vw", opacity:"0.5", backgroundColor:"black"}}>
            <ProSidebar>
              <Menu iconShape="square" style={{ backgroundColor:"black" }}>
                <MenuItem icon={<FaMedapps />} style={{fontSize:"17px"}}><b>Projetos</b></MenuItem>
                <MenuItem icon={<FaJira />} style={{fontSize:"17px"}}><b>Categorias</b></MenuItem>
                <MenuItem icon={<FaSitemap />} style={{fontSize:"17px"}}><b>SubCategorias</b></MenuItem>
                <MenuItem icon={<FaSignal />} style={{fontSize:"17px"}}><b>Relatórios</b></MenuItem>
              </Menu>
            </ProSidebar>

            </div>
        </div>
      );
    
  }
}
const mapStateToProps = ({ usuario }) => {
  return {
      usuario,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    alertout: () => dispatch(alertout()),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavbarP)

