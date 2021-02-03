import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from "react-bootstrap/Button"
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col' 
import DropdownButton from 'react-bootstrap/DropdownButton'

import { pageAtividade } from '../../store/actions/userViews/userView'

import { getAtividade } from '../../store/actions/atividades/atividade'

import Alerta from "../../components/Alerta/Alerta"
import '../../styles/principal.css'
import { FaArrowLeft } from 'react-icons/fa';
import { BsThreeDotsVertical } from "react-icons/bs";

function converte_data(data, tem_hora = 0){
    if(tem_hora){
        return data.substr(0, 10).split('-').reverse().join('/')+' '+data.substr(11, 5);
    }else{
        return data.substr(0, 10).split('-').reverse().join('/');
    }
}

const initialState = {
}

class DetalhesAtividade extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    handleSubmit(event){
        event.preventDefault()    
    }

    render(props){

        return(
            
            <Container fluid>
                <Row>
                <p className="App-text-logo" style={{marginLeft:"1em", marginTop:"0.5em"}}>Atividades &gt; Detalhes</p>
                <Button className="ml-auto" variant="outline-secondary" 
                style={{marginRight:"1em", marginTop:"1em", height:"3em", width:"3em" }}
                onClick={()=>{
                    this.props.pageAtividade()
                }}>
                    <FaArrowLeft/>
                </Button>
                </Row>
                <Form onSubmit={this.handleSubmit}>
                    <Col>
                    <Form.Row>  
                        <Form.Group as={Col}>
                        <Form.Label>Projeto</Form.Label>
                        <Form.Control disabled value={this.props.atividade.atividade_detalhado.item_usuario_projeto.projeto.nome} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} >
                        <Form.Label>Título</Form.Label>
                        <Form.Control disabled  value={this.props.atividade.atividade_detalhado.titulo} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group >
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control as="textarea" value={this.props.atividade.atividade_detalhado.descricao} disabled/>
                    </Form.Group>
 
                    <Form.Row>  
                        <Form.Group as={Col}>
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control disabled  value={this.props.atividade.atividade_detalhado.categoria.nome} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>  
                        <Form.Group as={Col}>
                        <Form.Label>SubCategoria</Form.Label>
                        <Form.Control disabled value={this.props.atividade.atividade_detalhado.subcategoria.nome}  />
                        </Form.Group>
                    </Form.Row>
                    </Col>
                    <Form.Row>
                        <Col>
                            <Form.Group as={Col}>
                            <Form.Label>Data Início</Form.Label>
                            <Form.Control value={converte_data(this.props.atividade.atividade_detalhado.dataInicial, 1)} disabled />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Col}>
                            <Form.Label>Data Fim</Form.Label>
                            <Form.Control value={converte_data(this.props.atividade.atividade_detalhado.dataFinal, 1)} disabled />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    </Form>
            </Container>
          
        )
    }
}

const mapStateToProps = ({ userView, usuario, atividade, categoria, projeto }) => {
    return {
        userView,
        usuario, 
        atividade
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        pageAtividade: () => dispatch(pageAtividade()),
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(DetalhesAtividade)