import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default class BootstrapModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            show: props.showModal,
            setShow: false
        }
        this.handleClose = () => this.setState({setShow: false, show: false}, console.log(this.state));
        this.handleShow = () => this.setState({setShow: true, show: true});
    }

    static getDerivedStateFromProps(props){
        if(props.showModal){
            return{show: true}
        }
        else{
            return {show:false}
        }
    }

    render(){
        console.log("BOOTSTRAP MODAL PROPS")
        console.log(this.props)
        return(
            <>
            <Modal show={this.state.show} onHide={this.handleClose}>

                <Modal.Body>
                {this.props.message}
                {this.props.children}
                </Modal.Body>

                <Modal.Footer>
                    {this.props.confirm ?
                    <Button 
                        variant="success"
                        onClick={() => {
                            this.props.confirmedAction()
                                .then(res => {
                                    console.log("CONFIRMED ACTION RES")
                                    console.log(res)
                                    let newState = {...this.state}
                                    newState.message = res.modalMessage
                                    newState.confirm = false
                                    console.log("newState")
                                    console.log(newState)
                                    this.setState(newState, () => {
                                        console.log("STATE UPDATED _______________")
                                        console.log(this.state)
                                    })
                                })
                                .catch(err => {
                                    console.log("CONFIRMED ACTION ERR")
                                    console.log(err)
                                    let newState = {...this.state}
                                    newState.message = err.modalMessage
                                    newState.confirm = false
                                    console.log("newState")
                                    console.log(newState)
                                    this.setState(newState)
                                })
                            }
                        }   
                        >
                            Confirm
                    </Button> :
                    null  
                    }
                    <Button variant={this.props.confirm ? "danger" : "success"} onClick={ () => {this.props.onClose()}}>
                        {this.props.confirm ? "Cancel" : "Okay"}
                    </Button>
                </Modal.Footer>

            </Modal>
            </>
        )

    }
}