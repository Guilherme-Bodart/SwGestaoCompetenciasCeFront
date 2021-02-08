import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from "react-bootstrap/Button"
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import DropdownButton from 'react-bootstrap/DropdownButton'

import '../../styles/principal.css'
import { FaArrowLeft } from 'react-icons/fa';
import { BsThreeDotsVertical } from "react-icons/bs";


import { criarCategoria } from '../../store/actions/categorias/categoria'
import { pageCadastrarSubCategoria, pageCategoria } from '../../store/actions/adminViews/adminView'


const initialState = {
  }

class CriarCategoria extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
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
    //   if(!this.props.usuario.logado){
    //     return <Redirect to ="/"/>
    //   }
        return(            
            <Container fluid>
                
                <Row>
                <p className="App-text-logo" style={{marginLeft:"1em", marginTop:"0.5em"}}>Categorias &gt; Cadastrar</p>
                <Button className="ml-auto" variant="outline-secondary" 
                style={{marginRight:"1em", marginTop:"1em", height:"3em", width:"3em" }}
                onClick={()=>{
                    this.props.pageCategoria()
                }}>
                    <FaArrowLeft/>
                </Button> 
                </Row>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control required onChange = {value => this.onChangeCategoria(value)} placeholder="Nome da categoria" />
                        </Form.Group>
                    </Form.Row>

                    <Button variant="primary" type="submit"
                     onClick={()=>{
                        this.props.criarCategoria(this.state.categoria)
                    }}>
                        Cadastrar Categoria
                    </Button>
                    </Form>
            </Container>
          
        )
    }
}

const mapStateToProps = ({ adminView, alerta }) => {
    return {
        adminView,
        alerta
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        pageCategoria: () => dispatch(pageCategoria()),
        criarCategoria: categoria => dispatch(criarCategoria(categoria)),
        pageCadastrarSubCategoria: () => dispatch(pageCadastrarSubCategoria()),
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(CriarCategoria)