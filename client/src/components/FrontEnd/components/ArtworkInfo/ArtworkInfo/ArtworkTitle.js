import React, { Fragment } from 'react'
import PreviewCounter from '../PreviewCounter'
import ViewControls from '../ViewControls'
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
                            <div>
                                <span className={"ArtworkInfo_artworkTitle_secondary"}>part of </span>
                                {/* {!props.file.foreground.artworkTitle ? null : <span>part of </span> } */}
                                <em className="ArtworkInfo_artworkFamily_variable ArtworkInfo_artworkTitle_secondary">{props.file.foreground.artworkFamily}</em>
                            </div>
                        </div>
            // }
        }

        const artworkTitle = () => {
            return <div style={{marginLeft: "-7px"}}>                 
                    {props.file.foreground.artworkTitle ? <em className="ArtworkInfo_artworkTitle">{props.file.foreground.artworkTitle}</em> : <em className={"ArtworkInfo_artworkTitle_secondary"}>–</em>}
                    </div>
        }
            return (
                <div className="ArtworkInfo-Title" id="ArtworkInfo-Title">
                    <ViewControls 
                        context={props.context}
                    />
                    <PreviewCounter 
                        relatedArtwork={props.context.state.enlarge ? props.context.state.enlarge.familySequence.familySequence : []}
                        file={props.context.state.enlarge}
                    />
                    <div style={{flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <div>
                            {artworkTitle()}
                            {artworkFamily()}
                            {locationAndYear()}
                        </div>
                        <div 
                        className="controls-button controls-info" 
                        id="show-info-button"
                        onClick={(e) => props.context.showInfo(e)}
                        >
                            <img 
                            alt="info icon" 
                            src="icons/svg/info.svg" 
                            /> 
                        </div>
                    </div>
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
            <Fragment>
                {artworkTitle()}
            </Fragment>
        // </div>
    )
}
export default ArtworkTitle

