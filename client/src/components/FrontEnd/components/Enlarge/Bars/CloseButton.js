import React from 'react'

const ExitButton = (props) => {
    return(
        <div 
        // className={"List-closeButton"}
        className={"enlarge-closeButton-container"}
        >
            <button 
            // className="controls-button controls-exitButton"
            className="enlarge-closeButton-button"
            onClick={(e) => {
                e.stopPropagation()
                props.context.closeEnlarge()
            }}
            >
                {props.context.state.mobile ? 
                    <img className={"List-closeButton_img"} src="icons/svg/view-right.svg" alt="close icon"/> : null
                }
                <span>close</span>
                {!props.context.state.mobile ? 
                    <img className={"List-closeButton_img"} src="icons/svg/view-left.svg" alt="close icon"/> : null
                }
            </button>
        </div>
    )
}

export default ExitButton