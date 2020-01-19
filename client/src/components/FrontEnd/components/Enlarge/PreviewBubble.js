import React from 'react'

const PreviewBubbles = (props) => {
    const countBubbles = (file) => {
        let bubbles = []
        const famName = file.background.artworkFamily
        const famArray = props.relatedArtwork[famName].column.fileIds
        const currentIndex = famArray.indexOf(file.background.fileName)
        bubbles = famArray.map(item => {
            if(item === file.background.fileName){
                return <div 
                            key={`previewBubble-${item}`}
                            onClick={(e) => {
                                if(document.getElementById("ArtworkInfo")){document.getElementById("ArtworkInfo").classList.remove("ArtworkInfo-toggleTags")}
                                props.enlarge(e, item)
                            }} 
                            className="previewBubble previewBubble-filled"
                        ></div>
            }
            return <div 
                        key={`previewBubble-${item}`}
                        onClick={(e) => {
                            if(document.getElementById("ArtworkInfo")){document.getElementById("ArtworkInfo").classList.remove("ArtworkInfo-toggleTags")}
                            props.enlarge(e, item)}} 
                        className="previewBubble"
                    ></div>
            }
            )
            if(bubbles.length <= 1 ){
                bubbles = null
            }
        return bubbles
    }
    return(
        <div className="previewBubble-container">
            <div className="previewBubble-wrapper">
                {props.file && props.file.open ? countBubbles(props.file) : null}
            </div>
            {props.children}
        </div>
    )
}

export default PreviewBubbles