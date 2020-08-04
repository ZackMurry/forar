import React from 'react'
import { Paper, Typography, Grid, Input, InputLabel, Button } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';


var theme = createMuiTheme({
    palette: {
      primary: green,
      secondary: {
        main: '#4caf50'
      }
    },
  });

export default class SignUp extends React.Component {

    constructor() {
        super()
        this.state = {
            username: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
        console.log(event.target.value)
    }
    
    handleSubmit = () => {
        console.log(this.state.username)
        
    }

    

    render() {

        return(
            <div>
                <ThemeProvider theme={theme}>
                        <Grid container justify = "center"
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            style={{ minHeight: '82.5vh' }}
                        >
                            <Paper elevation={5} style={{margin:'0%', padding:50, alignContent:'center', textAlign:'center'}}>
                                <Typography variant="h5" component="h3" style={{textAlign:'center'}}> 
                                Sign up
                                </Typography>
                                <form 
                                    onSubmit={this.handleSubmit}
                                    style={{paddingTop: 12, paddingBottom:12}}
                                >
                                    <InputLabel htmlFor='username'>Username</InputLabel>
                                    <Input id='username' type='text' onChange={event => this.handleChange(event)}/>
    
                                    <InputLabel htmlFor='password' style={{marginTop:12}}>Password</InputLabel>
                                    <Input id='password' type='password' color="primary" onChange={event => this.handleChange(event)}/>
                                    
                                    <br />
                                    
                                    <Button 
                                        variant='contained' 
                                        color='primary' 
                                        text='submit' 
                                        style={{color:'#ffffff', marginTop: 20}}
                                        onSubmit={this.handleSubmit}
                                        >
                                        Submit
                                    </Button>
                                </form>
                            </Paper>
                        </Grid>
                    
                </ThemeProvider>
                
                
            </div>

        )

    }
    
}