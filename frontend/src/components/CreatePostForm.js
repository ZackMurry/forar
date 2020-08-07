import React from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import './../styles.css'
import { Accordion, AccordionDetails, AccordionSummary, ThemeProvider, Typography, Paper } from '@material-ui/core'
import theme from '../theme'
import { green } from '@material-ui/core/colors'

//todo figure out how to use roboto lol
export default class CreatePostForm extends React.Component {

    constructor() {
        super()
        this.state = {
            editorState: EditorState.createEmpty()
        }
    }


    
    onChange = (editorState) => {
        this.setState({editorState})
    }

    handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
        
        if(newState) {
            this.onChange(newState)
            return 'handled'
        }

        return 'not-handled'
    }

    render() {
        

        return (
            <ThemeProvider theme={theme}>
                <Accordion style={{width: '40%', backgroundColor: green[500], margin: 'auto'}} elevation={5}>
                   <AccordionSummary>
                        <Typography variant='h6' style={{color: 'white'}}>
                            Create post
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Paper style={{width: '100%', color: 'white', padding: 20}} elevation={5}>
                            <Editor 
                                editorState={this.state.editorState} 
                                onChange={this.onChange} 
                                handleKeyCommand={this.handleKeyCommand}
                                editorStyle={{fontSize: 40, fontFamily: 'Roboto'}}
                            />
                        </Paper>
                    </AccordionDetails>
                </Accordion>
            </ThemeProvider>
                

        )

    }


}