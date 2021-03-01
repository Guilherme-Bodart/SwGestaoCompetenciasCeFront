import React, { Component } from "react";
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col' 

import '../../styles/principal.css'

import { pageCadastrarCategoria, pageCadastrarSubCategoria, pageSubCategoria, 
    pageCadastrarProjeto, pageProjeto, pageDetalhesProjeto, pageEditarProjeto } from '../../store/actions/adminViews/adminView'

import { getAlunoProjetos, getProjeto, desativarProjeto } from '../../store/actions/projetos/projeto'

import { nome_sobrenome } from '../../functions/function'

import {
    PieChart,
    Pie,
    Cell,
  } from 'recharts';

const initialState = {
    projeto: 0
}

const color = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

class Relatorio extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    onChangeRelatorios = (event) => {

        this.setState({
            projeto: event.target.value
        })

        if(event.target.value != 0){
            this.props.getProjeto(event.target.value)
        }
    }

    async componentDidMount(){
        await this.props.getAlunoProjetos()
    }

    render(props){
        
        const projetos = this.props.projeto.projetos.map((projeto, index) => 
            <option value={projeto.projeto._id}>{projeto.projeto.nome}</option>
        );

        var grafico = ""
        var legenda = ""
        if(this.state.projeto){
            const data = []

            if(this.props.projeto.projeto_detalhado.equipe != undefined){
                
                const data_grafico = this.props.projeto.projeto_detalhado.categorias.map((categoria, index) => {
                    var horas_cat = 0;

                    if(!(this.props.projeto.projeto_detalhado.competencias[this.props.usuario._id].categorias_horas === undefined)){
                        horas_cat = this.props.projeto.projeto_detalhado.competencias[this.props.usuario._id].categorias_horas[categoria._id];
                    }

                    data[index] = {
                        "name": categoria.nome,
                        "value": horas_cat
                    }
                });

                legenda = data.map(
                (entry, index) => (
                    <span style={{width: "0",height: "0",borderwidth: "1rem 1rem 1rem",borderStyle: "solid",borderColor: color[index]}}>{entry.name}</span>
                ))

                
                grafico = 
                <PieChart width={730} height={250}>
                    <Pie data={data} cx="50%" cy="50%" outerRadius={80} label>
                        {
                        data.map((entry, index) => (
                            <Cell key={`cell-${index}`} dataKey="value" nameKey="name" fill={color[index]}/>
                        ))
                        }
                    </Pie>
                </PieChart>
            }
        }

        return(
            
            <Container fluid>
                <Row>
                <p className="App-text-logo" style={{marginLeft:"1em", marginTop:"0.5em"}}>Relatórios</p>
                </Row>
                <Form.Row>  
                    <Form.Group as={Col}>
                    <Form.Label>Projetos</Form.Label>
                    <Form.Control required onChange={value => this.onChangeRelatorios(value)} as="select">
                        <option value="0">Selecione...</option>
                        {projetos}
                    </Form.Control>
                    </Form.Group>
                </Form.Row>
                {grafico}
                {legenda}
            </Container>
          
        )
    }
}

const mapStateToProps = ({ adminView, projeto, usuario }) => {
    return {
        adminView,
        projeto,
        usuario
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        getAlunoProjetos: () => dispatch(getAlunoProjetos()),
        getProjeto: (id_projeto) => dispatch(getProjeto(id_projeto)),
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Relatorio)