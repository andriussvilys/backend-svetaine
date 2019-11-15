import React from 'react';

export default class FilePreview extends React.Component{

    constructor(props){
        super(props)
    }

    fileContainer = (fileType, file) => {

        //files in server dont have 'preview' property, and files in state dont have filePath
        const previewSource = file.filePath ? file.filePath : file.preview

        if(fileType.match('image')){
            let image = <img className="imageSelect-FilePreview" alt={file.fileName} src={previewSource} />
            return(
                    image
            )
        }
        if(fileType.match('video')){
            return(
                <video 
                className="imageSelect-FilePreview" 
                controls
                >
                    <source src={previewSource} type={fileType} />
                    Your browser does not support the video tag.
                </video> 
            )
        }
        if(fileType.match('audio')){
            return(
                <audio 
                className="imageSelect-FilePreview" 
                controls
                >
                    <source src={previewSource} type={fileType} />
                    Your browser does not support the audio tag.
                </audio> 
            )
        }
        if(fileType.match("application/pdf")){
            return(
                    <iframe src={previewSource} style={{width: "100%"}}></iframe>
            )
        }
    }

    render(){
        return(

        <div className="ImagesPreview--imageContainer">
            {this.fileContainer(this.props.file.fileType, this.props.file)}
            {/* <input
            type="text" 
            className="ImagesPreview--fileName"
            placeholder={this.props.file.fileName}
            >
            </input> */}
        </div>

        )
    }
}
