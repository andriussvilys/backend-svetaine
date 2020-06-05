import React, { Fragment } from 'react'
import PinchToZoom from 'react-pinch-and-zoom'
import Combined from '../ArtworkInfo/Combined'
import CloseBar from './Bars/CloseBar'
import CloseButton from './Bars/CloseButton'
import pullUp from '../functions/pullUp'


export default class Enlarge extends React.Component{
    componentDidMount(){
        // console.log("ENLARGE LOAD_______________________________")
        // pullUp({parentId: "enlargeContainer", childId: "ArtworkInfo"})
    }
    render(){
        // if(document.getElementById("enlargeContainer")){
        //     pullUp({parentId: "enlargeContainer", childId: "ArtworkInfo"})
        // }
        return(
                <div 
                // onClick={(e) => this.props.closeEnlarge(e)}
                // onTouch={pullUp({parentId: "enlargeContainer", childId: "ArtworkInfo"})}
                // onClick={pullUp({parentId: "enlargeContainer", childId: "ArtworkInfo"})}
                className="enlargeContainer" id="enlargeContainer"
                >
                    {/* {this.props.context.state.mobile ? 
                        <CloseBar 
                            context={this.props.context}
                        /> : null
                    } */}
                    {this.props.context.state.mobile ? 
                        <CloseButton
                            context={this.props.context}
                        /> : null
                    }
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
                    <Combined 
                        context={this.props.context}
                        mobile={this.props.mobile}
                    />
                </div>
        )
    }
    }