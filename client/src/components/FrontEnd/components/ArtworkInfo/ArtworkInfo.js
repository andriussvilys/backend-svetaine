import React from 'react'
import FilePreview from '../FilePreview'

const ArtworkInfo = (props) => {
    console.log("ArtowkrInfo PROPS")
    console.log(props)

    const seeAlso = () => {
        if(props.file.foreground.seeAlso.length > 0){
            let seeAlsos = props.file.foreground.seeAlso.map(fileName => {
                return <FilePreview 
                    className="ArtworkInfo-preview"
                    containerClassName="ArtworkInfo-preview-container"
                    file={props.artworkInfoData[fileName]}
                />
            })
            return seeAlsos
        }
        else{return null}
    }

    return(
        <div className="ArtworkInfo-container" id="ArtworkInfo">
            <div>
                <h5>INFO:</h5>
                <div>{props.file.foreground.artworkTitle}</div>
                <div>{props.file.foreground.fileName}</div>
                <div>{props.file.foreground.artworkFamily}</div>
                <div>{props.file.foreground.familyDescription}</div>
                <div>{props.file.foreground.location}</div>
                <div>{props.file.foreground.year}</div>
            </div>
            <div className="ArtworkInfo-seeAlso-container">
                {seeAlso()}
            </div>
        </div>
    )
}

export default ArtworkInfo