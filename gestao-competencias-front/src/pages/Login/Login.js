import React, { Component } from "react";

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import logo from "../../assets/leds-logo.svg";
import '../../styles/login.css';


const initialState = {
  email: '',
  senha: '',
  logado: false,
}

class Login extends Component {
1
  constructor(props) {
    super(props)
    this.state = initialState
  }

  onChangeLogado = () => {
    this.setState({ 
      logado: true
    })
  }

  onChangeEmail = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  onChangeSenha = (event) => {
    this.setState({
      senha: event.target.value
   })
  }

  render(props) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="App-text-logo">LEDS SKILLS</p>
        <Form className="App-form">

          <Form.Group controlId="formBasicEmail" className="App-form-group">
            <Form.Label>E-Mail</Form.Label>
            <Form.Control type="email" placeholder="Entre com seu e-mail"
                className="App-form-control"  
                onChange = {value => this.onChangeEmail(value)}/>
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="App-form-group">
            <Form.Label >Senha</Form.Label>
            <Form.Control type="password" placeholder="Senha" 
            className="App-form-control" 
            onChange = {value => this.onChangeSenha(value)}/>
          </Form.Group>
          
          <Button variant="outline-success" type="submit" className="App-button-login" onClick = { () => alert(JSON.stringify(this.state))}>
            <p className="App-text-button">Entrar</p>
          </Button>
          <Button variant="outline-primary" type="submit" className="App-button-login" >
            <p className="App-text-button">Crie sua conta aqui</p>
          </Button>
        </Form>
      </header>
    </div>
  )
  };
}

export default Login;
