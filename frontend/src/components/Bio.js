import React from 'react'
import { Typography } from '@material-ui/core'

export default function Bio ({ user }) {

    return (
        //todo line wrap
        //bio limit 250 chars
        //todo replace lorem ipsum with user.bio
        <div style={{marginTop: '1%', width: '60%'}}>
            <Typography variant='h5' style={{marginLeft: '28vh', lineHeight: 1.25}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum mollis odio, sit amet auctor risus viverra sit amet. Vivamus lacinia lacinia leo nec elementum. Etiam ut erat viverra, euismod lectus quis, porttitor mauris.
            </Typography>
        </div>
        
    )
}