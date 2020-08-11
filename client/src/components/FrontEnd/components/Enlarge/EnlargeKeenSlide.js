import React, { Fragment, useEffect } from 'react'
import ArtworkInfo from '../ArtworkInfo/ArtworkInfo'
import Slider from "react-slick";
import PinchToZoom from 'react-pinch-and-zoom'


import 'keen-slider/keen-slider.min.css'
import 'keen-slider/keen-slider.min.css'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Magnifier from './Magnify';

const EnlargeKeenSlide = (props) => {
    // console.log("enlarge keen slide runs")

    let [currentSlide, setCurrentSlide] = React.useState(props.file.background.familyDisplayIndex);
    let [currentArtwork, setCurrentArtwork] = React.useState(props.file.background.fileName)
      
    // let [counter, setCounter] = React.useState(0)

    // let [currentSlide, setCurrentSlide] = React.useState(0);
    // const [currentArtwork, setCurrentArtwork] = React.useState(null)

    const sliderRef = React.createRef()

    var sliderOptions = {
        lazyLoad: "progressive",
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        className: "SLIDER",
        afterChange: (index) => {
            console.log("AFTER CHANGE")
            if(props.file.familySequence.familySequence[index] === currentArtwork)
            {return}
            setCurrentArtwork(props.file.familySequence.familySequence[index])
            // setCurrentSlide(index)
            // props.context.loadEnlarge(null, props.file.familySequence.familySequence[index])
        },
        beforeChange: (oldIndex, newIndex) => {
            console.log("BEFORE CHANGE")
            console.log(`oldIndex ${oldIndex}`)
            console.log(`newIndex ${newIndex}`)
        },
        onInit: () => console.log("INIT"),
        // onReInit: () => console.log("*** RE INIT ***"),
        initialSlide: currentSlide,
        // initialSlide: props.file.background.familyDisplayIndex,
      };

    // console.log(`INDEX ${sliderOptions.initialSlide} OF ${props.file.background.fileName}`)

    const sliderItems = (fileSequence) => {
        if(fileSequence){
            return fileSequence.map((fileName, index) => {
                return <div className={" keen-slider__slide"} key={`keenSlider-${fileName}`}>
                            {/* <div 
                                className="foreground-transition"
                            >   
                                <img  
                                    alt={fileName | "background"} 
                                    src={props.context.state.artworkInfoData[fileName].desktopPath} 
                                    className={`enlarge-preview`} />
                            </div> */}
                        <PinchToZoom 
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
                        >
                        <div 
                        // id="background" 
                        className="foreground-transition">
                                <img  
                                    alt={fileName | "background"} 
                                    // src={props.file.background.desktopPath} 
                                    src={props.context.state.artworkInfoData[fileName].desktopPath} 
                                    className={`enlarge-preview`} />
                            </div>
                        </PinchToZoom>

                        {/* <Magnifier
                         id={`magnify-image-${props.file.background.fileName}`}
                        >
                            <img  
                                id={`magnify-image-${props.file.background.fileName}`}
                                alt={fileName | "background"} 
                                src={props.file.background.desktopPath} 
                                // src={props.context.state.artworkInfoData[fileName].desktopPath} 
                                className={`enlarge-preview`} 
                            />
                        </Magnifier> */}
                </div>
            })
        }
        else{
            return null
        }
    }

    useEffect(() => {
        // setCurrentSlide(props.file.background.familyDisplayIndex)
        // console.log(`currentSlide ${currentSlide}`)
        if(sliderRef && props.file.background){
            // if()
            sliderRef.current.slickGoTo(props.file.background.familyDisplayIndex)
        }
    })

    return(
        <Fragment>
                <div 
                    className={"enlarge-closeButton-container"}
                >
                    <button 
                    className="enlarge-closeButton-button"
                    onClick={(e) => {
                        e.stopPropagation()
                        // setCurrentArtwork(null)
                        props.context.closeEnlarge()
                    }}
                    >
                        <span>close</span>
                            <img className={"List-closeButton_img"} src="icons/svg/view-left.svg" alt="close icon"/>
                    </button>
                </div>
                {props.file.background ?   
                <Fragment>              
                    <Slider ref={sliderRef} {...sliderOptions}>

                        {sliderItems(props.file.familySequence.familySequence)}

                    </Slider>
                    <ArtworkInfo 
                        context={props.context}
                        mobile={props.context.state.mobile}
                        file={props.context.state.artworkInfoData[currentArtwork]}
                        // file={props.file.background}
                        artworkInfoData={props.context.state.artworkInfoData}
                        info={props.context.state.info}
                    /> 
                    </Fragment>
                    : null
                }

                {/* {renderFile(props.context.state.enlarge.familySequence.familySequence)} */}
        </Fragment>
    )
}

    export default EnlargeKeenSlide