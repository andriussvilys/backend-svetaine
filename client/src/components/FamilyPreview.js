import React, { Fragment } from 'react';
import FilePreview from './FilePreview';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class FamilyPreview extends React.Component{

    constructor(props){
        super(props);
        this.state = {familyList: []}
    }

    /**
     * @param fileType
     * @param file
     */
    fileContainer = (fileType, file, index) => {

        const previewSource = file.filePath ? file.filePath : file.preview
        const key = `${file.fileName}-${index}`

        console.log(file.filePath ? 'file.filePath' : 'file.preview')
        console.log(previewSource)

        if(fileType.match('image')){
            console.log('RETURN IMAGE')
            return(
                <img key={key} className="ImagesPreview--image" alt={file.fileName} src={previewSource} />    
            )
        }
        if(fileType.match('video')){
            return(
                <video 
                className="ImagesPreview--image" 
                controls
                key={key}
                >
                    <source src={previewSource} type={fileType} />
                    Your browser does not support the video tag.
                </video> 
            )
        }
        if(fileType.match('audio')){
            console.log('RETURN AUDIO')
            return(
                <audio 
                className="ImagesPreview--image" 
                controls
                key={key}
                >
                    <source src={previewSource} type={fileType} />
                    Your browser does not support the audio tag.
                </audio> 
            )
        }
        if(fileType.match("application/pdf")){
            return(
                    <iframe key={key} src={previewSource} style={{width: "100%"}}></iframe>
            )
        }
    }

    createFamilyList = (props) => {
        if(!props.file.relatedArtwork){
            return []
        }

        let previews = Object.keys(this.props.file.relatedArtwork.files).forEach(fileName => {
            console.log('previews file')
            console.log(this.props.file.relatedArtwork.files[fileName])
            return (
                <FilePreview 
                    file={this.props.file.relatedArtwork.files[fileName]}
                /> 
            )
        })
        return previews
    }

    render(){
        return(
        <div>
       
           <div>
               FamilyPreview: <span>{this.props.file.fileName}</span>
           </div>
       
           <div>
               artwork Family: <span>{!this.props.file.artworkFamily ? "N/A" : this.props.file.artworkFamily}</span>
           </div>
       
           <Button
               variant="primary"
               size="sm"
               onClick={() => {this.createFamilyList(this.props)}}
           >
               Load all Family records
           </Button>
       
           <div>
            {!this.props.file.relatedArtwork ? null : 
                this.props.file.relatedArtwork.column.fileIds.map((fileName, index) => {
                    return this.fileContainer(this.props.file.relatedArtwork.files[fileName].fileType, this.props.file.relatedArtwork.files[fileName], index)
                })
            }
            </div> 
       
        </div>
        )
    }
}