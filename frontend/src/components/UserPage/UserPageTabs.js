import React from 'react'
import Post from '../Posts/Post'
import { Typography, AppBar, Tabs, Tab, Fade, Grow, withStyles } from '@material-ui/core';
import green from '@material-ui/core/colors/green'

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

export default function UserPageTabs ({ likedPosts, posts, dislikedPosts }) {

    const [ tabValue, setTabValue ] = React.useState(1)

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
            <AppBar position='static' elevation={0}>
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
                    <div>
                        {
                            posts.length !== 0
                            ?
                                <Grow in={true} timeout={1000}>
                                    <div>
                                        {posts.map(post => (
                                            <Post post={post} key={post.id}/>
                                        ))}
                                    </div>
                                </Grow>
                            :
                                <Fade in={true} timeout={500}>
                                    <div style={{textAlign: 'center', margin: '10%'}}>
                                        <Typography variant='h4' style={{color: '#757575'}}>
                                            This user hasn't made any posts yet.
                                        </Typography>
                                    </div>
                                </Fade>
                        }  
                    </div>
                    
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