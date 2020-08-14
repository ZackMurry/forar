import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import Post from './Post'
import { Typography, AppBar, Tabs, Tab, Fade, Grow } from '@material-ui/core';
import UserAvatar from './UserAvatar';
import Grid from '@material-ui/core/Grid'
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    root: {
      primary: theme.palette.primary,
      secondary: theme.palette.secondary
    },
  });

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                children
            )}
        </div>
  );
}

//todo add bio and stuff
//todo add another page for the current user's page (at /me or something)
function UserPage () {
    
    
    const [ user, setUser ] = React.useState('')
    const [ posts, setPosts ] = React.useState([])
    const [ likedPosts, setLikedPosts ] = React.useState([])
    const [ dislikedPosts, setDislikedPosts ] = React.useState([])
    const [ tabValue, setTabValue ] = React.useState(1)
    const { username } = useParams();

    useEffect(() => {
        async function getData() {
            if (!user) {
                //todo probly make snackbars for if these fail using try catches

                const userResponse = await fetch('/api/v1/users/name/' + username) //todo probly change handling to email
                const userBody = await userResponse.text()
                const userParsed = JSON.parse(userBody)
                if(userBody) {
                    setUser(userParsed)
                } else console.log('set user failed')
                
                const dislikedResponse = await fetch('/api/v1/likes/user/' + userParsed.email + '/dislikes')
                const dislikedBody = await dislikedResponse.text()
                if(dislikedBody) {
                    setDislikedPosts(JSON.parse(dislikedBody))
                } else console.log('set disliked posts failed')

                const likedResponse = await fetch('/api/v1/likes/user/' + userParsed.email + '/likes') //have to use JSON.parse because setUser hasn't been updated yet
                const likedBody = await likedResponse.text()
                if(likedBody) {
                    setLikedPosts(JSON.parse(likedBody))
                } else console.log('set liked posts failed')

                const postsResponse = await fetch('/api/v1/users/name/' + username + '/posts')
                const postsBody = await postsResponse.text()
                if(postsBody) {
                    setPosts(JSON.parse(postsBody))  
                } else console.log('set posts failed')

                
            }
        }
        getData()
      }, [user, setUser, posts, setPosts, likedPosts, setLikedPosts, dislikedPosts, setDislikedPosts, username]
    );

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue)
    }

    const StyledTab = withStyles((theme) => ({
        root: {
          textTransform: 'none',
          minWidth: 72,
          width: '15vw',
          color: '#fff',
          fontWeight: theme.typography.fontWeightRegular,
          marginRight: theme.spacing(4),
          fontSize: 20,
          fontFamily: [
            'Roboto'
          ].join(','),
          '&$selected': {
            backgroundColor: green[600]
          }
        },
        selected: {},
      }))((props) => <Tab disableRipple {...props} />);
    
      

    return (
        <>
            <div style={{marginTop: 50}}></div>
            
            <Grid container direction="row" alignItems="center" style={{paddingLeft: 50}}>
                    <UserAvatar username={username} height='20vh' width='20vh' fontSize={96}/>
                    <Typography 
                        variant='h1' 
                        style={{textDecoration: 'underline', textDecorationColor: green[500], paddingLeft: 25} /* underline the same as avatar color? */}
                    >
                        {user.username}
                    </Typography> 

            </Grid>

            <AppBar position='static' style={{marginTop: 50}}>
                <Tabs
                    value={tabValue}
                    indicatorColor='secondary'
                    TabIndicatorProps={{
                        style: {
                            height: '10vh',
                            color: '#fff'
                        }
                    }}
                    textColor='secondary'
                    onChange={handleTabChange}
                    aria-label='profile tabs'
                    style={{backgroundColor: green[500]}}
                    centered
                >
                    {/* todo maybe move posts to the middle tab? */}
                    <StyledTab label='Liked posts' />
                    <StyledTab label='Posts' />
                    <StyledTab label='Disliked posts' />
                </Tabs>
            </AppBar>

            {/* for the liked tab 
                todo allow ability to keep likes private
                todo make another tab for dislikes
                */}
            <TabPanel value={tabValue} index={0}>        
                { 
                    likedPosts.length !== 0 
                    ?
                    <Grow in={true} timeout={1000}>
                        <div>
                            {likedPosts.map(post => (
                                <Post post={post} key={post.id} /> 
                            ))}
                        </div>
                    </Grow>
                    :
                    <Fade in={true} timeout={500}>
                        <div style={{textAlign: 'center', margin: '10%'}}>
                            <Typography variant='h4' style={{color: '#757575'}}>
                                This user hasn't liked any posts yet.
                            </Typography>
                        </div>
                    </Fade>
                }
            </TabPanel>

            {/* for the posts tab
                todo searching posts?
                */}
            <TabPanel value={tabValue} index={1}>
                <Grow in={true} timeout={1000}>
                    <div>
                        {posts.map(post => (
                            <Post post={post} key={post.id}/>
                        ))}
                    </div>
                </Grow>
            </TabPanel>
            
            {/* for the dislikes tab */}
            <TabPanel value={tabValue} index={2}>
                
                <div>
                    { 
                        dislikedPosts.length !== 0 
                        ?
                        <Grow in={true} timeout={1000}>
                            <div>
                                {dislikedPosts.map(post=> (
                                    <Post post={post} key={post.id} />
                                ))}
                            </div>
                        </Grow>
                        :
                        <Fade in={true} timeout={500}>
                            <div style={{textAlign: 'center', margin: '10%'}}>
                                <Typography variant='h4' style={{color: '#757575'}}>
                                    This user hasn't disliked any posts yet.
                                </Typography>
                            </div>
                        </Fade>

                    }
                </div>
            </TabPanel>

            
        </>
    )

}

export default withStyles(styles)(UserPage)