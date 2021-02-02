import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from "react-bootstrap/Button"
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import DropdownButton from 'react-bootstrap/DropdownButton'

import { pageAtividade } from '../../store/actions/userViews/userView'
import Alerta from "../../components/Alerta/Alerta"
import { editarAtividade } from '../../store/actions/atividades/atividade'

import '../../styles/principal.css'
import { FaArrowLeft } from 'react-icons/fa';
import { BsThreeDotsVertical } from "react-icons/bs";

const initialState = {
    titulo: '',
}

class EditarAtividade extends Component {

    constructor(props) {
        super(props)
        this.state = initialState
        this.state.titulo = this.props.atividade.atividade_detalhado.titulo
    }

    onChangeNome = (event) => {
        this.setState({
            nome: event.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault()    
    }

    render(props){

        const tipo_atividade = this.state.tipo_atividades.map((u, index) => {
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
                <Alerta open= {true} alertTitle= {this.props.alerta.alertTitle} severity= {this.props.alerta.severity} texto= {this.props.alerta.texto}/>
                <Row>
                <p className="App-text-logo" style={{marginLeft:"1em", marginTop:"0.5em"}}>Editar Usuário</p>
                <Button className="ml-auto" variant="outline-secondary" 
                style={{marginRight:"1em", marginTop:"1em", height:"3em", width:"3em" }}
                onClick={()=>{
                    this.props.pageAtividade()
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
                            <Form.Control value={this.state.dataNascimento} type="date" onChange = {value => this.onChangeDataNascimento(value)} required />
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
                                {tipo_atividade}
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
                                     if(this.state.nome != '' && this.state.dataNascimento != '' && this.state.email != '' && idx != -1 
                                     && this.state.senha != '' && this.state.cpf != ''){
                                        await this.props.editarAtividade({id: this.props.atividade.getAtividade._id, nome:this.state.nome, email:this.state.email, 
                                            dataNascimento:this.state.dataNascimento, 
                                            telefone:this.state.telefone, endereco:this.state.endereco, 
                                            cpf:this.state.cpf, permissao:this.state.permissao})
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

const mapStateToProps = ({ userView, alerta, atividade }) => {
    return {
        userView,
        alerta,
        atividade
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        pageAtividade: () => dispatch(pageAtividade()),
        editarAtividade: atividade => dispatch(editarAtividade(atividade))
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(EditarAtividade)