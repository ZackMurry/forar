import React, { useEffect } from 'react'
import { Paper, Grid, TextField, FormLabel, Typography, Button } from '@material-ui/core'
import { GlobalContext } from '../../context/GlobalState'

export default function AccountSettings () {

    const { authenticated } = React.useContext(GlobalContext)

    const [ user, setUser ] = React.useState('')

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
        }
        getData()
    }, [ user, setUser, authenticated ]
)

    return (
        <Grid container justify = "center"
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            style={{ minHeight: '82.5vh' }}
                        >
            <Paper elevation={5} style={{padding: 50, alignContent: 'center', alignItems: 'center'}}>
                <Typography variant='h4' style={{margin: 25}}>
                    Edit settings
                </Typography>
                {
                    user &&
                        <form id='settings' style={{textAlign: 'center'}}>
                            <div style={{display: 'inline-flex'}}>
                                <FormLabel style={{marginRight: 10, marginTop: 8.5}}>
                                    Bio
                                </FormLabel>
                                <TextField id='bio' multiline defaultValue={user ? user.bio : ''} style={{marginTop: 0, paddingTop: 0, verticalAlign: 'bottom', color: '#dbdbdb'}}/>
                            </div>
                            <div style={{display: 'block', margin: 25, marginTop: 35}}>
                                <Button variant='contained' color='primary' label='submit' type='submit'>
                                    Save changes
                                </Button>
                            </div>                            
                        </form>
                    }
            </Paper>
        </Grid>
    )
}