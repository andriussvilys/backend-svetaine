import React from 'react'
import FilePreview from '../FilePreview'
import Tags from './Tags'
import PreviewBubbles from '../Enlarge/PreviewBubble'
import Controls from './Controls'

const ArtworkInfo = (props) => {
    
    

    const seeAlso = () => {
        let seeAlsos = []
        if(props.file.foreground.seeAlso.length > 0){
            seeAlsos = props.file.foreground.seeAlso.map(fileName => {
                return <FilePreview 
                    loadByDefault={"true"}
                    key={`ArtworkInfo-${fileName}`}
                    className="ArtworkInfo-preview"
                    containerClassName="ArtworkInfo-preview-container"
                    file={props.artworkInfoData[fileName]}
                    onClick={(e) => props.loadEnlarge(e, fileName)}
                    id={`seeAlso-${fileName}`}
                />
            })
            seeAlsos =  <div className="SeeAlso-related">
                            <div className="subtitle subtitle_seeAlso">related:</div>
                            <div className="SeeAlso-related_images">
                                {seeAlsos}
                            </div>
                        </div>
        }
        let previous = <div className="SeeAlso-previous">
                            <div className="subtitle subtitle_seeAlso"></div>
                        </div>;
        if(props.file.previous.fileName !== props.file.foreground.fileName){
        previous = <div className="SeeAlso-previous">
                            <div className="subtitle subtitle_seeAlso">previous:</div>
                            <FilePreview 
                                loadByDefault={"true"}
                                key={`ArtworkInfo-${props.file.previous.fileName}`}
                                className="ArtworkInfo-preview"
                                containerClassName="ArtworkInfo-preview-container"
                                file={props.file.previous}
                                onClick={(e) => props.loadEnlarge(e, props.file.previous.fileName)}
                                id={`previous-${props.file.previous.fileName}`}
                            />
                        </div>
        }
        let combined = [previous]
        combined = [...combined, seeAlsos]
        return <div className="ArtworkInfo-seeAlso-container">
                {combined}
            </div>
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
            className={props.file.open ? "ArtworkInfo-container show" : "ArtworkInfo-container"}
            id="ArtworkInfo" 
            onClick={(e) => props.hideArtworkInfo(e)}
            style={{width: `${props.mobile ? `100%` : `${props.file.currentWidth}px`}`}}
        >   
            {/* <PreviewBubbles 
                file={props.file}
                relatedArtwork={props.context.state.relatedArtwork}
                enlarge={props.context.loadEnlarge}
            /> */}
            <Controls
                showInfo={props.context.showInfo}
                context={props.context}
            />
            <div key={"ArtworkInfo-wrapper"} className="ArtworkInfo-wrapper">
                <div ke={"ArtworkInfo-container_text"} className="ArtworkInfo-container_text" >
                    {artworkTitle()}
                    {descriptions()}
                </div>
                {<Tags 
                    file={props.file.background}
                    context={props.context}
                />}
                <div key={"ArtworkInfo-container_seealso"} className="ArtworkInfo-container_seealso">
                    {seeAlso()}
                </div>
            </div>
        </div>
    )
}

export default ArtworkInfo