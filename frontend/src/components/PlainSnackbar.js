import React from 'react'
import { Snackbar, IconButton, SnackbarContent, Typography } from "@material-ui/core";
import green from '@material-ui/core/colors/green';
import CloseIcon from '@material-ui/icons/Close';

export default function PlainSnackbar ({ message, duration, value, onClose }) {

    return (
        <Snackbar 
            open={value}
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
                            <IconButton size='small' aria-label="close" color="inherit" onClick={onClose}>
                                <CloseIcon fontSize='small' />
                            </IconButton>
                        </React.Fragment>
                    }
                    
                    />
            </Snackbar>
    )


}
