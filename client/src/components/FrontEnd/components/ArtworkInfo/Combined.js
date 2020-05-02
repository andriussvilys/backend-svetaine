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
                    <PreviewBubbles 
                        file={props.context.state.enlarge}
                        relatedArtwork={props.context.state.enlarge ? props.context.state.enlarge.familySequence.familySequence : []}
                        enlarge={props.context.loadEnlarge}
                        context={props.context}
                    />
                </Fragment> : null
            }
            {props.mobile ? 
                <Fragment>
                    <div className="menu-container">
                        <div 
                        onClick={(e) => {
                            console.log("combined show menu")
                            props.context.showMenu(e)}}
                        className="TagsMenu-Accordion-label category TagsMenu-hamburger">
                            <div className="TagsMenu-category-title menu-title">
                                {spreadLetters("menu")}
                            </div>
                        </div>
                    </div>
                    <Controls 
                        context={props.context}
                    />
                </Fragment>
                : null
            }
        </div>
    )
}

export default Combined