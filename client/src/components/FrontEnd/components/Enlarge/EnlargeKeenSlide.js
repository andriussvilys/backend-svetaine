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
    // console.log(props.file.background.fileName)
    // console.log(props.file.familySequence.familySequence)
    // console.log(`index of file ${props.file.background.fileName} ${props.file.familySequence.familySequence.indexOf(props.file.background.fileName)}`)
    // const slider = new KeenSlider("#keen-slider-1")
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [sliderRef, slider] = useKeenSlider({
        // loop: true
        initial: props.file.familySequence.familySequence.indexOf(props.file.background.fileName),
        rubberband: true,
        slideChanged(s) {
            setCurrentSlide(s.details().relativeSlide);
          }
    })

    // console.log("sliderRef")
    // console.log(sliderRef)
    // console.log("enlarge keen slide props")
    // console.log(props)

    const renderFile = (fileSequence) => {
        if(fileSequence){
            // console.log("props.file.familySequence.familySequence")
            // console.log(fileSequence)
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
                    file={props.context.state.enlarge}
                    artworkInfoData={props.context.state.artworkInfoData}
                    info={props.context.state.info}
                />
        </Fragment>
    )
}

    export default EnlargeKeenSlide