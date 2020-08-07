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
      if (this.props.file.seeAlso.length > 0) {
        seeAlsos = this.props.file.seeAlso.map((fileName) => {
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
            <div className="subtitle_seeAlso">see also:</div>
            <div className="SeeAlso-related_images">{seeAlsos}</div>
          </div>
        );
      }
      let DOMS = [];
      if (
        this.props.context.state.relatedArtwork[this.props.file.artworkFamily]
          .column.fileIds.length > 1
      ) {
        let otherInFam = this.props.context.state.relatedArtwork[
          this.props.file.artworkFamily
        ].column.fileIds.filter(
          (fileName) => fileName !== this.props.file.fileName
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
            <div className="subtitle_seeAlso">related:</div>
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
      // let singleContainerCounter = singleContainer();
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
      let location = this.props.file.location
        ? this.props.file.location
        : null;
      let year = this.props.file.year ? this.props.file.year : null;
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
        if (this.props.file.artworkFamily !== "none")
          return (
            <div
              className={
                this.props.file.artworkTitle
                  ? "ArtworkInfo_artworkFamily"
                  : "ArtworkInfo_artworkTitle"
              }
            >
              {!this.props.file.artworkTitle ? null : <span>part of </span>}
              <em className="ArtworkInfo_artworkFamily_variable">
                {this.props.file.artworkFamily}
              </em>
            </div>
          );
        // }
      };
  
      const artworkTitle = () => {
        return (
          <div>
            {this.props.file.artworkTitle ? (
              <em className="ArtworkInfo_artworkTitle">
                {this.props.file.artworkTitle}
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
              />
            </div>
          </div>
        </div>
      );
    };
     this.descriptions = () => {
      return (
        <div className="ArtworkInfo--descriptions">
          {this.props.file.artworkDescription ? (
            <div className="ArtworkInfo--artworkDescription ArtworkInfo--descriptions_instance">
              {ReactHtmlParser(this.props.file.artworkDescription)}
            </div>
          ) : null}
          {this.props.file.familyDescription ? (
            <div className="ArtworkInfo--familyDescription ArtworkInfo--descriptions_instance">
              {ReactHtmlParser(this.props.file.familyDescription)}
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
      if(this.props.context.state.mobile){
        if(this.state.infoUp){
        }
        if(this.props.context.state.showExplorer || this.state.tagsTrigger){
          console.log("mobile close")
          this.props.context.showInfo(e)
          // this.props.context.toggleExplorer({close: true})
          // this.setState({tagsTrigger: false})
          return
        }
        else{
          this.setState({infoUp: !this.state.infoUp}, () => {
            this.props.context.showInfo(e)
          })
        }
      }
      else{
        this.setState({infoUp: !this.state.infoUp}, () => {
          this.props.context.showInfo(e)
        })
        return
      }
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
              file={this.props.file} 
              context={this.props.context} 
              tagsTrigger={() => {
                this.setState({tagsTrigger: true}, () => {
                  this.props.context.toggleExplorer()
                })
              }}
              onClose={() => {
                this.setState({tagsTrigger: false}, () => {
                  this.props.context.toggleExplorer({close: true})
                })
              }}
            />
      </Fragment>
    }
    this.placeholder = {
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
  }

  render(){
  // console.log("FILE / CURRENTARTWORK IN ARTWORKINFO COMPONENT")
  // console.log(this.props.file)
  // if(!this.props.file){
  //   return null
  // }
    return(
      <div
        // className={"ArtworkInfo-container"}
        className={`ArtworkInfo-container`}
        id="ArtworkInfo-container"
      >
          <ArtworkTitle 
            file={this.props.file ? this.props.file : {background: this.placeholder}} 
            context={this.props.context} 
            showInfo={
              () => this.showInfo()
            }
            infoUp={this.state.infoUp}
          />
          <div
            key={"ArtworkInfo-wrapper"}
            className={`ArtworkInfo-wrapper secondaryInfo ${this.props.context.state.info.infoUp ? "info-up" : ""}`}
            id="ArtworkInfo"
          >
              {this.props.file ? 
                this.secondaryInfo() : null
              }   
            {this.props.context.state.mobile ? 
              <ImageSelect
                  customClass={`${this.props.context.state.showExplorer ? "ArtworkInfo-toggleTags" : ""}`}
                  customId="ImageSelect-info"
                  sideScroll
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
    )
  }
};
