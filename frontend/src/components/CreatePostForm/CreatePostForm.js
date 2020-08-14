import React from 'react'
import { EditorState } from 'draft-js'
import './../../styles.css'
import { Accordion, AccordionDetails, AccordionSummary, ThemeProvider, Typography, Paper, Button, TextField } from '@material-ui/core'
import {theme} from '../../theme'
import { green } from '@material-ui/core/colors'
import CreateBodyFormEditor from './CreateBodyFormEditor.js'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { withCookies } from 'react-cookie'
import { withRouter } from 'react-router'
import { GlobalContext } from '../../context/GlobalState'
import PlainSnackbar from '../PlainSnackbar'

//todo figure out how to use roboto lol
//todo pasting allows for text above char limit
//todo add snackbar on post upload

const MAX_TITLE_LENGTH = 125

//todo don't refresh on create, just refresh post list
class CreatePostForm extends React.Component {

    static contextType = GlobalContext

    constructor(props) {
        super()
        this.state = {
            showBodyPlaceholder: false,
            openAccordion: false,
            openSnackbar: false
        }
        this.switchShowBodyPlaceholder = this.switchShowBodyPlaceholder.bind(this)
        
    }

    //have to do this because draft.js doesn't have functionality for transitions with placeholder text
    //before the placeholder would appear before the accordion dropped down
    _handleChange = () => {
        const open = this.state.openAccordion
        this.setState({openAccordion: !open})
        if(this.state.showBodyPlaceholder) {
            setTimeout(this.switchShowBodyPlaceholder, 110)
        }
        else {
            setTimeout(this.switchShowBodyPlaceholder, 90)
        }
    }

    switchShowBodyPlaceholder = () => {
        var showBody = !this.state.showBodyPlaceholder
        this.setState({showBodyPlaceholder: showBody})
    }

    bhandleSubmit = (values) => {
        console.log(values)
    }

    async sendToServer(titleText, bodyText) {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: titleText,
                body: bodyText
            })
        }
        console.log(requestOptions.body)
        var response = fetch('/api/v1/posts/create', requestOptions)
        console.log(response)

    }

    snackbarHandleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({openSnackbar: false})
    }

    render() {
        
        

        const formikEnhancer = withFormik({
            mapPropsToValues: props => ({
                title: '',
                editorState: new EditorState.createEmpty()
            }),
            validationSchema: Yup.object().shape({
              title: Yup.string(),
            }),
            handleSubmit: (values, { setSubmitting }) => {
                this.setState({openSnackbar: true})
                setTimeout(() => {
                    var tailArray = values.editorState._immutable.currentContent.blockMap._list._tail.array;
                    var innerArray = tailArray[0];
                    var contentBlock = innerArray[1]
                    var entries = contentBlock._map._root.entries
                    var textEntry = entries[1]
                    var bodyText = textEntry[1]
                    var titleText = values.title
                    this.sendToServer(titleText, bodyText).then(window.location.reload(false))
                    setSubmitting(false);
                }, 1000);
            },
            displayName: 'CreatePostForm',
        });
        
        const PostForm = ({
            values,
            touched,
            dirty,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            setFieldValue,
            isSubmitting,
        }) => (
            <form onSubmit={handleSubmit}>
                <TextField 
                    multiline 
                    id='title' 
                    type='text' 
                    placeholder='Title' 
                    onChange={handleChange} 
                    rows={3}
                    rowsMax={6}
                    className='titleEntry'
                    style={{margin: '2.5%', width:'95%'}}
                    InputProps={{
                        style: {fontSize: 24},
                        disableUnderline: true
                    }}
                    onInput = {(e) =>{
                        e.target.value = e.target.value.slice(0, MAX_TITLE_LENGTH)
                    }}
                />
                <CreateBodyFormEditor placeholder={this.state.showBodyPlaceholder ? 'Body' : ''} onChange={setFieldValue} editorState={values.editorState}/>
                <Button variant='contained' style={{margin: 25, marginTop: 5, float: 'right'}} color='primary' type='submit' disabled={!this.context.authenticated}>
                    <Typography style={{color: 'white'}}>
                        {this.context.authenticated ? 'Submit' : 'Sign in to post'}
                    </Typography>
                </Button>
            </form>
        
        
        )
        
        const EnhancedPostForm = formikEnhancer(PostForm)

        return (
            <ThemeProvider theme={theme}>
                <Accordion style={{width: '40%', backgroundColor: green[500], margin: 'auto', marginTop: 50}} elevation={5} onChange={this._handleChange} expanded={this.state.openAccordion}>
                   <AccordionSummary expandIcon={<ExpandMoreIcon style={{fill: 'white'}}/>}>
                        <Typography variant='h6' style={{color: 'white'}}>
                            Create post
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Paper style={{width: '100%', color: 'white'}} elevation={5}>
                            <EnhancedPostForm />
                        </Paper>
                    </AccordionDetails>
                </Accordion>
                <div>
                    {/* todo change snackbar color to green */}
                    <PlainSnackbar
                        message='Post created. Refreshing...'
                        duration={5000}
                        value={this.state.openSnackbar}
                        onClose={this.snackbarHandleClose}
                    />
                        
                </div>
            </ThemeProvider>
                

        )

    }


}

export default withCookies(withRouter(CreatePostForm))