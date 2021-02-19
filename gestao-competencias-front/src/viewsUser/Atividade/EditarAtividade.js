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
import { getUsuarios } from '../../store/actions/usuarios/usuario'
import { editarAtividade } from '../../store/actions/atividades/atividade'

import '../../styles/principal.css'
import { FaArrowLeft } from 'react-icons/fa';
import { BsThreeDotsVertical } from "react-icons/bs";


const initialState = {
    titulo: '',
    descricao: '',
    dataInicial : '',
    dataFinal: '',
    categoria: 0,
    subcategoria: 0
}

class EditarAtividade extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
        this.state.titulo = this.props.atividade.atividade_detalhado.titulo
        this.state.descricao = this.props.atividade.atividade_detalhado.descricao
        this.state.dataInicial = this.props.atividade.atividade_detalhado.dataInicial.substr(0, 16)
        this.state.dataFinal = this.props.atividade.atividade_detalhado.dataFinal.substr(0, 16)
        this.state.categoria = this.props.atividade.atividade_detalhado.categoria._id
        this.state.subcategoria = this.props.atividade.atividade_detalhado.subcategoria._id
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
        await this.props.getUsuarios()
        await this.props.getCategorias()
        await this.props.getSubCategoriasExp(this.state.categoria)
    }

    handleSubmit(event){
        event.preventDefault()    
    }

    render(props){
        
        const categorias = this.props.categoria.categorias.map( categoria => {
            if(categoria._id == this.props.atividade.atividade_detalhado.categoria._id){
                return <option selected value={categoria._id} >
                    {categoria.nome}
                </option>
            }else{
                return <option value={categoria._id} >
                    {categoria.nome}
                </option>
            }
        });

        const subcategorias = this.props.categoria.subcategorias.map( subcategoria => {
            if(subcategoria._id == this.props.atividade.atividade_detalhado.subcategoria._id){
                return <option value={subcategoria._id} selected>
                    {subcategoria.nome}
                </option>
            }else{
                return <option value={subcategoria._id} >
                    {subcategoria.nome}
                </option>
            }
        });

        return(
            
            <Container fluid>
                <Row>
                <p className="App-text-logo" style={{marginLeft:"1em", marginTop:"0.5em"}}>Atividades &gt; Editar</p>
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
                        <Form.Group as={Col} >
                        <Form.Label>Título</Form.Label>
                        <Form.Control value={this.state.titulo} required onChange={value => this.onChangeTitulo(value)} placeholder="Título da Atividade" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group >
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control value={this.state.descricao} as="textarea" onChange={value => this.onChangeDescricao(value)} placeholder="Atividade" required/>
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
                        <Form.Control required onChange={value => this.onChangeSubcategoria(value)} as="select">
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
                            <Form.Control value={this.state.dataInicial} type="datetime-local" onChange={value => this.onChangeDataInicio(value)} required />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Col}>
                            <Form.Label>Data Fim</Form.Label>
                            <Form.Control value={this.state.dataFinal} type="datetime-local" onChange = {value => this.onChangeDataFim(value)} required />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Col>
                    <Button variant="primary" onClick= { async ()  =>{
                        if(this.state.dataFinal > this.state.dataInicial){
                            await this.props.editarAtividade({id:this.props.atividade.atividade_detalhado._id, titulo:this.state.titulo, descricao:this.state.descricao, 
                                categoria: this.state.categoria, subcategoria: this.state.subcategoria, dataInicial: this.state.dataInicial, dataFinal: this.state.dataFinal })
                        }
                        else{
                            swal({
                                title: "Error",
                                text: 'Falha na edição da atividade,  A data final não pode ser menor que a data inicial',
                                icon: "error",
                              });
                            }
                        }}>
                        Salvar Atividade
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
        getUsuarios: () => dispatch(getUsuarios()),
        getCategorias: () => dispatch(getCategorias()),
        editarAtividade: atividade => dispatch(editarAtividade(atividade)),
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(EditarAtividade)