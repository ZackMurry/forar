import React, { useEffect } from 'react'
import { Card, CardHeader, CardContent, CardActions, Typography, IconButton } from '@material-ui/core'
import { ThemeProvider, useTheme } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../context/GlobalState'
import { ThumbUpOutlined, ThumbUp, ThumbDownOutlined, ThumbDown, Share, FileCopy, Delete, Edit } from '@material-ui/icons'; //todo separate these into stuff like 'import Delete from '@material-ui/icons/Delete'
import GreenTooltip from '../GreenTooltip'
import UserAvatar from '../UserAvatar'
import PlainSnackbar from '../Snackbars/PlainSnackbar'
import PostFollowButton from './PostFollowButton'

//todo post editing?
//todo make posts wider on mobile/smaller screens.
//todo follow user from the post
//todo put some of these things in different components
export default function Post({ post, updateList, showSnackbar }) {

    const { authenticated, email } = React.useContext(GlobalContext)
    const [ liked, setLiked ] = React.useState('-2')
    const [ likeError, setLikeError ] = React.useState(false)
    const [ deleteError, setDeleteError ] = React.useState(false)

    const theme = useTheme()
    
    

    useEffect(() => {
        if (liked === '-2') {
            async function getData() {
                //getting if the principal likes the post
                if(!authenticated) {
                    setLiked(0);
                    return;
                }
                const likeResponse = await fetch('/api/v1/likes/post/' + post.id)
                const likeBody = await likeResponse.text()
                try {
                    setLiked(JSON.parse(likeBody))
                } catch (e) {
                    console.log(e)
                }

                
            }
            getData()
        }
      }, [ setLiked, liked, authenticated, post]
    );

    const handleLikeButton = async () => {
        if(liked === 1) {
            //set liked to default
            setLiked(0)
            const response = await fetch('/api/v1/likes/post/' + post.id + '/like', {method: 'DELETE'}) //todo not gonna use response unless i really want to get into debugging
            
            //error handling
            const text = await response.text()
            try {
                JSON.parse('p' + text)
            } catch (e){
                console.log(e)
                setLiked(1)
                setLikeError(true)
            }
        }
        else if(liked === 0) {
            //tell this component that it's liked
            setLiked(1) 
            
            //then tell the server that it's liked
            const response = await fetch('/api/v1/likes/post/' + post.id + '/like', {method: 'POST'})

            //error handling
            const text = await response.text()
            try {
                JSON.parse(text)
            } catch (e){
                console.log(e)
                setLiked(0)
                setLikeError(true)
            }
        }
        else if(liked === -1) {

            //for frontend
            setLiked(1)

            //for telling the server about this
            const response = await fetch('/api/v1/likes/post/' + post.id + '/like', {method: 'PUT'})
            
            //error handling
            const text = await response.text()
            try {
                JSON.parse(text)
            } catch (e){
                console.log(e)
                setLiked(-1)
                setLikeError(true)
            }
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
            
            //error handling
            const text = await response.text()
            try {
                JSON.parse(text)
            } catch (e){
                console.log(e)
                setLiked(1)
                setLikeError(true)
            }
        }
        else if(liked === 0) {
            //could only set liked to -1 on the else of error handling, but it wouldn't update as fast so idk
            setLiked(-1)

            //now telling the server
            const response = await fetch('/api/v1/likes/post/' + post.id + '/dislike', {method: 'POST'})
            
            //error handling
            const text = await response.text()
            try {
                JSON.parse(text)
            } catch (e){
                console.log(e)
                setLiked(0)
                setLikeError(true)
            }
        }
        else if(liked === -1) {
            setLiked(0) //removing the dislike, so setting it to default
            //telling the backend
            const response = await fetch('/api/v1/likes/post' + post.id + '/dislike', {method: 'DELETE'})
            
            //error handling
            const text = await response.text()
            try {
                JSON.parse(text)
            } catch (e){
                console.log(e)
                setLiked(0)
                setLikeError(true)
            }
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

    const handleDelete = async () => {
        const response = await fetch('/api/v1/posts/id/' + post.id, {method: 'DELETE'})

        //error handling
        const text = await response.text()
        try {
            JSON.parse(text)
            showSnackbar(true) //if successful, show that it has been deleted
            updateList() //updating the post list
        } catch (e){
            console.log(e)
            setDeleteError(true)
        }

        
        
    }

    const onLikeSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setLikeError(false);
    }

    const onDeleteSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setDeleteError(false);
    }
    

    return (
        post !== null &&
        <div style={{display: 'flex', justifyContent: 'center', margin: 50}}>
            <ThemeProvider theme={theme}>
                <Card style={{width: '42.5%'}} elevation={3}>
                    <CardHeader
                        avatar={
                            <UserAvatar username={post.username ? post.username : ' '}/>
                        }
                        title={
                            <Typography variant='h5' style={{margin: 0}}>{post.title}</Typography>
                        }
                        subheader={
                            <div style={{display: 'inline-block', float: 'left'}}>
                                <Link to={"/users/" + post.email} className='user_link' style={{color: '#757575'}}>{post.username}</Link>
                                <b>{' —— ' + post.simpleTime}</b>
                            </div>
                        }
                        action={
                            post.email === email ? 
                            // todo post editing and put tooltips here
                                <Edit style={{margin: 15, color: green[500]}} /> 
                            : 
                                <PostFollowButton email={post.email}/>
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
                            {
                                (authenticated && email === post.email) &&
                                <GreenTooltip title='Delete'>
                                    <IconButton aria-label='delete' onClick={handleDelete} style={{color: green[500]}}>
                                        <Delete />
                                    </IconButton>
                                </GreenTooltip>
                            }
                            <GreenTooltip title='Share'>
                                <IconButton aria-label='share' onClick={handleShare} style={{color: green[500]} /* don't know how i feel about this */}>
                                    <Share />
                                </IconButton>
                            </GreenTooltip>
                            <GreenTooltip title='Copy'>
                                <IconButton aria-label='copy' onClick={handleCopy} style={{color: green[500]}}>
                                    <FileCopy />
                                </IconButton>
                            </GreenTooltip>
                        </div>
                    </CardActions>
                </Card>
            </ThemeProvider>
            <PlainSnackbar
                message='Error occurred while rating post. Please refresh.'
                duration={5000}
                value={likeError}
                onClose={onLikeSnackbarClose}
            />
            <PlainSnackbar
                message='Error occurred while deleting post. Please refresh.'
                duration={5000}
                value={deleteError}
                onClose={onDeleteSnackbarClose}
            />
        </div>
        
    )


}