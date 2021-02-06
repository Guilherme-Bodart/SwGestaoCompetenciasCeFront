import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from "react-bootstrap/Button"
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

import Alerta from "../../components/Alerta/Alerta"

import { pageEditarUsuario, pageDetalharUsuario } from '../../store/actions/adminViews/adminView'
import { getUsuarios, getUsuario, desativarUsuario } from '../../store/actions/usuarios/usuario'

import '../../styles/principal.css'

function converte_data(data, tem_hora = 0){
    if(tem_hora){
        return data.substr(0, 10).split('-').reverse().join('/')+' '+data.substr(11, 5);
    }else{
        return data.substr(0, 10).split('-').reverse().join('/');
    }
}

const initialState = {

}

class Usuario extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    async componentDidMount(){
        await this.props.getUsuarios()
    }

    render(props){
            const usuarios = this.props.usuario.usuarios.map((user, index) => 
                <tr>
                    <td>{index+1}</td>
                    <DropdownButton variant="dark" id="dropdown-basic-button" title="..." style={{marginLeft:"1em", marginTop:"1em"}}>
                        <Dropdown.Item onClick={async ()=>{
                            
                            await this.props.getUsuario(user._id)
                            if(this.props.usuario.getUsuario!={}){
                                this.props.pageDetalharUsuario()
                            }
                        }
                        }>Detalhes</Dropdown.Item>
                        <Dropdown.Item onClick={async ()=>{
    
                                        await this.props.getUsuario(user._id)
                                        if(this.props.usuario.getUsuario!={}){
                                            this.props.pageEditarUsuario()
                                        }
                                    }
                                    }>Editar</Dropdown.Item>
                        <Dropdown.Item onClick={async ()=>{
    
                            await this.props.getUsuario(user._id)
                            if(this.props.usuario.getUsuario!={}){
                                this.props.desativarUsuario(user.pessoa.nome, user._id)
                            }
                        }
                        }>Desativar</Dropdown.Item>
                    </DropdownButton>
                    <td>{user.pessoa.nome}</td>
                    <td>{user.pessoa.cpf}</td>
                    <td>{user.email}</td>
                    <td>{converte_data(user.pessoa.dataNascimento)}</td>
                    <td>{user.permissao == 1 ? 'Aluno' : 'Admin'}</td>
                </tr>
                );

        return(
            
            <Container fluid>
                <Alerta open= {true} alertTitle= {this.props.alerta.alertTitle} severity= {this.props.alerta.severity} texto= {this.props.alerta.texto}/>
                <Row>
                <p className="App-text-logo" style={{marginLeft:"1em", marginTop:"0.5em"}}>Usuários</p>
                </Row>
                <Table responsive style={{backgroundColor:"#ccc", height: "14em", textAlign: "center"}}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Ações</th>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>E-mail</th>
                            <th>Data de Nascimento</th>
                            <th>Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                       {usuarios}
                    </tbody>
                </Table>
            </Container>
          
        )
    }
}

const mapStateToProps = ({ adminView, usuario,alerta }) => {
    return {
        adminView,
        usuario,
        alerta
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        pageDetalharUsuario: () => dispatch(pageDetalharUsuario()),       
        pageEditarUsuario: () => dispatch(pageEditarUsuario()),       
        getUsuarios: () => dispatch(getUsuarios()),       
        getUsuario: (id_usuario) => dispatch(getUsuario(id_usuario)),  
        desativarUsuario: (nome, id_usuario) => dispatch(desativarUsuario(nome, id_usuario)),      
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Usuario)