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

const FamilyList = (props) => {

    console.log('FAMILY LIST PROPS')
    console.log(props)

    /**
     * 
     * @param {*} data = takes an array of files data
     */

    const isChecked = () => {

    }

    const renderList = (files, props) => {
        console.log("FAMILY LIST RENDERFILES --- FILES PROP")
        console.log(files)
        let list = files.map(file => {
            console.log('FAMILY LIST ------ FILE')
            console.log(file)
            return (
                <div className="FamilyList--detail">

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
                                    onChange={() => {props.context.fileDataMethods.transferState(file, true)}}
                                    checked={!props.context.state.fileData.files[file.fileName].useFamilySetup ? false : props.context.state.fileData.files[file.fileName].useFamilySetup}
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
                                    onChange={() => props.context.fileDataMethods.transferState(file)}
                                    checked={!props.context.state.fileData.files[file.fileName].useFamilySetup}
                                    
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
                            onChange={props.controls.fileDataMethods.onChange}
                        />
                    </Accordion>

                    {/* FAMILY DATA */}
                    <Accordion
                    className={`UploadFile-${file.fileName}`}
                    title={'Edit Family Info'}
                    >
                        <FamilyInfo 
                        familyDropDown={{...props.familyDropDown, fileName: file.fileName}}
                        themesDropDown={{...props.themesDropDown, fileName: file.fileName}}
                        seeAlso={{...props.seeAlso, 
                            fileName: file.fileName, 
                            highlightReference: props.seeAlso.state.fileData.files[file.fileName].seeAlso
                        }}
                        >

                            <Accordion
                                title={'Arrange Indexes'}
                            >
                                <ChangeIndex 
                                    data={props.relatedArtwork}
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
                            onClick={ () => props.controls.removeFile(file.fileName)}
                        >
                            Remove
                        </Button>   
                        <Button
                            variant="success"
                            className="custom-button"
                            onClick={() => props.controls.postArtworkInfo(file)}
                        >
                            Submit to server
                        </Button>

                    </div>

                        <BootstrapModal 
                            showModal={props.context.state.showModal}
                            message={"Save file to databse?"}
                        />
                        {/* <LoaderModal
                            showModal={props.showModal}
                        /> */}
                    </div>    

                </div>
            )
        }); 

        return list
    }

    return (
        <div className="FamilyList--main">
            <div className="FamilyList--familyName">
                <h5 className="FamilyList--familyName__text">{props.familyName ? props.familyName : "none"}</h5>
            </div>
            {renderList(props.files, props)}
        </div>
    ) 
}

export default FamilyList