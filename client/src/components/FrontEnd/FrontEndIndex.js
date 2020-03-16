import React from 'react'
import { Context } from './FrontEndProvider';
import { BrowserRouter } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'

import TagsMenu from './components/TagsMenu'
import ImageSelect from './components/ImageSelect/ImageSelect'
import Enlarge from './components/Enlarge/Enlarge'
import Nav from './components/Nav/Nav'
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

    // adminButtons = (props) => {
    //     return(
    //                 <div style={{display:"flex", flexDirection:"column"}}>
    //                     <Button
    //                         onClick={
    //                             () => {
    //                                 if(auth.isAuthenticated()){
    //                                     this.props.props.history.push('/admin/create')
    //                                 }
    //                                 else{
    //                                     this.props.props.history.push('/admin/login')
    //                                 }
    //                             }
    //                         }
    //                     >
    //                         Admin
    //                     </Button>
    //                 </div>
    //     )
    // }  
    
    render(){
        return(
            <BrowserRouter>
                <Context.Consumer>
                    {() => {
                        return <div 
                                    className="frontEndIndex-container" 
                                >
                            <TagsMenu context={this.context}>
                            </TagsMenu>

                            <div 
                            id="images" 
                            // className="images-container"
                            className={this.context.state.mobile ? "images-container"  : "images-container images-grid" }
                            >
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
                                    mobile={this.context.state.mobile}
                                />
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