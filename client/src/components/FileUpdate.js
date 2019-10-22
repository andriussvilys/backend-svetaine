import React, { Fragment } from 'react';
import FilePreview from './FilePreview';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

export default class FileUpdate extends React.Component{

    constructor(props){
        super(props);
        this.state = {fileList: []}
    }

    renderAllFiles = new Promise((resolve, rej) => {

            let serverFileNames = null;

            axios.get('/fetchImages')
                .then(res => {
                    console.log('renderall fiels runs')
                    console.log(res.data)
                    serverFileNames = res.data

                    axios.get('/api/artworkInfo')
                        .then(res => {
                            let databaseFiles = []
                            let usedNames = []

                            serverFileNames.forEach(fileName => {
                                res.data.forEach(obj => {if(obj.fileName === fileName){return databaseFiles = [...databaseFiles, obj]}})
                            })


                            let fileList = databaseFiles.map((file, index) => {
                                if(usedNames.includes(file.fileName)){
                                    return
                                }
                                usedNames = [...usedNames, file.fileName]
                                return (
                                <FilePreview 
                                    key={`fileUpload-${file.fileName}-${index}`}
                                    file={file}
                                />
                                )
                            })

                            resolve(fileList)
                        })
                    })   
        })

    componentDidMount(){
        this.renderAllFiles
            .then(res => {
                console.log('component mount res.data')
                console.log(res)
                this.setState({fileList: res})})
    }

    render(){
        return(
            <div>
                <div>
                    <Accordion >
                        <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0" className="accordion-secondary">
                                View all server files
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body>

                            <div style={{display: "flex", flexWrap: "wrap"}}>
                                {this.state.fileList.length > 0 ?
                                this.state.fileList.map(filePreview => filePreview)
                                : null}
                            </div>

                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </div>
            </div>
        )
    }
}