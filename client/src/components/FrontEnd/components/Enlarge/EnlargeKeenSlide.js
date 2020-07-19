import React, { Fragment } from 'react'
import PinchToZoom from 'react-pinch-and-zoom'
import CloseButton from './Bars/CloseButton'
import ArtworkInfo from '../ArtworkInfo/ArtworkInfo'
import {Carousel} from 'react-bootstrap'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'


const EnlargeKeenSlide = (props) => {
    console.log("enlarge keen slide runs")
    let currentIndex = props.file.familySequence.familySequence.indexOf(props.file.background.fileName)

    const [currentSlide, setCurrentSlide, currentArtwork, setCurrentArtwork] = React.useState(0);
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
            console.log(props.context.state.enlarge.familySequence.familySequence[currentIndex-1])
            setCurrentSlide(s.details().relativeSlide);
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
                            // id="background" 
                            className="foreground-transition">
                                    <img  
                                        alt={fileName | "background"} 
                                        // id="background-img" 
                                        src={props.context.state.artworkInfoData[fileName].desktopPath} 
                                        // src={"#"} 
                                        // src={"#"} 
                                        className={`enlarge-preview`} />
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
                                {[...Array(slider.details().size).keys()].map(idx => {
                                    return (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                        slider.moveToSlideRelative(idx);
                                        }}
                                        className={"dot" + (currentSlide === idx ? " active" : "")}
                                    />
                                    );
                                })}
                                </div>
                            )}
                        </div>

                        <ArtworkInfo 
                            context={props.context}
                            mobile={props.context.state.mobile}
                            // file={props.context.state.enlarge}
                            // file={props.context.state.artworkInfoData[fileSequence[currentIndex]]}
                            file={props.context.state.artworkInfoData[fileSequence[currentIndex]]}
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
        </Fragment>
    )
}

    export default EnlargeKeenSlide