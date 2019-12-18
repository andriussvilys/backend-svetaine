import React from 'react';

export default class FilePreview extends React.Component{

    constructor(props){
        super(props)
    }

    fileContainer = (fileType, file) => {

        //files in server dont have 'preview' property, and files in state dont have filePath
        const previewSource = file.filePath ? file.filePath : file.preview

        if(fileType.match('image')){
            let image = <img 
            className={this.props.className}
            alt={file.fileName} 
            data-src={previewSource}
            src={this.props.lazyLoad ? "" : previewSource} 
            id={this.props.id || this.props.file.fileName}
            name={this.props.previewName}
            onClick={(e) => {this.props.onClick(e)}}
            ref={this.props.ref}
            />
            return(
                    image
            )
        }
        if(fileType.match('video')){
            return(
                <video 
                className={this.props.className}
                controls
                id={this.props.id || this.props.file.fileName}
                name={this.props.previewName}
                onClick={(e) => {this.props.onClick(e)}}
                >
                    <source src={previewSource} type={fileType} />
                    Your browser does not support the video tag.
                </video> 
            )
        }
        if(fileType.match('audio')){
            return(
                <audio 
                className={this.props.className}
                controls
                id={this.props.id || this.props.file.fileName}
                name={this.props.previewName}
                onClick={(e) => {this.props.onClick(e)}}
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
            this.props.file 
            ?
                this.props.noWrapper 
                ?
                this.fileContainer(this.props.file.fileType, this.props.file)
                :
                <div className={this.props.containerClassName} id={this.props.id} >
                {this.fileContainer(this.props.file.fileType, this.props.file)}
                {this.props.children}
                </div> 
            :
            null
        )
    }
}

