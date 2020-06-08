import React from 'react'
// import FilePreview from '../FilePreview'
// import Tags from './Tags'
// import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const ArtworkTitle = props => {
    const artworkTitle = () => {

        const artworkFamily = () => {
            if(props.file.foreground.artworkFamily !== "none")
                return <div 
                        className={
                            props.file.foreground.artworkTitle ? 
                            "ArtworkInfo_artworkFamily" :
                            "ArtworkInfo_artworkTitle"
                            }
                            >
                                
                            {!props.file.foreground.artworkTitle ? null : <span>part of </span> }
                            <em className="ArtworkInfo_artworkFamily_variable">{props.file.foreground.artworkFamily}</em>
                        </div>
            // }
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
    const locationAndYear = () => {
        let location = props.file.foreground.location ? props.file.foreground.location : null
        let year = props.file.foreground.year ? props.file.foreground.year: null
        if(location && year){
            return <div key={"location/year"} className="ArtworkInfo_locationYear">({location}. {year})</div>
        }
        if(!year && location){
            return <div key={"location"} className="ArtworkInfo_locationYear">({location})</div>
        }
        if(year){
            return <div key={"year"} className="ArtworkInfo_locationYear">({year})</div>
        }
        else{ return null}
    }
    return(
        // <div key={"ArtworkInfo-container_text"} className="ArtworkInfo-container_text" >
            artworkTitle()
        // </div>
    )
}
export default ArtworkTitle

