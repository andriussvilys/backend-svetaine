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

import MobileNav from './components/TagsMenu/legacy-style/MobileNav'
import List from './components/TagsMenu/legacy-style/List'
import pullUp from './components/functions/pullUp'

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

    componentDidMount(){
        // pullUp({parentId: "enlargeContainer", childId: "TagsMenu", horizontal: true, requireActive: true})
    }
    
    render(){
            return(
                <Context.Consumer>
                    {() => {
                        return (
                            <div 
                                className="frontEndIndex-container"
                            >
    
                            {/* {this.context.state.mobile ? 
                                <MobileNav 
                                    context={this.context}
                                /> : null
                            } */}
                                <MobileNav 
                                    context={this.context}
                                />
    
                            {/* {this.context.state.categoriesData ?                             
                                <List 
                                    context={this.context}
                                    data={this.context.state.categoriesData}
                                /> : null
                            } */}
    
                            <div 
                            id="images" 
                            className={"images-container"}
                            >
                                <List 
                                    context={this.context}
                                    data={this.context.state.categoriesData}
                                />
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
                                {!this.context.state.mobile ?                             
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
                                    /> : null
                                }
                            </div>
                            {this.context.state.mobile ?                             
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
                                /> : null
                            }
                        </div>
                        )
                    }}
                </Context.Consumer>
            )
    }
}