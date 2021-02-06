import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from "react-bootstrap/Button"
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

import { pageCadastrarCategoria, pageCadastrarSubCategoria, pageSubCategoria, 
    pageCadastrarProjeto, pageProjeto, pageEditarCategoria } from '../../store/actions/adminViews/adminView'
import { getCategorias, getCategoria, desativarCategoria } from '../../store/actions/categorias/categoria'

import '../../styles/principal.css'
import { FaPlus } from 'react-icons/fa';
import { BsThreeDotsVertical } from "react-icons/bs";

import {converte_data} from '../../functions/function'

const initialState = {

}

class Categoria extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    async componentDidMount(){
        await this.props.getCategorias()
    }
    

    render(props){
        const categorias = this.props.categoria.categorias.map((categoria, index) => 

        <tr>
            <td>{index+1}</td>
            <DropdownButton variant="dark" id="dropdown-basic-button" title="..." style={{marginLeft:"1em", marginTop:"1em"}}>
                <Dropdown.Item onClick={async ()=>{
                                        await this.props.getCategoria(categoria._id)
                                        if(this.props.categoria.getCategoria!={}){
                                            this.props.pageEditarCategoria()
                                        }
                                    }
                                    }>Editar</Dropdown.Item>
                <Dropdown.Item onClick={async ()=>{
                                        await this.props.getCategoria(categoria._id)
                                        if(this.props.categoria.getCategoria!={}){
                                            this.props.desativarCategoria(categoria.nome, categoria._id)
                                        }
                                    }
                                    }>Desativar</Dropdown.Item>
            </DropdownButton>
            <td>{categoria.nome}</td>
            <td>{categoria.subcategorias.map((subcategoria) => 
                <p>{subcategoria.nome}<br/></p>
            )}
            </td>
            <td>{converte_data(categoria.dataCriacao)}</td>
            <td>{categoria.usuario.pessoa.nome}</td>
        </tr>
        );

        return(
            
            
            <Container fluid>
                <Row>
                <p className="App-text-logo" style={{marginLeft:"1em", marginTop:"0.5em"}}>Categorias</p>
                <Button className="ml-auto" variant="outline-secondary" 
                style={{marginRight:"1em", marginTop:"1em", height:"3em", width:"3em" }}
                    onClick={()=>{
                    this.props.pageCadastrarCategoria()
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
                            <th>Subcategorias</th>
                            <th>Data Cadastro</th>
                            <th>Responsável pelo cadastro</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias}
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
    pageEditarCategoria: () => dispatch(pageEditarCategoria()),
    pageProjeto: () => dispatch(pageProjeto()),
    pageSubCategoria: () => dispatch(pageSubCategoria()),
    getCategorias: () => dispatch(getCategorias()),       
    getCategoria: (categoria) => dispatch(getCategoria(categoria)),   
    desativarCategoria: (categoria, id_categoria) => dispatch(desativarCategoria(categoria, id_categoria)),      
    
}
}
export default connect(mapStateToProps, mapDispatchToProps)(Categoria)