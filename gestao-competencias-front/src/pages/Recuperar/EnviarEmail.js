import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

import { enviarEmailReset } from '../../store/actions/usuarios/usuario'

import Alerta from '../../components/Alerta/Alerta'

import { alertout } from '../../store/actions/alertas/alerta'
import { pageLogin } from '../../store/actions/pages/page'

import logo from "../../assets/leds-logo.svg";
import '../../styles/login.css';


const initialState = {
  email: '',
  senha: '',
  logado: false,
}

class EnviarEmail extends Component {
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

  handleSubmit(event){
    event.preventDefault()    
  }

  render(props) {
    
    if(this.props.page.page === "login"){
        return <Redirect to ="/"/>
      }

    return (
        <div className="App">
        <header className="App-header">
        <Alerta open= {true} alertTitle= {this.props.alerta.alertTitle} severity= {this.props.alerta.severity} texto= {this.props.alerta.texto}/>
          <Image src={logo} className="App-logo" alt="logo" />
            <p className="App-text-logo">LEDS SKILLS</p>
            <Form className="App-form" onSubmit={this.handleSubmit}>  

            <Form.Group controlId="formBasicEmail" className="App-form-group">
                <Form.Label>Informe seu e-mail</Form.Label>
                <Form.Control type="email" placeholder="Entre com seu e-mail"
                    className="App-form-control"  
                    onChange = {value => this.onChangeEmail(value)} required/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            
            <Button variant="outline-success" type="submit" className="App-button-login" 
            onClick = { async () => { 
              await this.props.enviarEmailReset({email: this.state.email})
            }
            }>
                <p className="App-text-button">Enviar</p>
            </Button>
            <Button variant="outline-primary" className="App-button-login" 
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

const mapStateToProps = ({ email, alerta, page }) => {
  return {
      email,
      alerta,
      page
  }
}

const mapDispatchToProps = dispatch => {
    return {
        enviarEmailReset: email => dispatch(enviarEmailReset(email)),
        alertout: () => dispatch(alertout()),
        pageLogin: () => dispatch(pageLogin()),
        
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(EnviarEmail)