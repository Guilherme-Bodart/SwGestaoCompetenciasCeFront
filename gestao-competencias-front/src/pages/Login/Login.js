import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

import Alerta from '../../components/Alerta/Alerta'
import { autenticarUsuario, logout } from '../../store/actions/usuarios/usuario'
import { alertout } from '../../store/actions/alertas/alerta'
import { logoutPage } from '../../store/actions/pages/page'
import { logoutCategoria } from '../../store/actions/categorias/categoria'
import { logoutAdminview } from '../../store/actions/adminViews/adminView'
import { logoutProjeto } from '../../store/actions/projetos/projeto'
import { pageCadastrar, pageEnviarEmail } from '../../store/actions/pages/page'

import logo from "../../assets/leds-logo.svg";
import '../../styles/login.css';


const initialState = {
  email: '',
  senha: '',
  logado: false,
}

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = initialState
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChangeLogado = (logado) => {
    this.setState({ 
      logado
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

  async componentDidMount(){
    this.props.logout()
    this.props.logoutAdminview()
    this.props.logoutCategoria()
    this.props.logoutPage()
    this.props.logoutProjeto()
    this.props.alertout()
  }

  render(props) {    
    if(this.props.page.page === "cadastro"){
      return <Redirect to ="/cadastro"/>
    }
    if(this.props.page.page === "enviarEmail"){
      return <Redirect to ="/enviarEmail"/>
    }
    if(this.state.logado && this.props.usuario.permissao==2){
      return <Redirect to ="/admin"/>
    }
    if(this.state.logado && this.props.usuario.permissao==1){
      return <Redirect to ="/user"/>
    }

    return (
      <div className="App">
        <header className="App-header">
          <Alerta open= {true} alertTitle= {this.props.alerta.alertTitle} severity= {this.props.alerta.severity} texto= {this.props.alerta.texto}/>
          <Image src={logo} className="App-logo" alt="logo" />
          <p className="App-text-logo">LEDS SKILLS</p>
          <Form className="App-form" onSubmit={this.handleSubmit}>

            <Form.Group controlId="formBasicEmail" className="App-form-group">
              <Form.Label>E-mail</Form.Label>
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
            
            <Button variant="outline-success" type="submit" className="App-button-login" 
              onClick = { async () =>
                {
                  var idx = this.state.email.indexOf('@');
                  if(idx != -1){
                    var usuario = {email:this.state.email,senha:this.state.senha}
                    await this.props.autenticarUsuario(usuario)
                    await this.onChangeLogado(this.props.usuario.logado)
                  }
                }
              }>
              <p className="App-text-button">Entrar</p>
            </Button>
            <Button variant="outline-primary" className="App-button-login" 
                    onClick={ () => {
                        this.props.pageCadastrar()
                    }}>
              <p className="App-text-button">Crie sua conta aqui</p>
            </Button>
            
          </Form>
          <Button variant="link" className="App-button-link"
                    onClick={ () => {
                      this.props.pageEnviarEmail()
                  }}>
              <p className="App-text-button">Esqueceu sua senha?</p>
            </Button>

        </header>
      </div>
    )
  };
}

const mapStateToProps = ({ usuario, alerta, page, adminView }) => {
  return {
      usuario,
      alerta,
      page, 
      adminView
  }
}

const mapDispatchToProps = dispatch => {
  return {
      alertout: () => dispatch(alertout()),
      logout: () => dispatch(logout()),
      pageEnviarEmail: () => dispatch(pageEnviarEmail()),
      pageCadastrar: () => dispatch(pageCadastrar()),
      autenticarUsuario: usuario => dispatch(autenticarUsuario(usuario)),
      logoutPage: () => dispatch(logoutPage()),
      logoutAdminview: () => dispatch(logoutAdminview()),
      logoutProjeto: () => dispatch(logoutProjeto()),
      logoutCategoria: () => dispatch(logoutCategoria()),      
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)