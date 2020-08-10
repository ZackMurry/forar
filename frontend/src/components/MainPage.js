import React from 'react'
import { Container } from '@material-ui/core'
import { withCookies} from 'react-cookie';
import { withRouter } from 'react-router-dom'
import CreatePostForm from './CreatePostForm/CreatePostForm.js';
import { GlobalContext } from '../context/GlobalState.js';
import PostList from './PostList'

class MainPage extends React.Component {
  
  static contextType = GlobalContext

  state = {
    isLoading: true
  };
  

  render() {

    // const message = this.context.authenticated ?
    //   <h2>Welcome, {this.context.username}!</h2> :
    //   <p>Please log in to post.</p>;

    return (
      <div>
        <Container fluid='true'>
          {/*message*/}
        </Container>
        <CreatePostForm />
        <PostList />
      </div>
    );
  }
  
}

export default withCookies(withRouter(MainPage));