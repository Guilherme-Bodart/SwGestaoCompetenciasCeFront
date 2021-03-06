import React , { Component} from 'react';
import { connect } from 'react-redux';

import Sidelogo from "../../components/Sidebar/Sidelogo"
import sidebar from "../../assets/sidebar-3.jpg";


import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

import { FaMedapps, FaUsers, FaSitemap, FaGripHorizontal, FaTasks, FaToolbox, FaChartBar } from 'react-icons/fa';
import { AiOutlineDashboard } from 'react-icons/ai';


const initialState = {
}

class NavbarP extends Component {

  constructor(props) {
    super(props)
    this.state = initialState
  }
  
  iconMenuItem(icon) {
    var styleIcon = {fontSize:"2.6em", color:"white"}
    switch (icon) {
      case 'FaMedapps':
        return <FaMedapps style={styleIcon}/>

      case 'AiOutlineDashboard':      
        return <AiOutlineDashboard style={styleIcon}/>;

      case 'FaSitemap':    
        return <FaSitemap style={styleIcon}/>;

      case 'FaUsers':
        return <FaUsers style={styleIcon}/>;

      case 'FaGripHorizontal':
        return <FaGripHorizontal style={styleIcon}/>;
      
      case 'FaTasks':
        return <FaTasks style={styleIcon}/>;
      
      case 'FaToolbox':
        return <FaToolbox style={styleIcon}/>;
      
      case 'FaChartBar':
        return <FaChartBar style={styleIcon}/>;
                
      default:
        break;
    }
  }
  render(props) {
    
    var styleMenuItem = {fontSize:"1.21em", color:"white", marginLeft:"0.4em", fontWeight:"500", marginTop:"0.7em"}
    
    var menuItem = this.props.listaMenuItem.map( item => 
      {
        var iconMenu = this.iconMenuItem(item.icon) 
        return(
          <MenuItem onClick={()=>{
                      item.view()
                    }}
                icon={iconMenu} style={styleMenuItem}>
                {item.nome}
                </MenuItem>)
      }
    )



    return (
        <div className="sidebar-background" style={{height:"100%", width:"20vw", opacity:"0.8", backgroundImage:"url(" + sidebar + ")",}}>
            <Sidelogo/>
            <div style={{height:"100vh", width:"20vw", opacity:"0.5"}}>
            <ProSidebar width="20vw" collapsed>
              <Menu >
                {menuItem}
              </Menu>
            </ProSidebar>

            </div>
        </div>
      );
    
  }
}
const mapStateToProps = ({ usuario }) => {
  return {
      usuario,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavbarP)

