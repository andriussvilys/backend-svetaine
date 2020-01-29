import React, { Fragment } from 'react'
import FilePreview from '../FilePreview'
import ArtworkInfo from '../ArtworkInfo/ArtworkInfo'
import PreviewBubbles from './PreviewBubble'


export default class Enlarge extends React.Component{

    constructor(props){
        super(props)
        this.state = {
        }
    }

    renderNext = () => {
        if(this.props.nextEnlarge){
            return <FilePreview 
            file={this.props.nextEnlarge} 
            containerClassName="imageSelect-Enlarge" 
            className="imageSelect-Enlarge" 
            onClick={this.props.onClick}
            />
        }
        else{ return null}
    }
    pushNew = () => {
        return(
            <Fragment>
                <div id="nextEnlarge" style={{position: "absolute", height: "100%", width: "100%", backgroundColor: "yellow", left: "-100%", transition: "0.2s all"}}>
                    {this.renderNext()}
                </div>

                <FilePreview 
                id="foreground"
                file={this.props.file.foreground} 
                containerClassName="enlarge-container" 
                className="enlarge-preview foreground-image" 
                previewName="foreground-preview"
                onClick={this.props.onClick}
                noWrapper={true}
                />

                {this.props.file.background ?
                    <FilePreview 
                    id="background"
                    file={this.props.file.background} 
                    containerClassName="enlarge-container" 
                    className="enlarge-preview background-image" 
                    previewName="background-preview"
                    onClick={this.props.onClick}
                    noWrapper={true}
                    />
                    :
                    null
                }
            </Fragment>
        )
    }
    createPreview = (source, imageName, fgId) => {
        let imgSrc = `/uploads/imagemin/${source.fileName}`
        return <img src={imgSrc} className={`enlarge-preview ${imageName}`} />
        // return <img src={source.desktopPath} className={`enlarge-preview ${imageName}`} />
    }
    
    render(){
        return(
                <div 
                onClick={(e) => this.props.closeEnlarge(e)}
                onTouchStart={(e) => {
                    const touches = e.touches
                    const touch = {"x": touches[0].clientX, "y": touches[0].clientY}
                    this.setState({touch})
                }}
                onTouchMove={(e) => {
                    if(e.touches[1]){
                        this.setState({tocuh: {...this.state.touch, "multiple": true}})
                        return
                    }
                    this.setState({touch: {...this.state.touch, "endX": e.touches[0].clientX, "endY": e.touches[0].clientY, "multiple": false}})
                }}
                onTouchEnd={() => {
                    if(this.state.multiple){
                        return
                    }
                    //slide right / left
                    if(Math.abs(this.state.touch.x - this.state.touch.endX) > 30){
                        if(this.state.touch.x > this.state.touch.endX){
                            this.props.context.viewNext()
                        }
                        else{this.props.context.viewPrev()}
                        return
                    }

                    //slide up / down
                    if(Math.abs(this.state.touch.y - this.state.touch.endY) > 30){
                        //on swipe down
                        if(this.state.touch.y < this.state.touch.endY){
                            if(document.getElementById("ArtworkInfo").classList.contains("ArtworkInfo-toggleTags")){
                                document.getElementById("ArtworkInfo").classList.remove("ArtworkInfo-toggleTags")
                                return
                            }
                            if(document.getElementById("ArtworkInfo").classList.contains("info-up")){
                                 document.getElementById("ArtworkInfo").classList.remove("info-up")
                                //  setTimeout(() => {document.getElementById("ArtworkInfo").classList.remove("show")
                                //  }, 100);
                                 return
                            }
                            else{
                                document.getElementById("TagsMenu").classList.add("show-menu")
                            }
                        }

                        //on swipe up
                        else{
                            if(document.getElementById("TagsMenu").classList.contains("show-menu")){
                                document.getElementById("TagsMenu").classList.remove("show-menu")
                                return
                            }
                            // document.getElementById("ArtworkInfo").classList.add("show")
                            // setTimeout(() => {
                            if(!document.getElementById("ArtworkInfo").classList.contains("info-up")){
                                document.getElementById("ArtworkInfo").classList.add("info-up")
                            }
                            else{
                                document.getElementById("ArtworkInfo").classList.add("ArtworkInfo-toggleTags")
                            }
                            // }, 100);
                        }
                    }
                }
                }
                className="enlargeContainer" id="enlargeContainer"
                >
                    <Fragment>
                        <div id="foreground" className="foreground-transition">
                            {this.props.file && this.props.file.foreground ? this.createPreview(this.props.file.foreground, 'foreground-image', 'FG') : null}
                        </div>

                        <div id="background" className="foreground-transition">
                            {this.props.file && this.props.file.background ? this.createPreview(this.props.file.background, 'background-image') : null}
                        </div>
                        {/* <PreviewBubbles 
                            file={this.props.file}
                            relatedArtwork={this.props.context.state.relatedArtwork}
                            enlarge={this.props.context.loadEnlarge}
                        /> */}
                        <Fragment>
                            {this.props.file ? 
                                this.props.file.foreground ?
                                    <ArtworkInfo 
                                    context={this.props.context}
                                    file={this.props.context.state.enlarge} 
                                    artworkInfoData={this.props.context.state.artworkInfoData} 
                                    loadEnlarge={this.props.context.loadEnlarge} 
                                    hideArtworkInfo={this.props.context.hideArtworkInfo}
                                    mobile={this.props.context.state.mobile}
                                    /> 
                                :null    
                            : null
                            }
                        </Fragment>
                    </Fragment>
                </div>
        )
    }
    }