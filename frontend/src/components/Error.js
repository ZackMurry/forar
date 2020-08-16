import React from 'react'
import { Grid, Typography, Snackbar } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import { GlobalContext } from '../context/GlobalState'
import PlainSnackbar from './PlainSnackbar'

const clickableTextStyle = {
    cursor: 'pointer', 
    color: green[500], 
    marginLeft: 6
}

//todo make this look better
function Error(props) {

    const { authenticated } = React.useContext(GlobalContext)
    const [ bugValue, setBugValue ] = React.useState('')

    const handleBugSubmission = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                url: window.location.href,
                authenticated: authenticated
            })
        }

        //reporting bug to server
        const response = await fetch('api/v1/bugs/404', requestOptions).catch(err => console.log(err))
        
        //giving some info to the user
        const body = await response.text()
        try {
            setBugValue(JSON.parse(body))
            setTimeout(() => {
                props.history.goBack()
            }, 2500)
        } catch (e) {
            console.log(e)
            setTimeout(() => {
                props.history.goBack() //sending user back to last page
            }, 2500)
        }

    }

    return (
        <>
            <Grid container justify = "center"
                spacing={0}
                direction="column"
                alignItems="center"
                style={{ minHeight: '82.5vh' }}
            >
                <div style={{textAlign: 'center'}}>   
                    <Typography variant='h3'>
                        Error! Page not found.
                    </Typography>
                    <div style={{color: '#757575', display: 'inline-flex'}}>
                        <Typography variant='h5'>
                            404. If you believe this is a mistake by the website, you can
                        </Typography>
                        <Typography variant='h5' style={clickableTextStyle} onClick={handleBugSubmission}>
                            report a bug
                        </Typography>
                        <Typography variant='h5'>
                            .
                        </Typography>
                    </div>

                    <br />

                    <div style={{color: '#757575', display: 'inline-flex'}}>
                        <Typography variant='h5'>
                            It takes one click and helps ensure that it won't happen again.
                        </Typography>
                    </div>
                    
                    <br />
                    
                    <div style={{color: '#757575', display: 'inline-flex'}}>
                        <Typography variant='h5'>
                            Alternatively, you can go
                        </Typography>
                        <Typography variant='h5' style={clickableTextStyle} onClick={() => props.history.goBack()}>
                            back to safety
                        </Typography>
                        <Typography variant='h5'>
                            .
                        </Typography>
                    </div>
                    
                    
                </div>
                
            </Grid>

            <PlainSnackbar
                message={
                    bugValue !== -1 
                    ? 
                    (bugValue === 0 
                        ? 
                            'You reported a unique bug! Going back to safety.' 
                            : 
                            'Successfully reported bug. This bug has been reported ' + bugValue + ' time' + 
                                (bugValue === 1 
                                    ? 
                                    '' 
                                    : 
                                    's' )
                                + ' before. Returning to safety') 
                        : 
                        "Error while submitting bug. Going back to safety."
                }
                duration={5000}
                value={bugValue !== ''}
                onClose={() => console.log('snackbar close')}
            />
        </>
    )
}

export default Error