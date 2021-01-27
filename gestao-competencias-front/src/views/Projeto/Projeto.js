import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from "react-bootstrap/Button"
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'

import '../../styles/principal.css'
import { FaPlus } from 'react-icons/fa';


const initialState = {
  }

class Projeto extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    render(props){
    //   if(!this.props.usuario.logado){
    //     return <Redirect to ="/"/>
    //   }
        return(
            
            <Container fluid>
                <Row>
                <p className="App-text-logo" style={{marginLeft:"1em", marginTop:"0.5em"}}>Projetos</p>
                <Button className="ml-auto" variant="outline-secondary" 
                style={{marginRight:"1em", marginTop:"1em", height:"3em", width:"3em" }}><FaPlus/></Button>
                </Row>
                <Table responsive style={{backgroundColor:"#ccc"}}>
                    <thead>
                        <tr>
                        <th>#</th>
                        {Array.from({ length: 12 }).map((_, index) => (
                            <th key={index}>Table heading</th>
                        ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            {Array.from({ length: 12 }).map((_, index) => (
                                <td key={index}>Table cell {index}</td>
                            ))}
                        </tr>
                        <tr>
                            <td>2</td>
                            {Array.from({ length: 12 }).map((_, index) => (
                                <td key={index}>Table cell {index}</td>
                            ))}
                        </tr>
                        <tr>
                            <td>3</td>
                            {Array.from({ length: 12 }).map((_, index) => (
                                <td key={index}>Table cell {index}</td>
                            ))}
                        </tr>
                    </tbody>
                </Table>
            </Container>
          
        )
    }
}

const mapStateToProps = ({  }) => {
    return {
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Projeto)