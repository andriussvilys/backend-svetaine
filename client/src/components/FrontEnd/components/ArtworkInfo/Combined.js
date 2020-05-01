import React from 'react'
import ArtworkInfo from './ArtworkInfo'
import PreviewBubbles from './PreviewBubble'

const Combined = (props) => {
    return(
        <div className="enlarge-info">
            <ArtworkInfo 
                file={props.context.state.enlarge} 
                context={props.context}
                artworkInfoData={props.context.state.artworkInfoData} 
                loadEnlarge={props.context.loadEnlarge} 
                hideArtworkInfo={props.context.hideArtworkInfo}
                mobile={props.mobile}
            />
            <PreviewBubbles 
                file={props.context.state.enlarge}
                relatedArtwork={props.context.state.enlarge ? props.context.state.enlarge.familySequence.familySequence : []}
                enlarge={props.context.loadEnlarge}
                context={props.context}
            />
        </div>
    )
}

export default Combined