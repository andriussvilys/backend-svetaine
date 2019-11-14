import React from 'react'
import FilePreview from './FilePreview'

const ImageSelect = (props) => {
    if(props.data){
        let previews = Object.keys(props.data).map(objName => {
            return <FilePreview file={props.data[objName]} />
        })
        return(
            <div className="imageSelect-container">
                {previews}
            </div>
        )
    }
    else{return null}
}

export default ImageSelect