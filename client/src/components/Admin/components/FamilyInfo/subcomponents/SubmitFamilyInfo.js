import React from 'react'
import Button from 'react-bootstrap/Button'

const SubmitFamilyInfo = (props) => {

    const currentFamily = props.context.state.familySetupData.artworkFamily
    const recordedFamilyNames = props.context.state.artworkFamilyList

    const submitNew = () => {
        return (
            <div className="imageInfo--box">
            <span>record new family setup:</span>
                <Button
                    variant="success" 
                    size="sm"
                    onClick={() => props.submitAction()}
            >
                SEND
            </Button>
            </div>     
        )
    }
    const submitUpdate = () => {
        return (
            <div className="imageInfo--box">
                <span>Update family setup:</span>
                <Button
                    variant="primary" 
                    size="sm"
                    onClick={() => props.submitAction()}
                >
                SEND
                </Button>
            </div>     
        )
    }

    if(!props.context.state.familySetupData.artworkFamily){
        return null
    }
    if(recordedFamilyNames.includes(currentFamily)){
        return submitUpdate()
    }
    else{
        return submitNew()
    }
}

export default SubmitFamilyInfo 