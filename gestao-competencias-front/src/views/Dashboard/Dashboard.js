import React, { Component } from "react";
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'


import '../../styles/principal.css'

import { FaMedapps, FaUsers, FaSitemap, FaGripHorizontal } from 'react-icons/fa';
import { pageSubCategoria, pageProjeto, pageUsuario, pageCategoria } from '../../store/actions/adminViews/adminView'
import { getSubCategorias, getCategorias } from '../../store/actions/categorias/categoria'
import { getUsuarios } from '../../store/actions/usuarios/usuario'
import { getProjetos } from '../../store/actions/projetos/projeto'

const initialState = {

}

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    async componentDidMount(){
        await this.props.getSubCategorias()
        await this.props.getCategorias()
        await this.props.getUsuarios()
        await this.props.getProjetos()
    }

    render(props){

        return(
            
            <Container fluid>
                <Row style={{margin: "1rem"}}>
                <div class="header-body">
                    <div class="row">
                        <div class="col-lg-6 col-xl-3">
                            <div class="card-stats mb-4 mb-xl-0 card" style={{cursor: "pointer"}} onClick={()=>{this.props.pageUsuario()}}>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col">
                                            <h5 class="text-uppercase text-muted mb-0 card-title">Usuários</h5>
                                            <span class="h2 font-weight-bold mb-0">{this.props.usuario.usuarios.length}</span>
                                        </div>
                                        <div class="col-auto col">
                                            <div style={{fontSize:"1.6em", color:"black"}}>
                                                <FaUsers/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 col-xl-3">
                            <div class="card-stats mb-4 mb-xl-0 card" style={{cursor: "pointer"}} onClick={()=>{this.props.pageProjeto()}}>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col">
                                            <h5 class="text-uppercase text-muted mb-0 card-title">Projetos</h5>
                                            <span class="h2 font-weight-bold mb-0">{this.props.projeto.projetos.length}</span>
                                        </div>
                                        <div class="col-auto col">
                                            <div style={{fontSize:"1.6em", color:"black"}}>
                                                <FaMedapps/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 col-xl-3">
                            <div class="card-stats mb-4 mb-xl-0 card" style={{cursor: "pointer"}} onClick={()=>{this.props.pageCategoria()}}>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col">
                                            <h5 class="text-uppercase text-muted mb-0 card-title">Categorias</h5>
                                            <span class="h2 font-weight-bold mb-0">{this.props.categoria.categorias.length}</span>
                                        </div>
                                        <div class="col-auto col">
                                            <div style={{fontSize:"1.4em", color:"black"}}>
                                                <FaSitemap/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 col-xl-3">
                            <div class="card-stats mb-4 mb-xl-0 card" style={{cursor: "pointer"}} onClick={()=>{this.props.pageSubCategoria()}}>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col">
                                            <h5 class="text-uppercase text-muted mb-0 card-title">Subcategorias</h5>
                                            <span class="h2 font-weight-bold mb-0">{this.props.categoria.subcategorias.length}</span>
                                        </div>
                                        <div class="col-auto col">
                                            <div style={{fontSize:"1.6em", color:"black"}}>
                                                <FaGripHorizontal/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </Row>
            </Container>
          
        )
    }
}

const mapStateToProps = ({ categoria, projeto, usuario }) => {
    return {
        categoria, 
        projeto,
        usuario
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {      
        getUsuarios: () => dispatch(getUsuarios()),       
        getProjetos: () => dispatch(getProjetos()),
        getCategorias: () => dispatch(getCategorias()),       
        getSubCategorias: () => dispatch(getSubCategorias()),       
        pageSubCategoria: () => dispatch(pageSubCategoria()),
        pageCategoria: () => dispatch(pageCategoria()),
        pageProjeto: () => dispatch(pageProjeto()),
        pageUsuario: () => dispatch(pageUsuario())
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)