import React , { Component} from 'react';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

import { alertout } from '../../store/actions/alertas/alerta'
import { logout } from '../../store/actions/usuarios/usuario'
import { logoutPage } from '../../store/actions/pages/page'
import { logoutCategoria } from '../../store/actions/categorias/categoria'
import { logoutAdminview } from '../../store/actions/adminViews/adminView'
import { logoutProjeto } from '../../store/actions/projetos/projeto'

import { pageDashboard } from '../../store/actions/adminViews/adminView'

const initialState = {
}

class NavbarP extends Component {

  constructor(props) {
    super(props)
    this.state = initialState
  }


  render(props) {

    return (
        <Navbar bg="light" variant="light" >
          <Navbar.Brand href="/admin" onClick={()=>{this.props.pageDashboard()}} style={{marginTop:"0.5em", color:"#666", fontWeight:"500", fontSize:"1.9em", alignItems:"center"}} >
            {this.props.usuario.nome}
          </Navbar.Brand>
          
          <Nav className="ml-auto">
            <Button variant="light" style={{height:"3em"}} 
            onClick = { () =>
                { 
                  this.props.logout()
                  this.props.logoutAdminview()
                  this.props.logoutCategoria()
                  this.props.logoutPage()
                  this.props.logoutProjeto()
                  this.props.alertout()

                }
              }>
              <p style={{fontSize:"1.4em"}}>Sair</p>
            </Button>
          </Nav>
        </Navbar>
      );
    
  }
}
const mapStateToProps = ({ usuario, page }) => {
  return {
      usuario,
      page
  }
}
const mapDispatchToProps = dispatch => {
  return {
    alertout: () => dispatch(alertout()),
    logout: () => dispatch(logout()),
    logoutPage: () => dispatch(logoutPage()),
    logoutAdminview: () => dispatch(logoutAdminview()),
    logoutProjeto: () => dispatch(logoutProjeto()),
    logoutCategoria: () => dispatch(logoutCategoria()),
    pageDashboard: () => dispatch(pageDashboard()),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavbarP)

