import React from 'react'

const ViewControls = props => {
    const disabled = props.context.state.enlarge.familySequence ? props.context.state.enlarge.familySequence.familySequence.length < 2 : true
    
    console.log(`DISABLED? ${disabled}`)
    console.log(props.context.state.enlarge.familySequence.familySequence)
    return(
        <div className={"viewControls"}>
            <div>
                <button
                    disabled={disabled}
                    onClick={() => props.context.viewNext(+1)}
                >
                    <img className={disabled ? "viewControls-button-disabled" : ''} alt="view next" src="icons/svg/view-right.svg" />
                </button>
                <button
                    disabled={disabled}
                    onClick={() => props.context.viewNext(-1)}
                >
                    <img className={disabled ? "viewControls-button-disabled" : ''} alt="view next" src="icons/svg/view-left.svg" />
                </button>
            </div>
            <div>
                <button
                    onClieck={e => props.showInfo(e)}
                >
                    {props.showInfoText}
                </button>
            </div>

        </div>
    )
}

export default ViewControls