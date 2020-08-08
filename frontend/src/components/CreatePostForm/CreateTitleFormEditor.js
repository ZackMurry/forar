import React from 'react'
import { EditorState, RichUtils, Editor } from 'draft-js'

const MAX_LENGTH = 125

export default class CreateTitleFormEditor extends React.Component {

    constructor() {
        super()
        this.state = {
            editorState: EditorState.createEmpty()
        }
    }

    onChange = (newEditorState) => {
        this.props.onChange('editorState', newEditorState);
    }

    handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(this.props.editorState, command)
        
        if(newState) {
            this.onChange(newState)
            return 'handled'
        }

        return 'not-handled'
    }

    _handleBeforeInput = () => {
        const currentContent = this.props.editorState.getCurrentContent();
        const currentContentLength = currentContent.getPlainText('').length
      
        if (currentContentLength > MAX_LENGTH - 1) {
          console.log('you can type max ten characters');
          return 'handled';
        }
      }

    render() {

        return (
            <div className="titleEditor">
                <Editor                      
                    editorState={this.props.editorState}
                    onChange={this.onChange}
                    handleKeyCommand={this.handleKeyCommand}
                    editorStyle={{fontSize: 40, fontFamily: 'Roboto'}}
                    placeholder='Title'
                    handleBeforeInput={this._handleBeforeInput}
                />
            </div>
        )
        

    }


}