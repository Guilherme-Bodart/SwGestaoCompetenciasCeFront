import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from "react-bootstrap/Button"
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col' 

import '../../styles/principal.css'
import { FaPlus } from 'react-icons/fa';

import { pageCadastrarCompetencia } from '../../store/actions/adminViews/adminView'

import { getProjetos, getProjeto } from '../../store/actions/projetos/projeto'

import { nome_sobrenome, color } from '../../functions/function'

import {
    RadarChart,
    Radar,
    PolarRadiusAxis,
    PolarGrid,
    PolarAngleAxis,
    Legend
  } from 'recharts';

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
        var grafico = ""
        if(this.state.projeto){
           
            if(this.props.projeto.projeto_detalhado.equipe != undefined){

                function categoria_nota_retorno(id_usuario, id_categoria){
                    var nota = 0;
                    if(this.props.projeto.projeto_detalhado.competencias[id_usuario].categorias_notas !== undefined){
                        if(this.props.projeto.projeto_detalhado.competencias[id_usuario].categorias_notas[id_categoria] > 0){
                            nota = this.props.projeto.projeto_detalhado.competencias[id_usuario].categorias_notas[id_categoria]
                        }
                    }
                    return nota
                }

                categorias = this.props.projeto.projeto_detalhado.categorias.map((categoria, index) => 
                    <th>{categoria.nome}</th>
                );

                equipe = this.props.projeto.projeto_detalhado.equipe.map((usuario, index) => 
            
                    <tr>
                        <td>{index+1}</td>
                        <td>{usuario.pessoa.nome} ({this.props.projeto.projeto_detalhado.competencias[usuario._id].total_horas}H)</td>
                        {this.props.projeto.projeto_detalhado.categorias.map((categoria, index) => 
                            <td>{(this.props.projeto.projeto_detalhado.competencias[usuario._id].categorias_notas !== undefined && this.props.projeto.projeto_detalhado.competencias[usuario._id].categorias_notas[categoria._id] !== undefined) ? this.props.projeto.projeto_detalhado.competencias[usuario._id].categorias_notas[categoria._id] : 0}</td>)}
                    </tr>
                );
                
                const data = []

                const membros_grafico = this.props.projeto.projeto_detalhado.equipe.map((membro, index) => 
                    <Radar name={nome_sobrenome(this.props.projeto.projeto_detalhado.competencias[membro._id].nome)} dataKey={nome_sobrenome(this.props.projeto.projeto_detalhado.competencias[membro._id].nome)} stroke={color[index]} fill={color[index]} fillOpacity={0.6} />
                );
                
                this.props.projeto.projeto_detalhado.categorias.map((categoria, index) => 
                    data[index] = {
                        "subject": categoria.nome,
                        "fullMark": 5
                        }
                )
                
                this.props.projeto.projeto_detalhado.categorias.map((categoria, index) => {
                    var membros = {};
                    this.props.projeto.projeto_detalhado.equipe.map((membro, index) => {
                        var nome_membro = nome_sobrenome(membro.pessoa.nome);
                        var nota_categoria = 0.01;
                        if(!(this.props.projeto.projeto_detalhado.competencias[membro._id].categorias_notas === undefined)){
                            nota_categoria = this.props.projeto.projeto_detalhado.competencias[membro._id].categorias_notas[categoria._id];
                            membros[nome_membro] = nota_categoria
                        }else{
                            membros[nome_membro] = nota_categoria
                        }
                        if(membros[nome_membro] === undefined){
                            membros[nome_membro] = 0.01;
                        }
                        return 1
                    });
                    data[index]  = Object.assign(data[index], membros)
                    return 1
                });
                
                grafico =
                <RadarChart outerRadius={90} width={730} height={250} data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 5]} />
                    {membros_grafico}
                    <Legend />
                </RadarChart> 

            }
        }

        return(
            
            <Container fluid>
                <Row>
                <p className="App-text-logo" style={{marginLeft:"1em", marginTop:"0.5em"}}>Competências</p>
                <Button className="ml-auto" variant="outline-secondary" 
                style={{marginRight:"1em", marginTop:"1em", height:"3em", width:"3em" }}
                onClick={()=>{
                    this.props.pageCadastrarCompetencia()
                }}>
                    <FaPlus/>
                </Button>
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
        pageCadastrarCompetencia: () => dispatch(pageCadastrarCompetencia()),
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Competencia)