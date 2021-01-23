import React, { Component } from "react";
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Alerta from '../../components/Alerta/Alerta'
import { criarUsuario } from '../../store/actions/usuarios/usuario'
import logo from "../../assets/leds-logo.svg";
import { alertout } from '../../store/actions/alertas/alerta'

import '../../styles/login.css';

const initialState = {
  email: '',
  senha: '',
  senhaConfirmada: '',
  nome: '',
  dataNascimento: '',
  telefone: '',
  cpf: '',
  endereco: '',
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

  onChangeTelefone = (event) => {
    this.setState({
      telefone: event.target.value
   })
  }

  onChangeDataNascimento = (event) => {
    this.setState({
      dataNascimento: event.target.value
   })
  }

  onChangeCPF = (event) => {
    this.setState({
      cpf: event.target.value
   })
  }

  onChangeEndereco = (event) => {
    this.setState({
      estudante: event.target.value
   })
  }

  render(props) {
  return (
    <div className="App">
      <header className="App-header">
        <Alerta open= {true} alertTitle= {this.props.alerta.alertTitle} severity= {this.props.alerta.severity} texto= {this.props.alerta.texto}/>
        <img src={logo} className="App-logo" alt="logo" />
        <p className="App-text-logo">LEDS SKILLS</p>
        <Form className="App-form">          
          <Col >
            <Row >
              <Col xs={{ offset: 2 }} sm={{ span: 4, offset: 0 }} md={{ span: 5, offset: 0 }}  xl ={{offset: 0}} >
              <Form.Group controlId="nome" className="App-form-groupC">
              <Form.Label className="App-form-labelC">Nome completo</Form.Label>
                  <Form.Control type="text" placeholder="Nome Completo" 
                  className="App-form-control"
                  onChange = {value => this.onChangeNome(value)}/>
                  <Form.Text className="text-muted">
                  </Form.Text>
              </Form.Group>
              </Col>
              <Col xs={{ offset: 2 }} md={{ span: 5, offset: 1 }} sm={{ span: 4, offset: 2 }} xl ={{offset: 0}}>
              <Form.Group  className="App-form-groupC">
              <Form.Label className="App-form-labelC">Data de nascimento</Form.Label>
                  <Form.Control type="date"  
                  className="App-form-control"
                  onChange = {value => this.onChangeDataNascimento(value)}/>
                  <Form.Text className="text-muted">
                  </Form.Text>
              </Form.Group>
              </Col>
            </Row>

            <Row >
              <Col xs={{ offset: 2 }} sm={{ span: 4, offset: 0 }}  md={{ span: 5, offset: 0 }} xl ={{offset: 0}}>
              <Form.Group controlId="formBasicEmail" className="App-form-groupC">
              <Form.Label className="App-form-labelC">Email</Form.Label>
              <Form.Control type="email" placeholder="Seu e-mail" 
                  className="App-form-control"
                  onChange = {value => this.onChangeEmail(value)}/>
                  <Form.Text className="text-muted">
                  </Form.Text>
              </Form.Group>
              </Col>
              <Col xs={{ offset: 2 }} sm={{ span: 4, offset: 2 }} md={{ span: 5, offset: 1 }} xl ={{offset: 0}}>
              <Form.Group className="App-form-groupC">
                  <Form.Label className="App-form-labelC">Telefone</Form.Label>
                  <Form.Control type="text" placeholder="Telefone" 
                  className="App-form-control"
                  onChange = {value => this.onChangeTelefone(value)}/>
                  <Form.Text className="text-muted">
                  </Form.Text>
              </Form.Group>
              </Col>
            </Row>

            <Row >
              <Col xs={{ offset: 2 }} sm={{ span: 4, offset: 0 }} md={{ span: 5, offset: 0 }} xl ={{offset: 0}}>
              <Form.Group controlId="formBasicPassword" className="App-form-groupC">
                  <Form.Label className="App-form-labelC">Senha</Form.Label>
                  <Form.Control type="password" placeholder="Senha" 
                  className="App-form-control"
                  onChange = {value => this.onChangeSenha(value)}/>
              </Form.Group>
              </Col>
              <Col xs={{ offset: 2 }} sm={{ span: 4, offset: 2 }} md={{ span: 5, offset: 1 }} xl ={{offset: 0}}>
              <Form.Group controlId="formBasicPassword" className="App-form-groupC">
                  <Form.Label className="App-form-labelC">Confirmação de senha</Form.Label>
                  <Form.Control type="password" placeholder="Confirmação de Senha"
                  className="App-form-control"
                  onChange = {value => this.onChangeSenhaConfirmada(value)}/>
              </Form.Group>
              </Col>             
            </Row>

            <Row >              
              <Col xs={{ offset: 2 }} sm={{ span: 4, offset: 0 }} md={{ span: 5, offset: 0 }} xl ={{offset: 0}}>
              <Form.Group className="App-form-groupC">
                  <Form.Label className="App-form-labelC">CPF</Form.Label>
                  <Form.Control type="text" placeholder="CPF"
                  className="App-form-control"
                  onChange = {value => this.onChangeCPF(value)}/>
              </Form.Group>
              </Col>
              <Col xs={{ offset: 2 }} sm={{ span: 4, offset: 2 }} md={{ span: 5, offset: 1 }} xl ={{offset: 0}}>
              <Form.Group className="App-form-groupC">
                  <Form.Label className="App-form-labelC">Endereço</Form.Label>
                  <Form.Control type="text" placeholder="Endereço"
                  className="App-form-control"
                  onChange = {value => this.onChangeEndereco(value)}/>
              </Form.Group>
              </Col>
            </Row>

            <Button variant="outline-primary" type="submit" className="App-button-login" 
            onClick = { async () => {
              if(this.state.senha === this.state.senhaConfirmada){
                await this.props.criarUsuario({nome:this.state.nome, email:this.state.email, dataNascimento:this.state.dataNascimento, 
                                         telefone:this.state.telefone, senha:this.state.senha, endereco:this.state.endereco, 
                                         cpf:this.state.cpf, permissao:1,})
              }else{
                alert("Senhas não são iguais")
              }
              }
            }>
                <p className="App-text-button">Criar Conta</p>
            </Button>
             
            </Col>
            
        </Form>
       
      </header>
    </div>
  )
  };
}

const mapStateToProps = ({ usuario, alerta }) => {
  return {
      usuario,
      alerta
  }
}

const mapDispatchToProps = dispatch => {
  return {
      criarUsuario: usuario => dispatch(criarUsuario(usuario)),
      alertout: () => dispatch(alertout()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CriarConta)