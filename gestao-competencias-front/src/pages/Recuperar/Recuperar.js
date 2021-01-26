import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

import { alertout } from '../../store/actions/alertas/alerta'
import { pageLogin } from '../../store/actions/pages/page'

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
    
    if(this.props.page.page === "login"){
        return <Redirect to ="/"/>
      }

    return (
        <div className="App">
        <header className="App-header">
          <Image src={logo} className="App-logo" alt="logo" />
            <p className="App-text-logo">LEDS SKILLS</p>
            <Form className="App-form">

            <Form.Group controlId="formBasicEmail" className="App-form-group">
                <Form.Label>Nova senha</Form.Label>
                <Form.Control type="email" placeholder="Nova senha"
                    className="App-form-control"  
                    onChange = {value => this.onChangeEmail(value)}/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="App-form-group">
                <Form.Label>Confirmar nova senha</Form.Label>
                <Form.Control type="password" placeholder="Confirmar Senha" 
                className="App-form-control" 
                onChange = {value => this.onChangeSenha(value)}/>
            </Form.Group>
            
            <Button variant="outline-success" type="submit" className="App-button-login" onClick = { () => alert(JSON.stringify(this.state))}>
                <p className="App-text-button">Salvar</p>
            </Button>
            <Button variant="outline-primary" type="submit" className="App-button-login" 
                    onClick={ () => {
                        this.props.pageLogin()
                    }}>
                <p className="App-text-button">Voltar para o login</p>
            </Button>
            
            </Form>

        </header>
        </div>
    )
  };
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
        alertout: () => dispatch(alertout()),
        pageLogin: () => dispatch(pageLogin()),
        
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(Login)