import React from 'react';
import { Context } from './Provider';
// import axios from 'axios';
// import BootstrapModal from './BootstrapModal';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import '../css/components/extendedList.css';
import '../css/components/imageInfo.css';
// import openIconic from 'open-iconic';

class AddNew extends React.Component{

static contextType = Context;

constructor(props){
    super(props);
    this.state = {
        setShow: false,
        show: false
    }
    // this.openModal = () => {
    //     this.setState({modalShow: !this.state.modalShow})
    // }
    this.handleClose = () => this.setState({setShow: false, show: false});
    this.handleShow = (e) => {
        e.preventDefault()
        this.setState({setShow: true, show: true})
    };
}

render(){
    return(
        <Context.Consumer>
        {()=>{
            return(
                <div className="imageInfo--box">
                    <span className="subtitle">
                        Add new {this.props.stateKey}
                    </span>
                    <form 
                    id={`formFor-${this.props.stateKey}`}
                    action={this.props.router}
                    // onSubmit={ (e) => {
                    //     this.context.addNew(
                    //         e,
                    //         e.target.firstChild.id,
                    //         e.target.action,
                    //         this.props.requestKey,
                    //         this.props.stateKey,
                    //         this.handleShow
                    //     )
                    // }
                    // }
                    onSubmit={this.handleShow}
                    >
                        <input 
                            type="text" 
                            id={`add-${this.props.stateKey}-item`} 
                        />
                        <button 
                        type="submit" 
                        form={`formFor-${this.props.stateKey}`}
                        value="SEND"
                        className="button-extend"
                        > 
                        </button>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button
                        variant="primary" 
                        onClick={ (e) => {
                            this.context.addNew(
                                e,
                                `add-${this.props.stateKey}-item`,
                                // e.target.firstChild.id,
                                this.props.router,
                                this.props.requestKey,
                                this.props.stateKey
                                // this.handleShow
                            )
                        }
                        }
                        >
                            Save Changes
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    </form>
                </div>
            )
            }
        }
        </Context.Consumer>
    )
    }
}

export default AddNew;