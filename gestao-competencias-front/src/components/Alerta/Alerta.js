import React , { Component} from 'react';
import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';


import { alertout } from '../../store/actions/alertas/alerta'


const initialState = {
    open: false,
    alertTitle: '',
    severity: '',
    texto: ''
}

class Alerta extends Component {

  constructor(props) {
    super(props)
    this.state = initialState
  }

  onChangeOpen = () => {
    this.setState({ 
      open: true
    })
  }

  onChangeClose = () => {
    this.setState({ 
      open: false
    })
  }


  useStyles = () => {makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }))};


  render(props) {
    return (
        <Container  style={{paddingTop:"1em"}}>
            <Collapse in={this.props.alerta.open}> 
                <Row >
                    <Col>     
                        <Alert  severity = {this.props.severity}  action = {
                            <IconButton
                            aria-label="close"
                            color="inherit"
                            size="medium"
                            onClick={async () => {
                                await this.props.alertout()
                            }}
                            >
                            <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }>
                            <AlertTitle style={{fontWeight:"bold", fontSize:"1.8em",marginTop:"-0.4em",marginLeft:"-5em", marginBottom:"-0.2em"}}>{this.props.alertTitle}</AlertTitle>
                            {this.props.texto}
                        </Alert>
                    </Col>      
                </Row>
            </Collapse>
        </Container>
      );
    
  }
}
const mapStateToProps = ({ usuario, alerta }) => {
  return {
      usuario,
      alerta
  }
}
const mapDispatchToProps = dispatch => {
  return {
    alertout: () => dispatch(alertout()),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Alerta)

