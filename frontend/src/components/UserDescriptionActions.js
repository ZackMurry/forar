import React from 'react'
import FollowButton from './FollowButton'

export default function UserDescriptionActions ({ user }) {

    console.log(user)
    return (
        <div style={{marginLeft: '28vh', marginTop: '0.5%', display: 'inline-block'}}>
            <FollowButton user={user}/>
            {/* <ShareUserButton /> todo */}
        </div>

    )
}