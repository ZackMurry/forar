import React from 'react'
import { Paper, Typography, Grid, Input, InputLabel, Button, Box, Container } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green, white } from '@material-ui/core/colors';


var theme = createMuiTheme({
    palette: {
      primary: green,
      secondary: {
        main: '#4caf50'
      }
    },
  });

export default function Login() {

    const [state, setState] = React.useState({
        username: "",
        password: ""
    })

    function handleChange(event) {
        const value = event.target.value
        setState({
            ...state, //keeps the previous values of the other values in state
            [event.target.name]: value
        })
    }

    const formStyle = {
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center'
    }

    const jumboStyle = {
        marginTop: 20
    }

    

    return(
        <div>
            <ThemeProvider theme={theme}>
                    <Grid container justify = "center" container
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
                                method="post" 
                                action="/#/login" 
                                style={{paddingTop: 12, paddingBottom:12}}
                            >
                                <InputLabel htmlFor='username'>Username</InputLabel>
                                <Input id='username' type='text'/>

                                <InputLabel htmlFor='password' style={{marginTop:12}}>Password</InputLabel>
                                <Input id='password' type='password' color="primary" />
                                
                                <br />
                                
                                <Button 
                                    variant='contained' 
                                    color='primary' 
                                    text='submit' 
                                    style={{color:'#ffffff', marginTop: 20}}>
                                    Submit
                                </Button>
                            </form>
                        </Paper>
                    </Grid>
                
            </ThemeProvider>
            
            
        </div>
        
        
    )
    

    
}