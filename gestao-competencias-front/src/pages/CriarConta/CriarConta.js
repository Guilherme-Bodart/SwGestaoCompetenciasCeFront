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
  senhaConfirmada: '',
  nome: '',
}
class CriarConta extends Component {

  constructor(props) {
    super(props)
    this.state = initialState
  }

  onChangeNome = (event) => {
    this.setState({
      nome: event.target.value
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

  onChangeSenhaConfirmada = (event) => {
    this.setState({
      senhaConfirmada: event.target.value
   })
  }

  render(props) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="App-text-logo">LEDS SKILLS</p>
        <Form className="App-form">

            <Form.Group controlId="formBasicEmail"className="App-form-groupC">
                <Form.Control type="text" placeholder="Nome Completo" 
                className="App-form-control"
                onChange = {value => this.onChangeNome(value)}/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

             <Form.Group controlId="formBasicEmail"className="App-form-groupC">
                <Form.Control type="email" placeholder="Seu e-mail" 
                className="App-form-control"
                onChange = {value => this.onChangeEmail(value)}/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="App-form-groupC">
                <Form.Control type="password" placeholder="Senha" 
                className="App-form-control"
                onChange = {value => this.onChangeSenha(value)}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="App-form-groupC">
                <Form.Control type="password" placeholder="Confirmação de Senha"
                 className="App-form-control"
                 onChange = {value => this.onChangeSenhaConfirmada(value)}/>
            </Form.Group>

            <Button variant="outline-primary" type="submit" className="App-button-login" 
            onClick = { () => {
              if(this.state.senha === this.state.senhaConfirmada){
                alert(JSON.stringify(this.state))
              }else{
                alert("Senhas não são iguais")
              }
              }
            }>
                <p className="App-text-button">Criar Conta</p>
            </Button>
        </Form>
      </header>
    </div>
  )
  };
}

export default CriarConta;
