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
    fileContainer = (fileType, file) => {

        const previewSource = file.filePath ? file.filePath : file.preview

        console.log(file.filePath ? 'file.filePath' : 'file.preview')
        console.log(previewSource)

        if(fileType.match('image')){
            console.log('RETURN IMAGE')
            return(
                <img className="ImagesPreview--image" alt={file.fileName} src={previewSource} />    
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
            console.log('RETURN AUDIO')
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

    createFamilyList = (props) => {
        if(!props.file.artworkFamily){
            return null
        }

        let serverFamily = null;

        //get all records from the selected family from database
        axios.get(`/api/artworkInfo/${props.file.artworkFamily}`)
            .then(res =>{

                serverFamily = res.data
                
                //get all files that have selected family, but are not uploaded to server yet
                const getStateFamily = (props) => {
                    let filesInFamily = Object.keys(props.state.fileData.files).map(obj => {
                        if(props.state.fileData.files[obj].artworkFamily === props.file.artworkFamily){
                            return props.state.fileData.files[obj]
                        }
                        return 
                    })
                    return filesInFamily
                }
                let stateFamily = getStateFamily(props)
        
                //put server files and state files in one array
                const allInFamily = [...serverFamily, ...stateFamily]

                // console.log('allInFamily')
                // console.log(allInFamily)
        
                let previews = allInFamily.map(file => {
                    return (
                        // this.fileContainer(file.fileType, file)
                        <FilePreview 
                            file={file}
                        />
                    )
                })

                this.familyList = previews
                 console.log('previews')
                console.log(previews)
                return this.setState({familyList: previews})
            })
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
       
           <div>{this.state.familyList}</div> 
       
        </div>
        )
    }
}