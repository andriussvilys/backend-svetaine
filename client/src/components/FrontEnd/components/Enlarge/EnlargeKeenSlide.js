import React, { Fragment } from 'react'
import PinchToZoom from 'react-pinch-and-zoom'
import CloseButton from './Bars/CloseButton'
import ArtworkInfo from '../ArtworkInfo/ArtworkInfo'
import {Carousel} from 'react-bootstrap'
import Slider from "react-slick";
import Zoom from 'react-img-zoom'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import ReactImageMagnify from 'react-image-magnify';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const EnlargeKeenSlide = (props) => {
    console.log("enlarge keen slide runs")
    let currentIndex = props.file.familySequence.familySequence.indexOf(props.file.background.fileName)

    let [currentSlide, setCurrentSlide] = React.useState(0);
    const [currentArtwork, setCurrentArtwork] = React.useState(null)

    const renderFile = (fileSequence) => {
        if(fileSequence){

            const artwork = fileSequence[currentIndex]
            const carouselItems = fileSequence.map((fileName, index) => {
                // console.log(fileName)
                return <div className={" keen-slider__slide"} key={`keenSlider-${fileName}`}>
                            <div 
                                className="foreground-transition"
                            >    
                        {/* <PinchToZoom 
                            // id="pinchContainer"
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
                        > */}
                        <div 
                        // id="background" 
                        className="foreground-transition"
                        >
                                <img  
                                    alt={fileName | "background"} 
                                    // id="background-img" 
                                    src={props.context.state.artworkInfoData[fileName].desktopPath} 
                                    // src={"#"} 
                                    // src={"#"} 
                                    className={`enlarge-preview`} />
                            </div>
                        {/* </PinchToZoom>       */}
                                {/* <ReactImageMagnify {...{
                                // enlargedImagePosition: 'over',
                                isEnlargedImagePortalEnabledForTouch: true,
                                shouldUsePositiveSpaceLens: false,
                                    smallImage: {
                                        alt: `${props.context.state.artworkInfoData[fileName].fileName}-${index}`,
                                        isFluidWidth: true,
                                        src: props.context.state.artworkInfoData[fileName].mobilePath,
                                    },
                                    largeImage: {
                                        src: props.context.state.artworkInfoData[fileName].desktopPath,
                                        width: 1000,
                                        height: 1000
                                    },
                                
                                }} /> */}
                                    {/* <Zoom 
                                        img={props.context.state.artworkInfoData[fileName].desktopPath}
                                        zoomScale={3}
                                        width={600}
                                        height={600}
                                    /> */}
                            </div>
                </div>
            })

            var sliderOptions = {
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1
              };
            //   setCurrentArtwork(props.context.state.artworkInfoData[artwork])
            return <Fragment>
                    <Slider {...sliderOptions}>
                            {carouselItems}
                    </Slider>
                    <ArtworkInfo 
                        context={props.context}
                        mobile={props.context.state.mobile}
                        // file={props.context.state.enlarge}
                        // file={props.context.state.artworkInfoData[fileSequence[currentIndex]]}
                        // file={props.context.state.artworkInfoData[fileSequence[currentIndex]]}
                        // file={currentArtwork}
                        file={props.context.state.artworkInfoData[artwork]}
                        artworkInfoData={props.context.state.artworkInfoData}
                        info={props.context.state.info}
                    />
                </Fragment>
            // return carouselItems
        }
        else{ return null}
    }
    // console.log(slider)
    return(
        <Fragment>
            {!props.context.state.enlarge || !props.context.state.enlarge.open ? null :                     
                <CloseButton
                    context={props.context}
                />
            }
                {renderFile(props.context.state.enlarge.familySequence.familySequence)}
                {/* <ArtworkInfo 
                    context={props.context}
                    mobile={props.context.state.mobile}
                    // file={props.context.state.enlarge}
                    // file={props.context.state.artworkInfoData[fileSequence[currentIndex]]}
                    // file={props.context.state.artworkInfoData[fileSequence[currentIndex]]}
                    file={currentArtwork}
                    artworkInfoData={props.context.state.artworkInfoData}
                    info={props.context.state.info}
                /> */}
        </Fragment>
    )
}

    export default EnlargeKeenSlide