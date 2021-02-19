import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from "react-bootstrap/Button"
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col' 
import swal from 'sweetalert';

import { pageCadastrarCategoria, pageCadastrarSubCategoria, pageSubCategoria, 
    pageCadastrarAtividade, pageAtividade } from '../../store/actions/userViews/userView'

import { getCategorias, getSubCategoriasExp } from '../../store/actions/categorias/categoria'
import { getAlunoProjetos } from '../../store/actions/projetos/projeto'
import { getUsuarios } from '../../store/actions/usuarios/usuario'
import { cadastrarAtividade } from '../../store/actions/atividades/atividade'


import '../../styles/principal.css'
import { FaArrowLeft } from 'react-icons/fa';


const initialState = {
    titulo: '',
    descricao: '',
    dataInicial : '',
    dataFinal: '',
    categoria: 0,
    subcategoria: 0,
    projeto: 0
}

class CadastrarAtividade extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    onChangeProjeto = (event) => {
        this.setState({
            projeto: event.target.value
        })
    }
    
    onChangeTitulo = (event) => {
        this.setState({
            titulo: event.target.value
        })
    }

    onChangeDescricao = (event) => {
        this.setState({
            descricao: event.target.value
        })
    }

    onChangeCategoria = (event) => {

        this.setState({
            categoria: event.target.value
        })

        if(event.target.value != 0){
            this.props.getSubCategoriasExp(event.target.value)
        }
    }

    onChangeSubcategoria = (event) => {
        this.setState({
            subcategoria: event.target.value
        })
    }

    onChangeDataInicio = (event) => {
        this.setState({
            dataInicial: event.target.value
        })
    }

    onChangeDataFim = (event) => {
        this.setState({
            dataFinal: event.target.value
        })
    }

    async componentDidMount(){
        await this.props.getAlunoProjetos()
        await this.props.getUsuarios()
        await this.props.getCategorias()
    }

    handleSubmit(event){
        event.preventDefault()    
    }

    render(props){

        const categorias = this.props.categoria.categorias.map( categoria => <option value={categoria._id}>{categoria.nome}</option>);

        const projetos = this.props.projeto.projetos.map( projeto => <option value={projeto.projeto._id}>{projeto.projeto.nome}</option>);

        const subcategorias = this.props.categoria.subcategorias.map(subcategoria => <option value={subcategoria._id}>{subcategoria.nome}</option>)

        return(
            
            <Container fluid>
                <Row>
                <p className="App-text-logo" style={{marginLeft:"1em", marginTop:"0.5em"}}>Atividades &gt; Cadastrar</p>
                <Button className="ml-auto" variant="outline-secondary" 
                style={{marginRight:"1em", marginTop:"1em", height:"3em", width:"3em" }}
                onClick={()=>{
                    this.props.pageAtividade()
                }}>
                    <FaArrowLeft/>
                </Button>
                </Row>
                <Form onSubmit={this.handleSubmit}>
                    <Col>
                    <Form.Row>  
                        <Form.Group as={Col}>
                        <Form.Label>Projeto</Form.Label>
                        <Form.Control required onChange={value => this.onChangeProjeto(value)} as="select" defaultValue="0">
                            <option value="0">Selecione...</option>
                            {projetos}
                        </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} >
                        <Form.Label>Título</Form.Label>
                        <Form.Control required onChange={value => this.onChangeTitulo(value)} placeholder="Título da Atividade" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group >
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control as="textarea" onChange={value => this.onChangeDescricao(value)} placeholder="Atividade" required/>
                    </Form.Group>
 
                    <Form.Row>  
                        <Form.Group as={Col}>
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control required onChange={value => this.onChangeCategoria(value)} as="select">
                            <option value="0">Selecione...</option>
                            {categorias}
                        </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>  
                        <Form.Group as={Col}>
                        <Form.Label>SubCategoria</Form.Label>
                        <Form.Control required onChange={value => this.onChangeSubcategoria(value)} as="select" >
                            <option value="0">Selecione...</option>
                            {subcategorias}
                        </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    </Col>
                    <Form.Row>
                        <Col>
                            <Form.Group as={Col}>
                            <Form.Label>Data Início</Form.Label>
                            <Form.Control type="datetime-local" onChange={value => this.onChangeDataInicio(value)} required />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Col}>
                            <Form.Label>Data Fim</Form.Label>
                            <Form.Control type="datetime-local" onChange = {value => this.onChangeDataFim(value)} required />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Col>
                    <Button variant="primary" onClick= { async ()  =>{
                        if(this.state.dataFinal > this.state.dataInicial){
                            await this.props.cadastrarAtividade({titulo:this.state.titulo, descricao:this.state.descricao, 
                                projeto: this.state.projeto, categoria: this.state.categoria, 
                                subcategoria: this.state.subcategoria, dataInicial: this.state.dataInicial, dataFinal: this.state.dataFinal })
                        }
                        else{
                            swal({
                                title: "Error",
                                text: 'Falha na inclusão da atividade,  A data final não pode ser menor que a data inicial',
                                icon: "error",
                              });
                            }
                        }}>
                        Cadastrar Atividade
                    </Button>
                    </Col>
                    </Form>
            </Container>
          
        )
    }
}

const mapStateToProps = ({ userView, usuario, atividade, categoria, projeto }) => {
    return {
        userView,
        usuario, 
        atividade,
        projeto,
        categoria
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        pageCadastrarCategoria: () => dispatch(pageCadastrarCategoria()),
        pageCadastrarAtividade: () => dispatch(pageCadastrarAtividade()),
        pageCadastrarSubCategoria: () => dispatch(pageCadastrarSubCategoria()),
        pageAtividade: () => dispatch(pageAtividade()),
        pageSubCategoria: () => dispatch(pageSubCategoria()),
        getSubCategoriasExp: (id_categoria) => dispatch(getSubCategoriasExp(id_categoria)),
        getAlunoProjetos: () => dispatch(getAlunoProjetos()),
        getUsuarios: () => dispatch(getUsuarios()),
        getCategorias: () => dispatch(getCategorias()),
        cadastrarAtividade: atividade => dispatch(cadastrarAtividade(atividade)),
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(CadastrarAtividade)