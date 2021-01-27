import { Component } from "react";
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Login from './pages/Login/Login';
import Recuperar from './pages/Recuperar/Recuperar';
import EnviarEmail from './pages/Recuperar/EnviarEmail';
import Admin from './pages/Principal/Admin';
import CriarConta from './pages/CriarConta/CriarConta';
import { pageLogin, pageCadastrar, pageRecuperar } from './store/actions/pages/page'

class App extends Component{
  render(props){
    return (
        <Switch>
          <Route exact path="/admin">
            <Admin />
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/cadastro/">
            <CriarConta />
          </Route>
          <Route path="/recuperar/:token">
            <Recuperar />
          </Route>
          <Route path="/enviarEmail/">
            <EnviarEmail />
          </Route>
          
        </Switch>
    )
  }
}

const mapStateToProps = ({ page }) => {
  return {
      page
  }
}

const mapDispatchToProps = dispatch => {
  return {
      pageLogin: () => dispatch(pageLogin()),
      pageRecuperar: () => dispatch(pageRecuperar()),
      pageCadastrar: () => dispatch(pageCadastrar()),
      
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)