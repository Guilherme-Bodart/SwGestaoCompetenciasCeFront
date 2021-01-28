import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from "react-bootstrap/Button"
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import DropdownButton from 'react-bootstrap/DropdownButton'

import '../../styles/principal.css'
import { FaPlus } from 'react-icons/fa';
import { BsThreeDotsVertical } from "react-icons/bs";

import { pageCadastrarSubCategoria } from '../../store/actions/adminView/adminView'


const initialState = {
  }

class Categoria extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    handleSubmit(event){
        event.preventDefault()    
      }

    render(props){
    //   if(!this.props.usuario.logado){
    //     return <Redirect to ="/"/>
    //   }
        return(
            
            <Container fluid>
                <Row>
                <p className="App-text-logo" style={{marginLeft:"1em", marginTop:"0.5em"}}>Criar Categoria</p>
                
                </Row>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control required placeholder="Nome da Subcategoria" />
                        </Form.Group>
                    </Form.Row>

                    <Button variant="primary" type="submit"
                     onClick={()=>{
                        this.props.pageCadastrarSubCategoria()
                    }}>
                        Criar Categoria
                    </Button>
                    </Form>
            </Container>
          
        )
    }
}

const mapStateToProps = ({ adminView }) => {
    return {
        adminView
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        pageCadastrarSubCategoria: () => dispatch(pageCadastrarSubCategoria()),
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Categoria)