import React from 'react'
import { Context } from './FrontEndProvider';

import TagsMenu from './components/TagsMenu'
import ImageSelect from './components/ImageSelect/ImageSelect'
import Enlarge from './components/Enlarge/Enlarge'
import Nav from './components/Nav/Nav'
import PreviewBubbles from './components/ArtworkInfo/PreviewBubble'
import Controls from './components/ArtworkInfo/Controls'

import FilterTree from './components/TagsMenu/v2/FilterTree'
import Menu from './components/TagsMenu/v2/Menu';

import TopBar from './components/Nav/MobileBars/TopBar'
import BottomBar from './components/Nav/MobileBars/BottomBar'

// import '../../css/frontEndMain.css'

Array.from(document.getElementsByTagName("h4")).forEach(item => {
    item.style.whiteSpace = "normal"
})
export default class FrontEndIndex extends React.Component{
    static contextType = Context;
    constructor(props){
        super(props)
        this.state = {
            imgSelectLoaded: document.querySelectorAll(".FilePreview--imageContainer")
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
                        <div 
                            className="frontEndIndex-container"
                        >
                        <Menu
                            context={this.context}
                            categoriesData={this.context.state.categoriesData}
                        />
                        {this.context.state.mobile ? 
                        <TopBar 
                            context={this.context}
                        /> : null
                        }

                        <div 
                        id="images" 
                        className={this.context.state.mobile ? "images-container"  : "images-container images-grid" }
                        >
                            <ImageSelect 
                                data={this.context.state.artworkInfoData} 
                                mobile={this.context.state.mobile}
                                state={this.context.state}
                                context={this.context}
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
                        {this.context.state.mobile ? 
                        <BottomBar 
                            context={this.context}
                        /> : null
                        }
                    </div>
                    )
                }}
            </Context.Consumer>
        )
    }
}