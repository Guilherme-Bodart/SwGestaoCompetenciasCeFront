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

import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

import { FaMedapps, FaUsers, FaSitemap, FaChartBar } from 'react-icons/fa';
import { styled } from '@material-ui/core';

import { pageCadastrarCategoria, pageCadastrarSubCategoria, pageSubCategoria, 
  pageCadastrarProjeto, pageProjeto, pageUsuario } from '../../store/actions/adminViews/adminView'

const initialState = {
}

class NavbarP extends Component {

  constructor(props) {
    super(props)
    this.state = initialState
  }
  
  render(props) {
    var styleIcon = {fontSize:"2.6em", color:"white"}
    var styleMenuItem = {fontSize:"1.21em", color:"white", marginLeft:"0.4em", fontWeight:"500", marginTop:"0.7em"}
    return (
        <div className="sidebar-background" style={{height:"100%", width:"20vw", opacity:"0.8", backgroundImage:"url(" + sidebar + ")",}}>
            <Sidelogo/>
            <div style={{height:"100vh", width:"20vw", opacity:"0.5"}}>
            <ProSidebar width="20vw" collapsed>
              <Menu >
                <MenuItem onClick={()=>{
                            this.props.pageUsuario()
                          }}
                  icon={<FaUsers style={styleIcon} />} style={styleMenuItem}>
                  Usuários
                </MenuItem>
                <MenuItem onClick={()=>{
                            this.props.pageProjeto()
                          }}
                  icon={<FaMedapps style={styleIcon} />} style={styleMenuItem}>
                  Projetos
                </MenuItem>
                <MenuItem onClick={()=>{
                            this.props.pageSubCategoria()
                          }}
                  icon={<FaSitemap style={styleIcon} />} style={styleMenuItem}>
                  SubCategorias
                </MenuItem>
                <MenuItem onClick={()=>{
                            alert("Em construção")
                          }} icon={<FaChartBar style={styleIcon} />} style={styleMenuItem}>
                  
                  Relatórios
                </MenuItem>
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
    pageCadastrarCategoria: () => dispatch(pageCadastrarCategoria()),
    pageCadastrarProjeto: () => dispatch(pageCadastrarProjeto()),
    pageCadastrarSubCategoria: () => dispatch(pageCadastrarSubCategoria()),
    pageProjeto: () => dispatch(pageProjeto()),
    pageSubCategoria: () => dispatch(pageSubCategoria()),
    pageUsuario: () => dispatch(pageUsuario()),
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavbarP)

