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
import { atualizarProjeto } from '../../store/actions/projetos/projeto'

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
            id_projeto: this.props.projeto.projeto_detalhado._id,
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

    preencheEquipe = () => {
        var equipe = this.props.projeto.projeto_detalhado.equipe
        this.setState({ 
            equipe
        })
    }

    preencheMembros = (id) => {
        var membros = this.state.membros
        membros.push(id)
        this.setState({ 
            membros
        })
    }

    adicionaMembro = (event, index) => {
        var membros = []
        var membrosA = this.state.membros
        var membrosB = this.state.novoMembros
        index = index + membrosA.length - membrosB.length
        membrosA.map((membro, pos) => {
            if(index!=pos){
                membros.push(membro)
            }
            else{
                membros.push(event.target.value)
            }
        })        
        this.setState({ 
            membros
        })
    }
   
    removeMembro = (id) => {
        var membrosA = this.state.membros
        var membros = []
        var equipeA = this.state.equipe
        var equipe = []
        membrosA.map(membro => membro != id ? membros.push(membro) : membros)
        equipeA.map(membro => membro._id != id ? equipe.push(membro) : equipe)
        this.setState({ 
            membros,
            equipe
        })
    }

    adicionaNovoMembro = () => {
        var novoMembros = []
        var membros = []
        novoMembros = this.state.novoMembros        
        membros = this.state.membros
        novoMembros.push(0)
        membros.push(0)
        
        this.setState({ 
            novoMembros,
            membros
        })
    }
    
    removeNovoMembro = () => {
        var novoMembros = this.state.novoMembros
        if(novoMembros!=[]){
            var membros = this.state.membros
            membros.pop()
        }
        novoMembros.pop()
        this.setState({ 
            novoMembros,
            membros
        })
    }

    async componentDidMount(){
        await this.props.getUsuarios()
        await this.props.projeto.projeto_detalhado.equipe.map( membro => this.preencheMembros(membro._id))
    }


    render(props){
        // var usuariosNaoSelecionados = [] tirar os usuarios já selecionados
        // this.props.usuario.usuarios.map( user => this.state.membros.map( membro => (membro==user._id ? usuariosNaoSelecionados.push(user.pessoa.nome)))
        const usuarios = this.props.usuario.usuarios.map( user => (user.permissao == 1 && user._id ) 
                                                                    ? <option value={user._id}>{user.pessoa.nome}</option> 
                                                                    : '' 
        );
        
        const membrosNovo = this.state.novoMembros.map((m,index) => {
                                                    var ind = index 
                                                    return (
                                                        <Form.Control required onChange={value => this.adicionaMembro(value, ind)} as="select" >
                                                            <option value="0">Selecione...</option>
                                                            {usuarios}
                                                        </Form.Control>)}
        );

        const membros = this.state.equipe.map(membro => 
                                                <Form.Row>
                                                    <Form.Control required as="select" style={{width:"95%", marginLeft:"0.5%"}}>
                                                        <option value={membro._id}>{membro.pessoa.nome}</option>
                                                    </Form.Control>
                                                    <Button className="ml-auto" variant="outline-danger" 
                                                        onClick = { () => {this.removeMembro(membro._id)}}>
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
                        {membros}
                        {membrosNovo}
                                                    
                        </Form.Group>
                    </Form.Row>
                    <Button variant="outline-primary" style={{marginBottom:"0.5em", width:"10em", height:"3em"}} 
                        onClick={()=>{this.adicionaNovoMembro()}}>
                            Adicionar Membro
                    </Button>

                    <Button variant="outline-danger"  style={{marginBottom:"0.5em",width:"10em", height:"3em", marginLeft:"2em"}}
                        onClick={()=>{this.removeNovoMembro()}}>
                            Remover Membro                    
                    </Button>
                        


                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control as="textarea" onChange={value => this.onChangeDescricao(value)} required placeholder="Sobre" value={this.state.descricao} />
                    </Form.Group>

                    <Button variant="primary" type="submit" 
                    onClick= { async ()  =>{
                        await this.props.atualizarProjeto({nome:this.state.nome, equipe:this.state.membros, descricao:this.state.descricao}, this.state.id_projeto)
                        await this.preencheEquipe()
                    }}>
                        Salvar Projeto
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
        atualizarProjeto: (projeto, id_projeto) => dispatch(atualizarProjeto(projeto, id_projeto)),
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(CriarProjeto)