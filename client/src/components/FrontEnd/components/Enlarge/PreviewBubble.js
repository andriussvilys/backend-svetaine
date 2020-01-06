import React from 'react'

const PreviewBubbles = (props) => {
    console.log("PreviewBubbles")
    console.log(props.file)
    const countBubbles = (file) => {
        let bubbles = []
        const famName = file.background.artworkFamily
        const famArray = props.relatedArtwork[famName].column.fileIds
        const currentIndex = famArray.indexOf(file.background.fileName)
        bubbles = famArray.map(item => {
            if(item === file.background.fileName){
                return <div 
                            onClick={(e) => {props.enlarge(e, item)}} 
                            className="previewBubble previewBubble-filled"
                        ></div>
            }
            return <div 
                        onClick={(e) => {props.enlarge(e, item)}} 
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
            {props.file ? countBubbles(props.file) : null}
        </div>
    )
}

export default PreviewBubbles