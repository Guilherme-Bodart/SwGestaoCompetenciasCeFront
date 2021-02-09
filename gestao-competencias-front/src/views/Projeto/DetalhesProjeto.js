import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from "react-bootstrap/Button"
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'

import { pageCadastrarCategoria, pageCadastrarSubCategoria, pageSubCategoria, 
    pageCadastrarProjeto, pageProjeto, pageDetalhesProjeto } from '../../store/actions/adminViews/adminView'

import '../../styles/principal.css'
import { FaArrowLeft } from 'react-icons/fa';
import { BsThreeDotsVertical } from "react-icons/bs";

import {converte_data} from '../../functions/function'

const initialState = {

}

class DetalhesProjeto extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    handleSubmit(event){
        event.preventDefault()    
    }

    render(props){
        

        const equipe = this.props.projeto.projeto_detalhado.equipe.map((usuario, index) => 
    
            <tr>
                <td>{index+1}</td>
                <td>{usuario.pessoa.nome}</td>
                <td>{usuario.email}</td>
            </tr>
        );
        

        const entrega = this.props.projeto.projeto_detalhado.entregas.map((entregas, index) => 
    
            <tr>
                <td>{index+1}</td>
                <td>{converte_data(entregas,1)}</td>
            </tr>
        );
     

        const atividades = this.props.projeto.projeto_detalhado.atividades.map((atividade, index) => 
     
            <tr>
                <td>{index+1}</td>
                <td>{atividade.titulo}</td>
                <td>{atividade.descricao}</td>
                <td>{atividade.categoria.nome}</td>
                <td>{atividade.subcategoria.nome}</td>
                <td>{converte_data(atividade.dataInicial, 1)}</td>
                <td>{converte_data(atividade.dataFinal, 1)}</td>
                <td>{atividade.usuario.pessoa.nome}</td>
            </tr>
        );

        return(
            
            <Container fluid>
                <Row>
                <p className="App-text-logo" style={{marginLeft:"1em", marginTop:"0.5em"}}>Projetos &gt; Detalhar</p>
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
                        <Form.Control readOnly value={this.props.projeto.projeto_detalhado.nome} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control as="textarea" readOnly value={this.props.projeto.projeto_detalhado.descricao} />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Data Cadastro</Form.Label>
                        <Form.Control readOnly value={this.props.projeto.projeto_detalhado.dataCriacao.substr(0, 10).split('-').reverse().join('/')} />
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
                            {this.props.projeto.projeto_detalhado.equipe.length > 0 ? equipe : <tr><td colSpan="8">Sem equipe</td></tr>}
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
                                    <th>Título</th>
                                    <th>Descrição</th>
                                    <th>Categoria</th>
                                    <th>SubCategoria</th>
                                    <th>Início</th>
                                    <th>Fim</th>
                                    <th>Responsável</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.projeto.projeto_detalhado.atividades.length > 0 ? atividades : <tr><td colSpan="8">Sem atividades</td></tr>}
                            </tbody>
                        </Table>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Marcos do Projeto</Form.Label>
                        <Table responsive style={{backgroundColor:"#ccc", textAlign: "center"}}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Marco</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.projeto.projeto_detalhado.entregas.length > 0 ? entrega : <tr><td colSpan="8">Sem marcos</td></tr>}
                            </tbody>
                        </Table>
                        </Form.Group>
                    </Form.Row>


                    </Form>
            </Container>
          
        )
    }
}

const mapStateToProps = ({ adminView, projeto  }) => {
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
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(DetalhesProjeto)