import React, { Fragment, useEffect } from 'react'
import ArtworkInfo from '../ArtworkInfo/ArtworkInfo'
import Slider from "react-slick";

import 'keen-slider/keen-slider.min.css'
import 'keen-slider/keen-slider.min.css'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const EnlargeKeenSlide = (props) => {
    // console.log("enlarge keen slide runs")

    let [currentSlide, setCurrentSlide] = React.useState(0);
    const [currentArtwork, setCurrentArtwork] = React.useState(null)

    const sliderRef = React.createRef()

    var sliderOptions = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        className: "SLIDER",
        afterChange: (index) => {
            if(props.file.familySequence.familySequence[index] === currentArtwork)
            {return}
            setCurrentArtwork(props.file.familySequence.familySequence[index])
            props.context.loadEnlarge(null, props.file.familySequence.familySequence[index])
        },
        initialSlide: props.file.background && props.file.background.familyDisplayIndex ? props.file.background.familyDisplayIndex : 0,
      };

    // console.log(`INDEX ${sliderOptions.initialSlide} OF ${props.file.background.fileName}`)

    const sliderItems = (fileSequence) => {
        if(fileSequence){
            return fileSequence.map((fileName, index) => {
                return <div className={" keen-slider__slide"} key={`keenSlider-${fileName}`}>
                            <div 
                                className="foreground-transition"
                            >   
                                <img  
                                    alt={fileName | "background"} 
                                    src={props.context.state.artworkInfoData[fileName].desktopPath} 
                                    className={`enlarge-preview`} />
                            </div>
                </div>
            })
        }
        else{
            return null
        }
    }

    useEffect(() => {
        // console.log("USE EFFECT _____________")
        // if(!props.file.background || props.file.background.fileName){return}
        if(sliderRef && props.file.background){
            if(props.file.background.fileName === currentArtwork){
                return
            }
            // sliderRef.current.slickGoTo(sliderOptions.initialSlide)
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
                        // file={props.context.state.artworkInfoData[currentArtwork]}
                        file={props.file.background}
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