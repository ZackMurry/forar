import React, { useEffect, useContext } from 'react'
import GreenTooltip from '../GreenTooltip'
import { IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import green from '@material-ui/core/colors/green'
import ToggleIcon from '../ToggleIcon'
import { GlobalContext } from '../../context/GlobalState'

export default function FollowButton ({ email }) {

    const [ following, setFollowing ] = React.useState(false)
    const [ hovering, setHovering ] = React.useState(false) //for changing icon on hover to allow for unfollowing
    const { authenticated } = useContext(GlobalContext)

    useEffect(() => {
        async function getData() {
            if(authenticated) {
                //getting if the principal follows the user
                const followResponse = await fetch('/api/v1/follows/user/follows/' + email)
                const followBody = await followResponse.text()
                try {
                    setFollowing(JSON.parse(followBody))
                } catch (e) {
                    console.log(e)
                }
            }
        }
        getData()
        

        }, [ following, setFollowing, authenticated, email ]
    )

    const handleFollowButton = async () => {
        setFollowing(true)

        //telling the server to add it to the database
        const response = await fetch('/api/v1/follows/follow/' + email, {method: 'POST'})
        
        //checking if it worked
        const body = await response.text()
        try {
            //if the API returned false, it didn't work
            if(!JSON.parse(body)) setFollowing(false)
        } catch (e) {
            //catching is usually used for if the API didn't send a response back at all
            setFollowing(false)
            console.log(e)
        }

    }

    const handleUnfollowButton = async () => {
        setFollowing(false)

        //now telling the server
        const response = await fetch('/api/v1/follows/follow/' + email, {method: 'DELETE'})

        //checking if it worked
        const body = await response.text()
        try {
            //if the API returned false, set the following value back to true
            if(!JSON.parse(body)) setFollowing(true)
        } catch (e) {
            console.log(e)
        }
    }

    const enableHover = () => {
        setHovering(true)
    }

    const disableHover = () => {
        setHovering(false)
    }

    return (
        <div onMouseEnter={enableHover} onMouseLeave={disableHover}>
            {
                following
                ?
                    (
                        <GreenTooltip title='Unfollow' enterDelay={1000} leaveDelay={500}>
                            {/* div is there so that when the button is disabled, the green tooltip still has something to attach to */}
                            <div>
                                <IconButton aria-label='text' onClick={handleUnfollowButton} style={{color: green[500]}} disabled={!authenticated}>
                                    <ToggleIcon on={hovering} onIcon={<CloseIcon/>} offIcon={<CheckIcon />}/>
                                </IconButton>
                            </div>

                            
                        </GreenTooltip>

                    )
                :
                    <GreenTooltip title='Follow' enterDelay={1000} leaveDelay={500}>
                        <div>
                            <IconButton aria-label='follow' onClick={handleFollowButton} style={{color: authenticated ? green[500] : '#dbdbdb'}} disabled={!authenticated}>
                                <AddIcon fontSize='large' />
                            </IconButton>
                        </div>
                    </GreenTooltip>
            }
        </div>
    )

}