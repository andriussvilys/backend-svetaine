import React, { Fragment } from 'react'
import FilePreview from '../FilePreview'
import ArtworkInfo from '../ArtworkInfo/ArtworkInfo'


export default class Enlarge extends React.Component{

    renderNext = () => {
        if(this.props.nextEnlarge){
            return <FilePreview 
            file={this.props.nextEnlarge} 
            containerClassName="imageSelect-Enlarge" 
            className="imageSelect-Enlarge" 
            onClick={this.props.onClick}
            />
        }
        else{ return null}
    }

    pushNew = () => {
        return(
            <Fragment>
                <div id="nextEnlarge" style={{position: "absolute", height: "100%", width: "100%", backgroundColor: "yellow", left: "-100%", transition: "0.2s all"}}>
                    {this.renderNext()}
                </div>

                <FilePreview 
                id="foreground"
                file={this.props.file.foreground} 
                containerClassName="enlarge-container" 
                className="enlarge-preview foreground-image" 
                previewName="foreground-preview"
                onClick={this.props.onClick}
                />

                {this.props.file.background ?
                    <FilePreview 
                    id="background"
                    file={this.props.file.background} 
                    containerClassName="enlarge-container" 
                    className="enlarge-preview background-image" 
                    previewName="background-preview"
                    onClick={this.props.onClick}
                    />
                    :
                    null
                }
            </Fragment>
        )
    }

    render(){
        console.log('ENLARGE PROPS')
        console.log(this.props)
        return(
            <div 
            id="ArtworkInfo" 
            onClick={() => this.props.closeEnlarge()}
            className="enlargeContainer" id="enlargeContainer">
                {this.props.file 
                ? this.pushNew()
                : null}
                {this.props.file
                ? <ArtworkInfo 
                    file={this.props.file} 
                    artworkInfoData={this.props.artworkInfoData}
                    />
                : null
                }
            </div>
        )
    }
}