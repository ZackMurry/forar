import React from 'react'
import { Paper, Typography } from '@material-ui/core'

//a little bar to display user information that is useful for displaying lists of users
//todo avatar on left
//todo this
export default function UserBar({ username, email, points }) {


    return (
        <div style={{display: 'flex', textAlign: 'center'}} >
            <Paper elevation={3} style={{display: 'inline-flex', alignSelf: 'center'}} >
                <Typography variant='h6'>{ username }</Typography>
            </Paper>
        </div>
        
    )

}