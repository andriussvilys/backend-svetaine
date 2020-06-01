import React, { Fragment } from 'react'
import ArtworkInfo from './ArtworkInfo'
import PreviewBubbles from './PreviewBubble'
import Controls from './Controls'

const Combined = (props) => {
    const spreadLetters = (title) => {
        let letters = Array.from(title).map((letter, index) => {
            return <div key={`${title}-leter-${index}`} className="title-letter white-font">{letter}</div>
        })
        return letters
    }
    return(
        <div className="enlarge-info">
            {
                props.context.state.enlarge && props.context.state.enlarge.foreground  ? 
                <Fragment>
                    <ArtworkInfo 
                        file={props.context.state.enlarge} 
                        context={props.context}
                        artworkInfoData={props.context.state.artworkInfoData} 
                        loadEnlarge={props.context.loadEnlarge} 
                        hideArtworkInfo={props.context.hideArtworkInfo}
                        mobile={props.mobile}
                    />
                    <div className="imageInfo-nav">
                        <PreviewBubbles 
                            file={props.context.state.enlarge}
                            relatedArtwork={props.context.state.enlarge ? props.context.state.enlarge.familySequence.familySequence : []}
                            enlarge={props.context.loadEnlarge}
                            context={props.context}
                        />
                        {props.context.state.mobile ? 
                            <div 
                            className="controls-button controls-exitButton" >
                                <img 
                                alt="info icon" 
                                src="icons/svg/info.svg" 
                                onClick={(e) => props.context.showInfo(e)}
                                /> 
                            </div>
                            : null
                        }
                    </div>
                </Fragment> : null
            }
            {/* {props.mobile ? 
                <Controls 
                    context={props.context}
                /> : null
            } */}
        </div>
    )
}

export default Combined