import React, { Component } from "react";

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import logo from "../assets/leds-icon.png";
import '../styles/criarConta.css';


class CriarConta extends Component {
  render(props) {
  return (
    <div className="AppC">
      <header className="AppC-header">
        <img src={logo} className="AppC-logo" alt="logo" />
        <p className="AppC-text-logo">LEDS SKILLS</p>
        <Form className="AppC-form">

            <Form.Group controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Nome Completo" className="AppC-form-control"/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

             <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Seu e-mail" className="AppC-form-control"/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" >   
                <Form.Control type="password" placeholder="Senha" className="AppC-form-control"/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" >
                <Form.Control type="password" placeholder="Confirmação de Senha" className="AppC-form-control"/>
            </Form.Group>

            <Button variant="outline-primary" type="submit" className="AppC-button-login">
                <p>Criar</p>
            </Button>
        </Form>
      </header>
    </div>
  )
  };
}

export default CriarConta;
