import React from 'react';

class App extends React.Component {


    constructor() {
        super()
        this.state = {
            message: "message"
        };
    }
    

    componentDidMount() {
        fetch('/api/v1/test')
        .then(response => response.text())
        .then(message => {
            this.setState({message: message});
        });
    }


    render() {
        
        return (
            <div>
                <h1>React!</h1>
                {
                    this.state.message !== "message" ? <h1>{this.state.message}</h1> : <h1>Loading...</h1>
                }
            </div>
            
        )
    }
}

export default App;