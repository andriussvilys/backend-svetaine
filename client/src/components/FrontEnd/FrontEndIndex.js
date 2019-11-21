import React from 'react'
import Button from 'react-bootstrap/Button'
import { Context } from './FrontEndProvider';
import { BrowserRouter,  Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'
// import {Context} from '../Provider'

import auth from '../Auth'
import TagsMenu from './components/TagsMenu'
import Accordion from '../Accordion'
import ImageSelect from './components/ImageSelect/ImageSelect'
import Enlarge from './components/Enlarge/Enlarge'
import FilePreview from '../FilePreview';

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
    
                <Accordion
                    title="ADMIN"
                >
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
                        <Button
                            onClick={() => {
                                auth.logout( () => {
                                    console.log(auth.authenticated)
                                    this.props.props.history.push('/')
                                })
                            }}
                        >
                            Log Out
                        </Button>
                        <Button
                            onClick={() => {
                                auth.login( () => {
                                })
                            }}
                        >
                            Log IN
                        </Button>
                    </div>
                </Accordion>
        )
    }  

    render(){
        return(
            <BrowserRouter>
                <Context.Consumer>
                    {() => {
                        return <div className="frontEndIndex-container">
                            <TagsMenu context={this.context}>
                                {this.props ? this.adminButtons(this.props) : null}
                            </TagsMenu>
                            <ImageSelect 
                                data={this.context.state.artworkInfoData} 
                                methods={{
                                    enlarge: this.context.enlarge
                                }}
                            />
                                                        <div
                                className="Navbar"
                                style={{
                                    width: "4vw",
                                    height: "100vh",
                                    position: "absolute",
                                    top: 0,
                                    right: 0
                                }}
                            >
                                <button
                                    style={{
                                        position: "absolute",
                                        top: "8vw",
                                        left: '0',
                                        width: "4vw",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => this.context.viewNext()}
                                    className={this.context.state.enlarge? null : "display-no"}
                                >
                                    <img alt="view next" src="/icons/point-right.png" />
                                </button>
                                <button
                                    style={{
                                        position: "absolute",
                                        top: "12vw",
                                        left: '0',
                                        width: "4vw",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => this.context.viewPrev()}
                                    className={this.context.state.enlarge? null : "display-no"}
                                >
                                    <img alt="view previous" src="/icons/point-left.png"/>
                                </button>

                                {/* <button
                                    style={{
                                        position: "absolute",
                                        top: "16vw",
                                        left: '0',
                                        width: "4vw",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => this.context.viewPrev()}
                                    className={this.context.state.enlarge? null : "display-no"}
                                >
                                    <img alt="view previous" src="/icons/up.png"/>
                                </button>
                                <button
                                    style={{
                                        position: "absolute",
                                        top: "20vw",
                                        left: '0',
                                        width: "4vw",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => this.context.viewPrev()}
                                    className={this.context.state.enlarge? null : "display-no"}
                                >
                                    <img alt="view previous" src="/icons/down.png"/>
                                </button> */}
                                    <div 
                                    style={{
                                        position: "absolute",
                                        top: "16vw",
                                        left: '0',
                                        width: "4vw",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => this.context.showInfo()}
                                >
                                    <h1>i</h1>
                                </div>
                            </div>
                            <Enlarge 
                                nextEnlarge={this.context.state.nextEnlarge}
                                file={this.context.state.enlarge}
                                closeEnlarge={this.context.closeEnlarge}
                                onClick={this.context.closeEnlarge}
                                artworkInfoData={this.context.state.artworkInfoData}
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