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
        }
    }
    const [zoom, setZoom] = React.useState({...zoomDefault})
    const zoomRef = React.useRef(null)
    const containerRef = React.useRef()
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
                style={{width: `${100 / props.images.length}%`}}
                >                    
                    <img 
                        style={slidePosition.currentSlide === index ? 
                        {transform: `scale(${zoom.scale}) translate(${zoom.position.x}%, ${zoom.position.y}%)`, 
                        transformOrigin: `${zoom.origin.x}px ${zoom.origin.y}px`} : {}}
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
                            const zoomOrigin = {x: (e.clientX - boundRect.left) / zoom.scale, y: (e.clientY - boundRect.top) / zoom.scale}
                            // console.log({clientWidth: e.target.clientWidth, clientHeight: e.target.clientHeight, boudWidth: boundRect.width, boundHeight: boundRect.height})
                            console.log({clientX: e.clientX, clientY: e.clientY})
                            console.log(zoomOrigin)
                            // props.context.showInfo(e, {close: true, height: -100})
                            props.context.showInfo(e, {height: -100})
                            setInfoPosition({...infoPosition, height: -100})

                            setZoom({
                                ...zoom,
                                zoom: newZoom,
                                scale: newScale,
                                smooth: true,
                                position,
                                origin: zoomOrigin
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

        const pic = zoomRef.current
        return {x: panX, y: panY}
    }
    const zoomPanHandler = (state) => {
        const {x, y} = calcZoomPan(state.xy[0], state.xy[1], state)
        setZoom({
            ...zoom,
            smooth: false,
            position: {
                x, y
            },
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
                moveHandler(state, {speed: 2, direction: -1})
            },
            onDragEnd: (state) => moveEndHandler(state),
            
            onPinchStart: state => {
                const boundRect = state.event.target.getBoundingClientRect()
                // const zoomOrigin = {x: (state.evet.clientX - boundRect.left) / zoom.scale, y: (state.evet.clientY - boundRect.top) / zoom.scale}
                // const zoomOrigin = {x: (state.event.clientX - boundRect.left) / zoom.scale, y: (state.event.clientY - boundRect.top) / zoom.scale}
                const zoomOrigin = {x: state.origin[0], y: state.origin[1]}
                props.context.showInfo(state.event, {height: -100})
                setInfoPosition({...infoPosition, height: -100})
                setZoom({
                    ...zoom,
                    zoom: true,
                    origin: zoomOrigin
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
                if(zoom.origin.x == 0 || zoom.origin.y == 0){

                }
                const {x, y} = calcZoomPan(state.origin[0], state.origin[1], state)
                props.context.toggleExplorer({close: true})
                setZoom({
                    ...zoom,
                    zoom: zoomStatus,
                    pinch: true,
                    distance: state.da[0],
                    scale,
                    origin: {x: state.origin[0], y: state.origin[0]},
                    position: {x, y}
                    // position: {x: state.origin[0], y: state.origin[0]},
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
                console.log(state)
                if(!zoom.zoom || zoom.pinch)return
                zoomPanHandler(state)
            },
        },
        {...genericOptions},
    )

    useEffect(() => {
        return slideTo(props.currentSlide, props.file)
    }, [props.counter])

      useEffect(bind, [bind])
    return(
            <div 
                ref={containerRef}
                className={`carousel-container ${styles.container} ${zoom.pinch ? styles.showOverflow : ""}`}
            >
            <div style={{background: "yellow", position: "fixed", top: 0, zIndex: 999}}>
                <p>scale: {zoom.scale}</p>
                <p>pan: X: {zoom.position.x} | Y: {zoom.position.y}</p>
                <p>origin: X: {zoom.origin.x} | Y: {zoom.origin.y}</p>
                {/* <p>rect: |X: {zoomRef.current.clientWidth}| |Y: {zoomRef.current.clientHeight}|</p> */}
            </div>
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