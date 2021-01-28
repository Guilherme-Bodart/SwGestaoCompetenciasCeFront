import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from "react-bootstrap/Button"
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'


import { getUsuarios } from '../../store/actions/usuarios/usuario'


import '../../styles/principal.css'

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

        const usuarios = this.props.usuario.getUsuarios.usuarios.map( usuario => 

            <tr>
                <td>1</td>
                <DropdownButton variant="dark" id="dropdown-basic-button" title="..." style={{marginLeft:"1em", marginTop:"1em"}}>
                    <Dropdown.Item href="#">Editar</Dropdown.Item>
                    <Dropdown.Item href="#">Apagar</Dropdown.Item>
                </DropdownButton>
                <td>{usuario.pessoa.nome}</td>
                <td>{usuario.pessoa.cpf}</td>
                <td>{usuario.email}</td>
                <td>{usuario.pessoa.dataNascimento.substr(0, 10).split('-').reverse().join('/')}</td>
            </tr>
            );


        return(
            
            <Container fluid>
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

const mapStateToProps = ({ adminView, usuario }) => {
    return {
        adminView,
        usuario
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        getUsuarios: () => dispatch(getUsuarios()),       
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Usuario)