import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import Row from 'react-bootstrap/Row'

import NavbarP from "../../components/Navbar/NavbarP"
import Sidebar from "../../components/Sidebar/Sidebar"
import swal from 'sweetalert';

import SubCategoria from "../../views/Categoria/SubCategoria";
import CriarSubCategoria from "../../views/Categoria/CriarSubCategoria";
import CriarCategoria from "../../views/Categoria/CriarCategoria";
import CriarProjeto from "../../views/Projeto/CriarProjeto";
import Projeto from "../../views/Projeto/Projeto";
import DetalhesProjeto from "../../views/Projeto/DetalhesProjeto";
import EditarProjeto from "../../views/Projeto/EditarProjeto";
import EditarSubCategoria from "../../views/Categoria/EditarSubCategoria";
import EditarUsuario from "../../views/Usuario/EditarUsuario";
import Usuario from "../../views/Usuario/Usuario";
import Dashboard from "../../views/Dashboard/Dashboard";

import { pageSubCategoria, pageProjeto, pageUsuario, pageDashboard } from '../../store/actions/adminViews/adminView'

import '../../styles/principal.css'


const initialState = {
  logado:false,
  page: "dashboard"
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
      if(this.props.usuario.permissao==2){
        swal({
          title: "Acesso Negado",
          text: 'Você é um professor, apenas alunos podem entrar aqui',
          icon: "error",
        })
        return <Redirect to = "/admin"/>
      }
      var listaMenuItem = [ {view:this.props.pageDashboard, icon:'AiOutlineDashboard', nome: 'Dashboard'},
                            {view:this.props.pageProjeto, icon:'FaMedapps', nome: 'Projetos'},
                            ]
      
      renderizar =  this.props.adminView.page === "projeto" ? <Projeto/> : 
                    this.props.adminView.page === "dashboard" ? <Dashboard/> : <Dashboard/> 
      return(
        <div style={{ backgroundColor:'rgba(220,220,220,0.7)',}} >
          <Row>
          <Sidebar listaMenuItem={listaMenuItem} />
          <div style={{height:"100vh", width:"80vw"}}>
            <NavbarP dashboard = {this.props.pageDashboard}/>
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
      pageProjeto: () => dispatch(pageProjeto()),
      pageSubCategoria: () => dispatch(pageSubCategoria()),
      pageUsuario: () => dispatch(pageUsuario()),
      pageDashboard: () => dispatch(pageDashboard()),
      
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Admin)