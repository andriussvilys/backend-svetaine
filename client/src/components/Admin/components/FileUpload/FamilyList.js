import React from 'react'

import Button from 'react-bootstrap/Button'
import BootstrapModal from '../BootstrapModal'
import ProgressBar from 'react-bootstrap/ProgressBar'
import EditArtwork from '../EditArtwork/EditArtwork'
import NewSingleFile from './NewSingleFile'


//this component returns a div with a family name and FilePreviews of each child in the family
export default class FamilyList extends React.Component{
// const FamilyList = (props) => {

    constructor(props){
        super(props);
        this.state = {
            showModal: false, 
            modalMessage: null,
            progressBar: 0
        }
    }

    onClose = () => {
        this.setState({showModal: false})
    }
    /**
     * 
     * @param {*} data = takes an array of files data
     */
    renderList = (files) => {
        let list = files.map(file => {
            return (
                // <EditArtwork 
                //     key={`EditArtwork-${file.fileName}`}
                //     context={this.props.context}
                //     file={file}
                // />
                <NewSingleFile 
                    key={`EditArtwork-${file.fileName}`}
                    context={this.props.context}
                    file={file}
                />
            )
        }); 

        return list
    }

    postAll = (familyName) => {
        const fileData = this.props.context.state.fileData
        const allNewFiles = fileData.column.fileIds
        const allInFamily = allNewFiles.filter(fileName => {
            return fileData.files[fileName].artworkFamily === familyName
        })

        return new Promise((resolve, rej) => {
            const promiseLength = allInFamily.length
            let progress = 0
            allInFamily.forEach(fileName => {
                this.setState({modalMessage: `sending to ${this.props.familyName}`})
                const fileRecord = fileData.files[fileName]
                this.props.context.fileDataMethods.postArtworkInfo(fileRecord)
                    .then(res => {
                        progress += 1
                        let progressBar = Math.round(progress * 100 / promiseLength)
                        this.setState({progressBar: progressBar}, console.log(this.state))
                        if(progress === promiseLength){
                            resolve("operation complete")
                        }
                    })
                    .catch(err => rej(err))
            })
        }) 
    }
 

    render(){
        return (
            <div className="FamilyList--main">
                <div className="FamilyList--familyName">
                    <div className="FamilyList--familyName__text">Family name: {this.props.familyName ? this.props.familyName : "none"}</div>
                    {/* <h5 className="FamilyList--familyName__text">Family name: {this.props.familyName ? this.props.familyName : "none"}</h5> */}
                </div>
                {this.renderList(this.props.files, this.props)}
                {/* <div style={{display: "flex", justifyContent: "center", padding: "5px 0"}}>  
                <Button
                            variant="success"
                            className="custom-button"
                            onClick={() => {
                                const verification = this.props.context.verify()
                                if(!verification.verified){
                                    return this.setState({showModal: true, modalMessage: verification.modalMessage})
                                }
                                this.setState({showModal: true})
                                this.postAll(this.props.familyName)
                                    .then(res => {
                                        this.setState({modalMessage: res})
                                    })
                                    .catch(rej => this.setState({modalMessage: rej}))
                            }}
                        >
                            Submit ALL to server
                </Button>
                </div> */}
                <BootstrapModal 
                    showModal={this.state.showModal}
                    message={this.state.modalMessage}
                    onClose={() => {this.setState({showModal: false})}}
                >
                    {this.state.progressBar ? 
                        <ProgressBar now={this.state.progressBar} /> :
                        null
                    }
                </BootstrapModal>
            </div>
        ) 
    }

}

// export default FamilyList