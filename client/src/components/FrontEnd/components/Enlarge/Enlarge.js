import React, { Fragment } from 'react'
import FilePreview from '../FilePreview'
import ArtworkInfo from '../ArtworkInfo/ArtworkInfo'
import { Swipeable, useSwipeable } from "react-swipeable"


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
        
        return <FilePreview 
        id={fgId}
        file={source} 
        containerClassName="enlarge-container" 
        className={`enlarge-preview ${imageName}`}
        previewName="foreground-preview"
        onClick={this.props.closeEnlarge}
        noWrapper={true}
        />
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
                    this.setState({touch: {...this.state.touch, "endX": e.touches[0].clientX, "endY": e.touches[0].clientY}})
                }}
                onTouchEnd={() => {
                    if(Math.abs(this.state.touch.x - this.state.touch.endX) > 30){
                        if(this.state.touch.x > this.state.touch.endX){
                            this.props.context.viewPrev()
                        }
                        else{this.props.context.viewNext()}
                        return
                    }

                    if(Math.abs(this.state.touch.y - this.state.touch.endY) > 30){
                        if(this.state.touch.y < this.state.touch.endY){
                            if(document.getElementById("ArtworkInfo").classList.contains("info-up")){
                                 return document.getElementById("ArtworkInfo").classList.remove("info-up")
                            }
                            if(document.getElementById("TagsMenu").classList.contains("show-menu")){
                                return
                            }
                            else{
                                document.getElementById("TagsMenu").classList.add("show-menu")
                            }
                        }
                        else{
                            document.getElementById("ArtworkInfo").classList.add("info-up")
                        }
                    }
                }
                }
                className="enlargeContainer" id="enlargeContainer">
                    <Fragment>
                        <div id="foreground" className="foreground-transition">
                            {this.props.file ? this.createPreview(this.props.file.foreground, 'foreground-image', 'FG') : null}
                        </div>

                        <div id="background" className="foreground-transition">
                            {this.props.file ? this.createPreview(this.props.file.background, 'background-image') : null}
                        </div>
                    </Fragment>
                </div>
        )
    }
    }