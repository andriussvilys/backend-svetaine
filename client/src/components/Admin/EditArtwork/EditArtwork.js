import React from 'react'
import FilePreview from '../FilePreview'
import ArtworkInfo from '../ArtworkInfo/ArtworkInfo'
import Filters from '../Filters/Filters'
import Accordion from '../Accordion'
import BootstrapModal from '../../BootstrapModal'
import { Button } from 'react-bootstrap' 
import ArrangeFamilyIndexes from '../ArrangeIndexes/ArrangeFamilyIndexes'

const EditArtwork = (props) => {
    let showModal = false
    let modalMessage = ""
    const onClose = () => {
        showModal = false
    }
        return (
            <div key={`FileInfo_${props.file.fileName}`} className="FamilyList--detail">

                <div className="FamilyList--detail__image">
                    <FilePreview 
                        file={props.file}
                    >
                    </FilePreview>
                    <div className="FamilyList--detail__image__text">
                        <p className="title">fileName:</p> 
                        <p>{props.file.fileName}</p>
                    </div>
                    <div className="ImageInfo--transferState" style={{display: 'flex'}}>
                        <p>use global family setup</p>

                        <p className="subtitle"
                        style={
                            props.context.state.familySetupData.artworkFamily ? {transition: "all 0.2s", transform: "scaleY(0)"} : {transition: "all 0.2s", transform: "scaleY(1)"}
                        }
                        >
                        please select global artwork family 
                        </p>
{/* 
                        {props.context.state.familySetupData.artworkFamily ? null : <p className="subtitle">please select global artwork family </p> } */}
                        <form className="ImageInfo--transferState__radios">
                            <div className="container-radio">
                                <input type="radio" 
                                name="familyDisplaySetup" 
                                id="familyDisplaySetup__radio-yes" 
                                value="yes" 
                                disabled={props.context.state.familySetupData.artworkFamily === null ? true : false}
                                onChange={() => {props.context.fileDataMethods.transferState(props.file, true)}}
                                checked={!props.context.state.fileData.files[props.file.fileName].useFamilySetup ? false : props.context.state.fileData.files[props.file.fileName].useFamilySetup}
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
                                disabled={props.context.state.familySetupData.artworkFamily === null ? true : false}
                                onChange={() => props.context.fileDataMethods.transferState(props.file)}
                                checked={!props.context.state.fileData.files[props.file.fileName].useFamilySetup}
                                
                                />
                                <label htmlFor="familyDisplaySetup_no">no</label>
                            </div>
                        </form>
                    </div>  
                </div>

                <div className="FamilyList--detail__info">

                {/* ARTWORK DATA */}
                <Accordion
                className={`UploadFile-${props.file.fileName}`}
                title={'Edit Artwork Info'}
                >
                    <ArtworkInfo 
                        file={props.file}
                        fileName={props.file.fileName}
                        onChange={props.context.onChange}
                        state={props.context.state}
                    />
                </Accordion>
                <Filters 
                    context={props.context}
                    fileName={props.file.fileName}
                />
                <Accordion
                    title={"Arrange Index"}
                >
                    <ArrangeFamilyIndexes 
                        data={props.context.state.relatedArtwork[props.file.artworkFamily]}
                        file={props.file}
                        // fileName={props.file.filename}
                        // artworkFamily={props.file.artworkFamily}
                    />
                </Accordion>

                {/* FAMILY DATA */}

                <div className="FamilyList--submit-delete-container">  
                    <Button
                        variant="danger"
                        className="custom-button"
                        onClick={ () => props.context.fileDataMethods.removeFile(props.file.fileName, props.artworkFamily)}
                    >
                        Remove
                    </Button>   
                    <Button
                        variant="success"
                        className="custom-button"
                        onClick={() => {
                            showModal = true;
                            modalMessage = "loading..."
                            const postRes = props.context.fileDataMethods.postArtworkInfo(props.file)
                            postRes.then( res => {
                                modalMessage = res
                            })
                        }
                        }
                    >
                        Submit to server
                    </Button>

                </div>

                    <BootstrapModal 
                        showModal={showModal}
                        message={modalMessage}
                        onClose={onClose}
                    />

                </div>    

            </div>
        )
}

export default EditArtwork

