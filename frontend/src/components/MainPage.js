import React from 'react'
import NavigationBar from './NavigationBar';



class MainPage extends React.Component {
  constructor() {
    super();
    this.state={
      searchfor: "test"
    }
  }


  handleSubmit(data) {
    console.log(data.target.value)
    this.setState({searchfor: data.target.value})
  }

  render() {

    

    return (
      <h1>Main</h1>
      
    );
  }
  
}

export default MainPage;