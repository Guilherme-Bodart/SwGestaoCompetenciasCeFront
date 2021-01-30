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
import { RiDeleteBin2Line } from "react-icons/ri";


class CriarProjeto extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nome: this.props.projeto.projeto_detalhado.nome,
            descricao: this.props.projeto.projeto_detalhado.descricao,
            equipe: this.props.projeto.projeto_detalhado.equipe,
            membros: [],
            novoMembros: []
        }
    }

    handleSubmit(event){
        event.preventDefault()
    }

    onChangeNome = (event) => {
        this.setState({
            nome: event.target.value
        })
    }

    onChangeDescricao = (event) => {
        this.setState({
            descricao: event.target.value
        })
    }

    preencheMembros = (id) => {
        var membros = this.state.membros
        membros.push(id)
        this.setState({ 
            membros
        })
    }

    adicionaMembro = (event) => {
        var membros = this.state.membros
        membros.push(event.target.value)
        this.setState({ 
            membros
        })
    }

    removerMembros = (membros, id) => {
        var novoMembros = []
        membros.map(membro => membro==id ? novoMembros.push(membro) : novoMembros)
        return novoMembros
    }

    removerEquipe = (equipe, id) => {
        var novaEquipe = {}
        equipe.map()
    }
    
    removeMembro = (id) => {
        var membrosA = this.state.membros
        var membros = []
        var equipeA = this.state.equipe
        var equipe = []
        membrosA.map(membro => membro != id ? membros.push(membro) : membros)
        equipeA.map(membro => membro.pessoa._id != id ? equipe.push(membro) : equipe)
        this.setState({ 
            membros,
            equipe
        })
    }

    adicionaNovoMembro = () => {
        var novoMembro = []
        novoMembro = this.state.novoMembros
        novoMembro.push(1)
        this.setState({ 
            novoMembro
        })
    }
    
    removeNovoMembro = () => {
        var novoMembro = this.state.novoMembro
        if(novoMembro!=[]){
            var equipe = this.state.equipe
            equipe.pop()
        }
        novoMembro.pop()
        this.setState({ 
            novoMembro
        })
    }

    async componentDidMount(){
        await this.props.getUsuarios()
        await this.props.projeto.projeto_detalhado.equipe.map( membro => this.preencheMembros(membro.pessoa._id))
    }


    render(props){
        const usuarios = this.props.usuario.usuarios.map( user => (user.permissao == 1) 
                                                                    ? <option value={user._id}>{user.pessoa.nome}</option> 
                                                                    : '' );

        const membrosNovo = this.state.membros.map(m => <Form.Control style={{width:"95%"}} onChange={value => this.onChangeEquipe(value)} required as="select" >
                                                        <option value="0">Selecione...</option>
                                                        {usuarios}                                                        
                                                    </Form.Control>
        );
        const equipe = this.state.equipe.map(membro => 
                                                <Form.Row>
                                                    <Form.Control required as="select" style={{width:"95%", marginLeft:"0.5%"}}>
                                                        <option value={membro._id}>{membro.pessoa.nome}</option>
                                                    </Form.Control>
                                                    <Button className="ml-auto" variant="outline-danger" 
                                                        onClick = { () => {this.removeMembro(membro)}}>
                                                        <RiDeleteBin2Line />
                                                    </Button>
                                                </Form.Row>
        );
        return(
            
            <Container fluid>
                <Alerta open= {true} alertTitle= {this.props.alerta.alertTitle} severity= {this.props.alerta.severity} texto= {this.props.alerta.texto}/>
                <Row>
                <p className="App-text-logo" style={{marginLeft:"1em", marginTop:"0.5em"}}>Editar Projeto</p>
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
                        <Form.Control required onChange={value => this.onChangeNome(value)} value={this.state.nome}/>
                        
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Equipe</Form.Label>
                        {equipe}
                        <Form.Control required as="select" style={{width:"95%"}}>
                            <option value={0}>teste</option>
                            
                        </Form.Control>
                        
                        </Form.Group>
                    </Form.Row>
                    <Button variant="outline-primary" style={{marginBottom:"0.5em", width:"10em", height:"3em"}} 
                        onClick={()=>{this.adicionaNovoMembro()}}>
                            Adicionar Membro
                    </Button>

                    <Button variant="outline-danger"  style={{marginBottom:"0.5em",width:"10em", height:"3em", marginLeft:"2em"}}
                        onClick={()=>{this.removeMembro()}}>
                            Remover Membro                    
                    </Button>
                        


                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control as="textarea" onChange={value => this.onChangeDescricao(value)} required placeholder="Sobre" value={this.state.descricao} />
                    </Form.Group>

                    

                    <Button variant="primary" type="submit" 
                    onClick= { async ()  =>{
                        alert("EDITAR PROJETO")
                    }}>
                        Editar Projeto
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