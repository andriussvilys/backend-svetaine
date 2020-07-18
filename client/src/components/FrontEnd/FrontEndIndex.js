import React from 'react'
import { Context } from './FrontEndProvider';

import TagsMenu from './components/TagsMenu'
import ImageSelect from './components/ImageSelect/ImageSelect'
import Enlarge from './components/Enlarge/Enlarge'
import EnlargeAlt from './components/Enlarge/EnlargeAlt'

import MobileNav from './components/TagsMenu/legacy-style/MobileNav'
import List from './components/TagsMenu/legacy-style/List'

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
                            <MobileNav 
                                context={this.context}
                            />
    
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
                                    // data={this.context.state.displayOrder && this.context.state.displayOrder.general ? this.context.state.displayOrder.general : null } 
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
                                    // <Enlarge 
                                    //     nextEnlarge={this.context.state.nextEnlarge}
                                    //     file={this.context.state.enlarge}
                                    //     onClick={this.context.closeEnlarge}
                                    //     artworkInfoData={this.context.state.artworkInfoData}
                                    //     loadEnlarge={this.context.loadEnlarge}
                                    //     closeEnlarge={this.context.closeEnlarge}
                                    //     hideArtworkInfo={this.context.hideArtworkInfo}
                                    //     context={this.context}
                                    //     mobile={this.context.state.mobile}
                                    // /> : null
                                    <EnlargeAlt
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