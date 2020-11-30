import React, { useEffect } from 'react'
import { useGesture, usePinch } from 'react-use-gesture'
import ArtworkInfo from '../../ArtworkInfo/ArtworkInfo'
import CarouselImage from './CarouselImage'

import styles from './css/index.module.scss'

const Carousel = props => {

    const [slidePosition, setSlidePosition] = React.useState({
        smooth: true,
        currentSlide: props.currentSlide,
        prevTransform: props.initialTransform,
        currentTransform: props.initialTransform,
        file: props.file,
        cancelGesture: false
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
        },
        dot: {x: 0, y: 0}
    }
    const [zoom, setZoom] = React.useState({...zoomDefault})
    const zoomRef = React.useRef(null)
    const containerRef = React.useRef()
    const containerOffset = containerRef.current ? {x: containerRef.current.getBoundingClientRect().x, y: containerRef.current.getBoundingClientRect().y} : {x: 0, y: 0}
    const slideContainerRef = React.useRef()

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
            if(props.images.length < 2 || props.context.state.mobile){return}
            return <div
                className={styles.arrowNext}
                onClick={() => {
                    slideTo(slidePosition.currentSlide + 1)
                }}
            ></div>
        }
        const arrowPrev = () => {
            if(props.images.length < 2 || props.context.state.mobile){return}
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
                key={`${image}-${index}`}
                style={{width: `${100 / props.images.length}%`,
                transform: slidePosition.currentSlide === index ? `scale(${zoom.scale})` : "",
                transformOrigin: slidePosition.currentSlide === index ? `${zoom.origin.x}% ${zoom.origin.y}%` : ""
                } 

                }
                >
                    <img
                        // style={slidePosition.currentSlide === index ?
                        // {
                        // // transform: `scale(${zoom.scale}) translate(${zoom.position.x}%, ${zoom.position.y}%)`,
                        // transform: `scale(${zoom.scale})`,
                        // transformOrigin: `${zoom.origin.x}% ${zoom.origin.y}%`} : {}
                        // }
                        // transformOrigin: `${zoom.origin.x}px ${zoom.origin.y}px`} : {}}
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
                            const boundRect = e.target.getBoundingClientRect()
                            const parent = e.target.parentNode.getBoundingClientRect()
                            const dot = {x: (e.screenX - containerOffset.x) * 100 / boundRect.width, y: (e.screenY - containerOffset.y) * 100 / boundRect.height}
                            const zoomOrigin = {
                                x: (e.clientX - parent.x) * 100 / parent.width, 
                                y: (e.clientY - parent.y) * 100 / parent.height
                                // x: (e.clientX - containerRef.current.getBoundingClientRect().x) * 100 / containerRef.current.getBoundingClientRect().width, 
                                // y: (e.clientY - containerRef.current.getBoundingClientRect().y) * 100 / containerRef.current.getBoundingClientRect().height
                            }
                            console.log(zoomOrigin)
                            console.log({clientX: e.clientX, clientY: e.clientY})
                            console.log({screenX: e.screenX, screenY: e.screenY})
                            console.log({rectX: boundRect.x, rectY: boundRect.y})
                            // console.log({resultX: , rectY: boundRect.y})
                            props.context.showInfo(e, {height: -100})
                            setInfoPosition({...infoPosition, height: -100})

                            setZoom({
                                ...zoom,
                                zoom: newZoom,
                                scale: newScale,
                                smooth: true,
                                position,
                                origin: zoomOrigin,
                                dot
                            })
                        }}
                    />
                </div>
            )
            })
        }

    const slideTo = (index, fileName) => {
        let slideToIndex = index;
        if(slideToIndex < 0){
            slideToIndex = props.images.length - 1;
        }
        else if(slideToIndex > props.images.length - 1){
            slideToIndex = 0;
        }
        const newTransfrom = -((100 / props.images.length) * slideToIndex)
        let delay = zoom.zoom ? 250 : 0;
        let nextImage = null;
        if(fileName){
            nextImage = fileName;
        }
        else{
            if(props.file){
                const artworkFam = props.context.state.artworkInfoData[props.file].artworkFamily
                nextImage = props.context.state.relatedArtwork[artworkFam].column.fileIds[slideToIndex]
            }
            else return
        }
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
    const moveStartHandeler = (state) => {
    }
    const checkDirection = state => {
        if(Math.abs(state.direction[1]) > Math.abs(state.direction[0])){
            return setInfoPosition({...infoPosition, direction:[0,1], height: props.context.state.info.height});
        }
        else if(Math.abs(state.direction[1]) < Math.abs(state.direction[0])){
            return setInfoPosition({...infoPosition, direction:[1, 0]});
        }
    }
    const verticalMoveHandler = (state, options) => {
        let heightValue = null;
        heightValue = infoPosition.height + (options.direction * state.delta[1])
        if(heightValue < -100){
            heightValue = -100
        }
        if(heightValue > 0){
            heightValue = 0
        }
        setInfoPosition({...infoPosition, height: heightValue})
    }
    const moveHandler = (state, options) => {
        if(zoom.zoom){return}
        if(state.pinched){return}
        if(state.event.touches && state.event.touches.length > 1){return}
        if(!infoPosition.direction){return checkDirection(state);}
        if(infoPosition.direction[1] > Math.abs(0.5)){
            return verticalMoveHandler(state,
                {direction: options.direction, speed: options.speed}
                );
        }
        else if(infoPosition.direction[0] > Math.abs(0.5)){
            const containerWidth = containerRef.current.clientWidth;
            const slideCount = props.images.length
            const slideWidth = 100 / slideCount
            let  transform = slidePosition.prevTransform + ((state.movement[0] * (options.direction * -1) * options.speed * 100 / containerWidth) / slideCount)

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
    }
    const moveEndHandler = (state) => {
        if(zoom.zoom){return}
        if(infoPosition.direction){
            setInfoPosition({...infoPosition, direction: null});
        }
        props.context.showInfo(state.event, {height: infoPosition.height})
        if(!slidePosition.cancelGesture){
            slideTo(slidePosition.currentSlide)
        }
    }
    const calcZoomPan = (cursorX, cursorY, state) => {
        const boundRect = zoomRef.current.getBoundingClientRect()
        const moveY = state.delta[1]
        const moveX = state.delta[0]

        const panY = zoom.position.y + (moveY * 100 / boundRect.height)
        const panX = zoom.position.x + (moveX * 100 / boundRect.width)

        return {x: panX, y: panY}
    }
    const zoomPanHandler = (state) => {
        // const {x, y} = calcZoomPan(state.xy[0], state.xy[1], state)
        // setZoom({
        //     ...zoom,
        //     smooth: false,
        //     position: {
        //         x, y
        //     },
        // })
        const parent = state.event.target.parentNode.getBoundingClientRect()
        const zoomOrigin = {
            // x: ((state.event.clientX - containerRef.current.getBoundingClientRect().x) * 100 / containerRef.current.getBoundingClientRect().width), 
            // y: (state.event.clientY - containerRef.current.getBoundingClientRect().y) * 100 / containerRef.current.getBoundingClientRect().height
            
            x: ((state.event.clientX - parent.x) * 100 / parent.width) * 1.2, 
            y: ((state.event.clientY - parent.y) * 100 / parent.height) * 1.2
        }
        // console.log()

        setZoom({...zoom, origin: zoomOrigin})
    }
    const genericOptions = {
        // filterTaps: true,
        domTarget: containerRef,
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
                moveHandler(state, {speed: 2, direction: -1})
            },
            onDragEnd: (state) => moveEndHandler(state),
            onPinchStart: state => {
                const boundRect = state.event.target.getBoundingClientRect()
                props.context.showInfo(state.event, {height: -100})
                setInfoPosition({...infoPosition, height: -100})
                setZoom({
                    ...zoom,
                    zoom: true,
                })
            },
            onPinch: state => {
                const zoomImg = zoomRef.current.getBoundingClientRect()
                const parent = containerRef.current.getBoundingClientRect()

                const imgOffset = {x: zoomImg.top - parent.top, y: zoomImg.left - parent.left}

                const ratio = {width: parent.width / zoomImg.width, height: parent.height / zoomImg.height}

                const pinchDistance = state.da[0]
                let scale = pinchDistance / 75
                let zoomStatus = true
                
                const dotX = (100 * (state.origin[0] - parent.left)) / parent.width
                const dotY = (100 * (state.origin[1] - parent.top)) / parent.height

                let X = (100 * (state.origin[0] - imgOffset.x)) / zoomImg.width / scale
                let Y = (100 * (state.origin[1] - imgOffset.y)) / zoomImg.height / scale
                // let X = (dotX - ((imgOffset.x * 100) / parent.width))
                // let Y = (dotY - ((imgOffset.y * 100) / parent.height))

                const dot = {x: dotX, y: dotY}
                const origin = dot
                // const origin = {x: X, y: Y}
                // const dot = origin
                setZoom({
                    ...zoom,
                    zoom: zoomStatus,
                    pinch: true,
                    distance: state.da[0],
                    scale,
                    origin,
                    dot,
                })
            },
            onPinchEnd: state => {
                setZoom({...zoomDefault, smooth: true})
            },
            onWheelStart: () => {
                setSlidePosition({...slidePosition, cancelGesture: false});
                moveStartHandeler()
            },
            onWheel: (state) => {
                state.event.preventDefault()
                moveHandler(state, {speed: 1, direction: 1})
            },
            onWheelEnd: state => {
                state.event.preventDefault()
                moveEndHandler(state)
            },
            onMove: state => {
                if(!zoom.zoom || zoom.pinch)return
                zoomPanHandler(state)
            },
        },
        {...genericOptions},
    )

    document.addEventListener('gesturestart', e => e.preventDefault())
    document.addEventListener('gesturechange', e => e.preventDefault())

    useEffect(() => {
        return slideTo(props.currentSlide, props.file)
    }, [props.counter])
    useEffect(() => {
        if(zoomRef && zoomRef.current){
            setTimeout(() => {                
                const zoomImg = zoomRef.current.getBoundingClientRect()
                const parent = containerRef.current.getBoundingClientRect()
                const imgOffset = {x: zoomImg.left - parent.left, y: zoomImg.top - parent.top}
        
                setZoom({...zoom, dot: imgOffset})
            }, 400);
        }
    }, [slidePosition.currentSlide])

    useEffect(bind, [bind])
//     <div style={{background: "yellow", position: "fixed", bottom: 0, zIndex: 999}}>
//     <p>scale: {zoom.scale}</p>
//     <p>origin: X: {zoom.origin.x} | Y: {zoom.origin.y}</p>
//     <p>DOT: X: {zoom.dot.x} | Y: {zoom.dot.y}</p>
//     <p>state.origin: X: {zoom.dot.x} | Y: {zoom.dot.y}</p>
//     <p>offsetToParent: X: {zoom.offsetToParent ? zoom.offsetToParent.x : ""} | Y: {zoom.offsetToParent ? zoom.offsetToParent.y : ""}</p>
//     {/* <p>rect: |X: {zoomRef.current.clientWidth}| |Y: {zoomRef.current.clientHeight}|</p> */}
// </div>
    return(
            <div
                ref={containerRef}
                className={`carousel-container ${styles.container} ${zoom.pinch ? styles.showOverflow : ""}`}
            >
            {/* <div style={
                {height: "10px", 
                width: "10px", 
                backgroundColor: "red", 
                borderRadius: "10px", 
                position: "absolute", 
                top: `${zoom.dot.y}%`,
                left: `${zoom.dot.x}%`,
                zIndex: 999
                }}
            ></div> */}

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