import React, { Component } from "react";
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'


import '../../styles/principal.css'

import { FaMedapps, FaUsers, FaSitemap, FaGripHorizontal } from 'react-icons/fa';
import { getAlunoAtividades } from '../../store/actions/atividades/atividade'
import { pageAtividade, pageProjeto } from '../../store/actions/userViews/userView'
import { getAlunoProjetos } from '../../store/actions/projetos/projeto'

const initialState = {

}

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    async componentDidMount(){
        await this.props.getAlunoAtividades()
        await this.props.getAlunoProjetos()
    }

    render(props){

        return(
            
            <Container fluid>
                <Row style={{margin: "1rem"}}>
                <div class="header-body">
                    <div class="row">
                        <div style={{marginLeft: "1rem", marginRight: "2rem"}}>
                            <div class="card-stats mb-xl-0 card" style={{cursor: "pointer"}} onClick={()=>{this.props.pageProjeto()}}>
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
                        <div>
                            <div class="card-stats mb-xl-0 card" style={{cursor: "pointer"}} onClick={()=>{this.props.pageAtividade()}}>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col">
                                            <h5 class="text-uppercase text-muted mb-0 card-title">Atividades</h5>
                                            <span class="h2 font-weight-bold mb-0">{this.props.atividade.atividades.length}</span>
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
                    </div>
                </div>
                </Row>
            </Container>
          
        )
    }
}

const mapStateToProps = ({ atividade, projeto }) => {
    return {
        atividade, 
        projeto
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {          
        getAlunoProjetos: () => dispatch(getAlunoProjetos()),
        getAlunoAtividades: () => dispatch(getAlunoAtividades()),       
        pageProjeto: () => dispatch(pageProjeto()),
        pageAtividade: () => dispatch(pageAtividade()),
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)