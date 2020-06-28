import React, { Fragment } from 'react'
import PreviewCounter from '../PreviewCounter'
import ViewControls from '../ViewControls'

export default class ArtworkTitle extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            open: false,
            infoUp: false
        }
        this.locationAndYear = () => {
            let location = this.props.file.background.location ? this.props.file.background.location : null
            let year = this.props.file.background.year ? this.props.file.background.year: null
            if(location && year){
                return <div key={"location/year"} className="ArtworkInfo_locationYear">({location}. {year})</div>
            }
            if(!year && location){
                return <div key={"location"} className="ArtworkInfo_locationYear">({location})</div>
            }
            if(year){
                return <div key={"year"} className="ArtworkInfo_locationYear">({year})</div>
            }
            else{ return null}
        }
        this.artworkTitle = () => {
    
            const artworkFamily = () => {
                if(this.props.file.background.artworkFamily !== "none")
                    return <div 
                            className={
                                this.props.file.background.artworkTitle ? 
                                "ArtworkInfo_artworkFamily" :
                                "ArtworkInfo_artworkTitle"
                                }
                            >        
                                <div>
                                    <span className={"ArtworkInfo_artworkTitle_secondary"}>part of </span>
                                    {/* {!this.props.file.background.artworkTitle ? null : <span>part of </span> } */}
                                    <em className="ArtworkInfo_artworkFamily_variable ArtworkInfo_artworkTitle_secondary">{this.props.file.background.artworkFamily}</em>
                                </div>
                            </div>
                // }
            }
    
            const artworkTitle = () => {

                let artworkFamily = this.props.file.background.artworkFamily
                if(artworkFamily === "none"){
                    artworkFamily = "–"
                }
                if(artworkFamily === "Poilsis"){
                    artworkFamily = "Daiktai sandėlyje"
                }

                let artworkTitle = this.props.file.background.artworkTitle
                if(!artworkTitle){
                    artworkTitle = artworkFamily
                }

                // if(this.props.file.background.artworkTitle){
                    return <Fragment>
                        <div style={{marginLeft: "-7px"}}>    
                        <em className="ArtworkInfo_artworkTitle">{artworkTitle}</em>
                        </div>
                        <div 
                            className={
                            this.props.file.background.artworkTitle ? 
                            "ArtworkInfo_artworkFamily" :
                            "ArtworkInfo_artworkTitle"
                            }
                        >        
                            <div>
                                {this.props.file.background.artworkTitle && this.props.file.background.artworkFamily !== "none" ? 
                                    <Fragment>
                                        <span className={"ArtworkInfo_artworkTitle_secondary"}>part of </span>
                                        <em className="ArtworkInfo_artworkFamily_variable ArtworkInfo_artworkTitle_secondary">{artworkFamily}</em>
                                    </Fragment> :
                                    <Fragment>
                                        <span className={"ArtworkInfo_artworkTitle_secondary"}></span>
                                        <em className="ArtworkInfo_artworkFamily_variable ArtworkInfo_artworkTitle_secondary"></em>
                                    </Fragment>
                                }
                            </div>
                        </div>
                    </Fragment>
            }
                return (
                    <div className="ArtworkInfo-Title" id="ArtworkInfo-Title">
                        <ViewControls 
                            context={this.props.context}
                            showInfoText={this.state.infoUp ? "Show less" : "Show more"}
                            showInfo={this.props.showInfo}
                            infoUp={this.props.infoUp}
                        />
                        <div className={"ArtworkInfo--descriptions"}>

                                {artworkTitle()}
                                {this.locationAndYear()}

                        </div>
                    </div>
                )
        }
    }
    render(){
        console.log("aARTWORK TITLE")
        console.log("component did mount")
        console.log(this.props)
        return(
                <Fragment>
                    {this.artworkTitle()}
                </Fragment>
        )
    }
}


