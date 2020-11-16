import React, { useEffect } from 'react'
import { useGesture } from 'react-use-gesture'
import ArtworkInfo from '../../ArtworkInfo/ArtworkInfo'

import styles from './css/index.module.scss'

const Carousel = props => {

    const [slidePosition, setSlidePosition] = React.useState({
        smooth: true,
        currentSlide: props.currentSlide,
        prevTransform: props.initialTransform,
        currentTransform: props.initialTransform,
        file: props.file,
    })
    const [infoPosition, setInfoPosition] = React.useState({
        height: -100,
        direction: null,
    })
    const zoomDefault =  {
        pinch: null,
        zoom: null,
        smooth: false,
        scale: 1,
        distance: 0,
        origin: {
            x: 0,
            y: 0
        },
        position: {
            x: 0,
            y: 0
        }
    }
    const [zoom, setZoom] = React.useState({...zoomDefault})

    const zoomRef = React.useRef(null)
    const containerRef = React.useRef()
    const slideContainerRef = React.useRef()

    const slideTo = (index) => {
        // console.log("SLIDE TO ")
        if(!slidePosition.file)return
        let slideToIndex = index;
        if(slideToIndex < 0){
            slideToIndex = props.images.length - 1; 
        }
        else if(slideToIndex > props.images.length - 1){
            slideToIndex = 0;
        }
        const newTransfrom = -((100 / props.images.length) * slideToIndex)
        let delay = zoom.zoom ? 250 : 0;
        const artworkFam = props.context.state.artworkInfoData[props.file].artworkFamily
        // console.log(artworkFam)
        const nextImage = props.context.state.relatedArtwork[artworkFam].column.fileIds[slideToIndex]
        // console.log(nextImage);
        if(zoom.zoom){
            setZoom({...zoomDefault})
        }
        setTimeout(() => {            
            setSlidePosition({
                ...slidePosition,
                currentSlide: slideToIndex,
                currentTransform: newTransfrom,
                prevTransform: newTransfrom,
                file: nextImage
            })
        }, delay);
    }
    const dots = (imageList) => {
        if(imageList.length < 2){return <ul className={styles.dotList}></ul>}
        if(!imageList || imageList.length < 0){return}
        const dots = imageList.map((image, index) => {
            return <li 
            onClick={() => {
                slideTo(index)
            }}
            key={`carouselDot-${index}`} 
            className={`${styles.dot} ${index === slidePosition.currentSlide ? styles.dot_active : ""}`}
            ></li>
        })
        return <ul className={styles.dotList}>{dots}</ul>
    }
    const arrowNext = () => {
        if(props.images.length < 2){return}
        return <div 
            className={styles.arrowNext}
            onClick={() => {
                slideTo(slidePosition.currentSlide + 1)
            }}
        ></div>
    }
    const arrowPrev = () => {
        if(props.images.length < 2){return}
        return <div 
            className={styles.arrowPrev}
            onClick={() => {
                slideTo(slidePosition.currentSlide - 1)
            }}
        ></div>
    }
    const renderImages = (data) => {
        return data.map((image, index) => {
        return (
            <div
            className={`${styles.slide} ${zoom.pinch ? styles.showOverflow : ""}`}
            // className={`${styles.slide} ${zoom.pinch ? styles.showOverflow : ""} 
            // ${zoom.smooth ? styles.smoothSlide : ""}`}
            key={`${image}-${index}`}
            style={{width: `${100 / props.images.length}%`}}
            >                    
                <img 
                    style={slidePosition.currentSlide === index ? 
                        {transform: `scale(${zoom.scale}) translate(${zoom.position.x}%, ${zoom.position.y}%)`} : {}}
                    className={`${zoom.smooth && slidePosition.currentSlide === index ? styles.smoothSlide : ""}`}
                    ref={slidePosition.currentSlide === index ? zoomRef : null}
                    src={image}
                    alt={image}
                    onMouseDown={(e) => {
                        if(props.context.state.mobile){
                            return
                        }
                        let newScale = zoom.scale + 1
                        let newZoom = true
                        newScale = newScale > 2 ? 1 : newScale
                        newZoom = newScale === 1 ? false : true
                        const position = newScale === 1 ? {x: 0, y: 0} : zoom.position
                        // props.context.toggleExplorer({close: newZoom, open: !newZoom})
                        props.context.showInfo(e, {close: !props.context.state.info.infoUp})
                        setZoom({
                            ...zoom,
                            zoom: newZoom,
                            scale: newScale,
                            smooth: true,
                            position
                        })
                    }}
                />
            </div>
        )
        })
    }
    const moveStartHandeler = (state) => {
    }
    const verticalMoveHandler = (state, options) => {
        console.log("VERTICAL HANDLER")
        // console.log({initial: state.initial[1], movementY: state.movement[1], y: state.xy[1], delta: state.delta[1]})
        let heightValue = null;
        heightValue = infoPosition.height + (options.direction * state.delta[1])
        if(heightValue < -100){
            heightValue = -100
        }
        if(heightValue > 0){
            heightValue = 0
        }
        console.log({newHeight: heightValue})
        setInfoPosition({height: heightValue})
    }
    const moveHandler = (state, options) => {
        if(zoom.zoom){console.log("ZOOMED"); return}
          const containerWidth = containerRef.current.clientWidth;
          const slideCount = props.images.length
          const slideWidth = 100 / slideCount
          let  transform = slidePosition.prevTransform + ((state.movement[0] * options.direction * options.moveSpeed * 100 / containerWidth) / slideCount)

        if(transform > 0){
            transform = 0
        }
        if(transform < -100 + slideWidth){
            transform = -100 + slideWidth
        }
        var index = Math.abs(Math.round(transform/slideWidth))
        index = index > slideCount - 1 ? slideCount - 1 : index

          return setSlidePosition({ 
            ...slidePosition,  
            currentSlide: index,
            currentTransform: transform,
            smooth: false
            })
    }
    const moveEndHandler = (state) => {
        if(zoom.zoom){return}
        if(infoPosition.direction){
            console.log("NULL DIRECTION")
            setInfoPosition({...infoPosition, direction: null});
        }
        slideTo(slidePosition.currentSlide)
    }
    const calcZoomPan = (cursorX, cursorY) => {
        const container = containerRef.current
        const slideContainer = slideContainerRef.current
        const zoomedImage = zoomRef.current

        const offset = {y: container.getBoundingClientRect().y, x: container.getBoundingClientRect().x, top: container.getBoundingClientRect().top}

        const imgToSlideHeightRatio = zoomedImage.clientHeight * 100 / slideContainer.clientHeight
        
        const visibleSectionY = imgToSlideHeightRatio / zoom.scale
        const marginY = ((100 - visibleSectionY) / 2) + 10
        const middleGuideY = slideContainer.clientHeight / 2
        let y = cursorY - offset.y
        let moveY = y - middleGuideY
        let panY = (moveY * marginY / middleGuideY)

        const middleGuideX = (slideContainer.clientWidth / 2) / props.images.length
        let cursorPositionX = (cursorX - offset.x) - middleGuideX

        const imageWidth = zoomedImage.clientWidth * zoom.scale;
        const panX = (cursorPositionX * 100) / imageWidth
        return {x: panX, y: panY}
    }
    const zoomPanHandler = (state) => {
        const {x, y} = calcZoomPan(state.xy[0], state.xy[1])
        setZoom({
            ...zoom,
            smooth: false,
            position: {
                x, y
            }
        })
    }
    const genericOptions = {
        // filterTaps: true,
        domTarget: slideContainerRef,
        lockDirection: true,
        eventOptions: {
            passive: false
        }
        // threshold: 10
    }
    const bind = useGesture(
        {
            onDragStart: () => {
                moveStartHandeler()
            },
            onDrag: (state) => {
                if(state.event.touches){
                    console.log("touches")
                    if(state.event.touches.length > 1){return}
                    else{
                        if(!infoPosition.direction){
                            console.log({DIRECTION_Y: state.direction[1], DIRECTION_X: state.direction[0]})
                            if(state.direction[1] != 0){
                                console.log("DIRECTION - Y")
                                return setInfoPosition({...infoPosition, direction:[0,1]});
                            }
                            else if(state.direction[0] != 0){
                                console.log("DIRECTION - X")
                                return setInfoPosition({...infoPosition, direction:[1, 0]});
                            }
                        }
                        else{
                            console.log("INFO POSITION LOCKED: ")
                            console.log(`${infoPosition.direction[0] > 0 ? "X" : "Y"}`)
                            if(infoPosition.direction[1] > 0){
                                return verticalMoveHandler(state, 
                                    {direction: -1, speed: 2, mobile: true}
                                    );
                            }
                            else{
                                return moveHandler(state, {moveSpeed: 2, direction: 1})
                            }
                        }
                    }
                    return
                }
                console.log("NOT TOUCHES CODE-----------------------")
                moveHandler(state, {moveSpeed: 2, direction: 1})
            },
            onDragEnd: (state) => moveEndHandler(state),
            onPinchStart: state => {
                setZoom({
                    ...zoom,
                    zoom: true
                })
            },
            onPinch: state => {

                const pinchDistance = state.da[0]
                let scale = pinchDistance / 100
                let zoomStatus = true
                if(scale <= 1){
                    scale = 1
                    zoomStatus = false
                }
                const {x, y} = calcZoomPan(state.origin[0], state.origin[1])
                props.context.toggleExplorer({close: true})
                setZoom({
                    ...zoom,
                    zoom: zoomStatus,
                    pinch: true,
                    distance: state.da[0],
                    scale,
                    origin: {
                        x, y
                    },
                    position: {
                        x, y
                    }
                })
            },
            onPinchEnd: state => {
                setZoom({...zoomDefault, smooth: true})
            },
            onWheelStart: () => {
                moveStartHandeler()
            },
            onWheel: (state) => {
                state.event.preventDefault()
                if(state.direction[1] != 0){
                    return verticalMoveHandler(state, {direction: 1, speed: 4});
                }
                moveHandler(state, {moveSpeed: 1, direction: -1})
            },
            onWheelEnd: state => {
                state.event.preventDefault()
                // if(state.direction[1] > 0){
                //     return props.context.showInfo();
                // }
                moveEndHandler(state)
            },
            onMove: state => {
                if(!zoom.zoom || zoom.pinch)return
                zoomPanHandler(state)
            },
        },
        {...genericOptions},
    )

    useEffect(() => {
        // console.log("PROPS CHANGE")
        if(!slidePosition.file){
            return setSlidePosition({...slidePosition, file: props.file, currentSlide: props.currentSlide})
        }
        slideTo(props.currentSlide)
    //   }, [props.file, props.currentSlide])
      }, [props.file])

      useEffect(bind, [bind])
    return(
            <div 
                ref={containerRef}
                className={`carousel-container ${styles.container} ${zoom.pinch ? styles.showOverflow : ""}`}
            >
            <div className={styles.slideWrapper}>
                {arrowPrev()}
                <div 
                    id={"slideContainer"}
                    className={`${styles.slideContainer} ${slidePosition.smooth ? styles.smoothSlide : ""} ${zoom.pinch ? styles.showOverflow : ""}`}
                    ref={slideContainerRef}
                    style={{
                        width: `${100 * props.images.length}%`,
                        transform: `translateX(${slidePosition.currentTransform}%)`
                    }}
                >
                    {renderImages(props.images)}
                </div>
                    {arrowNext()}
            </div>
                <ArtworkInfo 
                    context={props.context}
                    mobile={props.context.state.mobile}
                    file={props.context.state.artworkInfoData[slidePosition.file]}
                    artworkInfoData={props.context.state.artworkInfoData}
                    info={props.context.state.info}
                    dots={dots(props.images)}
                    transform={infoPosition.height}
                >
                </ArtworkInfo> 
        </div>
    )
}

export default Carousel