import React from 'react'
import Post from './Post'
import { Snackbar, IconButton } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import CloseIcon from '@material-ui/icons/Close';

export default class PostList extends React.Component {


    constructor() {
        super()
        this.state = {
            list: [],
            showSnackbar: false,
            mounted: true
        }
        this.updateList = this.updateList.bind(this)
    }

    
    componentDidMount() {
        this.updateList()
    }

    componentWillUnmount() {
        this.setState({mounted: false})
    }

    updateList = async () => {
        if(!this.state.mounted) return;
        const response = await (await fetch('/api/v1/posts/new')).text()
        try {
            this.setState({list: JSON.parse(response)})
        } catch (e) {
            console.log('Unable to contact server for posts.')
        }
        
    }

    handleSnackbar = (value) => {
        this.setState({showSnackbar: value})
    }

    snackbarHandleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({showSnackbar: false})
    }


    render() {
        return (
            <>
                {this.state.list.map(post => (
                    <Post post={post} updateList={this.updateList} showSnackbar={this.handleSnackbar} key={post.id}/>
                ))}
                <Snackbar 
                    open={this.state.showSnackbar} 
                    autoHideDuration={5000} 
                    onClose={this.snackbarHandleClose} 
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    style={{color: green[500]}}
                    message="Post deleted."
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={this.snackbarHandleClose}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                />
            </>
        )
    }


}