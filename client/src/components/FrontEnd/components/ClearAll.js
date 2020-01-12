import React from 'react'

const ClearAll = (props) => {

    let hide = props.context.state.artworkOnDisplay && Object.keys(props.context.state.artworkOnDisplay).length > 0

    const clearImgs = (hide) => {
        props.context.filterAllThemes(hide)
        // if(props.enlarge && props.enlarge.open){
        //     props.context.closeEnlarge(e)
        // }
    }

    const spreadLetters = (title) => {
        let letters = Array.from(title).map((letter, index) => {
            return <div key={`${title}-leter-${index}`} className="title-letter white-font">{letter}</div>
        })
        return letters
    }

    return(
        <div 
        onClick={() => {clearImgs(hide)}}
        className="TagsMenu-Accordion-label dark-bg">
            <div className="TagsMenu-category-title">
                {spreadLetters(
                    props.context.state.artworkOnDisplay && Object.keys(props.context.state.artworkOnDisplay).length > 0 ?
                        "clear all" :
                        "view all"
                )}
            </div>
        </div>
    )
}

export default ClearAll;