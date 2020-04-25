import React from 'react'
import Button from 'react-bootstrap/Button'

const SubmitFamilyInfo = (props) => {

    const currentFamily = props.context.state.familySetupData.artworkFamily
    const recordedFamilyNames = props.context.state.artworkFamilyList

    const submitNew = () => {
        return (
            <div 
            >
            <span>record new family setup:</span>
                <Button
                    variant="success" 
                    size="sm"
                    onClick={() => props.submitAction()}
            >
            SUBMIT
            </Button>
            </div>     
        )
    }
    const submitUpdate = () => {
        return (
            <div 
            >
                <span>Update family setup:</span>
                <Button
                    variant="primary" 
                    size="sm"
                    onClick={() => props.submitAction()}
                >
                SUBMIT
                </Button>
            </div>     
        )
    }

    const noFamilyName = () => {
        return(
            <div 
            >
                <span>Create new Artwork Family name.</span>
            </div>
        )
    }
    if(recordedFamilyNames.includes(currentFamily)){
        return submitUpdate()
    }
    else if(!currentFamily){
        return noFamilyName()
    }
    else{
        return submitNew()
    }
}

export default SubmitFamilyInfo 