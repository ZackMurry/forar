import React from 'react'
import { Card, CardHeader, CardContent, Avatar, Typography } from '@material-ui/core'
import {theme} from './../theme'
import { ThemeProvider, useTheme } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import { NavLink } from 'react-router-dom'

export default function Post({ post }) {

    const theme = useTheme()
    console.log(post.username)
    console.log(post.username.split(' ').join('_&_'))

    return (
        <div style={{display: 'flex', justifyContent: 'center', margin: 50}}>
            <ThemeProvider theme={theme}>
                <Card style={{width: '42.5%'}} elevation={3}>
                    <CardHeader
                        avatar={
                            <Avatar style={{backgroundColor: green[500]}}>
                                {post.username.substring(0,1)}
                            </Avatar>
                        }
                        title={
                            <Typography variant='h5' style={{margin: 0}}>{post.title}</Typography>
                        }
                        subheader={
                            <NavLink to={"/users/" + post.username.split(' ').join('_&_')} >{post.username + ' —— ' + post.simpleTime}</NavLink>
                        }
                    >
                        {post.title}
                    </CardHeader>
                    <CardContent>
                        <Typography variant='h6' style={{marginLeft: 20}}>{post.body}</Typography>
                    </CardContent>
                </Card>
            </ThemeProvider>
        </div>
    )


}