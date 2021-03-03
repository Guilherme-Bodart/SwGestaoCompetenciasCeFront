import React, { Component } from "react";
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col' 

import '../../styles/principal.css'

import { getProjetos, getProjeto } from '../../store/actions/projetos/projeto'

import { nome_sobrenome, color } from '../../functions/function'

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from 'recharts';

const initialState = {
    projeto: 0
}

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
        await this.props.getProjetos()
    }

    render(props){

        const projetos = this.props.projeto.projetos.map((projeto, index) => 
            <option value={projeto._id}>{projeto.nome}</option>
        );

        var grafico = ""
        if(this.state.projeto){
            const data = []

            if(this.props.projeto.projeto_detalhado.equipe != undefined){
                const membros_grafico = this.props.projeto.projeto_detalhado.equipe.map((membro, index) => 
                    <Bar dataKey={nome_sobrenome(this.props.projeto.projeto_detalhado.competencias[membro._id].nome)} fill={color[index]} />
                );
                
                this.props.projeto.projeto_detalhado.categorias.map((categoria, index) => 
                    data[index] = {
                        "name": categoria.nome,
                        }
                )
                
                this.props.projeto.projeto_detalhado.categorias.map((categoria, index) => {
                    var membros = {};
                    this.props.projeto.projeto_detalhado.equipe.map((membro, index) => {
                        var nome_membro = nome_sobrenome(this.props.projeto.projeto_detalhado.competencias[membro._id].nome);
                        var horas_cat = 0;
                        if(!(this.props.projeto.projeto_detalhado.competencias[membro._id].categorias_horas === undefined)){
                            horas_cat = this.props.projeto.projeto_detalhado.competencias[membro._id].categorias_horas[categoria._id];
                            membros[nome_sobrenome(nome_membro)] = horas_cat
                        }
                        membros[nome_sobrenome(nome_membro)] = horas_cat
                        return 1
                    });
                    data[index]  = Object.assign(data[index], membros)

                    return 1
                });

                grafico = 
                <BarChart width={730} height={250} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {membros_grafico}
                </BarChart>
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
  export default connect(mapStateToProps, mapDispatchToProps)(Relatorio)