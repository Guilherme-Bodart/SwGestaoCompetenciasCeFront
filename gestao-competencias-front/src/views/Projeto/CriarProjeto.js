import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from "react-bootstrap/Button"
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col' 

import { pageCadastrarCategoria, pageCadastrarSubCategoria, pageSubCategoria, 
    pageCadastrarProjeto, pageProjeto } from '../../store/actions/adminViews/adminView'

import { getUsuarios } from '../../store/actions/usuarios/usuario'
import { criarProjeto } from '../../store/actions/projetos/projeto'


import '../../styles/principal.css'
import { FaArrowLeft } from 'react-icons/fa';


const initialState = {
    nome: '',
    descricao: '',
    membros : [],
    equipe: [],
    entregas: [],
    entregaAux: []
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

    onChangeEquipe = (event, index) => {
        var equipe = []
        var equipeA = this.state.equipe
        equipeA.map((membro, pos) => index != pos ? equipe.push(membro) : equipe)
        equipe.push(event.target.value)
        this.setState({ 
            equipe
        })
    }

    onChangeEntregas = (event, index) => {
        var entregas = []
        var entregasA = this.state.entregas
        entregasA.map((entrega, pos) => index != pos ? entregas.push(entrega) : entregas)
        entregas.push(event.target.value)
        this.setState({ 
            entregas
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
            membros,

        })
    }
    
    removeMembro = () => {
        var membros = this.state.membros
        var equipe = this.state.equipe
        membros.pop()
        equipe.pop()
        this.setState({ 
            membros,
            equipe,
        })
    }

    adicionaEntrega = () => {
        var entregaAux = this.state.entregaAux
        entregaAux.push(1)
        this.setState({
            entregaAux,

        })
    }

    removeEntrega = () => {
        var entregaAux = this.state.entregaAux
        var equipe = this.state.equipe
        entregaAux.pop()
        equipe.pop()
        this.setState({ 
            entregaAux,
            equipe,
        })
    }
    async componentDidMount(){
        await this.props.getUsuarios()
    }


    render(props){
        const usuarios = this.props.usuario.usuarios.map( user => (user.permissao == 1) ? <option value={user._id}>{user.pessoa.nome}</option> : '' );

        const membros = this.state.membros.map((m, index) => {
                            var ind = index + 1
                            return(
                            <Form.Control onChange={value => this.onChangeEquipe(value, ind)} required as="select" style={{ marginTop:"0.5em", marginRight:"0.5em"}}>
                                <option value="0">Selecione...</option>
                                {usuarios}
                            </Form.Control>)
                            })

        const entregas = this.state.entregaAux.map((m, index) => {
                            var ind = index + 1
                            return(
                                <Form.Control type="datetime-local" style={{marginTop:"0.5em", marginRight:"0.5em"}} onChange={value => this.onChangeEntregas(value, ind)} required />)
                            })
        return(
            
            <Container fluid>
                
                <Row>
                    <p className="App-text-logo" style={{marginLeft:"1em", marginTop:"0.5em"}}>Projetos &gt; Cadastrar</p>
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
                        <Form.Control required
                        onChange={value => this.onChangeEquipe(value, 0)} 
                            as="select">
                            <option value="0" >Selecione...</option>
                            {usuarios}
                        </Form.Control>
                        {membros}
                        </Form.Group>
                    </Form.Row>
                    <Button variant="outline-primary" style={{marginBottom:"0.5em", width:"40%", height:"20%"}} onClick={()=>{this.adicionaMembro()}}>Adicionar Membro</Button>
                    <Button variant="outline-danger"  style={{marginBottom:"0.5em", width:"40%", height:"20%", marginLeft:"2em"}} onClick={()=>{this.removeMembro()}}>Remover Membro</Button>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Marcos do projeto</Form.Label>
                        <Form.Control type="datetime-local" onChange={value => this.onChangeEntregas(value, 0)} required style={{marginTop:"0.5em", marginRight:"0.5em"}}/>
                        {entregas}
                        </Form.Group>
                    </Form.Row>
                    <Button variant="outline-primary" style={{marginBottom:"0.5em", width:"40%", height:"20%"}} 
                    onClick={()=>{this.adicionaEntrega()}}>Adicionar Entrega</Button>
                    <Button variant="outline-danger"  style={{marginBottom:"0.5em", width:"40%", height:"20%", marginLeft:"2em"}} 
                    onClick={()=>{this.removeEntrega()}}>Remover Entrega</Button>
                         


                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control as="textarea" onChange={value => this.onChangeDescricao(value)} placeholder="Sobre" required/>
                    </Form.Group>

                    

                    <Button variant="primary" onClick= { async ()  =>{
                        
                        await this.props.criarProjeto({nome:this.state.nome, equipe:this.state.equipe, descricao:this.state.descricao, entregas:this.state.entregas})
                        }}>
                        Cadastrar Projeto
                    </Button>
                    </Form>
            </Container>
          
        )
    }
}

const mapStateToProps = ({ adminView, usuario, projeto }) => {
    return {
        adminView,
        usuario, 
        projeto,
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