import React from 'react'
import { Typography } from '@material-ui/core'

export default function Bio ({ user }) {
    return (
        //bio limit 250 chars
        //todo replace lorem ipsum with user.bio
        <div style={{marginTop: '1%', width: '60%'}}>
            <Typography variant='h5' style={{marginLeft: '28vh', lineHeight: 1.25}}>
                {user.bio}
            </Typography>
        </div>
        
    )
}