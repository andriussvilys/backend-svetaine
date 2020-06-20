import React from 'react'

const ViewControls = props => {
    const disabled = props.context.state.enlarge.familySequence ? props.context.state.enlarge.familySequence.familySequence.length < 2 : true
    const artworkInfo = document.getElementById("ArtworkInfo")
    
    console.log(`DISABLED? ${disabled}`)
    console.log(props.context.state.enlarge.familySequence.familySequence)
    return(
        <div className={"viewControls"}>
            <div 
                className={"viewControls-viewNext-container"}
            >
                <button
                    disabled={disabled}
                    onClick={() => props.context.viewNext(+1)}
                    className={"viewControls-button"}
                >
                    <img 
                    className={`viewControls-viewNext ${disabled ? "viewControls-button-disabled" : ''}`}
                    alt="view next" 
                    src="icons/svg/view-right.svg" />
                </button>
                <button
                    disabled={disabled}
                    onClick={() => props.context.viewNext(-1)}
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
                    {/* {props.showInfoText} */}
                    <img className={"viewControls-showInfo-infoIcon"} alt="info icon" src="icons/svg/info.svg"></img>
                    <span>{props.infoUp ? "Less Info" : "More info"}</span>
                    {/* {props.infoUp ? 
                        <img className={"viewControls-viewNext"} alt="info icon" src="icons/svg/view-down.svg"></img> :
                        <img className={"viewControls-viewNext"} alt="info icon" src="icons/svg/view-up.svg"></img>
                    } */}
                </button>
            </div>

        </div>
    )
}

export default ViewControls