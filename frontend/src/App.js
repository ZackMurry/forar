import React from 'react'
import MainPage from './components/MainPage'
import SomePage from './components/SomePage'
import Error from './components/Error'
import NavigationBar from './components/NavigationBar'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <NavigationBar />
        <main>
            <Switch>
                <Route path="/" component={MainPage} exact />
                <Route path="/about" component={SomePage} />
                <Route component={Error} />
            </Switch>
        </main>
    </BrowserRouter>
  )
}

export default App;
