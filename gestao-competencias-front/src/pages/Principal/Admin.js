import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import Row from 'react-bootstrap/Row'

import NavbarP from "../../components/Navbar/NavbarP"
import Sidebar from "../../components/Sidebar/Sidebar"

import SubCategoria from "../../views/Categoria/SubCategoria";
import CriarSubCategoria from "../../views/Categoria/CriarSubCategoria";
import CriarCategoria from "../../views/Categoria/CriarCategoria";
import CriarProjeto from "../../views/Projeto/CriarProjeto";
import Projeto from "../../views/Projeto/Projeto";
import DetalhesProjeto from "../../views/Projeto/DetalhesProjeto";

import '../../styles/principal.css'

import { pageCadastrarCategoria, pageCadastrarSubCategoria, pageSubCategoria, 
         pageCadastrarProjeto, pageProjeto, pageDetalhesProjeto } from '../../store/actions/adminViews/adminView'


const initialState = {
  }


class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    render(props){
      var renderizar
      if(!this.props.usuario.logado){
        return <Redirect to ="/"/>
      }
      renderizar = this.props.adminView.page === "projeto" ? <Projeto/> : 
      this.props.adminView.page === "cadastroProjeto" ? <CriarProjeto/> :
      this.props.adminView.page === "subcategoria" ? <SubCategoria/> :
      this.props.adminView.page === "cadastroSubcategoria" ? <CriarSubCategoria/> :
      this.props.adminView.page === "cadastroCategoria" ? <CriarCategoria/> :
      this.props.adminView.page === "detalhesProjeto" ? <DetalhesProjeto/> : <Projeto/>
      return(
        <div style={{ backgroundColor:'rgba(220,220,220,0.7)',}} >
          <Row>
          <Sidebar/>
          <div style={{height:"100vh", width:"80vw"}}>
            <NavbarP/>
            {renderizar}
          </div>
          </Row>
        </div>
        
        
      )
    }
}

const mapStateToProps = ({ usuario, alerta, page, adminView }) => {
    return {
        usuario,
        alerta,
        page,
        adminView
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      pageCadastrarCategoria: () => dispatch(pageCadastrarCategoria()),
      pageCadastrarProjeto: () => dispatch(pageCadastrarProjeto()),
      pageCadastrarSubCategoria: () => dispatch(pageCadastrarSubCategoria()),
      pageProjeto: () => dispatch(pageProjeto()),
      pageSubCategoria: () => dispatch(pageSubCategoria()),
      
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Admin)