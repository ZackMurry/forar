import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import green from '@material-ui/core/colors/green'
import { Typography } from '@material-ui/core'

export default function UserAvatar({ username, width, height, fontSize }) {

    return (
        <Avatar style={{backgroundColor: green[500], width: width ? width : null, height: height ? height : null}} alt=''>
            <Typography style={{fontSize: fontSize}}>
                {username ? username.substring(0,1) : ''}
            </Typography>
        </Avatar>
    )


}

