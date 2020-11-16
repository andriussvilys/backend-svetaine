import React, { Fragment } from "react";
import FilePreview from "../FilePreview";
import { useGesture } from 'react-use-gesture'
import Tags from "./Tags";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import ArtworkTitle from "./ArtworkInfo/ArtworkTitle";
import ImageSelect from "../ImageSelect/ImageSelect";
import PreviewCounter from "./PreviewCounter";
import ViewControls from "./ViewControls";

import './css/artworkInfo.css';

const ArtworkInfo = props => {
    const ArtworkInfoWrapperRef = React.useRef(null)
    const [state, setState] = React.useState({tagsTrigger: false, infoUp: false, height: -100, direction: null})

     const seeAlso = () => {
      let seeAlsos = [];
      if (props.file.seeAlso.length > 0) {
        seeAlsos = props.file.seeAlso.map((fileName) => {
          return (
            <FilePreview
              loadbydefault={"true"}
              key={`ArtworkInfo-${fileName}`}
              className="ArtworkInfo-preview"
              containerClassName="ArtworkInfo-preview-container"
              file={props.artworkInfoData[fileName]}
              onClick={(e) => props.context.loadImage(fileName)}
              id={`seeAlso-${fileName}`}
            />
          );
        });
        seeAlsos = (
          <div
            key={"SeeAlso-related"}
            className="SeeAlso-related SeeAlso-wrapper"
          >
            <div className="subtitle_seeAlso">see also:</div>
            <div className="SeeAlso-related_images">{seeAlsos}</div>
          </div>
        );
      }
      let DOMS = [];
      if (
        props.context.state.relatedArtwork[props.file.artworkFamily]
          .column.fileIds.length > 1
      ) {
        let otherInFam = props.context.state.relatedArtwork[
          props.file.artworkFamily
        ].column.fileIds.filter(
          (fileName) => fileName !== props.file.fileName
        );
        DOMS = otherInFam.map((fileName) => {
          return (
            <FilePreview
              loadbydefault={"true"}
              key={`ArtworkInfo-${fileName}`}
              className="ArtworkInfo-preview"
              containerClassName="ArtworkInfo-preview-container"
              file={props.artworkInfoData[fileName]}
              onClick={(e) => props.context.loadEnlarge(e, fileName)}
              id={`seeAlso-${fileName}`}
            />
          );
        });
        DOMS = (
          <div
            key={"SeeAlso-previous"}
            className="SeeAlso-previous SeeAlso-wrapper"
          >
            <div className="subtitle_seeAlso">related:</div>
            <div className="SeeAlso-related_images">{DOMS}</div>
          </div>
        );
      }
      let combined = [DOMS];
      combined = [seeAlsos];
      const singleContainer = () => {
        if (Array.isArray(DOMS) || Array.isArray(seeAlsos)) {
          return true;
        } else {
          return false;
        }
      };
      return (
        <div
          className={
            singleContainer()
              ? "ArtworkInfo-seeAlso-container single-container"
              : "ArtworkInfo-seeAlso-container"
          }
        >
          {combined}
        </div>
      );
    };
    //  const locationAndYear = () => {
    //   let location = props.file.location
    //     ? props.file.location
    //     : null;
    //   let year = props.file.year ? props.file.year : null;
    //   if (location && year) {
    //     return (
    //       <div key={"location/year"} className="ArtworkInfo_locationYear">
    //         ({location}. {year})
    //       </div>
    //     );
    //   }
    //   if (!year && location) {
    //     return (
    //       <div key={"location"} className="ArtworkInfo_locationYear">
    //         ({location})
    //       </div>
    //     );
    //   }
    //   if (year) {
    //     return (
    //       <div key={"year"} className="ArtworkInfo_locationYear">
    //         ({year})
    //       </div>
    //     );
    //   } else {
    //     return null;
    //   }
    // };
    //  const artworkTitle = () => {
    //   const artworkFamily = () => {
    //     if (props.file.artworkFamily !== "none")
    //       return (
    //         <div
    //           className={
    //             props.file.artworkTitle
    //               ? "ArtworkInfo_artworkFamily"
    //               : "ArtworkInfo_artworkTitle"
    //           }
    //         >
    //           {!props.file.artworkTitle ? null : <span>part of </span>}
    //           <em className="ArtworkInfo_artworkFamily_variable">
    //             {props.file.artworkFamily}
    //           </em>
    //         </div>
    //       );
    //     // }
    //   };
  
    //   const artworkTitle = () => {
    //     return (
    //       <div>
    //         {props.file.artworkTitle ? (
    //           <em className="ArtworkInfo_artworkTitle">
    //             {props.file.artworkTitle}
    //           </em>
    //         ) : null}
    //       </div>
    //     );
    //   };
    //   return (
    //     <div className="ArtworkInfo-Title">
    //         <ViewControls 
    //           context={props.context}
    //         />
    //       <PreviewCounter
    //         relatedArtwork={
    //           props.context.state.enlarge
    //             ? props.context.state.enlarge.familySequence.familySequence
    //             : []
    //         }
    //         file={props.context.state.enlarge}
    //       />
    //       <div
    //         style={{
    //           flex: 1,
    //           display: "flex",
    //           justifyContent: "space-between",
    //           alignItems: "center",
    //         }}
    //       >
    //         <div>
    //           {artworkTitle()}
    //           {artworkFamily()}
    //           {locationAndYear()}
    //         </div>
    //         <div className="controls-button controls-info">
    //           <img
    //             alt="info icon"
    //             src="icons/svg/info.svg"
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   );
    // };
     const descriptions = () => {
      return (
        <div className="ArtworkInfo--descriptions">
          {props.file.artworkDescription ? (
            <div className="ArtworkInfo--artworkDescription ArtworkInfo--descriptions_instance">
              {ReactHtmlParser(props.file.artworkDescription)}
            </div>
          ) : null}
          {props.file.familyDescription ? (
            <div className="ArtworkInfo--familyDescription ArtworkInfo--descriptions_instance">
              {ReactHtmlParser(props.file.familyDescription)}
            </div>
          ) : null}
        </div>
      );
    };
    //  const titleHeight = () => {
    //   let height = 36;
    //   const ArtworkInfoTitle = document.getElementById("ArtworkInfo-Title");
    //   if (ArtworkInfoTitle) {
    //     height = ArtworkInfoTitle.offsetHeight;
    //   }
    //   return height + 40;
    // };
    const showInfo = (e) => {
      console.log("SHOW INFO ARTWORK INFO")
      const newHeight = state.height > -60 ? -100 : 0
      if(props.context.state.mobile){
        if(props.context.state.showExplorer || state.tagsTrigger){
          props.context.showInfo(e)
          return
        }
        else{
          setState({...state, infoUp: !state.infoUp, height: newHeight})
          props.context.showInfo(e)
        }
      }
      else{
        setState({...state, infoUp: !state.infoUp, height: newHeight})
        props.context.showInfo(e)
        return
      }
    };
    const secondaryInfo = () => {
      return <Fragment>
          {descriptions()}
          <div
            key={"ArtworkInfo-container_seealso"}
            className="ArtworkInfo-container_seealso"
          >
            {seeAlso()}
          </div>         
            <Tags 
              file={props.file} 
              context={props.context} 
              tagsTrigger={() => {
                setState({tagsTrigger: true})
                  props.context.toggleExplorer()
              }}
              onClose={() => {
                setState({...state, tagsTrigger: false})
                props.context.toggleExplorer({close: true})
              }}
            />
      </Fragment>
    }
    const placeholder = {
      artworkDescription: "PLACEHOLDER",
      artworkFamily: "PLACEHOLDER",
      artworkTitle: "PLACEHOLDER",
      desktopPath: "uploads/desktop/malonioji_1-desktop.jpg",
      displayMain: true,
      familyDescription: "PLACEHOLDER",
      familyDisplayIndex: 2,
      fileName: "malonioji_1.jpg",
      filePath: "/uploads/malonioji_1.jpg",
      fileType: "image/jpeg",
      location: "Vilnius, Lithuania",
      mobilePath: "uploads/mobile/malonioji_1-mob.jpg",
      naturalSize: {naturalWidth: 721, naturalHeight: 1080},
      seeAlso: [],
      themes: [],
      thumbnailPath: "uploads/thumbnails/malonioji_1-thumbnail.jpg",
      year: "2015",
    }
    const moveStartHandeler = (state) => {
    }
    const checkDirection = state => {
        // if(!state.direction){
            console.log(`%cPOSITION FREE {${state.direction}}`, "color: magenta");
            console.log({Y: state.direction[1], X: state.direction[0]})
        //     console.log({DIRECTION_Y: state.direction[1], DIRECTION_X: state.direction[0]})
        if(Math.abs(state.direction[1]) > Math.abs(state.direction[0])){
            console.log("DIRECTION - Y")
            return setState({...state, direction:[0,1]});
        }
        else if(Math.abs(state.direction[1]) < Math.abs(state.direction[0])){
            console.log("DIRECTION - X")
            return setState({...state, direction:[1, 0]});
        }
    }
    const verticalMoveHandler = (gestureState, options) => {
        console.log("%c VERTICAL HANDLER", "color: lime")
        console.log({Y: gestureState.direction[1]})
        let heightValue = null;
        heightValue = state.height + (options.direction * gestureState.delta[1])
        console.log({newHeight: heightValue})
        if(heightValue < -100){
            heightValue = -100
        }
        if(heightValue > 0){
            heightValue = 0
        }
        setState({...state, height: heightValue})
    }
    const moveHandler = (gestureState, options) => {
      return verticalMoveHandler(gestureState, 
        {direction: options.direction, speed: options.speed}
        );
    }
    const moveEndHandler = (gestureState) => {
        if(gestureState.direction){
            console.log("NULL DIRECTION")
            setState({...state, direction: null});
        }
    }
    const genericOptions = {
      // filterTaps: true,
      domTarget: ArtworkInfoWrapperRef,
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
          onDrag: (gestureState) => {
              moveHandler(gestureState, {speed: 2, direction: -1})
          },
          onDragEnd: (gestureState) => moveEndHandler(gestureState),
          onWheelStart: () => {
              moveStartHandeler()
          },
          onWheel: (gestureState) => {
            gestureState.event.preventDefault()
            console.log("ON WHEEL")
            moveHandler(gestureState, {speed: 1, direction: 1})
          },
          onWheelEnd: gestureState => {
            gestureState.event.preventDefault()
              moveEndHandler(gestureState)
          },
      },
      {...genericOptions},
  )
    React.useEffect(() => {
      setState({...state, height: props.transform})
    }, [props.transform])
    React.useEffect(bind, [bind])


    return(
      <div
        // className={"ArtworkInfo-container"}
        className={`ArtworkInfo-container`}
        id="ArtworkInfo-container"
      >
        <div 
        className={`ArtworkInfo-wrapper_main`}
        // style={{transform: `translateY(${-props.transform}%`}}
        style={{transform: `translateY(${-state.height}%`}}
        // {...bind()}
        ref={ArtworkInfoWrapperRef}
        >
          {props.children}
          <ArtworkTitle 
              file={props.file ? props.file : {background: placeholder}} 
              context={props.context} 
              showInfo={
                () => showInfo()
              }
              // - 100: False, >-100 : TRUE
              infoUp={state.height > -60 ? true : false}
              dots={props.dots}
            />
            <div
              key={"ArtworkInfo-wrapper"}
              className={`ArtworkInfo-wrapper secondaryInfo ${props.context.state.info.infoUp ? "info-up" : ""}`}
              id="ArtworkInfo"
            >
                {props.file ? 
                  secondaryInfo() : null
                }   
              {props.context.state.mobile ? 
                <ImageSelect
                  customClass={`${props.context.state.showExplorer ? "ArtworkInfo-toggleTags" : ""}`}
                  customId="ImageSelect-info"
                  sideScroll
                  data={props.context.state.artworkInfoData}
                  mobile={props.context.state.mobile}
                  state={props.context.state}
                  context={props.context}
                  methods={{
                    enlarge: props.context.enlarge,
                    // loadEnlarge: props.context.loadEnlarge,
                    loadImage: props.context.loadImage,
                    toggleMobile: props.context.toggleMobile,
                    lazyLoad: props.context.lazyLoadImages,
                  }}
                /> : null
              }
            </div>
        </div>
      </div>
    )
};

export default ArtworkInfo;