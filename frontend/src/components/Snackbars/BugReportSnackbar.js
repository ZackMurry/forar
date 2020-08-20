import React from 'react'
import { Snackbar, IconButton, SnackbarContent, Typography } from "@material-ui/core";
import green from '@material-ui/core/colors/green';
import CloseIcon from '@material-ui/icons/Close';


export default function BugReportSnackbar({ open, duration, onClose, onReport, message }) {


    return (
        <Snackbar 
                open={open}
                autoHideDuration={duration}
                onClose={onClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
            >
                <SnackbarContent style={{backgroundColor: green[500]}} message={message} 
                    action={
                        <React.Fragment>
                            <Typography onClick={function(){ onReport(); onClose(); }} variant='body1' style={{cursor: 'pointer'}}  >
                                Report bug
                            </Typography>
                            <IconButton size='small' aria-label="close" color="inherit" onClick={onClose}>
                                <CloseIcon fontSize='small' />
                            </IconButton>
                        </React.Fragment>
                    }   
                />
            </Snackbar>
        
    )

}