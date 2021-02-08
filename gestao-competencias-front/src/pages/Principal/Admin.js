import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import Row from 'react-bootstrap/Row'

import NavbarP from "../../components/Navbar/NavbarP"
import Sidebar from "../../components/Sidebar/Sidebar"
import swal from 'sweetalert';

import SubCategoria from "../../views/Categoria/SubCategoria";
import Categoria from "../../views/Categoria/Categoria";
import CriarSubCategoria from "../../views/Categoria/CriarSubCategoria";
import CriarCategoria from "../../views/Categoria/CriarCategoria";
import CriarProjeto from "../../views/Projeto/CriarProjeto";
import Projeto from "../../views/Projeto/Projeto";
import DetalhesProjeto from "../../views/Projeto/DetalhesProjeto";
import EditarProjeto from "../../views/Projeto/EditarProjeto";
import EditarSubCategoria from "../../views/Categoria/EditarSubCategoria";
import EditarCategoria from "../../views/Categoria/EditarCategoria";
import EditarUsuario from "../../views/Usuario/EditarUsuario";
import DetalhesUsuario from "../../views/Usuario/DetalhesUsuario";
import Usuario from "../../views/Usuario/Usuario";
import Dashboard from "../../views/Dashboard/Dashboard";

import { getUsuarios } from '../../store/actions/usuarios/usuario'
import { pageSubCategoria, pageProjeto, pageUsuario, pageDashboard, pageCategoria } from '../../store/actions/adminViews/adminView'

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

    async componentDidMount(){
      await this.props.getUsuarios()

    }

    render(props){
      var renderizar
      if(!this.props.usuario.logado){
        return <Redirect to ="/"/>
      }
      if(this.props.usuario.permissao==1){
        swal({
          title: "Acesso Negado",
          text: 'Você não tem permissão, contate seu gestor',
          icon: "error",
        })
        return <Redirect to = "/user"/>
      }
      var listaMenuItem = [ {view:this.props.pageDashboard, icon:'AiOutlineDashboard', nome: 'Dashboard'},
                            {view:this.props.pageUsuario,  icon:'FaUsers', nome: 'Usuários'},
                            {view:this.props.pageProjeto, icon:'FaMedapps', nome: 'Projetos'},
                            {view:this.props.pageCategoria, icon:'FaGripHorizontal', nome: 'Categorias'},
                            {view:this.props.pageSubCategoria, icon:'FaSitemap', nome: 'Subcategorias'}]
      
      renderizar =  this.props.adminView.page === "dashboard" ? <Dashboard/> :
                    this.props.adminView.page === "projeto" ? <Projeto/> : 
                    this.props.adminView.page === "cadastroProjeto" ? <CriarProjeto/> :
                    this.props.adminView.page === "subcategoria" ? <SubCategoria/> :
                    this.props.adminView.page === "categoria" ? <Categoria/> :
                    this.props.adminView.page === "cadastroSubcategoria" ? <CriarSubCategoria/> :
                    this.props.adminView.page === "cadastroCategoria" ? <CriarCategoria/> :
                    this.props.adminView.page === "detalhesProjeto" ? <DetalhesProjeto/> :
                    this.props.adminView.page === "editarProjeto" ? <EditarProjeto/> :
                    this.props.adminView.page === "editarSubCategoria" ? <EditarSubCategoria/> :
                    this.props.adminView.page === "editarCategoria" ? <EditarCategoria/> :
                    this.props.adminView.page === "editarUsuario" ? <EditarUsuario/> :
                    this.props.adminView.page === "detalhesUsuario" ? <DetalhesUsuario/> :
                    this.props.adminView.page === "usuario" ? <Usuario/> : <Dashboard/>
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
      pageCategoria: () => dispatch(pageCategoria()),
      pageProjeto: () => dispatch(pageProjeto()),
      pageSubCategoria: () => dispatch(pageSubCategoria()),
      pageUsuario: () => dispatch(pageUsuario()),
      pageDashboard: () => dispatch(pageDashboard()),
      getUsuarios: () => dispatch(getUsuarios()),
      
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Admin)