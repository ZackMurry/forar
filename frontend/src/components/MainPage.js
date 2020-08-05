import React from 'react'
import { Container, Button } from '@material-ui/core'
import { withCookies} from 'react-cookie';
import { Link, withRouter } from 'react-router-dom'

class MainPage extends React.Component {
  

  state = {
    isLoading: true,
    isAuthenticated: false,
    user: undefined
  };

  constructor(props) {
    super(props);
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

    console.log(this.state.isAuthenticated)
    const message = this.state.isAuthenticated ?
      <h2>Welcome, {this.state.user}!</h2> :
      <p>Please log in to post.</p>;

    const button = this.state.isAuthenticated ?
      <div>
        <br/>
        <Button color="link" onClick={this.logout}>Logout</Button>
      </div> :
      <Button color="primary" onClick={this.login}>Login</Button>;

    return (
      <div>
        <Container fluid>
          {message}
          {button}
        </Container>
      </div>
    );
  }
  
}

export default withCookies(withRouter(MainPage));