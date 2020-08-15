import React from 'react'
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom'
import green from '@material-ui/core/colors/green'

export default function UserProfileStats ({ user }) {

    return (
        <div style={{display: 'inline-flex', width: '100%'}}>
            <Typography variant='h5' style={{color: green[700], fontWeight: 'bold', marginLeft: '28vh'}}>
                {user.points}
            </Typography>
            <Typography variant='h5' style={{color: '#3a3a3a', marginLeft: 5}}>
                {'point' + (user.points !== 1 ? 's' : '') /* because 1 isn't plural */}
            </Typography>

            <Link to="/" style={{display: 'inline-flex', textDecoration: 'none', marginLeft: '1%'}}> {/* link to the page that shows users followers */}
                <Typography variant='h5' style={{color: green[700], fontWeight: 'bold'}}>
                    21
                </Typography>
                <Typography variant='h5' style={{color: '#3a3a3a', marginLeft: 5}}>
                    {'follower' + (21 !== 1 ? 's' : '') /* because 1 isn't plural */}
                </Typography>
            </Link>
        </div>
    )
}