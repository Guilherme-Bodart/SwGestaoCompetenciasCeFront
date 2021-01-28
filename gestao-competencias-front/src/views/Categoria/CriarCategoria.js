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

import Alerta from "../../components/Alerta/Alerta"
import { criarCategoria } from '../../store/actions/categorias/categoria'
import { pageCadastrarSubCategoria } from '../../store/actions/adminViews/adminView'


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
                <Alerta open= {true} alertTitle= {this.props.alerta.alertTitle} severity= {this.props.alerta.severity} texto= {this.props.alerta.texto}/>
                <Row>
                <p className="App-text-logo" style={{marginLeft:"1em", marginTop:"0.5em"}}>Criar Categoria</p>
                <Button className="ml-auto" variant="outline-secondary" 
                style={{marginRight:"1em", marginTop:"1em", height:"3em", width:"3em" }}
                onClick={()=>{
                    this.props.pageCadastrarSubCategoria()
                }}>
                    <FaArrowLeft/>
                </Button> 
                </Row>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control onChange = {value => this.onChangeCategoria(value)} required placeholder="Nome da categoria" />
                        </Form.Group>
                    </Form.Row>

                    <Button variant="primary" type="submit"
                     onClick={()=>{
                        this.props.criarCategoria(this.state.categoria)
                    }}>
                        Criar Categoria
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
        criarCategoria: categoria => dispatch(criarCategoria(categoria)),
        pageCadastrarSubCategoria: () => dispatch(pageCadastrarSubCategoria()),
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(CriarCategoria)