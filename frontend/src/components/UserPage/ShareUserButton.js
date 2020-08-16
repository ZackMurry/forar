import React from 'react'
import { IconButton } from '@material-ui/core'
import { Share } from '@material-ui/icons';
import GreenTooltip from '../GreenTooltip';
import { green } from '@material-ui/core/colors';

export default function ShareUserButton ({ user }) {

    const handleClick = () => {
        //copying link to clipboard
        //todo switch this if i end up handling things by email
        navigator.clipboard.writeText('localhost:8080/#/users/' + user.username.split(' ').join('_&_')) //todo change if i ever want to host this    
    }

    return (
        <GreenTooltip title='Share' enterDelay={1000} leaveDelay={500}>
            <IconButton aria-label='share' style={{color: green[500]}} onClick={handleClick}>
                <Share fontSize='large'/>
           </IconButton>
        </GreenTooltip>


    )

}