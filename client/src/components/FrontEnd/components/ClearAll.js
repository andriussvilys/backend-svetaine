import React from 'react'

const ClearAll = (props) => {

    const clearImgs = (e) => {
        const isChecked = e.target.checked
        props.context.filterAllThemes(e)
        if(props.enlarge && props.enlarge.open){
            props.context.closeEnlarge(e)
        }
    }

    return(
        <div  className="clear-all">
            <div className="tagsMenu-listItem dark-bg">
                <span className="white-font">{
                    props.context.state.artworkOnDisplay && Object.keys(props.context.state.artworkOnDisplay).length > 0 ?
                        "clear all" :
                        "view all"
                }</span>
                <input 
                    id={`theme-clearAll`}
                    type="checkbox" 
                    checked={props.context.state.artworkOnDisplay ? Object.keys(props.context.state.artworkOnDisplay).length > 0 : null}
                    onChange={(e) => { clearImgs(e)}
                    } 
                />
            </div>
        </div>
    )
}

export default ClearAll;