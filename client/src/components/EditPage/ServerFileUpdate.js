import React from 'react';
import Button from 'react-bootstrap/Button'

import FilePreview from '../FilePreview'
import Accordion from '../Accordion'
import FamilyInfo from '../FileUpload/FamilyInfo'
import NavigationInfo from '../NavigationInfo'
import ArtworkInfo from '../ArtworkInfo'
import ChangeIndex from '../DragAndDropList/FamilyListDnD/FamilyListDnDContainer'
import BootstrapModal from '../BootstrapModal'

/**
 * @props file 
 * @props state
 * @props controls
 * @props familyDropDown 
 * @props themesDropDown
 * @props seeAlso {                    
 *  state: this.context.state,
    context: this.context,
    initialData: this.context.state.artworkInfoData,
    onChange: this.context.fileDataMethods.onChange, 
        }
 */
const ServerFileUpdate = (props) => {

    const getRelatedArtwork = () => {

        const relatedPromise = new Promise((res) => {
            let result = null
            console.log('SERVERFILEUPDATE GET RELATED ARTWORK')
            console.log(props.file.artworkFamily)
            if(!props.context.state.relatedArtwork[props.file.artworkFamily]){
                 props.context.familySetupMethods.getRelatedArtwork(props.file.artworkFamily, props.context.state).then(resolve => {
                     console.log('promise result in server fileUpdate')
                     console.log(resolve)
                     result = resolve
                     res(result)
                        return 
                    })
                //  if(result){
                //     console.log('RES**********')
                //     console.log(res)
                //     res(result)
                // }
            }
            else{
                result = props.context.state.relatedArtwork[props.file.artworkFamily]
                if(result){
                    console.log('RES**********')
                    console.log(res)
                    res(result)
                    return
                }
            }
        })

        relatedPromise.then(res => {
            console.log('RETURNING CHANGE INDEX')
            console.log(res)
            console.log(props.file.fileName)
            console.log(props.file.artworkFamily)
            
            return <div>
                <h5>{props.file.artworkFamily}</h5>
                <ChangeIndex 
                // data={props.relatedArtwork}
                data={res}
                fileName={props.file.fileName}
                artworkFamily={props.file.artworkFamily}
                />
            </div>
        })
        .catch(err => {
            console.log('PROMISE BROKE')
            console.error(err)
        })

    }

    return(
    <div className="FamilyList--detail">

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
                        checked={props.context.state.fileData.files[props.file.fileName].useFamilySetup}
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
                onChange={props.controls.fileDataMethods.onChange}
            />
        </Accordion>

        {/* FAMILY DATA */}
        <Accordion
        className={`UploadFile-${props.file.fileName}`}
        title={'Edit Family Info'}
        >
            <FamilyInfo 
            familyDropDown={{...props.familyDropDown, fileName: props.file.fileName}}
            themesDropDown={{...props.themesDropDown, fileName: props.file.fileName}}
            seeAlso={{...props.seeAlso, 
                fileName: props.file.fileName, 
                highlightReference: props.seeAlso.state.fileData.files[props.file.fileName].seeAlso
            }}
            >

                <Accordion
                    title={'Arrange Indexes'}
                >
                    <ChangeIndex 
                        // data={props.relatedArtwork}
                        data={getRelatedArtwork()}
                        fileName={props.file.fileName}
                        artworkFamily={props.file.artworkFamily}
                    />
                    
                    {/* {getRelatedArtwork()} */}


                </Accordion>

                <Accordion
                    title={'Adjust tags'}
                >
                    <NavigationInfo
                        fileName={props.file.fileName}
                    />
                </Accordion>


            </FamilyInfo>

        </Accordion>

        <div className="FamilyList--submit-delete-container">  
            <Button
                variant="danger"
                className="custom-button"
                onClick={ () => props.controls.removeFile(props.file.fileName)}
            >
                Remove
            </Button>   
            <Button
                variant="success"
                className="custom-button"
                onClick={() => props.controls.postArtworkInfo(props.file)}
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
}

export default ServerFileUpdate