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

export default class ArtworkInfo extends React.Component{
  constructor(props){
    super(props)
    this.state={
      tagsTrigger: false,
      infoUp: false
    }
     this.seeAlso = () => {
      let seeAlsos = [];
      if (this.props.file.foreground.seeAlso.length > 0) {
        seeAlsos = this.props.file.foreground.seeAlso.map((fileName) => {
          return (
            <FilePreview
              loadbydefault={"true"}
              key={`ArtworkInfo-${fileName}`}
              className="ArtworkInfo-preview"
              containerClassName="ArtworkInfo-preview-container"
              file={this.props.artworkInfoData[fileName]}
              onClick={(e) => this.props.context.loadEnlarge(e, fileName)}
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
        this.props.context.state.relatedArtwork[this.props.file.foreground.artworkFamily]
          .column.fileIds.length > 1
      ) {
        let otherInFam = this.props.context.state.relatedArtwork[
          this.props.file.foreground.artworkFamily
        ].column.fileIds.filter(
          (fileName) => fileName !== this.props.file.foreground.fileName
        );
        DOMS = otherInFam.map((fileName) => {
          return (
            <FilePreview
              loadbydefault={"true"}
              key={`ArtworkInfo-${fileName}`}
              className="ArtworkInfo-preview"
              containerClassName="ArtworkInfo-preview-container"
              file={this.props.artworkInfoData[fileName]}
              onClick={(e) => this.props.context.loadEnlarge(e, fileName)}
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
      // combined = [seeAlsos, ...combined];
      combined = [seeAlsos];
      const singleContainer = () => {
        if (Array.isArray(DOMS) || Array.isArray(seeAlsos)) {
          return true;
        } else {
          return false;
        }
      };
      let singleContainerCounter = singleContainer();
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
     this.locationAndYear = () => {
      let location = this.props.file.foreground.location
        ? this.props.file.foreground.location
        : null;
      let year = this.props.file.foreground.year ? this.props.file.foreground.year : null;
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
     this.artworkTitle = () => {
      const artworkFamily = () => {
        if (this.props.file.foreground.artworkFamily !== "none")
          return (
            <div
              className={
                this.props.file.foreground.artworkTitle
                  ? "ArtworkInfo_artworkFamily"
                  : "ArtworkInfo_artworkTitle"
              }
            >
              {!this.props.file.foreground.artworkTitle ? null : <span>part of </span>}
              <em className="ArtworkInfo_artworkFamily_variable">
                {this.props.file.foreground.artworkFamily}
              </em>
            </div>
          );
        // }
      };
  
      const artworkTitle = () => {
        return (
          <div>
            {this.props.file.foreground.artworkTitle ? (
              <em className="ArtworkInfo_artworkTitle">
                {this.props.file.foreground.artworkTitle}
              </em>
            ) : null}
          </div>
        );
      };
      return (
        <div className="ArtworkInfo-Title">
            <ViewControls 
              context={this.props.context}
            />
          <PreviewCounter
            relatedArtwork={
              this.props.context.state.enlarge
                ? this.props.context.state.enlarge.familySequence.familySequence
                : []
            }
            file={this.props.context.state.enlarge}
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
              {this.locationAndYear()}
            </div>
            <div className="controls-button controls-info">
              <img
                alt="info icon"
                src="icons/svg/info.svg"
                // onClick={(e) => this.props.context.showInfo(e)}
              />
            </div>
          </div>
        </div>
      );
    };
     this.descriptions = () => {
      return (
        <div className="ArtworkInfo--descriptions">
          {this.props.file.foreground.artworkDescription ? (
            <div className="ArtworkInfo--artworkDescription ArtworkInfo--descriptions_instance">
              {ReactHtmlParser(this.props.file.foreground.artworkDescription)}
            </div>
          ) : null}
          {this.props.file.foreground.familyDescription ? (
            <div className="ArtworkInfo--familyDescription ArtworkInfo--descriptions_instance">
              {ReactHtmlParser(this.props.file.foreground.familyDescription)}
            </div>
          ) : null}
        </div>
      );
    };
     this.titleHeight = () => {
      let height = 36;
      const ArtworkInfoTitle = document.getElementById("ArtworkInfo-Title");
      if (ArtworkInfoTitle) {
        height = ArtworkInfoTitle.offsetHeight;
      }
      return height + 40;
    };
    this.showInfo = (e) => {
      if(this.state.tagsTrigger){
        this.setState({tagsTrigger: false})
      }
      else{
        this.setState({infoUp: !this.state.infoUp})
      }
      this.props.context.showInfo(e)
    };
    this.secondaryInfo = () => {
      return <Fragment>
                  {this.descriptions()}
          <div
            key={"ArtworkInfo-container_seealso"}
            className="ArtworkInfo-container_seealso"
          >
            {this.seeAlso()}
          </div>
          <Tags 
            file={this.props.file.foreground} 
            context={this.props.context} 
            tagsTrigger={() => {
              if(this.props.context.state.mobile){
                this.setState({tagsTrigger: true})
              }
              else{return}
            }
            }
          />
      </Fragment>
    }
  }

  render(){
    return this.props.file && this.props.file.foreground ? (
      <div
        className={"ArtworkInfo-container"}
        id="ArtworkInfo-container"
      >
          <ArtworkTitle 
            file={this.props.file} 
            context={this.props.context} 
            showInfo={
              (e) => this.showInfo(e)
            }
            infoUp={this.state.infoUp}
          />
          <div className=""
                    key={"ArtworkInfo-wrapper"}
                    className="ArtworkInfo-wrapper secondaryInfo"
                    id="ArtworkInfo"
          >
            {this.secondaryInfo()}
            {this.props.context.state.mobile ? 
              <ImageSelect
                customClass={"side-scroll"}
                customId="ImageSelect-info"
                data={this.props.context.state.artworkInfoData}
                mobile={this.props.context.state.mobile}
                state={this.props.context.state}
                context={this.props.context}
                methods={{
                  enlarge: this.props.context.enlarge,
                  loadEnlarge: this.props.context.loadEnlarge,
                  toggleMobile: this.props.context.toggleMobile,
                  lazyLoad: this.props.context.lazyLoadImages,
                }}
              /> : null
            }
          </div>
        </div>
    ) : null;
  }
};
