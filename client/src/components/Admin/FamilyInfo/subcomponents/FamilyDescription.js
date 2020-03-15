import React, { Fragment } from 'react'

const FamilyDescription = (props) => {
    const target = !props.fileName ?
    props.context.state.familySetupData :
    props.context.state.fileData.files[props.fileName]
    return(
        <div className="imageInfo--box"  style={{display: "block"}}>
        <div>
            <p>Family description:</p> 
            <p className="subtitle">this description will appear on each item in the artwork family</p>
        </div>
        <textarea
            value={target.familyDescription || ""}
        onChange={
            (e) => props.context.onChange(e, "familyDescription", props.fileName)
        }
        style={{width: "100%"}}
        ></textarea>
    </div>
    )
}

export default FamilyDescription