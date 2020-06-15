import React from 'react'

const ExitButton = (props) => {
    return(
        <div 
        className="controls-button controls-exitButton"
        onClick={(e) => {
            e.stopPropagation()
            props.context.closeEnlarge()
        }}
        >
            <img alt="close icon" src="icons/svg/close_filled.svg"/>
        </div>
    )
}

export default ExitButton