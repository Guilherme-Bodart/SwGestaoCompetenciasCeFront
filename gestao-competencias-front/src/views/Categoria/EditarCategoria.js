import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from "react-bootstrap/Button"
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import { pageCadastrarSubCategoria, pageSubCategoria, 
         pageProjeto, pageCategoria } from '../../store/actions/adminViews/adminView'

import { editarCategoria } from '../../store/actions/categorias/categoria'

import '../../styles/principal.css'
import { FaArrowLeft } from 'react-icons/fa';

const initialState = {

    categoria: '',

}

class EditarCategoria extends Component {

    constructor(props) {
        super(props)
        this.state = initialState
        this.state.categoria = this.props.categoria.getCategoria.nome
    }

    onChangeCategoria = (event) => {
        this.setState({
            categoria: event.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault()    
    }

    render(props){

        return(
            
            <Container fluid>
                <Row>
                <p className="App-text-logo" style={{marginLeft:"1em", marginTop:"0.5em"}}>Categorias &gt; Editar</p>
                <Button className="ml-auto" variant="outline-secondary" 
                style={{marginRight:"1em", marginTop:"1em", height:"3em", width:"3em" }}
                onClick={()=>{
                    this.props.pageCategoria()
                }}>
                    <FaArrowLeft/>
                </Button>
                </Row>
                <Form className="App-form" onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control value={this.state.categoria} onChange={value => this.onChangeCategoria(value)} required />
                        </Form.Group>
                    </Form.Row>

                    <Button variant="primary" type="submit" onClick= { async ()  =>{
              
                                if(this.state.subcategoria != '' && this.state.categoria != 0){
                                    await this.props.editarCategoria({id: this.props.categoria.getCategoria._id, nome:this.state.categoria})
                                }
                            }}>
                        Salvar Categoria
                    </Button>
                    </Form>
            </Container>
          
        )
    }
}

const mapStateToProps = ({ adminView, categoria }) => {
    return {
        adminView,
        categoria
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        pageCategoria: () => dispatch(pageCategoria()),
        pageCadastrarSubCategoria: () => dispatch(pageCadastrarSubCategoria()),
        pageProjeto: () => dispatch(pageProjeto()),
        pageSubCategoria: () => dispatch(pageSubCategoria()),
        editarCategoria: categoria => dispatch(editarCategoria(categoria))
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(EditarCategoria)