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

    renderAllFiles = () => {
        return new Promise((resolve, rej) => {

            axios.get('/fetchImages')
                .then(res => {
                    console.log('renderall fiels runs')
                    console.log(res.data)
                    let fileList = res.data.map(file => {
                        return (
                        <FilePreview 
                            key={`fileUpload-${file}`}
                            file={file}
                        />
                        )
                    })
                    if(fileList.length === res.data.length){
                        console.log(fileList)
                        this.setState({fileList: fileList}, resolve())
                    }
                })
                
        })
    }

    componentDidMount(){

        this.renderAllFiles()
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