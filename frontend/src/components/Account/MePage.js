import React, { useEffect } from 'react'
import { GlobalContext } from '../../context/GlobalState'
import { Grid, Typography, Paper } from '@material-ui/core'
import green from '@material-ui/core/colors/green'
import UserAvatar from '../UserAvatar'
import UserDescription from '../UserPage/UserDescription'
import UserPageTabs from '../UserPage/UserPageTabs'

/**
 * similar to UserPage
 */
export default function MePage () {


    const { authenticated } = React.useContext(GlobalContext)

    const [ user, setUser ] = React.useState('')
    const [ posts, setPosts ] = React.useState([])
    const [ likedPosts, setLikedPosts ] = React.useState([])
    const [ dislikedPosts, setDislikedPosts ] = React.useState([])

    useEffect(() => {
            async function getData() {
                if(authenticated) { //todo redirect to login if unauthenticated

                    //getting user
                    const response = await fetch('/api/v1/users/current')
                    const body = await response.text()
                    var parsedUser;
                    try {
                        parsedUser = JSON.parse(body)
                        setUser(parsedUser)
                    } catch (e) {
                        console.log(e)
                    }

                    //getting disliked
                    const dislikedResponse = await fetch('/api/v1/likes/user/' + parsedUser.email + '/dislikes')
                    const dislikedBody = await dislikedResponse.text()
                    if(dislikedBody) {
                        setDislikedPosts(JSON.parse(dislikedBody))
                    } else console.log('set disliked posts failed')

                    //getting liked
                    const likedResponse = await fetch('/api/v1/likes/user/' + parsedUser.email + '/likes') //have to use JSON.parse because setUser hasn't been updated yet
                    const likedBody = await likedResponse.text()
                    if(likedBody) {
                        setLikedPosts(JSON.parse(likedBody))
                    } else console.log('set liked posts failed')

                    //getting posts
                    const postsResponse = await fetch('/api/v1/users/name/' + parsedUser.username + '/posts')
                    const postsBody = await postsResponse.text()
                    if(postsBody) {
                        setPosts(JSON.parse(postsBody))  
                    } else console.log('set posts failed')

                }
            }
            getData()
        }, [ user, setUser, authenticated ]
    )

    return (
        <>
            { user !== '' &&
                <>
                    <div style={{marginTop: 50}}></div>
                
                    {/* using vh for horizontal components because i want to make the avatar a circle */}
                    <Grid container direction="row" alignItems="center" style={{paddingLeft: '5vh'}}>
                            <UserAvatar username={user.username} height='20vh' width='20vh' fontSize={96}/>
                             {/* underline the same as avatar color? */}
                            <Typography 
                                variant='h1' 
                                component='pre'
                                style={{textDecoration: 'underline', textDecorationColor: green[700], paddingLeft: '3vh'}}
                            >
                                {user.username + ' '}
                            </Typography> 
        
                    </Grid>
        
                    <UserDescription user={user}/>
                    
        
                    <Paper elevation={5} style={{marginTop: 50, paddingBottom: 500}}>
                        
                        
                        <Paper elevation={5} style={{paddingBottom: 500}}>
        
                            <div style={{backgroundColor: green[500], width: '100%', height: 200, alignContent: 'center', alignItems: 'center'}}>
                                <Typography variant='h5' style={{marginTop: 100, color: '#fff', textAlign: 'center', paddingTop: 50}}>Lorem ipsum</Typography>
                            </div>
        
                            <UserPageTabs posts={posts} likedPosts={likedPosts} dislikedPosts={dislikedPosts} />
                        </Paper>
                    </Paper>
                </>
            
            }
            
        </>
    )


}