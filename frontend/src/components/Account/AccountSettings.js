import React, { useEffect, useState } from 'react'
import { Paper, Grid, TextField, FormLabel, Typography, Button } from '@material-ui/core'
import { GlobalContext } from '../../context/GlobalState'
import BugReportSnackbar from '../Snackbars/BugReportSnackbar'

export default function AccountSettings ( props ) {

    const { authenticated } = React.useContext(GlobalContext)

    const [ user, setUser ] = useState('')
    const [ newName, setNewName ] = useState('')
    const [ newBio, setNewBio ] = useState('')
    const [ submitted, setSubmitted ] = useState(false)
    const [ showErrorSnackbar, setShowErrorSnackbar ] = useState (false)

    useEffect(() => {
        async function getData() {
            if(authenticated) { //todo redirect to login if unauthenticated
                
                //getting current setting from api
                const response = await fetch('/api/v1/users/current')
                const body = await response.text()
                try {
                    const parsedUser = JSON.parse(body)
                    setUser(parsedUser)
                } catch (e) {
                    console.log(e)
                }
            }
            else {
                window.location.href = '//' + window.location.hostname + ':8080/oauth2/authorization/okta'; //todo change for hosting
            }
        }
        getData()
    }, [ user, setUser, authenticated ]
    )

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        if(name === 'bio') setNewBio(value)
        else if(name === 'name') setNewName(value)
        console.log(value)
    }

    const handleSubmit = (event) => {
        const requestOptions = {
            method: 'OPTIONS',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: newName ? newName : user.username,
                bio: newBio ? newBio : user.bio
            })
        }
        fetch('/api/v1/users/current/settings', requestOptions).then(response => response ? setSubmitted(true) : setSubmitted(false)).catch(err => console.log(err))
        
        if(!submitted) {
            setShowErrorSnackbar(true)
        } else setShowErrorSnackbar(true)

        event.preventDefault()
    }

    const handleSnackbarClose = (event, reason) => {
        if(reason === 'clickaway') {
            return;
        }
        setShowErrorSnackbar(false)
    }

    const handleBugReport = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                url: window.location.href,
                authenticated: authenticated
            })
        }
        fetch('/api/v1/bugs/account-settings-form-error', requestOptions)

        setTimeout(() => {
            props.history.goBack() //sending user back to last page
        }, 1000)
    }

    return (
        <>
            <Grid container justify = "center"
                spacing={0}
                direction="column"
                alignItems="center"
                style={{ minHeight: '82.5vh' }}
            >
                <Paper elevation={5} style={{padding: 50, alignContent: 'center', alignItems: 'center'}}>
                    {
                        user &&
                            <div>
                                <Typography variant='h4' style={{margin: 25, textAlign: 'center'}}>
                                    Edit settings
                                </Typography>
                                <form onSubmit={handleSubmit} onChange={handleChange} id='settings' style={{textAlign: 'center'}}>

                                    {/* name */}
                                    <div style={{display: 'inline-flex'}}>
                                        <FormLabel style={{marginRight: 10, marginTop: 8.5}}>
                                            Name
                                        </FormLabel>
                                        <TextField id='name' name='name' multiline spellCheck={false} defaultValue={user ? user.username : ''} style={{marginTop: 0, paddingTop: 0, verticalAlign: 'bottom', color: '#dbdbdb'}}/>
                                    </div>

                                    <br />

                                    {/* bio */}
                                    <div style={{display: 'inline-flex', margin: 20}}>
                                        <FormLabel style={{marginRight: 30, marginTop: 8.5}}>
                                            Bio
                                        </FormLabel>
                                        <TextField id='bio' name='bio' multiline defaultValue={user ? user.bio : ''} style={{marginTop: 0, paddingTop: 0, verticalAlign: 'bottom', color: '#dbdbdb'}}/>
                                    </div>
                                    
                                    {/* submit */}
                                    <div style={{display: 'block', margin: 25, marginTop: 35}}>
                                        <Button variant='contained' color='primary' label='submit' type='submit' style={{color: 'white'}}>
                                            Save changes
                                        </Button>
                                    </div>                            
                                </form>
                            </div>
                    }

                    {
                        !user &&
                            <div>
                                <Typography variant='h3' style={{margin: 100, textAlign: 'center'}} >
                                    Redirecting to login page...
                                </Typography>
                            </div>
                    }
                </Paper>
            </Grid>
            <BugReportSnackbar 
                message='An error occurred while submitting form.'
                open={showErrorSnackbar}
                onClose={handleSnackbarClose}
                onReport={handleBugReport}
                duration={5000}
            />
        </>
    )
}