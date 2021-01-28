import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from "react-bootstrap/Button"
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import DropdownButton from 'react-bootstrap/DropdownButton'

import { pageCadastrarCategoria, pageCadastrarSubCategoria, pageSubCategoria, 
    pageCadastrarProjeto, pageProjeto, pageDetalhesProjeto } from '../../store/actions/adminView/adminView'

import '../../styles/principal.css'
import { FaArrowLeft } from 'react-icons/fa';
import { BsThreeDotsVertical } from "react-icons/bs";


const initialState = {
    membros : []
  }

class DetalhesProjeto extends Component {
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

        return(
            
            <Container fluid>
                <Row>
                <p className="App-text-logo" style={{marginLeft:"1em", marginTop:"0.5em"}}>Detalhes Projeto</p>
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
                        <Form.Control readOnly value="LEDS skills" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control as="textarea" readOnly value="paulo gameplays" />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Data Cadastro</Form.Label>
                        <Form.Control readOnly value="21/01/2019" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Responsável pelo cadastro</Form.Label>
                        <Form.Control readOnly value="Paulo Ricardo" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Equipe</Form.Label>
                        <Table responsive style={{backgroundColor:"#ccc", textAlign: "center"}}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nome</th>
                                    <th>E-mail</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Brenno Milanezi</td>
                                    <td>milanezibrenno@gmail.com</td>
                                </tr>
                            </tbody>
                        </Table>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Atividades</Form.Label>
                        <Table responsive style={{backgroundColor:"#ccc", textAlign: "center"}}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Atividade</th>
                                    <th>Descrição</th>
                                    <th>Categoria</th>
                                    <th>SubCategoria</th>
                                    <th>Responsável</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Teste</td>
                                    <td>Testar criação de projeto</td>
                                    <td>Tester</td>
                                    <td>Teste de usuário</td>
                                    <td>Brenno Milanezi</td>
                                </tr>
                            </tbody>
                        </Table>
                        </Form.Group>
                    </Form.Row>

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
        pageDetalhesProjeto: () => dispatch(pageDetalhesProjeto()),
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(DetalhesProjeto)