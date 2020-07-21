import React, { Fragment } from 'react'
import PinchToZoom from 'react-pinch-and-zoom'
import CloseButton from './Bars/CloseButton'
import ArtworkInfo from '../ArtworkInfo/ArtworkInfo'
import {Carousel} from 'react-bootstrap'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import ReactImageMagnify from 'react-image-magnify';

const EnlargeKeenSlide = (props) => {
    console.log("enlarge keen slide runs")
    let currentIndex = props.file.familySequence.familySequence.indexOf(props.file.background.fileName)

    let [currentSlide, setCurrentSlide] = React.useState(0);
    const [currentArtwork, setCurrentArtwork] = React.useState(null)
    const [sliderRef, slider] = useKeenSlider({
        // loop: true
        initial: currentIndex,
        // centered: true,
        rubberband: true,
        slideChanged(s) {
            console.log("s")
            console.log(s)
            // console.log("s.details()")
            // console.log(s.details())
            currentIndex += s.details().direction

            console.log(`current index after slide ${currentIndex}`)
            console.log(props.context.state.enlarge.familySequence.familySequence[currentIndex])
            setCurrentSlide(s.details().relativeSlide);

            const artworkInfoName = props.context.state.enlarge.familySequence.familySequence[currentIndex-1]
            const artworkInfoData = props.context.state.artworkInfoData[artworkInfoName]

            // this.props.context.animateEnlarge(artworkInfoData)

            setCurrentArtwork(artworkInfoData)
            console.log("artworkInfoData")
            console.log(setCurrentArtwork)
            console.log(artworkInfoData)
            console.log("DETAILS() __________________________")
            console.log(s.details())

            // s.resize()
          }
    })

    const renderFile = (fileSequence) => {
        if(fileSequence){

            const artwork = fileSequence[currentIndex]
            const carouselItems = fileSequence.map((fileName, index) => {
                // console.log(fileName)
                return <div className={" keen-slider__slide"} key={`keenSlider-${fileName}`}>
                    {/* <PinchToZoom 
                                // id="pinchContainer"
                                className="pinchContainer"
                                panEvent={{
                                    viewNext: props.context.viewNext, 
                                    viewPrev: props.context.viewNext,
                                    showMenu: props.context.showMenu,
                                    showInfo: props.context.showInfo,
                                    closeEnlarge: props.context.closeEnlarge
                                }}
                                state={props.context.state}
                                mobile={props.mobile}
                                key={`pinch-to-zoom-${fileName}`}
                            > */}
                            <div 
                                className="foreground-transition"
                            >
                                <ReactImageMagnify {...{
                                    enlargedImagePosition: 'over',
                                        smallImage: {
                                            alt: 'Wristwatch by Ted Baker London',
                                            isFluidWidth: true,
                                            src: props.context.state.artworkInfoData[fileName].mobilePath
                                        },
                                        largeImage: {
                                            src: props.context.state.artworkInfoData[fileName].desktopPath,
                                            // width: props.context.state.artworkInfoData[fileName].naturalSize.naturalWidth*2,
                                            // height: props.context.state.artworkInfoData[fileName].naturalSize.naturalHight*2
                                            width: 200,
                                            height: 200
                                        }
                                    }} />
                            </div>
                            {/* </PinchToZoom> */}
                </div>
            })
            return <Fragment>
                        <div ref={sliderRef} 
                        className={"keen-slider"} 
                        id={`keen-slider-${fileSequence[0]}`}
                        >
                            {carouselItems}
                            {slider && (
                                <div className="dots">
                                {slider.details().size > 1 ? [...Array(slider.details().size).keys()].map(idx => {
                                    return (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                        slider.moveToSlideRelative(idx);
                                        }}
                                        className={"dot" + (currentSlide === idx ? " active" : "")}
                                    />
                                    );
                                }) : null
                            }
                                </div>
                            )}
                        </div>
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
                <ArtworkInfo 
                            context={props.context}
                            mobile={props.context.state.mobile}
                            // file={props.context.state.enlarge}
                            // file={props.context.state.artworkInfoData[fileSequence[currentIndex]]}
                            // file={props.context.state.artworkInfoData[fileSequence[currentIndex]]}
                            file={currentArtwork}
                            artworkInfoData={props.context.state.artworkInfoData}
                            info={props.context.state.info}
                        />
        </Fragment>
    )
}

    export default EnlargeKeenSlide