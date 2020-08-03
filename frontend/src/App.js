import React from 'react'
import MainPage from './components/MainPage'
import SomePage from './components/SomePage'
import Error from './components/Error'
import NavigationBar from './components/NavigationBar'
import Login from './components/Login'
import { HashRouter, Route, Switch, BrowserRouter } from 'react-router-dom'
import AccountPage from './components/Account.'

function App() {

  const nopad = {
    padding: 0,
    margin: 0
  };

  return (
    <BrowserRouter>
        <NavigationBar />
        <main style={nopad}>
            <Switch>
                <Route path="/" component={MainPage} exact />
                <Route path="/about" component={SomePage} />
                <Route path="/login" component={Login} />
                <Route path="/account" component={AccountPage} />
                <Route component={Error} />
            </Switch>
        </main>
    </BrowserRouter>
  )
}

export default App;
