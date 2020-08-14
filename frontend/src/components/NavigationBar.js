import React from 'react'
import { withRouter } from 'react-router-dom';
import { Button, Toolbar, ThemeProvider } from '@material-ui/core'
import {AppBar, Typography } from '@material-ui/core'
import { withCookies} from 'react-cookie';
import  {theme} from './../theme'
import { Redirect } from "react-router-dom";
import { GlobalContext } from '../context/GlobalState';

var Logo = './ForarIconWhite.png' //todo change this to a non-copywrited image if i wanna host


class NavigationBar extends React.Component {

  static contextType = GlobalContext

  constructor(props) {
    super();
    this.state = {
      loginRedirect: null,
      isAuthenticated: false,
      homePageRedirect: false
    }
    const {cookies} = props;
    this.state.csrfToken = cookies.get('XSRF-TOKEN')
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.handleLogoClick = this.handleLogoClick.bind(this)
    this.handleHomePageRedirect = this.handleHomePageRedirect.bind(this)
  }


  async componentDidMount() {
    const response = await fetch('/api/v1/user');
    const body = await response.text();
    console.log(body)
    console.log(response)
    const { authenticated, setAuthenticated, setUsername, email, setEmail } = this.context

    if (body === ' ' || body === null) {
      this.setState(({isAuthenticated: false}))
      if(authenticated) {
        setAuthenticated(false)
        setUsername(null)
        setEmail(null)
      }
    } else {
      this.setState({isAuthenticated: true, user: body})
      if(!authenticated) {
        setAuthenticated(true)
        setUsername(body)
        
        const emailBody = await (await fetch('api/v1/auth/email')).text()
        if(emailBody === ' ') {
          setEmail(null)
        }
        else {
          setEmail(emailBody)
        }
      }
    }
    

  }


  login() {
    let port = (window.location.port ? ':' + window.location.port : '');
    if (port === ':3000') {
      port = ':8080';
    }
    //window.location.href = '//' + window.location.hostname + port + '/login';
    window.location.href = '//' + window.location.hostname + port + '/oauth2/authorization/okta';
  }

  logout() {
    fetch('/api/v1/logout', {method: 'POST', credentials: 'include',
      headers: {'X-XSRF-TOKEN': this.state.csrfToken}}).then(res => res.json())
      .then(response => {
        window.location.href = response.logoutUrl + "?id_token_hint=" +
          response.idToken + "&post_logout_redirect_uri=" + window.location.origin;
      });
  }

  handleLogoClick() {
    this.setState({homePageRedirect: true})
  }

  handleHomePageRedirect() {
    this.setState({homePageRedirect: false})
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

    
    if(this.state.loginRedirect) {
      //todo might need to setState this to false here
      return <Redirect to={this.state.loginRedirect} />
    }
    if(this.state.homePageRedirect) {
      this.handleHomePageRedirect()
      return <Redirect push to='/' />
    }

    return (
      <ThemeProvider theme={theme}>
        <div>
          <AppBar position="static" style={{minHeight: '7vh'}}>
            <Toolbar>
              {/* todo align button in the middle (vertically) */}
              <button style={{backgroundColor: 'transparent', border: 'none', outline: 'none', cursor: 'pointer', position: 'relative', top: '50%', transform: 'translateY(+6.25%)'}}>
                <img src={Logo} style={{paddingRight: 10}} alt="icon-white" onClick={this.handleLogoClick}/>
              </button>
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