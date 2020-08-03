import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Toolbar, ThemeProvider } from '@material-ui/core'
import {AppBar, Tabs, Tab, TextField, Typography, IconButton} from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles';
import { green, white } from '@material-ui/core/colors';


import { Redirect } from "react-router-dom";

var Logo = './ForarIconWhite.png'

var theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: {
      main: '#4caf50'
    }
  },
});

class NavigationBar extends React.Component {

    constructor() {
      super();
      this.state = {
        redirect: null
      }
    }

    

    handleChange(data) {
      console.log(data)
    }

    render() {

      const style = {
        flexGrow: 1,
        color: '#ffffff',
        marginLeft: 6,
        marginRight: 6
      }
      
      const whiteStyle = {
        color: '#ffffff'
      }


      if(this.state.redirect) {
        return <Redirect to={this.state.redirect} />
      }

      return (
        <ThemeProvider theme={theme}>
          <div>
            <div>
              <AppBar position="static" style={{padding:6}}>
                <Toolbar>
                  <img src={Logo} style={{paddingRight:10}} alt="icon-white"/>
                  <Typography variant="h4" style={style}>
                    Forar
                  </Typography>
                  <Button 
                    style={whiteStyle} 
                    component={Link} to={'/login'}
                    >
                    Login
                  </Button>
                </Toolbar>
              </AppBar>
            </div>
      
            <h1>Main page text</h1>
            <Button color="primary">Hello world</Button>

            <div>
              <Link to="/">Home </Link>
              <Link to="/about">About Us </Link>
            </div>
          </div>

        </ThemeProvider>
        
        
      )

    }
    
}

export default NavigationBar;