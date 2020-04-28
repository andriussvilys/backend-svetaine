import React, { Fragment } from 'react'
import ArtworkInfo from '../ArtworkInfo/ArtworkInfo'
import PreviewBubbles from './PreviewBubble'
import PinchToZoom from 'react-pinch-and-zoom'

export default class Enlarge extends React.Component{
    render(){
        return(
                <div 
                onClick={(e) => this.props.closeEnlarge(e)}
                className="enlargeContainer" id="enlargeContainer"
                >
                    <Fragment> 
                            <PinchToZoom 
                                className="pinchContainer"
                                panEvent={{
                                    viewNext: this.props.context.viewNext, 
                                    viewPrev: this.props.context.viewNext,
                                    showMenu: this.props.context.showMenu,
                                    showInfo: this.props.context.showInfo,
                                    closeEnlarge: this.props.context.closeEnlarge
                                }}
                                mobile={this.props.mobile}
                            >
                                <div id="foreground" className="foreground-transition">
                                    <img alt={this.props.context.state.enlarge ? this.props.context.state.enlarge.fileName : "foreground"} id="foreground-img" src={"#"} className={`enlarge-preview`} />
                                </div>

                                <div id="background" className="foreground-transition">
                                    <img  alt={this.props.context.state.enlarge ? this.props.context.state.enlarge.fileName : "background"} id="background-img" src={"#"} className={`enlarge-preview`} />
                                </div>
                            </PinchToZoom>
                        <Fragment>
                            {this.props.file ? 
                                this.props.file.foreground ?
                                    <ArtworkInfo 
                                    context={this.props.context}
                                    file={this.props.context.state.enlarge} 
                                    artworkInfoData={this.props.context.state.artworkInfoData} 
                                    loadEnlarge={this.props.context.loadEnlarge} 
                                    hideArtworkInfo={this.props.context.hideArtworkInfo}
                                    mobile={this.props.mobile}
                                    /> 
                                :null    
                            : null
                            }
                        </Fragment>
                        {!this.props.context.state.mobile?
                            <PreviewBubbles 
                                file={this.props.context.state.enlarge}
                                // relatedArtwork={this.props.context.state.relatedArtwork}
                                relatedArtwork={this.props.context.state.enlarge ? this.props.context.state.enlarge.familySequence.familySequence : []}
                                enlarge={this.props.context.loadEnlarge}
                                context={this.props.context}
                            />
                            : null
                        }
                    </Fragment>
                </div>
        )
    }
    }