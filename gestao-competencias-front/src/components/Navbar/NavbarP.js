import React , { Component} from 'react';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

import { alertout } from '../../store/actions/alertas/alerta'
import { logout } from '../../store/actions/usuarios/usuario'


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
        <Navbar.Brand href="/" style={{marginTop:"0.5em", color:"#666", fontWeight:"500", fontSize:"1.9em", alignItems:"center"}} >{this.props.page.page}</Navbar.Brand>
        
        <Nav className="ml-auto">
          <Button variant="light" style={{height:"3em"}} 
          onClick = { () =>
              { 
                this.props.logout()}
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

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavbarP)

