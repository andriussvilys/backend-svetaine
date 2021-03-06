import React, { Fragment } from 'react'
import ArtworkInfo from '../ArtworkInfo/ArtworkInfo'
import PreviewBubbles from '../ArtworkInfo/PreviewBubble'
import PinchToZoom from 'react-pinch-and-zoom'
import Combined from '../ArtworkInfo/Combined'

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
                            <Combined 
                                context={this.props.context}
                                mobile={this.props.mobile}
                            />: null
                    </Fragment>
                </div>
        )
    }
    }