import React from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import './../../styles.css'
import { Accordion, AccordionDetails, AccordionSummary, ThemeProvider, Typography, Paper, Slide, Collapse, Button, FormControl, Input } from '@material-ui/core'
import theme from '../../theme'
import { green } from '@material-ui/core/colors'
import CreateTitleFormEditor from './CreateTitleFormEditor.js'
import CreateBodyFormEditor from './CreateBodyFormEditor.js'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withFormik } from 'formik'
import * as Yup from 'yup'

//todo figure out how to use roboto lol
//todo pasting allows for text above char limit
//todo add snackbar on post upload
//todo placeholder text loads before transition



export default class CreatePostForm extends React.Component {

    constructor() {
        super()
        this.state = {
            showBodyPlaceholder: false,
            showTitlePlaceholder: false
        }
        this.switchShowBodyPlaceholder = this.switchShowBodyPlaceholder.bind(this)
        this.switchShowTitlePlaceholder = this.switchShowTitlePlaceholder.bind(this)
    }


    //have to do this because draft.js doesn't have functionality for transitions with placeholder text
    //before the placeholder would appear before the accordion dropped down
    handleChange = () => {
        if(this.state.showBodyPlaceholder) {
            setTimeout(this.switchShowBodyPlaceholder, 100)
        }
        else {
            setTimeout(this.switchShowBodyPlaceholder, 110)
        }

        if(this.state.showTitlePlaceholder) {
            setTimeout(this.switchShowTitlePlaceholder, 200)
        }
        else {
            setTimeout(this.switchShowTitlePlaceholder, 50)
        }
    }

    switchShowBodyPlaceholder = () => {
        var showBody = !this.state.showBodyPlaceholder
        this.setState({showBodyPlaceholder: showBody})
    }

    switchShowTitlePlaceholder = () => {
        var showTitle = !this.state.showTitlePlaceholder
        this.setState({showTitlePlaceholder: showTitle})
    }

    bhandleSubmit = (values) => {
        console.log(values)
    }

    render() {
        
        const formikEnhancer = withFormik({
            mapPropsToValues: props => ({
              editorState: new EditorState.createEmpty(),
              title: '',
            }),
            validationSchema: Yup.object().shape({
              title: Yup.string(),
            }),
            handleSubmit: (values, { setSubmitting }) => {
              setTimeout(() => {
                // you probably want to transform draftjs state to something else, but I'll leave that to you.
                //temporary
                var temp = values.editorState._immutable.currentContent.blockMap._list._tail.array;
                var temp2 = temp[0];
                var temp3 = temp2[1]
                var temp4 = temp3._map._root.entries
                var temp5 = temp4[1]
                console.log(temp5)
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
                    <CreateTitleFormEditor placeholder={this.state.showTitlePlaceholder ? 'Title' : ''} onChange={setFieldValue}/>
                    <CreateBodyFormEditor placeholder={this.state.showBodyPlaceholder ? 'Body' : ''}/>
                    <Button variant='contained' style={{margin: 25, marginTop: 5, float: 'right'}} color='primary' type='submit'>
                    <Typography style={{color: 'white'}}>
                        Submit
                    </Typography>
                </Button>
            </form>
        
        
        )
        
        const EnhancedPostForm = formikEnhancer(PostForm)

        return (
            <ThemeProvider theme={theme}>
                <Accordion style={{width: '40%', backgroundColor: green[500], margin: 'auto'}} elevation={5} onChange={this.handleChange}>
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
            </ThemeProvider>
                

        )

    }


}