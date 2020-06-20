import React, { Fragment } from "react";
import FilePreview from "../FilePreview";
import Tags from "./Tags";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import PreviewCounter from "./PreviewCounter";
import ArtworkTitle from "./ArtworkInfo/ArtworkTitle";
import ImageSelect from "../ImageSelect/ImageSelect";
import Controls from './Controls'
import ViewControls from "./ViewControls";

const ArtworkInfo = (props) => {
  const enlarge = props.context.state.enlarge;

  let singleContainerCounter = null;

  const seeAlso = () => {
    let seeAlsos = [];
    if (props.file.foreground.seeAlso.length > 0) {
      seeAlsos = props.file.foreground.seeAlso.map((fileName) => {
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
      seeAlsos = (
        <div
          key={"SeeAlso-related"}
          className="SeeAlso-related SeeAlso-wrapper"
        >
          <div className="subtitle subtitle_seeAlso">see also:</div>
          <div className="SeeAlso-related_images">{seeAlsos}</div>
        </div>
      );
    }
    let DOMS = [];
    if (
      props.context.state.relatedArtwork[props.file.foreground.artworkFamily]
        .column.fileIds.length > 1
    ) {
      let otherInFam = props.context.state.relatedArtwork[
        props.file.foreground.artworkFamily
      ].column.fileIds.filter(
        (fileName) => fileName !== props.file.foreground.fileName
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
          <div className="subtitle subtitle_seeAlso">related:</div>
          <div className="SeeAlso-related_images">{DOMS}</div>
        </div>
      );
    }
    let combined = [DOMS];
    combined = [seeAlsos, ...combined];
    const singleContainer = () => {
      if (Array.isArray(DOMS) || Array.isArray(seeAlsos)) {
        return true;
      } else {
        return false;
      }
    };
    singleContainerCounter = singleContainer();
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

  const locationAndYear = () => {
    let location = props.file.foreground.location
      ? props.file.foreground.location
      : null;
    let year = props.file.foreground.year ? props.file.foreground.year : null;
    if (location && year) {
      return (
        <div key={"location/year"} className="ArtworkInfo_locationYear">
          ({location}. {year})
        </div>
      );
    }
    if (!year && location) {
      return (
        <div key={"location"} className="ArtworkInfo_locationYear">
          ({location})
        </div>
      );
    }
    if (year) {
      return (
        <div key={"year"} className="ArtworkInfo_locationYear">
          ({year})
        </div>
      );
    } else {
      return null;
    }
  };

  const artworkTitle = () => {
    const artworkFamily = () => {
      if (props.file.foreground.artworkFamily !== "none")
        return (
          <div
            className={
              props.file.foreground.artworkTitle
                ? "ArtworkInfo_artworkFamily"
                : "ArtworkInfo_artworkTitle"
            }
          >
            {!props.file.foreground.artworkTitle ? null : <span>part of </span>}
            <em className="ArtworkInfo_artworkFamily_variable">
              {props.file.foreground.artworkFamily}
            </em>
          </div>
        );
      // }
    };

    const artworkTitle = () => {
      return (
        <div>
          {props.file.foreground.artworkTitle ? (
            <em className="ArtworkInfo_artworkTitle">
              {props.file.foreground.artworkTitle}
            </em>
          ) : null}
        </div>
      );
    };
    return (
      <div className="ArtworkInfo-Title">
          <ViewControls 
            context={props.context}
          />
        <PreviewCounter
          relatedArtwork={
            props.context.state.enlarge
              ? props.context.state.enlarge.familySequence.familySequence
              : []
          }
          file={props.context.state.enlarge}
        />
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            {artworkTitle()}
            {artworkFamily()}
            {locationAndYear()}
          </div>
          <div className="controls-button controls-info">
            <img
              alt="info icon"
              src="icons/svg/info.svg"
              // onClick={(e) => props.context.showInfo(e)}
            />
          </div>
        </div>
      </div>
    );
  };

  const descriptions = () => {
    return (
      <div className="ArtworkInfo--descriptions">
        {props.file.foreground.artworkDescription ? (
          <div className="ArtworkInfo--artworkDescription ArtworkInfo--descriptions_instance">
            {ReactHtmlParser(props.file.foreground.artworkDescription)}
          </div>
        ) : null}
        {props.file.foreground.familyDescription ? (
          <div className="ArtworkInfo--familyDescription ArtworkInfo--descriptions_instance">
            {ReactHtmlParser(props.file.foreground.familyDescription)}
          </div>
        ) : null}
      </div>
    );
  };

  const titleHeight = () => {
    let height = 36;
    const ArtworkInfoTitle = document.getElementById("ArtworkInfo-Title");
    if (ArtworkInfoTitle) {
      height = ArtworkInfoTitle.offsetHeight;
    }
    return height + 40;
  };

  return props.file && props.file.foreground ? (
    <div
      className={"ArtworkInfo-container"}
      id="ArtworkInfo-container"
    >

      <div
        key={"ArtworkInfo-wrapper"}
        className="ArtworkInfo-wrapper info-up"
        id="ArtworkInfo"
      >
        <ArtworkTitle file={props.file} context={props.context} />
        {descriptions()}
        <div
          key={"ArtworkInfo-container_seealso"}
          className="ArtworkInfo-container_seealso"
        >
          {seeAlso()}
        </div>
        {<Tags file={props.file.foreground} context={props.context} />}
      </div>
      <ImageSelect
        customClass={"side-scroll"}
        customId="ImageSelect-info"
        data={props.context.state.artworkInfoData}
        mobile={props.context.state.mobile}
        state={props.context.state}
        context={props.context}
        methods={{
          enlarge: props.context.enlarge,
          loadEnlarge: props.context.loadEnlarge,
          toggleMobile: props.context.toggleMobile,
          lazyLoad: props.context.lazyLoadImages,
        }}
      />
    </div>
  ) : null;
};

export default ArtworkInfo;
