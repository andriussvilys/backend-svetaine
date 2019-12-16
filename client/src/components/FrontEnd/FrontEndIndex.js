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

Array.from(document.getElementsByTagName("h4")).forEach(item => {
    item.style.whiteSpace = "normal"
})
export default class FrontEndIndex extends React.Component{
    static contextType = Context;
    constructor(props){
        super(props)
        this.state = {
        }
    }

    adminButtons = (props) => {
        return(
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <Button
                            onClick={
                                () => {
                                    if(auth.isAuthenticated()){
                                        console.log('logged in')
                                        this.props.props.history.push('/admin/create')
                                    }
                                    else{
                                        console.log('needs logged in')
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
                                <Themes
                                    state={this.context.state}
                                    context={this.context}
                                />
                                <About 
                                    loadEnlarge={this.context.loadEnlarge}
                                    collapseId="about-image"
                                />
                                <Contact />
                            </TagsMenu>

                            <div id="images" className="images-container">
                                <ImageSelect 
                                    data={this.context.state.artworkInfoData} 
                                    // data={this.context.state.visibleArtwork}
                                    methods={{
                                        enlarge: this.context.enlarge,
                                        loadEnlarge: this.context.loadEnlarge,
                                        toggleMobile: this.context.toggleMobile
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

                            <Nav
                                context={this.context}
                            />





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