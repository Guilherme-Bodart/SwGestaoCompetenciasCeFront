import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from "react-bootstrap/Button"
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import DropdownButton from 'react-bootstrap/DropdownButton'

import { pageUsuario } from '../../store/actions/adminViews/adminView'

import { editarUsuario } from '../../store/actions/usuarios/usuario'
import { cpfMask } from '../../functions/mask'
import { valida_cpf } from '../../functions/function'

import '../../styles/principal.css'
import { FaArrowLeft } from 'react-icons/fa';
import { BsThreeDotsVertical } from "react-icons/bs";

const initialState = {
    email: '',
    nome: '',
    dataNascimento: '',
    telefone: '',
    cpf: '',
    endereco: '',
    permissao: 1,
    tipo_usuarios: ["Aluno", "Admin"]
}

class EditarUsuario extends Component {

    constructor(props) {
        super(props)
        this.state = initialState
        this.state.email = this.props.usuario.getUsuario.email
        this.state.nome = this.props.usuario.getUsuario.pessoa.nome
        this.state.dataNascimento = this.props.usuario.getUsuario.pessoa.dataNascimento.substr(0, 10)
        this.state.telefone = this.props.usuario.getUsuario.pessoa.telefone
        this.state.cpf = this.props.usuario.getUsuario.pessoa.cpf
        this.state.endereco = this.props.usuario.getUsuario.pessoa.endereco
        this.state.permissao = this.props.usuario.getUsuario.permissao
    }

    onChangeNome = (event) => {
        this.setState({
            nome: event.target.value
        })
    }

    onChangeDataNascimento = (event) => {
        this.setState({
            dataNascimento: event.target.value
        })
    }

    onChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    onChangeTelefone = (event) => {
        this.setState({
            telefone: event.target.value
        })
    }

    onChangeCPF = (event) => {
        this.setState({
            cpf: cpfMask(event.target.value)
        })
    }

    onChangeTipo = (event) => {
        this.setState({
            permissao: event.target.value
        })
    }

    onChangeEndereco = (event) => {
        this.setState({
            endereco: event.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault()    
    }

    render(props){

        const tipo_usuario = this.state.tipo_usuarios.map((u, index) => {
            if(index+1 === this.state.permissao){
                return <option value={index+1} selected>
                    {u}
                </option>
            }else{
                return <option value={index+1} >
                    {u}
                </option>
            }
        });

        let data_atual = new Date();

        const data_max = (data_atual.getFullYear()-17)+'-01-01';

        return(
            
            <Container fluid>
                
                <Row>
                <p className="App-text-logo" style={{marginLeft:"1em", marginTop:"0.5em"}}>Usuários &gt; Editar</p>
                <Button className="ml-auto" variant="outline-secondary" 
                style={{marginRight:"1em", marginTop:"1em", height:"3em", width:"3em" }}
                onClick={()=>{
                    this.props.pageUsuario()
                }}>
                    <FaArrowLeft/>
                </Button>
                </Row>
                <Form className="App-form" onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Col>
                            <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control value={this.state.nome} onChange={value => this.onChangeNome(value)} required placeholder="Nome do Usuário" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Data de nascimento</Form.Label>
                            <Form.Control value={this.state.dataNascimento} max={data_max} type="date" onChange = {value => this.onChangeDataNascimento(value)} required />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control value={this.state.email} type="email" onChange={value => this.onChangeEmail(value)} required placeholder="E-mail" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control value={this.state.telefone} onChange={value => this.onChangeTelefone(value)} placeholder="Telefone" />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>CPF</Form.Label>
                            <Form.Control value={this.state.cpf} onChange={value => this.onChangeCPF(value)} required placeholder="CPF" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control required onChange={value => this.onChangeTipo(value)} as="select">
                                {tipo_usuario}
                            </Form.Control>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Endereço</Form.Label>
                            <Form.Control value={this.state.endereco} onChange={value => this.onChangeEndereco(value)} placeholder="Endereço" />
                            </Form.Group>
                        </Col>
                    </Form.Row>

                    <Col>
                        <Button variant="primary" type="submit" onClick= { async ()  =>{
                                    
                                     var idx = this.state.email.indexOf('@');
                                     if(this.state.dataNascimento <= data_max && this.state.nome != '' && this.state.dataNascimento != '' && this.state.email != '' && idx != -1 
                                     && this.state.senha != '' && this.state.cpf != ''){
                                        if(this.state.cpf.replace('-', '').replaceAll('.', '')){
                                        await this.props.editarUsuario({id: this.props.usuario.getUsuario._id, nome:this.state.nome, email:this.state.email, 
                                            dataNascimento:this.state.dataNascimento, 
                                            telefone:this.state.telefone, endereco:this.state.endereco, 
                                            cpf:this.state.cpf, permissao:this.state.permissao})
                                        }else{
                                            alert('CPF inválido')
                                        }
                                    } 
                                }}>
                            Salvar Usuário
                        </Button>
                    </Col>
                </Form>
            </Container>
          
        )
    }
}

const mapStateToProps = ({ adminView, alerta, usuario }) => {
    return {
        adminView,
        alerta,
        usuario
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        pageUsuario: () => dispatch(pageUsuario()),
        editarUsuario: usuario => dispatch(editarUsuario(usuario))
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(EditarUsuario)