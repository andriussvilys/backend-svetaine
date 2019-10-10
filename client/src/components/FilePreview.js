import React from 'react';

export default class FilePreview extends React.Component{

    constructor(props){
        super(props)
    }

    fileContainer = () => {
        if(this.props.file.fileType.match('image')){
            return(
                <img className="ImagesPreview--image" alt={this.props.file.fileName} src={this.props.file.preview} />    
            )
        }
        if(this.props.file.fileType.match('video')){
            return(
                <video 
                className="ImagesPreview--image" 
                controls
                >
                    <source src={this.props.file.preview} type={this.props.file.fileType} />
                    Your browser does not support the video tag.
                </video> 
            )
        }
        if(this.props.file.fileType.match('audio')){
            return(
                <audio 
                className="ImagesPreview--image" 
                controls
                >
                    <source src={this.props.file.preview} type={this.props.file.fileType} />
                    Your browser does not support the audio tag.
                </audio> 
            )
        }
    }

    render(){
        return(

        <div className="ImagesPreview--imageContainer">
            {this.fileContainer()}
            <input
            type="text" 
            className="ImagesPreview--fileName"
            placeholder={this.props.file.fileName}
            >
            </input>
        </div>

        )
    }
}

