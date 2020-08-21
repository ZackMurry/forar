import React, { useEffect, useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import Post from './Posts/Post'

//todo finish this up
export default function FollowPage() {

    const [ recentFollowingPosts, setRecentFollowingPosts ] = useState('default')
    const { authenticated } = useContext(GlobalContext)

    useEffect(() => {
        //if unauthenticated, redirect to login page
        if(!authenticated) {
            window.location.href = 'http://localhost:8080/oauth2/authorization/okta' //need to change link if i host
        }
        async function getData() {
            const recentFollowingPostsResponse = await fetch('/api/v1/posts/following/recent')
            const recentFollowingPostsText = await recentFollowingPostsResponse.text()

            try {
                setRecentFollowingPosts(JSON.parse(recentFollowingPostsText))
            } catch(err) {
                console.log(err)
            }
        }

        if(recentFollowingPosts === 'default') getData()

    }, [recentFollowingPosts, setRecentFollowingPosts, authenticated])

    const updateList = async () => {
        const response = await (await fetch('/api/v1/posts/following/recent')).text()
        try {
            this.setState({list: JSON.parse(response)})
        } catch (e) {
            console.log('Unable to contact server for posts.')
        }
        
    }

    return (

        <>
            { recentFollowingPosts !== 'default'
                ?
                    recentFollowingPosts.length !== 0
                        ?
                            recentFollowingPosts.map(post => (
                                <Post post={post} updateList={updateList} showSnackbar={console.log('snack')} key={post.id}/>
                            ))
                        :
                            <p>There are no recent posts from people you follow</p> //todo style
                    
                :
                    <p>Loading..</p> //todo style
            }
        </>
        
    )

}