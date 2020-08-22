import React, { useState, useContext } from 'react'
import { IconButton, Grow, Paper, ClickAwayListener, MenuItem, MenuList, Popper, Typography } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { green } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '../theme';
import LogInOutButton from './LogInOutButton';
import { GlobalContext } from '../context/GlobalState'

function NavigationBarMenu() {

    const [ open, setOpen ] = useState(false)
    const anchorRef = React.useRef(null);
    const { username, authenticated } = useContext(GlobalContext)

    const toggleOpen = () => {
        setOpen(!open)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleProfileClick = () => {
        window.location.href = window.location.origin + '/#/me'
    }

    const handleSettingsClick = () => {
        window.location.href = window.location.origin + '/#/me/settings'
    }

    return (

        <ThemeProvider theme={theme}>
            <IconButton
                ref={anchorRef}
                style={{float: 'right'}}
                onClick={toggleOpen}
            >
                <AccountCircle fontSize='large' style={{color: '#fff'}}/>
            </IconButton>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper elevation={5} >
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" style={{backgroundColor: green[500], color: 'white', marginTop: 6}}>
                                    <Paper elevation={0} style={{background: green[500], color: '#fff', marginTop: 0, cursor: 'default', outline: 'none', userSelect: 'none'}} >
                                        <Typography style={{textAlign: 'center'}}  >
                                            {authenticated ? `Logged in as ${username}` : 'Logged out'}
                                        </Typography>
                                    </Paper>
                                    
                                    <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                                    <MenuItem onClick={handleSettingsClick}>Settings</MenuItem>
                                    <LogInOutButton />
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )
                
                }
            </Popper>
        </ThemeProvider>

    )

}

export default NavigationBarMenu