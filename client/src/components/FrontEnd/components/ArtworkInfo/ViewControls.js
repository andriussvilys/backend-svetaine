import React from 'react'
import PreviewCounter from './PreviewCounter'

const ViewControls = props => {
    if(!props.context.state.enlarge || !props.context.state.enlarge.open){
        return null
    }
    const disabled = props.context.state.enlarge && props.context.state.enlarge.familySequence ? props.context.state.enlarge.familySequence.familySequence.length < 2 : true
    const artworkInfo = document.getElementById("ArtworkInfo")
    return(
        <div className={"viewControls"}>
            <div 
                className={"viewControls-viewNext-container"}
            >
                <button
                    disabled={disabled}
                    onClick={() => props.context.viewNext(-1)}
                    className={"viewControls-button"}
                >
                    <img 
                    className={`viewControls-viewNext ${disabled ? "viewControls-button-disabled" : ''}`}
                    alt="view next" 
                    src="icons/svg/view-right.svg" />
                </button>              
                    <PreviewCounter 
                        relatedArtwork={props.context.state.enlarge && props.context.state.enlarge.familySequence? props.context.state.enlarge.familySequence.familySequence : []}
                        file={props.context.state.enlarge}
                    />
                <button
                    disabled={disabled}
                    onClick={() => props.context.viewNext(+1)}
                    className={"viewControls-button"}
                >
                    <img 
                        className={`viewControls-viewNext ${disabled ? "viewControls-button-disabled" : ''}`} 
                        alt="view next" 
                        src="icons/svg/view-left.svg" />
                </button>
            </div>
            <div 
                className={"viewControls-info-container"}
            >
                <button
                    className={"viewControls-button viewControls-button-info"}
                    onClick={e => props.showInfo(e)}
                >
                    <img className={"viewControls-showInfo-infoIcon"} alt="info icon" src="icons/svg/info.svg"></img>
                    <span>{props.infoUp ? "Less Info" : "More info"}</span>
                </button>
            </div>

        </div>
    )
}

export default ViewControls