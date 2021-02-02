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

import { pageCadastrarAtividade, pageAtividade, pageDetalhesAtividade, pageEditarAtividade } from '../../store/actions/userViews/userView'

import { getAlunoAtividades, getAtividade } from '../../store/actions/atividades/atividade'

const initialState = {
  }

class Atividade extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    async componentDidMount(){
        await this.props.getAlunoAtividades()
    }

    render(props){ 
        const atividades = this.props.atividade.atividades.map((atividade, index) => 
            <tr>
                <td>{index+1}</td>
                <DropdownButton variant="dark" id="dropdown-basic-button" title="..." style={{marginLeft:"1em", marginTop:"1em"}}>
                    <Dropdown.Item  onClick={async ()=>{
                                        await this.props.getAtividade(atividade.atividade._id)
                                        if(this.props.atividade.atividade_detalhado!={}){
                                            this.props.pageDetalhesAtividade()
                                        }
                                    }
                    }>  Detalhes
                    </Dropdown.Item>
                    <Dropdown.Item  onClick={async ()=>{
                                        await this.props.getProjeto(atividade._id)
                                        if(this.props.atividade.atividade_detalhado!={}){
                                            this.props.pageEditarProjeto()
                                        }
                                    }
                    }>  Editar
                    </Dropdown.Item>
                <Dropdown.Item href="#">Excluir</Dropdown.Item>
                </DropdownButton>
                <td>{atividade.titulo}</td>
                <td>{atividade.categoria.nome}</td>
                <td>{atividade.subcategoria.nome}</td>
                <td>{atividade.dataInicial.substr(0, 10).split('-').reverse().join('/')}</td>
                <td>{atividade.dataFinal.substr(0, 10).split('-').reverse().join('/')}</td>
                <td>{atividade.descricao}</td>
            </tr>
        );

        return(
            
            <Container fluid>
                <Row>
                <p className="App-text-logo" style={{marginLeft:"1em", marginTop:"0.5em"}}>Atividades</p>
                <Button className="ml-auto" variant="outline-secondary" 
                style={{marginRight:"1em", marginTop:"1em", height:"3em", width:"3em" }}
                onClick={()=>{
                    this.props.pageCadastrarAtividade()
                }}>
                    <FaPlus/>
                </Button>
                </Row>
                <Table responsive style={{backgroundColor:"#ccc", height: "14em", textAlign: "center"}}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Ações</th>
                            <th>Título</th>
                            <th>Categoria</th>
                            <th>Subcategria</th>
                            <th>Início</th>
                            <th>Fim</th>
                            <th>Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                        {atividades}
                    </tbody>
                </Table>
            </Container>
          
        )
    }
}

const mapStateToProps = ({ adminView, atividade }) => {
    return {
        adminView,
        atividade
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        pageCadastrarAtividade: () => dispatch(pageCadastrarAtividade()),
        pageAtividade: () => dispatch(pageAtividade()),
        pageDetalhesAtividade: () => dispatch(pageDetalhesAtividade()),
        pageEditarAtividade: () => dispatch(pageEditarAtividade()),
        getAlunoAtividades: () => dispatch(getAlunoAtividades()),
        getAtividade: (id_atividade) => dispatch(getAtividade(id_atividade)),
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Atividade)