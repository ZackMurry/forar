import React from 'react'
import { EditorState, RichUtils, Editor } from 'draft-js'

export default class CreateTitleFormEditor extends React.Component {


    constructor(props) {
        super()
        this.state = {
            editorState: EditorState.createEmpty(),
            placeholderText: props.placeholder
        }
    }

    onChange = (newEditorState) => {
        this.setState({editorState: newEditorState})
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
            <div className="bodyEditor">
                <Editor                      
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    handleKeyCommand={this.handleKeyCommand}
                    editorStyle={{fontSize: 40, fontFamily: 'Roboto'}}
                    placeholder={this.state.placeholderText}
                />
            </div>
        )
        

    }

}