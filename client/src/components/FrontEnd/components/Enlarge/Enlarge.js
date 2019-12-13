import React, { Fragment } from 'react'
import FilePreview from '../FilePreview'
import ArtworkInfo from '../ArtworkInfo/ArtworkInfo'
import { useSwipeable } from "react-swipeable"


const Enlarge = (props) => {

    const renderNext = () => {
        if(props.nextEnlarge){
            return <FilePreview 
            file={props.nextEnlarge} 
            containerClassName="imageSelect-Enlarge" 
            className="imageSelect-Enlarge" 
            onClick={props.onClick}
            />
        }
        else{ return null}
    }
    const pushNew = () => {
        return(
            <Fragment>
                <div id="nextEnlarge" style={{position: "absolute", height: "100%", width: "100%", backgroundColor: "yellow", left: "-100%", transition: "0.2s all"}}>
                    {renderNext()}
                </div>

                <FilePreview 
                id="foreground"
                file={props.file.foreground} 
                containerClassName="enlarge-container" 
                className="enlarge-preview foreground-image" 
                previewName="foreground-preview"
                onClick={props.onClick}
                noWrapper={true}
                />

                {props.file.background ?
                    <FilePreview 
                    id="background"
                    file={props.file.background} 
                    containerClassName="enlarge-container" 
                    className="enlarge-preview background-image" 
                    previewName="background-preview"
                    onClick={props.onClick}
                    noWrapper={true}
                    />
                    :
                    null
                }
            </Fragment>
        )
    }
    const createPreview = (source, imageName, fgId) => {
        
        return <FilePreview 
        id={fgId}
        file={source} 
        containerClassName="enlarge-container" 
        className={`enlarge-preview ${imageName}`}
        previewName="foreground-preview"
        onClick={props.closeEnlarge}
        noWrapper={true}
        />
    }


    const handlers = useSwipeable({
        onSwipedLeft: () => {console.log("swiped left ENLARGE"); props.context.viewNext()},
        onSwipedRight: () => {console.log("swiped right ENLARGE"); props.context.viewPrev()},
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
      });
        
        return(
            <div 
            {...handlers}
            id="ArtworkInfo" 
            onClick={(e) => props.closeEnlarge(e)}
            className="enlargeContainer" id="enlargeContainer">
                <div className="enlarge-border"></div>
                <Fragment>
                    <div id="foreground" className="foreground-transition">
                        {props.file ? createPreview(props.file.foreground, 'foreground-image', 'FG') : null}
                    </div>

                    <div id="background" className="foreground-transition">
                        {props.file ? createPreview(props.file.background, 'background-image') : null}
                    </div>
                </Fragment>
            </div>
        )
    }

export default Enlarge