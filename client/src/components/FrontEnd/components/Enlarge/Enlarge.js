import React, { Fragment } from 'react'
import FilePreview from '../FilePreview'


export default class Enlarge extends React.Component{

    renderNext = () => {
        if(this.props.nextEnlarge){
            return <FilePreview 
            file={this.props.nextEnlarge} 
            containerClassName="imageSelect-Enlarge" 
            className="imageSelect-Enlarge" 
            onClick={this.props.onClick}
            />
        }
        else{ return null}
    }

    pushNew = () => {
        return(
            <Fragment>
                <div id="nextEnlarge" style={{position: "absolute", height: "100%", width: "100%", backgroundColor: "yellow", left: "-100%", transition: "0.2s all"}}>
                    {this.renderNext()}
                </div>
                <FilePreview 
                file={this.props.file} 
                containerClassName="imageSelect-Enlarge" 
                className="imageSelect-Enlarge" 
                onClick={this.props.onClick}
                >
                    <span>
                        {this.props.file.familyDisplayIndex}
                    </span>
                </FilePreview>
            </Fragment>

        )

    }

    render(){
        return(
            <div 
            onClick={() => this.props.closeEnlarge()}
            className="enlargeContainer" id="enlargeContainer">
                {this.props.file 
                ? this.pushNew()
                : null}
            </div>
        )
    }
}