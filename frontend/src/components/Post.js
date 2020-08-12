import React, { useEffect } from 'react'
import { Card, CardHeader, CardContent, CardActions, Avatar, Typography, IconButton } from '@material-ui/core'
import {theme} from './../theme'
import { ThemeProvider, useTheme } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalState'
import { ThumbUpOutlined, ThumbUp, ThumbDownOutlined, ThumbDown, Share, FileCopy } from '@material-ui/icons';

export default function Post({ post }) {

    const { authenticated } = React.useContext(GlobalContext)
    const [ liked, setLiked ] = React.useState('-2')

    const theme = useTheme()
    
    //todo check if user likes this
    const getLiked = async () => {
        if(!authenticated) return 0;
        const response = await fetch('/api/v1/likes/post/' + post.id)
        const body = await response.text()
        setLiked(JSON.parse(body))
    }

    useEffect(() => {
        if (liked === '-2') {
            getLiked()
        }
      }, [getLiked, setLiked, liked, authenticated, post]
    );

    const handleLikeButton = async () => {
        if(liked === 1) {
            //set liked to default
            setLiked(0)
            const response = await fetch('/api/v1/likes/post/' + post.id + '/like', {method: 'DELETE'}) //todo not gonna use response unless i really want to get into debugging
        }
        else if(liked === 0) {
            //tell this component that it's liked
            setLiked(1) 
            //then tell the server that it's liked
            const response = await fetch('/api/v1/likes/post/' + post.id + '/like', {method: 'POST'})
        }
        else if(liked === -1) {

            //for frontend
            setLiked(1)

            //for telling the server about this
            const response = await fetch('/api/v1/likes/post/' + post.id + '/like', {method: 'PUT'})
        }
        else {
            console.log('liked is not -1, 0, or 1: liked = ' + liked);
        }
    }

    const handleDislikeButton = async () => {
        if(liked === 1) {
            setLiked(-1)

            //telling the server
            const response = await fetch('/api/v1/likes/post/' + post.id + '/dislike', {method: 'PUT'})
        }
        else if(liked === 0) {
            setLiked(-1)
            //now telling the server
            const response = await fetch('/api/v1/likes/post/' + post.id + '/dislike', {method: 'POST'})
        }
        else if(liked === -1) {
            setLiked(0) //removing the dislike, so setting it to default
            //telling the backend
            const response = await fetch('/api/v1/likes/post' + post.id + '/dislike', {method: 'DELETE'})
        }
        else {
            console.log('liked is not -1, 0, or 1: liked = ' + liked);
        }

    }

    const handleShare = () => {
        //copying link to clipboard
        navigator.clipboard.writeText('localhost:8080/#/posts/' + post.id) //todo change if i ever want to host this
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(
            post.title + ' | By: ' + post.username +
            '\n' +
            post.body
        )
    }

    //todo subheader isn't on the same line
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
                            <div style={{display: 'inline-block', float: 'left'}}>
                                <Link to={"/users/" + post.username.split(' ').join('_&_')} className='user_link' style={{color: '#757575'}}>{post.username}</Link>
                                <b>{' —— ' + post.simpleTime}</b>
                            </div>
                        }
                    >
                    </CardHeader>
                    <CardContent>
                        <Typography variant='h6' style={{marginLeft: 20}}>{post.body}</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <div style={{float: 'left', width: '100%'}}>
                            <IconButton aria-label="like" onClick={handleLikeButton} disabled={!authenticated} >
                                { liked === 1 ? <ThumbUp /> : <ThumbUpOutlined /> }
                            </IconButton>
                            <IconButton aria-label="dislike" onClick={handleDislikeButton} disabled={!authenticated} >
                                { liked === -1 ? <ThumbDown /> : <ThumbDownOutlined />}
                            </IconButton>
                            <Typography variant='h5' style={{color: '#757575', padding: 0, display: 'inline-block'}}>
                                {post.votes /* probably want to handle if the user has (dis/)liked the post but hasn't refreshed */}
                            </Typography>
                        </div>
                        
                        <div style={{float: 'right', width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                            <IconButton aria-label='share' onClick={handleShare}>
                                <Share />
                            </IconButton>
                            <IconButton aria-label='copy' onClick={handleCopy}>
                                <FileCopy />
                            </IconButton>
                        </div>
                    </CardActions>
                </Card>
            </ThemeProvider>
        </div>
    )


}