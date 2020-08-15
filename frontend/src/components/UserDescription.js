import React from 'react'
import green from '@material-ui/core/colors/green'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import UserProfileStats from './UserProfileStats'
import Bio from './Bio'
import UserDescriptionActions from './UserDescriptionActions'

//todo add post count
export default function UserDescription({ user }) {

    return (
        <>
            <UserProfileStats user={user} />
            <Bio user={user} />
            <UserDescriptionActions user={user}/>
        </>
    )
}