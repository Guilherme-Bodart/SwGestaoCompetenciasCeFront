import React , { Component} from 'react';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

import { alertout } from '../../store/actions/alertas/alerta'


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
        <Navbar.Brand href="/" style={{height:"3.45em", paddingTop:"0.9em", color:"#666", fontWeight:"500"}} >Navbar</Navbar.Brand>
        
        <Nav className="ml-auto">
          <Button variant="light" style={{height:"3em"}}>
            <p style={{marginTop:"0.4em"}}>Sair</p>
          </Button>
        </Nav>
      </Navbar>
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

