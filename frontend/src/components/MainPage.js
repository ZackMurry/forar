import React from 'react'
import { Container } from '@material-ui/core'
import { withCookies} from 'react-cookie';
import { withRouter } from 'react-router-dom'
import CreatePostForm from './CreatePostForm/CreatePostForm.js';

class MainPage extends React.Component {
  

  state = {
    isLoading: true
  };
  

  render() {

    const message = this.state.isAuthenticated ?
      <h2>Welcome, {this.state.user}!</h2> :
      <p>Please log in to post.</p>;

    return (
      <div>
        <Container fluid>
          {message}
        </Container>
        <CreatePostForm />
      </div>
    );
  }
  
}

export default withCookies(withRouter(MainPage));