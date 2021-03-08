import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from "react-bootstrap/Button"
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import { pageCompetencia } from '../../store/actions/adminViews/adminView'

import { getProjetos, getProjeto, criarCompetencia } from '../../store/actions/projetos/projeto'
import { getAlunoExpAtividades } from '../../store/actions/atividades/atividade'

import '../../styles/principal.css'
import { FaArrowLeft } from 'react-icons/fa';

const initialState = {

    projeto: '',
    membro: '',
    subcategoria: '',
    nota: 0

}

class CadastrarCompetencia extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    onChangeProjeto = (event) => {

        this.setState({
            projeto: event.target.value
        })

        if(event.target.value != 0){
            this.props.getProjeto(event.target.value)
        }
    }

    onChangeMembro = (event) => {

        this.setState({
            membro: event.target.value
        })

        if(event.target.value != 0){
            this.props.getAlunoExpAtividades(event.target.value)
        }
    }


    onChangeSubCategoria = (event) => {

        this.setState({
            subcategoria: event.target.value
        })
    }

    onChangeNota = (event) => {

        this.setState({
            nota: event.target.value
        })
    }
    async componentDidMount(){
        await this.props.getProjetos()
    }

    handleSubmit(event){
        event.preventDefault()    
    }

    render(props){

        const projetos = this.props.projeto.projetos.map( projeto => <option value={projeto._id}>{projeto.nome}</option>);
        
        let membros = "";
        let subcategorias = "";
        if(this.state.projeto){
           
            if(this.props.projeto.projeto_detalhado.equipe != undefined){
        
                membros = this.props.projeto.projeto_detalhado.equipe.map( membro => <option value={membro._id}>{membro.pessoa.nome}</option>);
                
                if(this.state.membro){
                    var array_subcategoria = []
                    if(this.props.atividade.atividades.length > 0){
                        subcategorias = this.props.atividade.atividades.map( atividade => {
                            if(atividade.item_usuario_projeto.projeto._id === this.state.projeto && array_subcategoria.indexOf(atividade.subcategoria._id)==-1 ) {
                                array_subcategoria.push(atividade.subcategoria._id);
                                return (<option value={atividade.subcategoria._id}>{atividade.subcategoria.nome}</option>)
                            }
                        });
                    }else{
                        subcategorias = <option value="0" selected>Sem atividades cadastradas</option>
                    }
                }
            }
        }
        return(
            
            <Container fluid>
                
                <Row>
                <p className="App-text-logo" style={{marginLeft:"1em", marginTop:"0.5em"}}>Competências &gt; Cadastrar</p>
                <Button className="ml-auto" variant="outline-secondary" 
                style={{marginRight:"1em", marginTop:"1em", height:"3em", width:"3em" }}
                onClick={()=>{
                    this.props.pageCompetencia()
                }}>
                    <FaArrowLeft/>
                </Button>
                </Row>
                <Form className="App-form" onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Projeto</Form.Label>
                        <Form.Control required onChange={value => this.onChangeProjeto(value)} as="select" defaultValue="0">
                            <option value="0">Selecione...</option>
                            {projetos}
                        </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Membro</Form.Label>
                        <Form.Control required onChange={value => this.onChangeMembro(value)} as="select" defaultValue="0">
                            <option value="0">Selecione...</option>
                            {membros}
                        </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Subcategoria</Form.Label>
                        <Form.Control required onChange={value => this.onChangeSubCategoria(value)} as="select" defaultValue="0">
                            <option value="0">Selecione...</option>
                            {subcategorias}
                        </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Nota</Form.Label>
                        <Form.Control onChange={value => this.onChangeNota(value)} required placeholder="1-5" />
                        </Form.Group>
                    </Form.Row>

                    <Button variant="primary" type="submit" onClick= { async ()  =>{
              
                                if(this.state.membro != '' && this.state.membro != 0 && this.state.subcategoria != '' && this.state.subcategoria != 0){
                                    await this.props.criarCompetencia({projeto:this.state.projeto, membro:this.state.membro, subcategoria:this.state.subcategoria, nota:this.state.nota})
                                }
                            }}>
                        Salvar Competência
                    </Button>
                    </Form>
            </Container>
          
        )
    }
}

const mapStateToProps = ({ adminView, projeto, atividade }) => {
    return {
        adminView,
        projeto,
        atividade
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        pageCompetencia: () => dispatch(pageCompetencia()),
        getProjetos: () => dispatch(getProjetos()),
        getProjeto: (id_projeto) => dispatch(getProjeto(id_projeto)),
        criarCompetencia: (competencia) => dispatch(criarCompetencia(competencia)),
        getAlunoExpAtividades: (id_usuario) => dispatch(getAlunoExpAtividades(id_usuario)),
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(CadastrarCompetencia)