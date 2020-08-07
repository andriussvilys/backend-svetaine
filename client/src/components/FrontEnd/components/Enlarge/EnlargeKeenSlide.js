import React, { Fragment, useEffect } from 'react'
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
    // let currentIndex = props.file.familySequence.familySequence.indexOf(props.file.background.fileName)

    let [currentSlide, setCurrentSlide] = React.useState(0);
    const [currentArtwork, setCurrentArtwork] = React.useState(null)

    const renderFile = (fileSequence) => {
        console.log("RENDER FILE")
        if(fileSequence){

            const artwork = props.file.background.fileName

            const carouselItems = fileSequence.map((fileName, index) => {
                return <div className={" keen-slider__slide"} key={`keenSlider-${fileName}`}>
                            <div 
                                className="foreground-transition"
                            >    
                        <div 
                        className="foreground-transition"
                        >
                                <img  
                                    alt={fileName | "background"} 
                                    src={props.context.state.artworkInfoData[fileName].desktopPath} 
                                    className={`enlarge-preview`} />
                            </div>
                            </div>
                </div>
            })

            var sliderOptions = {
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                afterChange: index => {
                    console.log(`index ${index}`)
                    setCurrentArtwork(props.file.familySequence.familySequence[index])
                    console.log(currentArtwork)
                },
                initialSlide: props.file.background.familyDisplayIndex
              };

              console.log(`slidrr option initial slide ${sliderOptions.initialSlide}`)
              console.log(`familyIndex ${props.file.background.familyDisplayIndex} of ${props.file.background.fileName}`)
            return <Fragment>
                    <Slider {...sliderOptions}>
                            {carouselItems}
                    </Slider>
                    <ArtworkInfo 
                        context={props.context}
                        mobile={props.context.state.mobile}
                        file={props.context.state.artworkInfoData[currentArtwork]}
                        artworkInfoData={props.context.state.artworkInfoData}
                        info={props.context.state.info}
                    />
                </Fragment>
        }
        else{ return null}
    }

    useEffect(() => {
        console.log("ENLAEGE MOUNTED")
        if(!currentArtwork){
            console.log("NO CURREN~T AR~TWOK")
            setCurrentArtwork(props.file.background.fileName)
        }
        if(props.file.background)
        console.log("currentArtwork")
        console.log(currentArtwork)
    })
    // console.log(`ENLARGE LOADS WITH `)
    // console.log(props.file)
    // console.log(`fam index in slider options: ${sliderOptions.initialSlide}`)

    return(
        <Fragment>
                {/* <CloseButton
                    context={props.context}
                /> */}
                <div 
                    className={"enlarge-closeButton-container"}
                >
                    <button 
                    className="enlarge-closeButton-button"
                    onClick={(e) => {
                        e.stopPropagation()
                        setCurrentArtwork(null)
                        props.context.closeEnlarge()
                    }}
                    >
                        <span>close</span>
                            <img className={"List-closeButton_img"} src="icons/svg/view-left.svg" alt="close icon"/>
                    </button>
                </div>
                {renderFile(props.context.state.enlarge.familySequence.familySequence)}
        </Fragment>
    )
}

    export default EnlargeKeenSlide