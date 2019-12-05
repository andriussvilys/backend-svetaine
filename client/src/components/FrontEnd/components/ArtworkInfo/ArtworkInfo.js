import React, { Fragment } from 'react'
import FilePreview from '../FilePreview'

const ArtworkInfo = (props) => {
    
    

    const seeAlso = () => {
        if(props.file.foreground.seeAlso.length > 0){
            let seeAlsos = props.file.foreground.seeAlso.map(fileName => {
                return <FilePreview 
                    className="ArtworkInfo-preview"
                    containerClassName="ArtworkInfo-preview-container"
                    file={props.artworkInfoData[fileName]}
                    onClick={(e) => props.loadEnlarge(e, fileName)}
                />
            })
            return <div>
                {/* <p>related:</p> */}
                <div className="ArtworkInfo-seeAlso-container">
                    {seeAlsos}
                </div>
            </div>
        }
        else{return null}
    }

    const locationAndYear = () => {
        let location = props.file.foreground.location ? props.file.foreground.location : null
        let year = props.file.foreground.year ? props.file.foreground.year: null
        if(location && year){
            return <div className="ArtworkInfo_locationYear">({location}. {year})</div>
        }
        if(!year && location){
            return <div className="ArtworkInfo_locationYear">({location})</div>
        }
        if(year){
            return <div className="ArtworkInfo_locationYear">({year})</div>
        }
        else{ return null}
    }

    const artworkTitle = () => {

            const artworkFamily = () => {
                if(props.file.foreground.artworkFamily === "none"){
                    return null
                }
                return <div 
                className={
                    props.file.foreground.artworkTitle ? 
                    "ArtworkInfo_artworkFamily" :
                    "ArtworkInfo_artworkTitle"
                    }
                    >
                    part of <em 
                    className="ArtworkInfo_artworkFamily_variable">{props.file.foreground.artworkFamily}</em></div>
            }

            const artworkTitle = () => {
                if(props.file.foreground.artworkTitle){
                    return <em className="ArtworkInfo_artworkTitle">{props.file.foreground.artworkTitle}</em>
                }
                else{return null}
            }

            if(props.file.foreground.artworkTitle){
                return (
                    <div className="ArtworkInfo-Title">
                        {artworkTitle()}
                        {artworkFamily()}
                        {locationAndYear()}
                    </div>
                )
            }

            else{return artworkFamily()}
        }

    const descriptions = () => {
        return(
            <div className="ArtworkInfo--descriptions">
                {props.file.foreground.artworkDescription ? <div className="ArtworkInfo--artworkDescription ArtworkInfo--descriptions_instance">{props.file.foreground.artworkDescription}</div> : null}
                {props.file.foreground.familyDescription ? <div className="ArtworkInfo--familyDescription ArtworkInfo--descriptions_instance">{props.file.foreground.familyDescription}</div> : null}
            </div>
        )
    }

    return(
        <div 
            className="ArtworkInfo-container" 
            id="ArtworkInfo" 
            onClick={(e) => props.hideArtworkInfo(e)}
        >
            <div className="ArtworkInfo-wrapper">
                <div className="ArtworkInfo-container_text" >
                    {artworkTitle()}
                    {descriptions()}
                </div>
                <div className="ArtworkInfo-container_seealso">
                    {seeAlso()}
                </div>
            </div>
        </div>
    )
}

export default ArtworkInfo