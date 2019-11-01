import React from 'react'

import FilePreview from './FilePreview'
import FamilyInfo from './FamilyInfo'
import Button from 'react-bootstrap/Button'
import Accordion from '../Accordion'
import ArtworkInfo from '../ArtworkInfo'

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
                <div>
                    <FilePreview 
                        file={file}
                    >
                    </FilePreview>

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
                        // state={props.familyDropDown.state}
                        // familyList={props.familyDropDown.familyList}
                        // context={props.familyDropDown.context}
                        />
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
        <div>
            <h5>{props.familyName}</h5>
            {renderList(props.files, props)}
        </div>
    ) 
}

export default FamilyList