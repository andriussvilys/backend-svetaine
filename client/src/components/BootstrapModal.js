import React, { Component } from 'react';
import { Context } from './Provider';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

// import "bootstrap/dist/css/bootstrap.min.css";
// import '../css/components/jsonPreview.css';
// import '../css/components/imageInfo.css'

export default class BootstrapModal extends Component {
    static contextType = Context;

    constructor(props){
        super(props);
        this.state = {
            show: props.showModal,
            setShow: false
        }
        this.handleClose = () => this.setState({setShow: false, show: false});
        this.handleShow = () => this.setState({setShow: true, show: true});
    }

    static getDerivedStateFromProps(props, state){
        if(props.showModal){
            return{show: true}
        }
        else{
            return null
        }
        // return null;
    }

    render(){
        // if(!this.props.showModal){
        //     this.setState({show: false})
        // }
        return(
            <>
            {/* <Button variant="primary" onClick={this.handleShow}>
                Launch demo modal
            </Button> */}
        
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{this.props.header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.props.message}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={this.handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
            </>
        )

    }
}