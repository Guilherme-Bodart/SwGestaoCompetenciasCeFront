import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from "react-bootstrap/Button"
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col' 
import DropdownButton from 'react-bootstrap/DropdownButton'

import { pageCadastrarCategoria, pageCadastrarSubCategoria, pageSubCategoria, 
    pageCadastrarProjeto, pageProjeto } from '../../store/actions/adminViews/adminView'

import { getUsuarios } from '../../store/actions/usuarios/usuario'
import { criarProjeto } from '../../store/actions/projetos/projeto'

import Alerta from "../../components/Alerta/Alerta"
import '../../styles/principal.css'
import { FaArrowLeft } from 'react-icons/fa';
import { BsThreeDotsVertical } from "react-icons/bs";


const initialState = {
    nome: '',
    descricao: '',
    membros : [],
    equipe: []
}

class CriarProjeto extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    handleSubmit(event){
        event.preventDefault()    
      }
    
    onChangeNome = (event) => {
        this.setState({
            nome: event.target.value
        })
    }

    onChangeEquipe = (event) => {
        var equipe = this.state.equipe
        equipe.push(event.target.value)
        this.setState({ 
            equipe
        })
    }

    onChangeDescricao = (event) => {
        this.setState({
            descricao: event.target.value
        })
    }

    adicionaMembro = () => {
        var membros = this.state.membros
        membros.push(1)
        this.setState({ 
            membros
        })
    }
    removeMembro = () => {
        var membros = this.state.membros
        var equipe = this.state.equipe
        membros.pop()
        equipe.pop()
        this.setState({ 
            membros
        })
    }

    async componentDidMount(){
        await this.props.getUsuarios()
    }


    render(props){

        const usuarios = this.props.usuario.usuarios.map( user => <option value={user._id}>{user.pessoa.nome}</option>);

        const membros = this.state.membros.map(m => <Form.Control onChange={value => this.onChangeEquipe(value)} required as="select" defaultValue="0">
                                                        <option value="0">Selecione...</option>
                                                        {usuarios}
                                                    </Form.Control>);

        return(
            
            <Container fluid>
                <Alerta open= {true} alertTitle= {this.props.alerta.alertTitle} severity= {this.props.alerta.severity} texto= {this.props.alerta.texto}/>
                <Row>
                <p className="App-text-logo" style={{marginLeft:"1em", marginTop:"0.5em"}}>Criar Projeto</p>
                <Button className="ml-auto" variant="outline-secondary" 
                style={{marginRight:"1em", marginTop:"1em", height:"3em", width:"3em" }}
                onClick={()=>{
                    this.props.pageProjeto()
                }}>
                    <FaArrowLeft/>
                </Button>
                </Row>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control required onChange={value => this.onChangeNome(value)} placeholder="Nome do Projeto" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Equipe</Form.Label>
                        <Form.Control required onChange={value => this.onChangeEquipe(value)} as="select" defaultValue="0">
                            <option value="0">Selecione...</option>
                            {usuarios}
                        </Form.Control>
                        {membros}
                        </Form.Group>
                    </Form.Row>
                    <Button variant="outline-primary" style={{marginBottom:"0.5em", width:"10em", height:"3em"}} onClick={()=>{this.adicionaMembro()}}>Adicionar Membro</Button>
                    <Button variant="outline-danger"  style={{marginBottom:"0.5em",width:"10em", height:"3em", marginLeft:"2em"}} onClick={()=>{this.removeMembro()}}>Remover Membro</Button>
                        


                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control as="textarea" onChange={value => this.onChangeDescricao(value)} required placeholder="Sobre" />
                    </Form.Group>

                    

                    <Button variant="primary" type="submit" onClick= { async ()  =>{
                        await this.props.criarProjeto({nome:this.state.nome, equipe:this.state.equipe, descricao:this.state.descricao})
                        }}>
                        Criar Projeto
                    </Button>
                    </Form>
            </Container>
          
        )
    }
}

const mapStateToProps = ({ adminView, usuario, projeto, alerta }) => {
    return {
        adminView,
        usuario, 
        projeto,
        alerta
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        pageCadastrarCategoria: () => dispatch(pageCadastrarCategoria()),
        pageCadastrarProjeto: () => dispatch(pageCadastrarProjeto()),
        pageCadastrarSubCategoria: () => dispatch(pageCadastrarSubCategoria()),
        pageProjeto: () => dispatch(pageProjeto()),
        pageSubCategoria: () => dispatch(pageSubCategoria()),
        getUsuarios: () => dispatch(getUsuarios()),
        criarProjeto: projeto => dispatch(criarProjeto(projeto)),
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(CriarProjeto)