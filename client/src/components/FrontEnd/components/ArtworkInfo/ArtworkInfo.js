import React, { Fragment } from 'react'
import FilePreview from '../FilePreview'

const ArtworkInfo = (props) => {
    
    

    const seeAlso = () => {
        if(props.file.foreground.seeAlso.length > 0){
            let seeAlsos = props.file.foreground.seeAlso.map(fileName => {
                return <FilePreview 
                    key={`ArtworkInfo-${fileName}`}
                    className="ArtworkInfo-preview"
                    containerClassName="ArtworkInfo-preview-container"
                    file={props.artworkInfoData[fileName]}
                    onClick={(e) => props.loadEnlarge(e, fileName)}
                />
            })
            if(props.file.previous.fileName !== props.file.foreground.fileName){
                if(!props.file.foreground.seeAlso.includes(props.file.previous.fileName)){
                    const previous = <FilePreview 
                            key={`ArtworkInfo-${props.file.previous.fileName}`}
                            className="ArtworkInfo-preview"
                            containerClassName="ArtworkInfo-preview-container"
                            file={props.file.previous}
                            onClick={(e) => props.loadEnlarge(e, props.file.previous.fileName)}
                            />
                    seeAlsos = [previous, ...seeAlsos]
                }
            }
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
                if(props.file.foreground.artworkFamily === "none" || "about"){
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
                return (
                    <div className="ArtworkInfo-Title">
                        {artworkTitle()}
                        {artworkFamily()}
                        {locationAndYear()}
                    </div>
                )
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
            style={{width: `${props.mobile ? `100%` : `${props.file.currentWidth}px`}`}}
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