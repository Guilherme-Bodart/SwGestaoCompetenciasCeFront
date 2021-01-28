import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from "react-bootstrap/Button"
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

import '../../styles/principal.css'
import { FaPlus } from 'react-icons/fa';

import { pageCadastrarCategoria, pageCadastrarSubCategoria, pageSubCategoria, 
    pageCadastrarProjeto, pageProjeto, pageDetalhesProjeto } from '../../store/actions/adminView/adminView'

const initialState = {
  }

class Projeto extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    render(props){
    //   if(!this.props.usuario.logado){
    //     return <Redirect to ="/"/>
    //   }
        return(
            
            <Container fluid>
                <Row>
                <p className="App-text-logo" style={{marginLeft:"1em", marginTop:"0.5em"}}>Projetos</p>
                <Button className="ml-auto" variant="outline-secondary" 
                style={{marginRight:"1em", marginTop:"1em", height:"3em", width:"3em" }}
                onClick={()=>{
                    this.props.pageCadastrarProjeto()
                }}>
                    <FaPlus/>
                </Button>
                </Row>
                <Table responsive style={{backgroundColor:"#ccc", height: "14em", textAlign: "center"}}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Ações</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Data Cadastro</th>
                            <th>Responsável pelo cadastro</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <DropdownButton variant="dark" id="dropdown-basic-button" title="..." style={{marginLeft:"1em", marginTop:"1em"}}>
                                <Dropdown.Item onClick={()=>{this.props.pageDetalhesProjeto()}}>Detalhes</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Editar</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Apagar</Dropdown.Item>
                            </DropdownButton>
                            <td>LEDS skills</td>
                            <td>projeto paulo</td>
                            <td>27/11/2019</td>
                            <td>Paulo Ricardo</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
          
        )
    }
}

const mapStateToProps = ({ adminView }) => {
    return {
        adminView
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
  export default connect(mapStateToProps, mapDispatchToProps)(Projeto)