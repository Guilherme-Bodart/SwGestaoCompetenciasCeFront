import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from "react-bootstrap/Button"
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import { pageUsuario } from '../../store/actions/adminViews/adminView'

import '../../styles/principal.css'
import { FaArrowLeft } from 'react-icons/fa';

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

class DetalhesUsuario extends Component {

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

        return(
            
            <Container fluid>
                <Row>
                <p className="App-text-logo" style={{marginLeft:"1em", marginTop:"0.5em"}}>Usuários &gt; Detalhar</p>
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
                            <Form.Control value={this.state.nome} disabled />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Data de nascimento</Form.Label>
                            <Form.Control value={this.state.dataNascimento} disabled />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control value={this.state.email} type="email" disabled  />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control value={this.state.telefone} disabled />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>CPF</Form.Label>
                            <Form.Control value={this.state.cpf} disabled />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control disabled onChange={value => this.onChangeTipo(value)} as="select">
                                {tipo_usuario}
                            </Form.Control>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Endereço</Form.Label>
                            <Form.Control value={this.state.endereco} disabled />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                </Form>
            </Container>
          
        )
    }
}

const mapStateToProps = ({ adminView, usuario }) => {
    return {
        adminView,
        usuario
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        pageUsuario: () => dispatch(pageUsuario())
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(DetalhesUsuario)