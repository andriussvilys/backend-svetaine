import React from 'react'
import ArtworkInfo from '../ArtworkInfo/ArtworkInfo'
import Filters from '../Filters/Filters'
import Accordion from '../Accordion'
import BootstrapModal from '../BootstrapModal'
import { Button } from 'react-bootstrap' 
import ArrangeFamilyIndexes from '../ArrangeIndexes/ArrangeFamilyIndexes'
import SeeAlsoContainer from '../SeeAlso/SeeAlsoContainer'
import SelectFamily from '../FamilyInfo/subcomponents/SelectFamily'
import ImageBox from '../ImageBox/ImageBox'
import SelectGlobalSetup from '../ImageBox/optionalComponents/SelectGlobalSetup'

const EditArtwork = (props) => {
    let showModal = false
    let modalMessage = ""
    const onClose = () => {
        showModal = false
    }
        return (
            <div key={`FileInfo_${props.file.fileName}`} className="FamilyList--detail">

                <ImageBox
                    file={props.file}
                >
                    <SelectGlobalSetup 
                        file={props.file}
                        context={props.context}
                    />
                </ImageBox>

                <div className="FamilyList--detail__info">

                {/* ARTWORK DATA */}
                <Accordion
                    title={"Artwork Family"}
                >
                    <SelectFamily 
                        context={props.context}
                        fileName={props.file.fileName}
                    />
                </Accordion>

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
                    />
                </Accordion>

                <Accordion
                    title={"See Also"}
                >
                    <SeeAlsoContainer 
                        directory={props.context.state.fileData.files[props.file.fileName].seeAlso}
                        initialData={props.context.state.artworkInfoData}
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

