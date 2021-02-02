import React, { Component } from "react";
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'


import '../../styles/principal.css'

const initialState = {

}

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    render(props){

        return(
            
            <Container fluid>
                <Row>
                <p className="App-text-logo" style={{marginLeft:"1em", marginTop:"0.5em"}}>Dashboard</p>
                </Row>
                Em construção
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
  export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)