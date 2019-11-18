import React from 'react'
import FilePreview from '../FilePreview'

export default class Enlarge extends React.Component{

    render(){
        return(
            <div 
            onClick={() => this.props.closeEnlarge()}
            className="enlargeContainer" id="enlargeContainer">
                {this.props.file 
                ? <FilePreview file={this.props.file} className="imageSelect-Enlarge" onClick={this.props.onClick}/>
                : null}
                
            </div>
        )
    }
}