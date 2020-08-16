import React from 'react'
import FollowButton from './FollowButton'
import ShareUserButton from './ShareUserButton'

export default function UserDescriptionActions ({ user }) {

    return (
        <div style={{marginLeft: '28vh', marginTop: '0.5%', display: 'inline-flex'}}>
            <FollowButton user={user} />
            <ShareUserButton user={user} />
        </div>

    )
}