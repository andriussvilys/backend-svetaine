import React from 'react'
import { Context } from './FrontEndProvider';

import TagsMenu from './components/TagsMenu'
import ImageSelect from './components/ImageSelect/ImageSelect'
import Enlarge from './components/Enlarge/Enlarge'
import Nav from './components/Nav/Nav'
import PreviewBubbles from './components/Enlarge/PreviewBubble'
import Controls from './components/ArtworkInfo/Controls'

// import '../../css/frontEndMain.css'

import styles from '../../css/frontEndMain.module.css'

Array.from(document.getElementsByTagName("h4")).forEach(item => {
    item.style.whiteSpace = "normal"
})
export default class FrontEndIndex extends React.Component{
    static contextType = Context;
    constructor(props){
        super(props)
        this.state = {
            imgSelectLoaded: document.querySelectorAll(".ImagesPreview--imageContainer")
        }
    }
    spreadLetters = (title) => {
        let letters = Array.from(title).map((letter, index) => {
            return <div key={`${title}-leter-${index}`} className="title-letter white-font">{letter}</div>
        })
        return letters
    }
    
    render(){
        return(
            <Context.Consumer>
                {() => {
                    return (
                    // <div className="app-container">
                        <div 
                            className="frontEndIndex-container"
                        >
                        <TagsMenu context={this.context}>
                        </TagsMenu>

                        <div 
                        id="images" 
                        // className="images-container"
                        className={this.context.state.mobile ? "images-container"  : "images-container images-grid" }
                        >
                            <ImageSelect 
                                data={this.context.state.artworkInfoData} 
                                mobile={this.context.state.mobile}
                                state={this.context.state}
                                context={this.context}
                                // data={this.context.state.visibleArtwork}
                                methods={{
                                    enlarge: this.context.enlarge,
                                    loadEnlarge: this.context.loadEnlarge,
                                    toggleMobile: this.context.toggleMobile,
                                    lazyLoad: this.context.lazyLoadImages
                                }}
                            />
                            <Enlarge 
                                nextEnlarge={this.context.state.nextEnlarge}
                                file={this.context.state.enlarge}
                                onClick={this.context.closeEnlarge}
                                artworkInfoData={this.context.state.artworkInfoData}
                                loadEnlarge={this.context.loadEnlarge}
                                closeEnlarge={this.context.closeEnlarge}
                                hideArtworkInfo={this.context.hideArtworkInfo}
                                context={this.context}
                                mobile={this.context.state.mobile}
                            />
                        </div>
                        {!this.context.state.mobile ? 
                        <Nav context={this.context}/> :   
                        <PreviewBubbles 
                            file={this.context.state.enlarge}
                            relatedArtwork={this.context.state.enlarge && this.context.state.enlarge.familySequence ? this.context.state.enlarge.familySequence.familySequence : []}
                            // relatedArtwork={this.context.state.relatedArtwork}
                            enlarge={this.context.loadEnlarge}
                            context={this.context}
                        >
                            <div className="menu-container">
                                <div 
                                onClick={() => {this.context.showMenu()}}
                                className="TagsMenu-Accordion-label category TagsMenu-hamburger">
                                    <div className="TagsMenu-category-title menu-title">
                                        {this.spreadLetters("menu")}
                                    </div>
                                </div>
                                <Controls
                                    showInfo={this.context.showInfo}
                                    context={this.context}
                                />
                            </div>
                        </PreviewBubbles>
                        }
                    </div>
                    )
                }}
            </Context.Consumer>
        )
    }
}