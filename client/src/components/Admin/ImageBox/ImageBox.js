import React from 'react'
import FilePreview from '../FilePreview'

const ImageBox = (props) => {
    return(
        <div className="FamilyList--detail__image">
        <FilePreview 
            file={props.file}
        >
        </FilePreview>
        <div className="FamilyList--detail__image__text">
            <div className="">
                <p className="title">File Name:</p> 
                <p>{props.file.fileName}</p>
            </div>

            <div>
                <p className="title">Artwork Family:</p> 
                <p>{props.file.artworkFamily}</p>
            </div>
            {props.children}    
        </div>
    </div>
    )
}

export default ImageBox