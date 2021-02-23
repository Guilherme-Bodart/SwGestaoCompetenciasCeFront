import React, { Component } from "react";
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col' 

import '../../styles/principal.css'

import { pageCadastrarCategoria, pageCadastrarSubCategoria, pageSubCategoria, 
    pageCadastrarProjeto, pageProjeto, pageDetalhesProjeto, pageEditarProjeto } from '../../store/actions/adminViews/adminView'

import { getProjetos, getProjeto, desativarProjeto } from '../../store/actions/projetos/projeto'

import { converte_data } from '../../functions/function'

const initialState = {
    projeto: ''
}

class Competencia extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    onChangeCompetencias = (event) => {

        this.setState({
            projeto: event.target.value
        })

        if(event.target.value != 0){
            this.props.getProjeto(event.target.value)
        }
    }

    async componentDidMount(){
        await this.props.getProjetos()
    }

    render(props){

        const projetos = this.props.projeto.projetos.map((projeto, index) => 
            <option value={projeto._id}>{projeto.nome}</option>
        );

        var equipe = ""
        var categorias = ""
        if(this.state.projeto){
           
            if(this.props.projeto.projeto_detalhado.equipe != undefined){
                categorias = this.props.projeto.projeto_detalhado.categorias.map((categoria, index) => 
                    <th>{categoria.nome}</th>
                );


                equipe = this.props.projeto.projeto_detalhado.equipe.map((usuario, index) => 
            
                    <tr>
                        <td>{index+1}</td>
                        <td>{usuario.pessoa.nome} ({this.props.projeto.projeto_detalhado.competencias[usuario._id].total_horas}H)</td>
                        {this.props.projeto.projeto_detalhado.categorias.map((categoria, index) => 
                            <td>{(!(this.props.projeto.projeto_detalhado.competencias[usuario._id].categorias_notas === undefined)) ? this.props.projeto.projeto_detalhado.competencias[usuario._id].categorias_notas[categoria._id] : 0}</td>)}
                    </tr>
                );
            }
        }

        return(
            
            <Container fluid>
                <Row>
                <p className="App-text-logo" style={{marginLeft:"1em", marginTop:"0.5em"}}>Competências</p>
                </Row>
                <Form.Row>  
                    <Form.Group as={Col}>
                    <Form.Label>Projetos</Form.Label>
                    <Form.Control required onChange={value => this.onChangeCompetencias(value)} as="select">
                        <option value="0">Selecione...</option>
                        {projetos}
                    </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Table responsive style={{backgroundColor:"#ccc", height: "2em", textAlign: "center"}}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Membro (CH Total)</th>
                            {categorias}
                        </tr>
                    </thead>
                    <tbody>
                        {equipe ? equipe : <tr><td colSpan="15">Selecione um Projeto</td></tr>}
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
        getProjetos: () => dispatch(getProjetos()),
        getProjeto: (id_projeto) => dispatch(getProjeto(id_projeto)),
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Competencia)