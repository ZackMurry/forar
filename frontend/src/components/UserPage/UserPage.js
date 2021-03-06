import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { Typography, Paper } from '@material-ui/core';
import UserAvatar from '../UserAvatar';
import Grid from '@material-ui/core/Grid'
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/styles';
import UserDescription from './UserDescription';
import UserPageTabs from './UserPageTabs';

const styles = theme => ({
    root: {
      primary: theme.palette.primary,
      secondary: theme.palette.secondary
    },
  });



//todo add bio and stuff
//todo add another page for the current user's page (at /me or something)
//todo add functionality for users to put links to their instagrams and stuff
//todo return to home page if user not found
function UserPage () {
    
    
    const [ user, setUser ] = React.useState('')
    const [ posts, setPosts ] = React.useState([])
    const [ likedPosts, setLikedPosts ] = React.useState([])
    const [ dislikedPosts, setDislikedPosts ] = React.useState([])
    const { email } = useParams();

    useEffect(() => {
        async function getData() {
            //todo probly make snackbars for if these fail using try catches
            const userResponse = await fetch('/api/v1/users/email/' + email)
            const userBody = await userResponse.text()
            const userParsed = JSON.parse(userBody)
            if(userBody) {
                setUser(userParsed)
            } else console.log('set user failed')
                
            const dislikedResponse = await fetch('/api/v1/likes/user/' + email + '/dislikes')
            const dislikedBody = await dislikedResponse.text()
            if(dislikedBody) {
                setDislikedPosts(JSON.parse(dislikedBody))
            } else console.log('set disliked posts failed')

            const likedResponse = await fetch('/api/v1/likes/user/' + email + '/likes')
            const likedBody = await likedResponse.text()
            if(likedBody) {
                setLikedPosts(JSON.parse(likedBody))
            } else console.log('set liked posts failed')
            
            const postsResponse = await fetch('/api/v1/users/email/' + email + '/posts')
            const postsBody = await postsResponse.text()
            if(postsBody) {
                setPosts(JSON.parse(postsBody))  
            } else console.log('set posts failed')

        }
        if(!user) {
            getData()
        }
      }, [user, setUser, posts, setPosts, likedPosts, setLikedPosts, dislikedPosts, setDislikedPosts, email]
    );

    

    
      

    return (
        <>
            <div style={{marginTop: 50}}></div>
            
            {/* using vh for horizontal components because i want to make the avatar a circle */}
            <Grid container direction="row" alignItems="center" style={{paddingLeft: '5vh'}}>
                    <UserAvatar username={user.username} height='20vh' width='20vh' fontSize={96}/>
                    <Typography 
                        variant='h1' 
                        component='pre'
                        style={{textDecoration: 'underline', textDecorationColor: green[700], paddingLeft: '3vh'} /* underline the same as avatar color? */}
                    >
                        {user.username ? user.username : '               '}
                    </Typography> 

            </Grid>

            { user !== '' && <UserDescription user={user}/> }
            

            <Paper elevation={5} style={{marginTop: 50, paddingBottom: 500}}>
                
                
                <Paper elevation={5} style={{paddingBottom: 500}}>

                    

                    <UserPageTabs posts={posts} likedPosts={likedPosts} dislikedPosts={dislikedPosts} />
                </Paper>
            </Paper>
            

            
        </>
    )

}

export default withStyles(styles)(UserPage)