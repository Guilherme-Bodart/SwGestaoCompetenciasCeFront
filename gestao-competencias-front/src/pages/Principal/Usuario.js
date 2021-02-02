import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import Row from 'react-bootstrap/Row'

import NavbarP from "../../components/Navbar/NavbarP"
import Sidebar from "../../components/Sidebar/Sidebar"
import swal from 'sweetalert';


import Projeto from "../../viewsUser/Projeto/Projeto";
import DetalhesProjeto from "../../viewsUser/Projeto/DetalhesProjeto";
import Atividade from "../../viewsUser/Atividade/Atividade";
import DetalhesAtividade from "../../viewsUser/Atividade/DetalhesAtividade";
import CadastrarAtividade from "../../viewsUser/Atividade/CadastrarAtividade";
import EditarAtividade from "../../viewsUser/Atividade/EditarAtividade";
import Dashboard from "../../viewsUser/Dashboard/Dashboard";

import { pageSubCategoria, pageProjeto, pageUsuario, pageDashboard, pageAtividade } from '../../store/actions/userViews/userView'

import '../../styles/principal.css'


const initialState = {
  logado:false,
  page: "dashboard"
}

class Usuario extends Component {
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
                            {view:this.props.pageAtividade, icon:'FaTasks', nome: 'Atividades'},
                            ]
      
      renderizar =  this.props.userView.page === "projeto" ? <Projeto/> : 
                    this.props.userView.page === "detalhesProjeto" ? <DetalhesProjeto/> :
                    this.props.userView.page === "atividade" ? <Atividade/> : 
                    this.props.userView.page === "cadastroAtividade" ? <CadastrarAtividade/> :
                    this.props.userView.page === "editarAtividade" ? <EditarAtividade/> :
                    this.props.userView.page === "detalhesAtividade" ? <DetalhesAtividade/> :
                    this.props.userView.page === "dashboard" ? <Dashboard/> : <Dashboard/> 
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

const mapStateToProps = ({ usuario, alerta, page, userView }) => {
    return {
        usuario,
        alerta,
        page,
        userView
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      pageProjeto: () => dispatch(pageProjeto()),
      pageAtividade: () => dispatch(pageAtividade()),
      pageSubCategoria: () => dispatch(pageSubCategoria()),
      pageUsuario: () => dispatch(pageUsuario()),
      pageDashboard: () => dispatch(pageDashboard()),
      
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Usuario)