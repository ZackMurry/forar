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

export default class Login extends React.Component {

    constructor() {
        super()
        this.state = {
            username: "username_default",
            password: "password_default"
        }
    }

    handleChangeUsername = (event) => {
        this.setState({
            'username': event.target.value,
            'password': this.state.password
        })
        console.log(this.state.username)
    }

    handleChangePassword = (event) => {
        this.setState({
            'username': this.state.username,
            'password': event.target.value
        })
        console.log(this.state.password)
    }
    
    handleSubmit = async () => {
        console.log('submit')
        console.log(this.state.username)
        const response = await fetch('/api/v1/authenticateUser',{
            body: {
                username: this.state.username,
                password: this.state.password
            }
        })
        console.log(response)

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
                                Login
                                </Typography>
                                <form 
                                    style={{paddingTop: 12, paddingBottom:12}}
                                >
                                    <InputLabel htmlFor='username'>Username</InputLabel>
                                    <Input id='username' type='text' onChange={e => this.handleChangeUsername(e)}/>
    
                                    <InputLabel htmlFor='password' style={{marginTop:12}}>Password</InputLabel>
                                    <Input id='password' type='password' color="primary" onChange={e => this.handleChangePassword(e)}/>
                                    
                                    <br />
                                    
                                    <Button 
                                        variant='contained' 
                                        color='primary' 
                                        text='submit' 
                                        style={{color:'#ffffff', marginTop: 20}}
                                        onClick={this.handleSubmit}
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