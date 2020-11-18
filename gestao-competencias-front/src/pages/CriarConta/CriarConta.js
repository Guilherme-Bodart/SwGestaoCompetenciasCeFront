import React, { Component } from "react";

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import logo from "../../assets/leds-icon.png";
import '../../styles/login.css';


class CriarConta extends Component {
  render(props) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="App-text-logo">LEDS SKILLS</p>
        <Form className="App-form">

            <Form.Group controlId="formBasicEmail"className="App-form-groupC">
                <Form.Control type="text" placeholder="Nome Completo" className="App-form-control"/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

             <Form.Group controlId="formBasicEmail"className="App-form-groupC">
                <Form.Control type="email" placeholder="Seu e-mail" className="App-form-control"/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="App-form-groupC">
                <Form.Control type="password" placeholder="Senha" className="App-form-control"/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="App-form-groupC">
                <Form.Control type="password" placeholder="Confirmação de Senha" className="App-form-control"/>
            </Form.Group>

            <Button variant="outline-primary" type="submit" className="App-button-login">
                <p className="App-text-button">Criar : : Conta</p>
            </Button>
        </Form>
      </header>
    </div>
  )
  };
}

export default CriarConta;
