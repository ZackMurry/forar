import React from 'react'
import { withRouter } from 'react-router-dom';
import { Toolbar, ThemeProvider } from '@material-ui/core'
import {AppBar, Typography } from '@material-ui/core'
import  {theme} from './../theme'
import { GlobalContext } from '../context/GlobalState';
import NavigationBarMenu from './NavigationBarMenu';

var Logo = './ForarIconWhite.png' //todo change this to a non-copywrited image if i wanna host


class NavigationBar extends React.Component {

  static contextType = GlobalContext

  constructor(props) {
    super();
    this.state = {
      loginRedirect: null,
      isAuthenticated: false
    }
  }


  async componentDidMount() {

    this.setState({homePageRedirect: false})
    const response = await fetch('/api/v1/user');
    const body = await response.text();
    console.log(body)
    console.log(response)
    const { authenticated, setAuthenticated, setUsername, setEmail } = this.context

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


  




  render() {
    const style = {
      flexGrow: 1,
      color: '#ffffff',
      marginLeft: 6,
      marginRight: 6
    }

    

    return (
      <ThemeProvider theme={theme}>
        <div>
          <AppBar position="static" style={{minHeight: '7vh'}}>
            <Toolbar>
              {/* todo align button in the middle (vertically) */}
              <button style={{backgroundColor: 'transparent', border: 'none', outline: 'none', cursor: 'pointer', position: 'relative', top: '50%', transform: 'translateY(+6.25%)'}}>
                {/* redirect only works because it's origin is the home page */}
                <img src={Logo} style={{paddingRight: 10}} alt="icon-white" onClick={() => window.location.href = window.location.origin}/>
              </button>
              <Typography variant="h4" style={style}>
                Forar
              </Typography>
              <NavigationBarMenu />
            </Toolbar>
          </AppBar>
        </div>
      </ThemeProvider>
        
        
    )

  }
    
}


export default withRouter(NavigationBar)