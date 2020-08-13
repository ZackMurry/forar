import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import Post from './Post'
import { Typography, AppBar, Tabs, Tab, Fade } from '@material-ui/core';
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
    const [ tabValue, setTabValue ] = React.useState(0)
    const { username } = useParams();

    const getUser = async () => {
        const userResponse = await fetch('/api/v1/users/name/' + username) //todo probly change handling to email
        const userBody = await userResponse.text()
        if(userBody) {
            setUser(JSON.parse(userBody))
        } else console.log('set user failed')
        

        const likedResponse = await fetch('/api/v1/likes/user/' + JSON.parse(userBody).email + '/likes') //have to use JSON.parse because setUser hasn't been updated yet
        const likedBody = await likedResponse.text()
        if(likedBody) {
            setLikedPosts(JSON.parse(likedBody))
        } else console.log('set liked posts failed')
    }

    const getPosts = async () => {
        const postsResponse = await fetch('/api/v1/users/name/' + username + '/posts')
        const postsBody = await postsResponse.text()
        console.log(postsBody)
        if(postsBody) {
            setPosts(JSON.parse(postsBody))  
        } else console.log('set posts failed')
              
    }

    useEffect(() => {
        if (!user) {
            getUser()
            getPosts()
        }
      }, [user, getUser, setUser, posts, getPosts, setPosts, likedPosts, setLikedPosts]
    );

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue)
        console.log(newValue)
    }

    const StyledTab = withStyles((theme) => ({
        root: {
          textTransform: 'none',
          minWidth: 72,
          color: '#fff',
          fontWeight: theme.typography.fontWeightRegular,
          marginRight: theme.spacing(4),
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
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
                    <StyledTab label='Posts'/>
                    <StyledTab label='Liked posts' />
                </Tabs>
            </AppBar>

            {/* for the posts tab */}
            <TabPanel value={tabValue} index={0}>
                {/* maybe use a fade for each post idk */}
                <Fade in={true} timeout={1000}>
                    <div>
                        {posts.map(post => (
                            <Post post={post} key={post.id}/>
                        ))}
                    </div>
                </Fade>
            </TabPanel>
            
            {/* for the liked tab 
                todo allow ability to keep likes private
                todo make another tab for dislikes
                */}
            <TabPanel value={tabValue} index={1}>
                <Fade in={true} timeout={1000}>
                    { likedPosts != null &&
                        <div>
                            {likedPosts.map(post => (
                            <Post post={post} key={post.id} /> 
                            ))}
                        </div>
                    }
                </Fade>
            </TabPanel>


            
        </>
    )

}

export default withStyles(styles)(UserPage)