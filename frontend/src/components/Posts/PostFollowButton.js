import React, { useEffect, useContext } from 'react'
import GreenTooltip from '../GreenTooltip'
import { IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import green from '@material-ui/core/colors/green'
import ToggleIcon from '../ToggleIcon'
import { GlobalContext } from '../../context/GlobalState'

//todo update all other follow buttons with the same email on following change
export default function PostFollowButton ({ email }) {

    const [ following, setFollowing ] = React.useState('')
    const [ hovering, setHovering ] = React.useState(false) //for changing icon on hover to allow for unfollowing
    const mounted = React.useRef(true)

    const { authenticated } = useContext(GlobalContext)

    useEffect(() => {
        function getData() {
            //getting if the principal follows the user
            fetch('/api/v1/follows/user/follows/' + email)
                .then(response => response.text())
                .then(body => mounted.current ? handleGetFollowing(body) : body)
                .catch(err => console.log(err))
        }
        if(authenticated && following === '' && mounted.current) getData()
        

        }, [ following, setFollowing, authenticated, email, mounted ]
    )

    useEffect(() => {
        return () => mounted.current = false
    }, [])

    const handleGetFollowing = async (body) => {
        if(!mounted.current) return;
        setFollowing(JSON.parse(body))
    }

    const handleFollowButton = async () => {
        if(!mounted.current)
        setFollowing(true)

        //telling the server to add it to the database
        const response = await fetch('/api/v1/follows/follow/' + email, {method: 'POST'})
        
        //checking if it worked
        const body = await response.text()
        try {
            //if the API returned false, it didn't work
            if(!JSON.parse(body) && mounted.current) setFollowing(false)
        } catch (e) {
            //catching is usually used for if the API didn't send a response back at all
            if(mounted.current) setFollowing(false)
            console.log(e)
        }

    }

    const handleUnfollowButton = async () => {
        if(!mounted.current) return;

        setFollowing(false)

        //now telling the server
        const response = await fetch('/api/v1/follows/follow/' + email, {method: 'DELETE'})

        //checking if it worked
        const body = await response.text()
        try {
            //if the API returned false, set the following value back to true
            if(!JSON.parse(body) && mounted.current) setFollowing(true)
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