import React from 'react'
import MainPage from './components/MainPage'
import SomePage from './components/SomePage'
import Error from './components/Error'
import NavigationBar from './components/NavigationBar'
import Login from './components/Login'
import { HashRouter, Route, Switch } from 'react-router-dom'
import MePage from './components/Account/MePage.js'
import SignUp from './components/SignUp'
import { CookiesProvider } from 'react-cookie'
import { GlobalProvider } from './context/GlobalState'
import { ThemeProvider } from '@material-ui/core'
import {theme} from './theme'
import UserPage from './components/UserPage/UserPage'
import PostPage from './components/Posts/PostPage'
import AccountSettings from './components/Account/AccountSettings'
import FollowerPage from './components/UserPage/Followers/FollowerPage'
import FollowingPage from './components/FollowPage'

/*const config = {
  issuer: 'http://localhost:8080/login/oauth2/code/okta',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '0oaolzlceKJBBmFQL4x6'
};*/

//defo shoulda used next.js
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
                <Route path="/me" component={MePage} exact />
                <Route path="/me/settings" component={AccountSettings} exact />
                <Route path="/signup" component={SignUp} />
                <Route path="/users/:email/followers" component={FollowerPage} />
                <Route path="/users/:email" component={UserPage} />
                <Route path="/posts/:id" component={PostPage} />
                <Route path="/following" component={FollowingPage} exact/>
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
