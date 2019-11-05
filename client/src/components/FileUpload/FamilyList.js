import React from 'react'

import FilePreview from './FilePreview'
import FamilyInfo from './FamilyInfo'
import Button from 'react-bootstrap/Button'
import Accordion from '../Accordion'
import ArtworkInfo from '../ArtworkInfo'
import FamilyListDnDContainer from '../DragAndDropList/FamilyListDnD/FamilyListDnDContainer'
import NavigationInfo from '../DragAndDropList/infoComponents/NavigationInfo'


//this component returns a div with a family name and FilePreviews of each child in the family

const FamilyList = (props) => {

    console.log('FAMILY LIST PROPS')
    console.log(props)

    /**
     * 
     * @param {*} data = takes an array of files data
     */

    const renderList = (files, props) => {
        let list = files.map(file => {
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
                                <FamilyListDnDContainer 
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

                    <div className="submit-delete-container">  
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
        <div className="ImagesPreview--container FamilyList--main">
            <div className="FamilyList--familyName">
                <h5 className="FamilyList--familyName__text">{props.familyName}</h5>
            </div>
            {renderList(props.files, props)}
        </div>
    ) 
}

export default FamilyList