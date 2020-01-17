import React, { Fragment } from 'react'
import Button from 'react-bootstrap/Button'
import { Context } from './FrontEndProvider';
import { BrowserRouter } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'
// import {Context} from '../Provider'

import auth from '../Auth'
import TagsMenu from './components/TagsMenu'
import ImageSelect from './components/ImageSelect/ImageSelect'
import Enlarge from './components/Enlarge/Enlarge'
import Nav from './components/Nav/Nav'
import Themes from './components/Themes/Themes'
import ArtworkInfo from './components/ArtworkInfo/ArtworkInfo'
import About from './components/About/About'
import Contact from './components/About/Contact';
import ClearAll from './components/ClearAll';
import YearLocation from './components/YearLocation/YearLocation';
import PreviewBubbles from './components/Enlarge/PreviewBubble'

Array.from(document.getElementsByTagName("h4")).forEach(item => {
    item.style.whiteSpace = "normal"
})
export default class FrontEndIndex extends React.Component{
    static contextType = Context;
    constructor(props){
        super(props)
        this.state = {
            imgSelectLoaded: document.querySelectorAll(".ImagesPreview--imageContainer")
        }
    }

    adminButtons = (props) => {
        return(
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <Button
                            onClick={
                                () => {
                                    if(auth.isAuthenticated()){
                                        this.props.props.history.push('/admin/create')
                                    }
                                    else{
                                        this.props.props.history.push('/admin/login')
                                    }
                                }
                            }
                        >
                            Admin
                        </Button>
                    </div>
        )
    }  
    
    render(){
        return(
            <BrowserRouter>
                <Context.Consumer>
                    {() => {
                        return <div className="frontEndIndex-container" >
                            <TagsMenu context={this.context}>
                            </TagsMenu>

                            <div id="images" className="images-container">
                                <ImageSelect 
                                    data={this.context.state.artworkInfoData} 
                                    mobile={this.context.state.mobile}
                                    state={this.context.state}
                                    // data={this.context.state.visibleArtwork}
                                    methods={{
                                        enlarge: this.context.enlarge,
                                        loadEnlarge: this.context.loadEnlarge,
                                        toggleMobile: this.context.toggleMobile,
                                        lazyLoad: this.context.lazyLoadImages
                                    }}
                                />
                                <Enlarge 
                                    nextEnlarge={this.context.state.nextEnlarge}
                                    file={this.context.state.enlarge}
                                    onClick={this.context.closeEnlarge}
                                    artworkInfoData={this.context.state.artworkInfoData}
                                    loadEnlarge={this.context.loadEnlarge}
                                    closeEnlarge={this.context.closeEnlarge}
                                    hideArtworkInfo={this.context.hideArtworkInfo}
                                    context={this.context}
                                />
                                    {/* <Fragment>
                                        {this.context.state.enlarge ? 
                                            this.context.state.enlarge.foreground ?
                                                <ArtworkInfo 
                                                context={this.context}
                                                file={this.context.state.enlarge} 
                                                artworkInfoData={this.context.state.artworkInfoData} 
                                                loadEnlarge={this.context.loadEnlarge} 
                                                hideArtworkInfo={this.context.hideArtworkInfo}
                                                mobile={this.context.state.mobile}
                                                /> 
                                            :null    
                                        : null
                                        }
                                    </Fragment> */}
                            </div>
                            {!this.context.state.mobile ? 
                            <Nav context={this.context}/> :   
                            <PreviewBubbles 
                                file={this.context.state.enlarge}
                                relatedArtwork={this.context.state.relatedArtwork}
                                enlarge={this.context.loadEnlarge}
                                context={this.context}
                            >
                                <div 
                                    className="TagsMenu-hamburger"
                                    onClick={() => {this.context.showMenu()}}
                                >
                                    <span className="white-font">MENU</span>
                                </div>
                            </PreviewBubbles>
                            }


                            {/* <PreviewBubbles 
                                file={this.context.state.enlarge}
                                relatedArtwork={this.context.state.relatedArtwork}
                                enlarge={this.context.loadEnlarge}
                            /> */}






                            <Modal show={this.context.state.showModal} onHide={this.handleClose}>
                                <Modal.Body>
                                <Spinner animation="grow" variant="primary" />
                                <Spinner animation="grow" variant="primary" />
                                <Spinner animation="grow" variant="primary" />
                                </Modal.Body>
                            </Modal>
                        </div>
                    }}
                </Context.Consumer>

            </BrowserRouter>
        )
    }
}