import React , { Component} from 'react';
import { connect } from 'react-redux';

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
    var lista = this.props.usuario.nome.split(" ")
    var nome1 = lista[0] ? lista[0] : ""
    var nome2 = lista[1] ? lista[1] : ""
    return (
        <Navbar bg="light" variant="light" >
          <Navbar.Brand href="#" onClick={()=>{this.props.dashboard()}} style={{ color:"#666", alignItems:"center", height:"3.6em"}} >
            <p style={{marginTop:"0.64em", fontSize:"1.1em", fontWeight:"500"}}> {nome1} {nome2}</p>
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

