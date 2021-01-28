import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from "react-bootstrap/Button"
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import DropdownButton from 'react-bootstrap/DropdownButton'

import { pageCadastrarCategoria, pageCadastrarSubCategoria, pageSubCategoria, 
    pageCadastrarProjeto, pageProjeto } from '../../store/actions/adminView/adminView'

import '../../styles/principal.css'
import { FaPlus } from 'react-icons/fa';
import { BsThreeDotsVertical } from "react-icons/bs";


const initialState = {
    membros : []
  }

class Categoria extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    handleSubmit(event){
        event.preventDefault()    
      }
    
    adicionaMembro = () => {
    var membros = this.state.membros
    membros.push(1)
    this.setState({ 
        membros
    })
    }
    removeMembro = () => {
    var membros = this.state.membros
    membros.pop()
    this.setState({ 
        membros
    })
    }


    render(props){
    //   if(!this.props.usuario.logado){
    //     return <Redirect to ="/"/>
    //   }
        const membros = this.state.membros.map(m=> <Form.Control required as="select" defaultValue="Choose...">
                                                        <option>Choose...</option>
                                                        <option>...</option>
                                                    </Form.Control>);

        return(
            
            <Container fluid>
                <Row>
                <p className="App-text-logo" style={{marginLeft:"1em", marginTop:"0.5em"}}>Criar Projeto</p>
                
                </Row>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control required placeholder="Nome do Projeto" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Equipe</Form.Label>
                        
                        <Form.Control required as="select" defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>...</option>
                            
                        </Form.Control>
                        {membros}
                        </Form.Group>
                    </Form.Row>
                    <Button variant="outline-primary" style={{marginBottom:"0.5em", width:"10em", height:"3em"}} onClick={()=>{this.adicionaMembro()}}>Adicionar Membro</Button>
                    <Button variant="outline-danger"  style={{marginBottom:"0.5em",width:"10em", height:"3em", marginLeft:"2em"}} onClick={()=>{this.removeMembro()}}>Remover Membro</Button>
                        


                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control as="textarea" placeholder="Sobre" />
                    </Form.Group>

                    

                    <Button variant="primary" type="submit">
                        Criar Projeto
                    </Button>
                    </Form>
            </Container>
          
        )
    }
}

const mapStateToProps = ({ adminView  }) => {
    return {
        adminView,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        pageCadastrarCategoria: () => dispatch(pageCadastrarCategoria()),
        pageCadastrarProjeto: () => dispatch(pageCadastrarProjeto()),
        pageCadastrarSubCategoria: () => dispatch(pageCadastrarSubCategoria()),
        pageProjeto: () => dispatch(pageProjeto()),
        pageSubCategoria: () => dispatch(pageSubCategoria()),
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Categoria)