import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import Post from './Post';

//todo handle 404s on this end too
export default function PostPage () {

    const [ post, setPost ] = React.useState('')
    const { id } = useParams();

    const getPost = async () => {
        const response = await fetch('/api/v1/posts/id/' + id)
        const body = await response.text()
        setPost(JSON.parse(body)[0]) //0 because there should only be one post. this would be where 404 handling would go
    }


    useEffect(() => {
        if (!post) {
            getPost()
        }
      }, [getPost, setPost, post]
    );

    return (
        <>
            {post && <Post post={post} />}
        </>

    )

}