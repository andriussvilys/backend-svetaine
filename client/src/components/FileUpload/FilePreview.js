import React from 'react';

export default class FilePreview extends React.Component{

    constructor(props){
        super(props)
    }

    fileContainer = (fileType, file) => {

        //files in server dont have 'preview' property, and files in state dont have filePath
        const previewSource = file.filePath ? file.filePath : file.preview
        // console.log('previewSource')
        // console.log(previewSource)

        // console.log('previewSource')
        // console.log(previewSource)

        if(fileType.match('image')){
            let image = <img className="ImagesPreview--image" alt={file.fileName} src={previewSource} />
            // console.log(image)
            return(
                    image
            )
        }
        if(fileType.match('video')){
            return(
                <video 
                className="ImagesPreview--image" 
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
                className="ImagesPreview--image" 
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
            {this.props.children}
        </div>

        )
    }
}

