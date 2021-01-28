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
import Alerta from "../../components/Alerta/Alerta"
import { getCategorias } from '../../store/actions/categorias/categoria'

import '../../styles/principal.css'
import { FaArrowLeft } from 'react-icons/fa';
import { BsThreeDotsVertical } from "react-icons/bs";

const initialState = {
  }

class CriarSubCategoria extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    handleSubmit(event){
        event.preventDefault()    
    }

    async componentDidMount(){
        await this.props.getCategorias()
    }

    render(props){
    //   if(!this.props.usuario.logado){
    //     return <Redirect to ="/"/>
    //   }
    const categorias = this.props.categoria.categorias.map( categoria => <option value={categoria._id}>{categoria.nome}</option>);

        return(
            
            <Container fluid>
                <Row>
                <p className="App-text-logo" style={{marginLeft:"1em", marginTop:"0.5em"}}>Criar SubCategoria</p>
                <Button className="ml-auto" variant="outline-secondary" 
                style={{marginRight:"1em", marginTop:"1em", height:"3em", width:"3em" }}
                onClick={()=>{
                    this.props.pageSubCategoria()
                }}>
                    <FaArrowLeft/>
                </Button>
                </Row>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control placeholder="Nome da Subcategoria" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control onChange={(e)=>alert(JSON.stringify(e.target.value))} as="select" defaultValue="0">
                            <option value="0">Selecione...</option>
                            {categorias}
                        </Form.Control>
                        </Form.Group>

                        <Button 
                            onClick={()=>{
                                this.props.pageCadastrarCategoria()
                            }}>
                            Criar Categoria
                        </Button>
                    </Form.Row>

                    <Button variant="primary" type="submit">
                        Criar SubCategoria
                    </Button>
                    </Form>
            </Container>
          
        )
    }
}

const mapStateToProps = ({ adminView, alerta, categoria }) => {
    return {
        adminView,
        alerta,
        categoria
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        pageCadastrarCategoria: () => dispatch(pageCadastrarCategoria()),
        pageCadastrarProjeto: () => dispatch(pageCadastrarProjeto()),
        pageCadastrarSubCategoria: () => dispatch(pageCadastrarSubCategoria()),
        pageProjeto: () => dispatch(pageProjeto()),
        pageSubCategoria: () => dispatch(pageSubCategoria()),
        getCategorias: () => dispatch(getCategorias()),
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(CriarSubCategoria)