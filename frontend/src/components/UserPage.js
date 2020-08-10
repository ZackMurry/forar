import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { render } from '@testing-library/react';
import Post from './Post'


export default function UserPage () {
    
    const [ user, setUser ] = React.useState('')
    const [ posts, setPosts ] = React.useState([])
    const { username } = useParams();

    const getUser = async () => {
        const response = await fetch('/api/v1/users/name/' + username)
        const body = await response.text()
        console.log(response)
        console.log(body)
        setUser(JSON.parse(body))
    }

    const getPosts = async () => {
        const response = await fetch('/api/v1/users/name/' + username + '/posts')
        const body = await response.text()
        console.log(response)
        console.log(body)
        setPosts(JSON.parse(body))
    }

    useEffect(() => {
        if (!user) {
            getUser()
            getPosts()
        }
      }, [getUser, setUser, user, posts, setPosts]
    );

    
        
    return (
        <>
            <h1>{user.email}</h1>
            {posts.map(post => (
                    <Post post={post} key={post.id}/>
                ))}
        </>
    )

}