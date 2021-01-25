import React, { Component } from "react";
import { connect } from 'react-redux';

import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

import '../../styles/login.css'
import logo from "../../assets/leds-logo.svg";

const initialState = {
}

class Sidelogo extends Component {

  constructor(props) {
    super(props)
    this.state = initialState
  }


  render(props) {
    return (
        <Navbar
        style={{borderBottom:"solid", borderRight:"solid",borderColor:"#ccc", borderWidth:"0.1em", backgroundColor:"black"}}>
        <Navbar.Brand href="#home" style={{height:"3.5em"}}>
     
        <Image src={logo} className="App-logo" alt="logo" style={{height:"4em", marginTop:"-0.5em"}}  />
          <a href="#" className="Principal-text-logo" >
            Leds Skills
          </a>
        </Navbar.Brand>
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
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Sidelogo)

