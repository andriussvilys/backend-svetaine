import React, { Fragment, useEffect } from 'react'
import ArtworkInfo from '../ArtworkInfo/ArtworkInfo'
import Slider from "react-slick";
import PinchToZoom from 'react-pinch-and-zoom'


import 'keen-slider/keen-slider.min.css'
import 'keen-slider/keen-slider.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const EnlargeKeenSlide = (props) => {

    const file = props.file.background
      
    let [sliderInfo, setSliderInfo] = React.useState({
        prevFileName: props.file.background.fileName,
        fileName: props.file.background.fileName,
        index: props.file.background.familyDisplayIndex,
        artworkFamily: props.file.background.artworkFamily,
        familySequence: props.file.familySequence.familySequence,
        clicked: true
    })

    const sliderRef = React.createRef()

    var sliderOptions = {
        lazyLoad: "progressive",
        dots: true,
        arrows: !props.mobile,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        className: "SLIDER",
        afterChange: (index) => {
            console.log("AFTER CHANGE")
            // console.log(`index ${index}`)
            // console.log(sliderInfo)
            // setSliderInfo({
            //     ...sliderInfo,
            //     fileName: sliderInfo.familySequence[index],
            //     index: index,
            //     clicked: false
            // })
            props.loadEnlarge(null, props.file.familySequence.familySequence[index])
        },
        // onReInit: () => {
        //     setSliderInfo({
        //         ...sliderInfo,
        //         fileName: sliderInfo.familySequence[index],
        //         index: index
        //     })
        // },
        beforeChange: (oldIndex, newIndex) => {
            console.log("BEFORE CHANGE")
            console.log(`oldIndex ${oldIndex}`)
            console.log(`newIndex ${newIndex}`)
        },
        onInit: () => console.log("INIT"),
        initialSlide: sliderInfo.index,
      };

    const sliderItems = (fileSequence) => {
        if(fileSequence){
            return fileSequence.map((fileName, index) => {
                return <div className={" keen-slider__slide"} key={`keenSlider-${fileName}`}>
                        {/* <PinchToZoom 
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
                        className="foreground-transition">
                                <img  
                                    alt={fileName | "background"} 
                                    // src={props.file.background.desktopPath} 
                                    src={props.mobile ? props.context.state.artworkInfoData[fileName].mobilePath
                                    : props.context.state.artworkInfoData[fileName].desktopPath } 
                                    className={`enlarge-preview`} />
                            </div>
                        </PinchToZoom> */}
                    <div 
                    className="foreground-transition">
                        <img  
                            alt={fileName | "background"} 
                            // src={props.file.background.desktopPath} 
                            src={props.mobile ? props.context.state.artworkInfoData[fileName].mobilePath
                            : props.context.state.artworkInfoData[fileName].desktopPath } 
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
        console.log("USE EFFECT")
        // console.log({...sliderInfo})
        // console.log(`sliderRef.current.currentArtwork`)
        // console.log(sliderRef.current)
        // if(sliderInfo.artworkFamily !== props.file.background.artworkFamily){
        //     setSliderInfo({
        //         clicked: true,
        //         fileName: props.file.background.fileName,
        //         index: props.file.background.familyDisplayIndex,
        //         artworkFamily: props.file.background.artworkFamily,
        //         familySequence: props.file.familySequence.familySequence
        //     })
        // }
        console.log(`GO TO ${props.file.background.familyDisplayIndex}`)
        sliderRef.current.slickGoTo(props.file.background.familyDisplayIndex)
        // if(sliderInfo.clicked){
        //     sliderRef.current.slickGoTo(props.file.background.familyDisplayIndex)
        // }
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
                    <Slider 
                    ref={sliderRef} {...sliderOptions} 
                    currentArtwork={props.file.background.fileName}
                    initialSlide={props.file.background.familyDisplayIndex}
                    >

                        {sliderItems(props.file.familySequence.familySequence)}

                    </Slider>
                    <ArtworkInfo 
                        context={props.context}
                        mobile={props.context.state.mobile}
                        // file={props.context.state.artworkInfoData[currentArtwork]}
                        // file={props.context.state.artworkInfoData[sliderInfo.fileName]}
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