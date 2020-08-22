import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { Typography } from '@material-ui/core';
import UserBar from '../../Users/UserBar';

//todo make this look better and make a FollowingPage
export default function FollowerPage() {


    const [ followers, setFollowers ] = useState([0])
    const { email } = useParams();
    const [ user, setUser ] = useState('') //user in this context is the user whose followers the active user is looking at

    useEffect(() => {
        async function getData() {
            if (!user || followers[0] === 0) {

                //getting user
                const userResponse = await fetch(`/api/v1/users/email/${email}`)
                const userBody = await userResponse.text()

                try {
                    setUser(JSON.parse(userBody))
                } catch(err) {
                    console.log(err)
                }

                //getting followers
                const followersResponse = await fetch(`/api/v1/follows/user/${email}/followers`)
                const followersBody = await followersResponse.text()

                try {
                    setFollowers(JSON.parse(followersBody))
                } catch (err) {
                    console.log(err)
                }
                console.log(followers[0])
            }
        }
        getData()
      }, [user, setUser, email, followers, setFollowers]
    );

    return (
        <>
            <Typography variant='h2' style={{textAlign: 'center', marginTop: '3vh'}} >{user ? user.username + "'s followers" : ''}</Typography>
            <br />
            <div style={{display: 'flex', justifyContent: 'center'}} >
                {
                    followers.map((follower, i) => (
                        <UserBar username={follower.username} key={i} />
                    ))
                }
            </div>
            
            
        </>
        
    )

}