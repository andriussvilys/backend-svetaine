import React from 'react'
import FilePreview from '../FilePreview'

const ImageBox = (props) => {
    const highlighter = (fileName) => {
        return props.directory ? props.directory.includes(fileName) : false
    }
    return(
        <div 
        // className="imageBox" 
        className={`imageBox__wrapper ${props.customClass ? props.customClass : ""} ${highlighter(props.file.fileName)? 'themes-list--selected' : 'notSelected'}`}>
        <FilePreview 
            file={props.file}
        >
        </FilePreview>
        <div className="imageBox__text">
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