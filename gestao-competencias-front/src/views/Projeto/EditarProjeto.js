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
            novoMembros: [],
            entregas: [],
            novoEntregas: [],
            entregas_real: [],
        }

        this.props.projeto.projeto_detalhado.entregas.map( (entrega, index) => this.state.entregas.push(entrega.substr(0, 16)))
        this.props.projeto.projeto_detalhado.entregas.map( (entrega, index) => this.state.entregas_real.push(entrega.substr(0, 16)))
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

    adicionaEntrega = (event, index) => {
        var entregas_real = this.state.entregas_real
        for (var i = 0; i < entregas_real.length; i++) {
 
            if(entregas_real[i].substr(0,10) != event.target.value.substr(0,10)){
                entregas_real.push(event.target.value); 
                break;
            }
        }
        this.setState({ 
            entregas_real
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

    removeEntrega = (data) => {
        var entregas_realA = this.state.entregas_real
        var entregas_real = []
        var entregasA = this.state.entregas
        var entregas = []
        entregas_realA.map(entrega => entrega != data ? entregas_real.push(entrega) : entregas_real)
        entregasA.map(entrega => entrega != data ? entregas.push(entrega) : entregas)
        this.setState({ 
            entregas_real,
            entregas
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

    adicionaNovoEntrega = () => {
        var novoEntregas = []
        novoEntregas = this.state.novoEntregas        
        novoEntregas.push(0)
        this.setState({ 
            novoEntregas
        })
    }

    removeNovoEntrega = () => {
        var novoEntregas = this.state.novoEntregas
        novoEntregas.pop()
        this.setState({ 
            novoEntregas
        })
    }

    async componentDidMount(){

        await this.props.projeto.projeto_detalhado.equipe.map( membro => this.preencheMembros(membro._id))
    }


    render(props){

        const usuarios = this.props.usuario.usuarios.map( user => {
                var membros = []
                this.state.equipe.map(user => {
                    membros.push(user._id)
                })
                return(
                    (user.permissao == 1 && membros.indexOf(user._id)==-1 ) 
                        ? <option value={user._id}>{user.pessoa.nome}</option> 
                        : '' 
                )
        });

        const membrosNovo = this.state.novoMembros.map((m,index) => {
            var ind = index 
            return (
                <Form.Row>
                <Form.Control required onChange={value => this.adicionaMembro(value, ind)} style={{width:"80%", marginLeft:"0.5%", marginTop:"0.5em", marginRight:"0.5em"}} as="select" >
                    <option value="0">Selecione...</option>
                    {usuarios}
                </Form.Control>
                <Button className="mr-auto" variant="outline-danger" disabled style={{ marginTop:"0.5em", width:"3em"}}
                    onClick = { () => {}}>
                    <RiDeleteBin2Line />
                </Button>
            </Form.Row>
                )}
        );

        const membros = this.state.equipe.map(membro => 
            <Form.Row>
                <Form.Control required as="select" style={{width:"80%", marginLeft:"0.5%", marginTop:"0.5em", marginRight:"0.5em"}}>
                    <option value={membro._id}>{membro.pessoa.nome}</option>
                </Form.Control>
                <Button className="mr-auto" variant="outline-danger" style={{ marginTop:"0.5em", width:"3em"}}
                    onClick = { () => {this.removeMembro(membro._id)}}>
                    <RiDeleteBin2Line />
                </Button>
            </Form.Row>
        );

        const entregasNovo = this.state.novoEntregas.map((entrega, index) => {
            var ind = index 
            return (
                <Form.Row>
                <Form.Control required type="datetime-local" onChange={value => this.adicionaEntrega(value, ind)} style={{width:"80%", marginLeft:"0.5%", marginTop:"0.5em", marginRight:"0.5em"}} />
                <Button className="mr-auto" disabled variant="outline-danger" style={{ marginTop:"0.5em", width:"3em"}}
                    onClick = { () => {}}>
                    <RiDeleteBin2Line />
                </Button>
            </Form.Row>
                )}
        );
                
        const entregas = this.state.entregas.map((entrega, index) => 

            <Form.Row>
                <Form.Control required type="datetime-local" disabled value={entrega} style={{width:"80%", marginLeft:"0.5%", marginTop:"0.5em", marginRight:"0.5em"}} />
                <Button className="mr-auto" variant="outline-danger" style={{ marginTop:"0.5em", width:"3em"}}
                    onClick = { () => {this.removeEntrega(entrega)}}>
                    <RiDeleteBin2Line />
                </Button>
            </Form.Row>
        );
        
        return(
            
            <Container fluid>
                <Row>
                <p className="App-text-logo" style={{marginLeft:"1em", marginTop:"0.5em"}}>Projetos &gt; Editar</p>
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
                    <Button variant="outline-primary" style={{marginBottom:"0.5em", width:"40%", height:"20%"}} 
                        onClick={()=>{this.adicionaNovoMembro()}}>
                            Adicionar Membro
                    </Button>

                    <Button variant="outline-danger"  style={{marginBottom:"0.5em",width:"40%", height:"20%", marginLeft:"5%"}}
                        onClick={()=>{this.removeNovoMembro()}}>
                            Remover Membro                    
                    </Button>


                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Marcos do projeto</Form.Label>
                        {entregas}
                        {entregasNovo}
                        </Form.Group>
                    </Form.Row>
                    <Button variant="outline-primary" style={{marginBottom:"0.5em", width:"40%", height:"20%"}} 
                        onClick={()=>{this.adicionaNovoEntrega()}}>
                            Adicionar Entrega
                    </Button>

                    <Button variant="outline-danger"  style={{marginBottom:"0.5em",width:"40%", height:"20%", marginLeft:"5%"}}
                        onClick={()=>{this.removeNovoEntrega()}}>
                            Remover Entrega                    
                    </Button>
                        

                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control as="textarea" onChange={value => this.onChangeDescricao(value)} required placeholder="Sobre" value={this.state.descricao} />
                    </Form.Group>

                    <Button variant="primary" type="submit" 
                    onClick= { async ()  =>{
                        if(this.state.nome != "" && this.state.descricao != ""){
                        await this.props.atualizarProjeto({nome:this.state.nome, equipe:this.state.membros, descricao:this.state.descricao, entregas: this.state.entregas_real}, this.state.id_projeto)
                        await this.preencheEquipe()
                    }}}>
                        Salvar Projeto
                    </Button>
                    </Form>
            </Container>
          
        )
    }
}

const mapStateToProps = ({ adminView, usuario, projeto}) => {
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
        atualizarProjeto: (projeto, id_projeto) => dispatch(atualizarProjeto(projeto, id_projeto)),
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(CriarProjeto)

