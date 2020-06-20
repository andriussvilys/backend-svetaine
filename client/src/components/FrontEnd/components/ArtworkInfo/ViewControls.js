import React from 'react'

const ViewControls = props => {
    return(
        <div className={"viewControls"}>
            <div>
                <button
                    onClick={() => props.context.viewNext(+1)}
                >
                    <img alt="view next" src="icons/svg/view-right.svg" />
                </button>
                <button
                    onClick={() => props.context.viewNext(-1)}
                >
                    <img alt="view next" src="icons/svg/view-left.svg" />
                </button>
            </div>
        </div>
    )
}

export default ViewControls