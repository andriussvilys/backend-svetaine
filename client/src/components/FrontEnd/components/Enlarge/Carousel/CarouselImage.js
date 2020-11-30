import React, { Fragment } from 'react'
import { useGesture, usePinch } from 'react-use-gesture'

const CarouselImage = props => {
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

    const gestureOptions = {
        domTarget: zoomRef,
        lockDirection: true,
        eventOptions: {
            passive: false
        }
    }

    const bind = useGesture(
        {
        onPinch: state => {
            const zoomImg = zoomRef.current.getBoundingClientRect()
            const offset = {x: zoomImg.left, y: zoomImg.top}
            const pinchDistance = state.da[0]
            let scale = pinchDistance / 100
            let zoomStatus = true
            let originWithOffset = null
            const origin = {x: state.origin[0], y: state.origin[1]}
            const stateOffset = {x: state.offset[0], y: state.offset[1]}
            const movement = {x: state.movement[0], y: state.movement[1]}
            setZoom({
                ...zoom,
                zoom: zoomStatus,
                pinch: true,
                distance: state.da[0],
                scale,
                origin,
                // position: {
                //     x, y
                // },
                offset,
                movement,
                originWithOffset,
                stateOffset
            })
        },
        onMove: state => {
            console.log("MOVE")
            const calcZoomPan = (state) => {
                const boundRect = zoomRef.current.getBoundingClientRect()
                const moveY = state.delta[1]
                const moveX = state.delta[0]
        
                const panY = zoom.position.y + (moveY * 100 / boundRect.height)
                const panX = zoom.position.x + (moveX * 100 / boundRect.width)
        
                return {x: panX, y: panY}
            }

            const {x, y} = calcZoomPan(state)
            setZoom({
                ...zoom,
                smooth: false,
                position: {
                    x, y
                },
            })
        }
    }, 
    {...gestureOptions}
    )

    React.useEffect(() => {
        console.log("BIND")
        // bind
        console.log(zoomRef)
        return
    }, 
    zoom)
    return(
        <Fragment>
            <img
            style={props.currentSlide ?
            {transform: `scale(${zoom.scale}) translate(${zoom.position.x}%, ${zoom.position.y}%)`,
            transformOrigin: `${zoom.origin.x}px ${zoom.origin.y}px`, border: "2px solid black"} : {}}
    
            // className={`${zoom.smooth && props.currentSlide ? styles.smoothSlide : ""}`}
            ref={props.currentSlide ? zoomRef : null}
            src={props.image}
            alt={props.image}
            onMouseDown={(e) => {
                if(props.context.state.mobile){
                    return
                }
                // console.log("props.containerOffset")
                // console.log(props.containerOffset)
                const zoomedImage = zoomRef.current.getBoundingClientRect()
                console.log("ZOOMED IMAGED")
                console.log({clientX: e.clientX, clientY: e.clientY})
                console.log({x: zoomedImage.x, y: zoomedImage.y})
                // const offSet = {x: props.containerOffset.x - zoomedImage.x, y: props.containerOffset.y - zoomedImage.y }
                // console.log("offSet")
                // console.log(offSet)
                let newScale = zoom.scale + 1
                let newZoom = true
                newScale = newScale > 2 ? 1 : newScale
                newZoom = newScale === 1 ? false : true
                const position = newScale === 1 ? {x: 0, y: 0} : zoom.position
                const boundRect = e.target.getBoundingClientRect()
                // const zoomOrigin = {x: (e.clientX - boundRect.left) / zoom.scale, y: (e.clientY - boundRect.top) / zoom.scale}
                // const zoomOrigin = {x: (e.clientX - offSet.x), y: (e.clientY - offSet.y)}
                const zoomOrigin = {x: e.clientX - zoomedImage.x, y: e.clientY - zoomedImage.y}
                const dot = {x: e.clientX - props.containerOffset.x, y: e.clientY - props.containerOffset.y}
                console.log("zoomOrigin")
                console.log(zoomOrigin)
                props.context.showInfo(e, {height: -100})
    
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
            {props.currentSlide ? <div style={
                        {height: "10px", 
                        width: "10px", 
                        backgroundColor: "lime", 
                        borderRadius: "10px", 
                        position: "absolute", 
                        top: `${zoom.dot.y}px`,
                        left: `${zoom.dot.x}px`,
                        // left: `${zoom.origin.x + zoomRef && zoomRef.current ? zoomRef.current.getBoundingClientRect().x : 0}px`,
                        zIndex: 999
                        }}></div> : null}
        </Fragment>
    )
}

export default CarouselImage