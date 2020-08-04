import React from 'react'
import MainPage from './components/MainPage'
import SomePage from './components/SomePage'
import Error from './components/Error'
import NavigationBar from './components/NavigationBar'
import Login from './components/Login'
import { HashRouter, Route, Switch } from 'react-router-dom'
import AccountPage from './components/Account.'
import SignUp from './components/SignUp'

function App() {

  const nopad = {
    padding: 0,
    margin: 0
  };

  return (
    <HashRouter>
        <NavigationBar />
        <main style={nopad}>
            <Switch>
                <Route path="/" component={MainPage} exact />
                <Route path="/about" component={SomePage} />
                <Route path="/login" component={Login} />
                <Route path="/account" component={AccountPage} />
                <Route path="/signup" component={SignUp} />
                <Route component={Error} />
            </Switch>
        </main>
    </HashRouter>
  )
}

export default App;
