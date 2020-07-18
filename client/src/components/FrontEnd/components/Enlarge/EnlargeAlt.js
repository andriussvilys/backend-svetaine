import React from 'react'
import PinchToZoom from 'react-pinch-and-zoom'
import CloseButton from './Bars/CloseButton'
import ArtworkInfo from '../ArtworkInfo/ArtworkInfo'
import {Carousel} from 'react-bootstrap'


export default class EnlargeAlt extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    // nextEnlarge={this.context.state.nextEnlarge}
    // file={this.context.state.enlarge}
    // onClick={this.context.closeEnlarge}
    // artworkInfoData={this.context.state.artworkInfoData}
    // loadEnlarge={this.context.loadEnlarge}
    // closeEnlarge={this.context.closeEnlarge}
    // hideArtworkInfo={this.context.hideArtworkInfo}
    // context={this.context}
    // mobile={this.context.state.mobile}
    renderFile = () => {
        // this.props.file.
        console.log("RENDER FILE")
        if(this.props.file && this.props.file.familySequence){
            console.log("this.props.file.familySequence.familySequence")
            console.log(this.props.file.familySequence.familySequence)
            const carouselItems = this.props.file.familySequence.familySequence.map(fileName => {
                console.log(fileName)
                return <PinchToZoom 
                    id="pinchContainer"
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
                <div id="background" className="foreground-transition">
                    <img  
                        alt={this.props.context.state.enlarge ? this.props.context.state.enlarge.fileName : "background"} 
                        id="background-img" 
                        src={this.props.context.state.artworkInfoData[fileName].desktopPath} 
                        // src={"#"} 
                        // src={"#"} 
                        className={`enlarge-preview`} />
                </div>
            </PinchToZoom>
            })
        }
    }
    componentDidMount(){
    }
    render(){
        return(
                <div 
                    className={`enlargeContainer 
                    ${!this.props.context.state.mobile && this.props.context.state.showLess ? "full-width" : ""}
                    ${this.props.context.state.enlarge && this.props.context.state.enlarge.open ? "enlarge-scroll-left" : ""}
                    `}
                    id="enlargeContainer"
                >
                    <h3>ENLARGE ALT</h3>
                    {!this.props.context.state.enlarge || !this.props.context.state.enlarge.open ? null :                     
                        <CloseButton
                            context={this.props.context}
                        />
                    }

                    <Carousel>
                        {this.renderFile()}
                    </Carousel>

                    {/* <PinchToZoom 
                        id="pinchContainer"
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

                        <div id="background" className="foreground-transition">
                            <img  alt={this.props.context.state.enlarge ? this.props.context.state.enlarge.fileName : "background"} id="background-img" src={"#"} className={`enlarge-preview`} />
                        </div>
                    </PinchToZoom> */}
                    <ArtworkInfo 
                        context={this.props.context}
                        mobile={this.props.mobile}
                        file={this.props.context.state.enlarge}
                        artworkInfoData={this.props.context.state.artworkInfoData}
                        info={this.props.context.state.info}
                    />
                </div>
        )
    }
    }