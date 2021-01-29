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
    pageCadastrarProjeto, pageProjeto, pageDetalhesProjeto, pageEditarProjeto } from '../../store/actions/adminViews/adminView'

import { getProjetos, getProjeto } from '../../store/actions/projetos/projeto'

const initialState = {
  }

class Projeto extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    async componentDidMount(){
        await this.props.getProjetos()
    }

    render(props){

        const projetos = this.props.projeto.projetos.map((projeto, index) => 
     
            <tr>
                <td>{index+1}</td>
                <DropdownButton variant="dark" id="dropdown-basic-button" title="..." style={{marginLeft:"1em", marginTop:"1em"}}>
                    <Dropdown.Item  onClick={async ()=>{
                                        await this.props.getProjeto(projeto._id)
                                        if(this.props.projeto.projeto_detalhado!={}){
                                            this.props.pageDetalhesProjeto()
                                        }
                                    }
                    }>  Detalhes
                    </Dropdown.Item>

                    <Dropdown.Item  onClick={async ()=>{
                                        await this.props.getProjeto(projeto._id)
                                        if(this.props.projeto.projeto_detalhado!={}){
                                            this.props.pageEditarProjeto()
                                        }
                                    }
                    }>  Editar
                    </Dropdown.Item>
                    <Dropdown.Item href="#">Desativar</Dropdown.Item>
                </DropdownButton>
                <td>{projeto.nome}</td>
                <td>{projeto.descricao}</td>
                <td>{projeto.dataCriacao.substr(0, 10).split('-').reverse().join('/')}</td>
                <td>{projeto.usuarioCriacao.pessoa.nome}</td>
            </tr>
        );

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
                        {projetos}
                    </tbody>
                </Table>
            </Container>
          
        )
    }
}

const mapStateToProps = ({ adminView, projeto }) => {
    return {
        adminView,
        projeto
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
        pageEditarProjeto: () => dispatch(pageEditarProjeto()),
        getProjetos: () => dispatch(getProjetos()),
        getProjeto: (id_projeto) => dispatch(getProjeto(id_projeto)),
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Projeto)