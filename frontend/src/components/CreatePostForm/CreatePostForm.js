import React from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import './../../styles.css'
import { Accordion, AccordionDetails, AccordionSummary, ThemeProvider, Typography, Paper, Slide, Collapse } from '@material-ui/core'
import theme from '../../theme'
import { green } from '@material-ui/core/colors'
import CreateTitleFormEditor from './CreateTitleFormEditor.js'
import CreateBodyFormEditor from './CreateBodyFormEditor.js'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


//todo figure out how to use roboto lol
//todo pasting allows for text above char limit
//todo add snackbar on post upload
//todo placeholder text loads before transition
export default class CreatePostForm extends React.Component {



    render() {
        

        return (
            <ThemeProvider theme={theme}>
                <Accordion style={{width: '40%', backgroundColor: green[500], margin: 'auto'}} elevation={5}>
                   <AccordionSummary expandIcon={<ExpandMoreIcon style={{fill: 'white'}}/>}>
                        <Typography variant='h6' style={{color: 'white'}}>
                            Create post
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Paper style={{width: '100%', color: 'white'}} elevation={5}>
                            <CreateTitleFormEditor />
                            <CreateBodyFormEditor placeholder="Body"/>
                        </Paper>
                    </AccordionDetails>
                </Accordion>
            </ThemeProvider>
                

        )

    }


}