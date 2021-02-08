import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from "react-bootstrap/Button"
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

import { pageCadastrarCategoria, pageCadastrarSubCategoria, pageSubCategoria, 
    pageCadastrarProjeto, pageProjeto, pageEditarSubCategoria } from '../../store/actions/adminViews/adminView'
import { getSubCategorias, getSubCategoria, desativarSubCategoria } from '../../store/actions/categorias/categoria'

import '../../styles/principal.css'
import { FaPlus } from 'react-icons/fa';
import { BsThreeDotsVertical } from "react-icons/bs";



import {converte_data} from '../../functions/function'

const initialState = {

}

class SubCategoria extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    async componentDidMount(){
        await this.props.getSubCategorias()
    }
    

    render(props){

        const subcategorias = this.props.categoria.subcategorias.map((subcategoria, index) => 

        <tr>
            <td>{index+1}</td>
            <DropdownButton variant="dark" id="dropdown-basic-button" title="..." style={{marginLeft:"1em", marginTop:"1em"}}>
                <Dropdown.Item onClick={async ()=>{
                                        await this.props.getSubCategoria(subcategoria._id)
                                        if(this.props.categoria.getSubcategoria!={}){
                                            this.props.pageEditarSubCategoria()
                                        }
                                    }
                                    }>Editar</Dropdown.Item>
                <Dropdown.Item onClick={async ()=>{
                                        await this.props.getSubCategoria(subcategoria._id)
                                        if(this.props.categoria.getSubcategoria!={}){
                                            this.props.desativarSubCategoria(subcategoria.nome, subcategoria._id)
                                        }
                                    }
                                    }>Desativar</Dropdown.Item>
            </DropdownButton>
            <td>{subcategoria.nome}</td>
            <td>{subcategoria.categoria.nome}</td>
            <td>{converte_data(subcategoria.dataCriacao)}</td>
            <td>{subcategoria.usuario.pessoa.nome}</td>
        </tr>
        );

        return(
            
            
            <Container fluid>
                
                <Row>
                <p className="App-text-logo" style={{marginLeft:"1em", marginTop:"0.5em"}}>Subcategorias</p>
                <Button className="ml-auto" variant="outline-secondary" 
                style={{marginRight:"1em", marginTop:"1em", height:"3em", width:"3em" }}
                    onClick={()=>{
                    this.props.pageCadastrarSubCategoria()
                }}>
                    <FaPlus/>
                </Button>
                </Row>
                <Table responsive style={{backgroundColor:"#ccc", height: "11em", textAlign: "center"}}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Ações</th>
                            <th>Nome</th>
                            <th>Categoria</th>
                            <th>Data Cadastro</th>
                            <th>Responsável pelo cadastro</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subcategorias}
                    </tbody>
                </Table>
            </Container>
          
        )
    }
}

const mapStateToProps = ({ adminView, categoria, alerta }) => {
    return {
        adminView,
        categoria,
        alerta
    }
  }
  
const mapDispatchToProps = dispatch => {
return {
    pageCadastrarCategoria: () => dispatch(pageCadastrarCategoria()),
    pageCadastrarProjeto: () => dispatch(pageCadastrarProjeto()),
    pageCadastrarSubCategoria: () => dispatch(pageCadastrarSubCategoria()),
    pageEditarSubCategoria: () => dispatch(pageEditarSubCategoria()),
    pageProjeto: () => dispatch(pageProjeto()),
    pageSubCategoria: () => dispatch(pageSubCategoria()),
    getSubCategorias: () => dispatch(getSubCategorias()),       
    getSubCategoria: (subcategoria) => dispatch(getSubCategoria(subcategoria)),   
    desativarSubCategoria: (subcategoria, id_subcategoria) => dispatch(desativarSubCategoria(subcategoria, id_subcategoria)),      
    
}
}
export default connect(mapStateToProps, mapDispatchToProps)(SubCategoria)