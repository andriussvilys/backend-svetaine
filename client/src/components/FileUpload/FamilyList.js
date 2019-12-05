import React from 'react'

import FilePreview from './FilePreview'
import FamilyInfo from './FamilyInfo'
import Button from 'react-bootstrap/Button'
import Accordion from '../Accordion'
import ArtworkInfo from '../ArtworkInfo'
import ChangeIndex from '../DragAndDropList/FamilyListDnD/FamilyListDnDContainer'
import NavigationInfo from '../DragAndDropList/infoComponents/NavigationInfo'
import BootstrapModal from '../BootstrapModal'


//this component returns a div with a family name and FilePreviews of each child in the family
export default class FamilyList extends React.Component{
// const FamilyList = (props) => {

    constructor(props){
        super(props);
        this.state = {showModal: false, modalMessage: null}
    }

    onClose = () => {
        this.setState({showModal: false})
    }
    /**
     * 
     * @param {*} data = takes an array of files data
     */
    renderList = (files, props) => {
        console.log('FAMILY LIST-- relatedArtwork')
        console.log(this.props.relatedArtwork)
        let list = files.map(file => {
            return (
                <div key={`FileInfo_${file.fileName}`} className="FamilyList--detail">

                    <div className="FamilyList--detail__image">
                        <FilePreview 
                            file={file}
                        >
                        </FilePreview>
                        <div className="FamilyList--detail__image__text">
                            <p className="title">fileName:</p> 
                            <p>{file.fileName}</p>
                        </div>
                        <div className="ImageInfo--transferState" style={{display: 'flex'}}>
                            <p>use global family setup</p>

                            <p className="subtitle"
                            style={
                                this.props.context.state.familySetupData.artworkFamily ? {transition: "all 0.2s", transform: "scaleY(0)"} : {transition: "all 0.2s", transform: "scaleY(1)"}
                            }
                            >
                            please select global artwork family 
                            </p>
{/* 
                            {this.props.context.state.familySetupData.artworkFamily ? null : <p className="subtitle">please select global artwork family </p> } */}
                            <form className="ImageInfo--transferState__radios">
                                <div className="container-radio">
                                    <input type="radio" 
                                    name="familyDisplaySetup" 
                                    id="familyDisplaySetup__radio-yes" 
                                    value="yes" 
                                    disabled={this.props.context.state.familySetupData.artworkFamily === null ? true : false}
                                    onChange={() => {this.props.context.fileDataMethods.transferState(file, true)}}
                                    checked={!this.props.context.state.fileData.files[file.fileName].useFamilySetup ? false : this.props.context.state.fileData.files[file.fileName].useFamilySetup}
                                    />
                                    <label 
                                    htmlFor="familyDisplaySetup_yes"
                                    id="familyDisplaySetup_yes"
                                    >yes</label>
                                </div>
                                <div className="container-radio">
                                    <input type="radio" 
                                    name="familyDisplaySetup" 
                                    id="familyDisplaySetup__radio-no" 
                                    value="no" 
                                    disabled={this.props.context.state.familySetupData.artworkFamily === null ? true : false}
                                    onChange={() => this.props.context.fileDataMethods.transferState(file)}
                                    checked={!this.props.context.state.fileData.files[file.fileName].useFamilySetup}
                                    
                                    />
                                    <label htmlFor="familyDisplaySetup_no">no</label>
                                </div>
                            </form>
                        </div>  
                    </div>

                    <div className="FamilyList--detail__info">

                    {/* ARTWORK DATA */}
                    <Accordion
                    className={`UploadFile-${file.fileName}`}
                    title={'Edit Artwork Info'}
                    >
                        <ArtworkInfo 
                            file={file}
                            fileName={file.fileName}
                            onChange={this.props.controls.fileDataMethods.onChange}
                            state={this.props.context.state}
                        />
                    </Accordion>

                    {/* FAMILY DATA */}
                    <Accordion
                    className={`UploadFile-${file.fileName}`}
                    title={'Edit Family Info'}
                    >
                        <FamilyInfo 
                        familyDropDown={{...this.props.familyDropDown, fileName: file.fileName}}
                        themesDropDown={{...this.props.themesDropDown, fileName: file.fileName}}
                        seeAlso={{...this.props.seeAlso, 
                            fileName: file.fileName, 
                            highlightReference: this.props.seeAlso.state.fileData.files[file.fileName].seeAlso
                        }}
                        >

                            <Accordion
                                title={'Arrange Indexes'}
                            >
                                <ChangeIndex 
                                    data={this.props.relatedArtwork}
                                    fileName={file.fileName}
                                    artworkFamily={file.artworkFamily}
                                />
                            </Accordion>

                            <Accordion
                                title={'Adjust tags'}
                            >
                                <NavigationInfo
                                    fileName={file.fileName}
                                />
                            </Accordion>


                        </FamilyInfo>

                    </Accordion>

                    <div className="FamilyList--submit-delete-container">  
                        <Button
                            variant="danger"
                            className="custom-button"
                            onClick={ () => this.props.controls.removeFile(file.fileName, file.artworkFamily)}
                        >
                            Remove
                        </Button>   
                        <Button
                            variant="success"
                            className="custom-button"
                            onClick={() => {
                                this.setState({showModal: true, modalMessage: "loading..."})
                                const postRes = this.props.controls.postArtworkInfo(file)
                                postRes.then( res => {
                                    this.setState({modalMessage: res})
                                })
                            }
                            }
                        >
                            Submit to server
                        </Button>

                    </div>

                        <BootstrapModal 
                            showModal={this.state.showModal}
                            message={this.state.modalMessage}
                            onClose={this.onClose}
                        />

                    </div>    

                </div>
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
        console.log(allInFamily)

        const postAll = new Promise((resolve, rej) => {
            const promiseLength = allInFamily.length
            let progress = 0
            allInFamily.forEach(fileName => {
                const fileRecord = fileData.files[fileName]
                this.props.context.fileDataMethods.postArtworkInfo(fileRecord)
                    .then(res => {
                        progress += 1
                        if(progress === promiseLength){
                            resolve(res)
                        }
                    })
                    .catch(err => rej(err))
            })
        }) 
        postAll
            .then(res => alert(res))
            .catch(err => alert(err))
    }
 

    render(){
        return (
            <div className="FamilyList--main">
                <div className="FamilyList--familyName">
                    <h5 className="FamilyList--familyName__text">{this.props.familyName ? this.props.familyName : "none"}</h5>
                </div>
                {this.renderList(this.props.files, this.props)}
                <div style={{display: "flex", justifyContent: "flex-end"}}>  
                <Button
                            variant="success"
                            className="custom-button"
                            onClick={() => {
                                this.postAll(this.props.familyName)
                            }}
                        >
                            Submit ALL to server
                </Button>
                </div>
                <BootstrapModal 
                    showModal={this.props.context.state.showModal}
                    message="updating database"
                    onClose={this.props.context.onClose}
                />
            </div>
        ) 
    }

}

// export default FamilyList