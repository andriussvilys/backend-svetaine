import React, { Fragment } from 'react'
import PinchToZoom from 'react-pinch-and-zoom'
import CloseButton from './Bars/CloseButton'
import ArtworkInfo from '../ArtworkInfo/ArtworkInfo'


export default class Enlarge extends React.Component{
    componentDidMount(){
    }
    render(){
        return(
                <div 
                className="enlargeContainer" id="enlargeContainer"
                >
                        <CloseButton
                            context={this.props.context}
                        />
                    <PinchToZoom 
                        className="pinchContainer"
                        panEvent={{
                            viewNext: this.props.context.viewNext, 
                            viewPrev: this.props.context.viewNext,
                            showMenu: this.props.context.showMenu,
                            showInfo: this.props.context.showInfo,
                            closeEnlarge: this.props.context.closeEnlarge
                        }}
                        state={this.props.context.state}
                        mobile={this.props.mobile}
                    >
                        <div id="foreground" className="foreground-transition">
                            <img alt={this.props.context.state.enlarge ? this.props.context.state.enlarge.fileName : "foreground"} id="foreground-img" src={"#"} className={`enlarge-preview`} />
                        </div>

                        <div id="background" className="foreground-transition">
                            <img  alt={this.props.context.state.enlarge ? this.props.context.state.enlarge.fileName : "background"} id="background-img" src={"#"} className={`enlarge-preview`} />
                        </div>
                    </PinchToZoom>
                    <ArtworkInfo 
                        context={this.props.context}
                        mobile={this.props.mobile}
                        file={this.props.context.state.enlarge}
                        artworkInfoData={this.props.context.state.artworkInfoData}
                    />
                </div>
        )
    }
    }