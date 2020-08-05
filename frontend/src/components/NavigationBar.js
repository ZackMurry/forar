import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import { Button, Toolbar, ThemeProvider } from '@material-ui/core'
import {AppBar, Typography } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles';
import { withCookies} from 'react-cookie';
import { green } from '@material-ui/core/colors';


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

  constructor(props) {
    super();
    this.state = {
      redirect: null,
      isAuthenticated: false
    }
    const {cookies} = props;
    this.state.csrfToken = cookies.get('XSRF-TOKEN');
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    const response = await fetch('/api/v1/user');
    const body = await response.text();
    console.log(body)
    console.log(response)
    if (body === ' ') {
      this.setState(({isAuthenticated: false}))
    } else {
      this.setState({isAuthenticated: true, user: body})
    }
  }

  handleChange(data) {
    console.log(data)
  }

  login() {
    let port = (window.location.port ? ':' + window.location.port : '');
    if (port === ':3000') {
      port = ':8080';
    }
    window.location.href = '//' + window.location.hostname + port + '/login';
  }

  logout() {
    fetch('/api/v1/logout', {method: 'POST', credentials: 'include',
      headers: {'X-XSRF-TOKEN': this.state.csrfToken}}).then(res => res.json())
      .then(response => {
        window.location.href = response.logoutUrl + "?id_token_hint=" +
          response.idToken + "&post_logout_redirect_uri=" + window.location.origin;
      });
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
          <AppBar position="static" style={{minHeight: '7vh'}}>
            <Toolbar>
              <img src={Logo} style={{paddingRight:10}} alt="icon-white"/>
              <Typography variant="h4" style={style}>
                Forar
              </Typography>
              <Button 
                style={whiteStyle} 
                onClick={this.state.isAuthenticated ? this.logout : this.login}
                >
                {this.state.isAuthenticated ? "Logout" : "Login" }
              </Button>
            </Toolbar>
          </AppBar>
        </div>
      </ThemeProvider>
        
        
    )

  }
    
}

export default withCookies(withRouter(NavigationBar))