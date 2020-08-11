import React from 'react'
import MainPage from './components/MainPage'
import SomePage from './components/SomePage'
import Error from './components/Error'
import NavigationBar from './components/NavigationBar'
import Login from './components/Login'
import { HashRouter, Route, Switch } from 'react-router-dom'
import AccountPage from './components/Account.js'
import SignUp from './components/SignUp'
import { CookiesProvider } from 'react-cookie'
import { GlobalProvider } from './context/GlobalState'
import { ThemeProvider } from '@material-ui/core'
import {theme} from './theme'
import UserPage from './components/UserPage'
import PostPage from './components/PostPage'

const config = {
  issuer: 'http://localhost:8080/login/oauth2/code/okta',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '0oaolzlceKJBBmFQL4x6'
};

function App() {


  const nopad = {
    padding: 0,
    margin: 0
  };

  return (
    <GlobalProvider>
      <CookiesProvider>
        <HashRouter>
          <ThemeProvider theme={theme}>
            <NavigationBar />
            <main style={nopad}>
              <Switch>
                <Route path="/" component={MainPage} exact />
                <Route path="/about" component={SomePage} exact />
                <Route path="/login" component={Login} />
                <Route path="/account" component={AccountPage} />
                <Route path="/signup" component={SignUp} />
                <Route path="/users/:username" component={UserPage} />
                <Route path="/posts/:id" component={PostPage} />
                <Route component={Error} />
              </Switch>
            </main>
          </ThemeProvider>
        </HashRouter>
      </CookiesProvider>
    </GlobalProvider>
  )
}


export default App;
