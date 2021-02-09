import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

import { recuperarSenha } from '../../store/actions/usuarios/usuario'

import swal from 'sweetalert';

import { pageLogin } from '../../store/actions/pages/page'

import logo from "../../assets/leds-logo.svg";
import '../../styles/login.css';

const initialState = {
  email: '',
  senha: '',
  logado: false,
}

class Recuperar extends Component {

  constructor(props) {
    super(props)
    this.state = initialState
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
        
          <Image src={logo} className="App-logo" alt="logo" />
            <p className="App-text-logo">LEDS SKILLS</p>
            <Form className="App-form" onSubmit={this.handleSubmit}>  

            <Form.Group controlId="formBasicEmail" className="App-form-group">
                <Form.Label>Nova senha</Form.Label>
                <Form.Control type="password" placeholder="Nova senha"
                    className="App-form-control"  
                    onChange = {value => this.onChangeSenha(value)}/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="App-form-group">
                <Form.Label>Confirmar nova senha</Form.Label>
                <Form.Control type="password" placeholder="Confirmar Senha" 
                className="App-form-control" 
                onChange = {value => this.onChangeSenhaConfirmada(value)}/>
            </Form.Group>
            
            <Button variant="outline-success" type="submit" className="App-button-login"
            onClick = { async () => {
                if(this.state.senha != '' && this.state.senhaConfirmada != ''){
                  if(this.state.senha === this.state.senhaConfirmada){
                    await this.props.recuperarSenha({senha:this.state.senha, token: this.props.match.params.token})
                  }
                  else{
                    swal({
                      title: "Error",
                      text: 'Falha no envio, senhas não coincidem',
                      icon: "error",
                    });
                  }
                }
              }
            }><p className="App-text-button">Salvar</p>
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

const mapStateToProps = ({ usuario, page }) => {
  return {
      usuario,
      page
  }
}

const mapDispatchToProps = dispatch => {
    return {
        recuperarSenha: usuario => dispatch(recuperarSenha(usuario)),
        pageLogin: () => dispatch(pageLogin()),
        
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Recuperar))