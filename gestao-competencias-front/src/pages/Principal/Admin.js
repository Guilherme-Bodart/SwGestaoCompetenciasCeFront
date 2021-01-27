import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

import NavbarP from "../../components/Navbar/NavbarP"
import Sidebar from "../../components/Sidebar/Sidebar"

import '../../styles/principal.css'
import logo from "../../assets/leds-logo.svg";

const initialState = {
  }

class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    render(props){
      if(!this.props.usuario.logado){
        return <Redirect to ="/"/>
      }
        return(
          <div style={{}} >
            <Row>
            <Sidebar/>
            <div style={{height:"100vh", width:"80vw", backgroundColor:"#ddd"}}>
              <NavbarP/>
            </div>
            </Row>
           
          </div>
          
          
        )
    }
}

const mapStateToProps = ({ usuario, alerta, page }) => {
    return {
        usuario,
        alerta,
        page
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Admin)