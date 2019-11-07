import React from 'react';
import Button from 'react-bootstrap/Button';
import { DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import "../css/components/imageInfo.css";

export default class ImagesPreview extends React.Component{
    constructor(props){
        super(props)
        this.state = {fileArray: this.props.data}
    }

    createPreviews = () => {
        if(this.props.data){
            let images = Object.keys(this.props.data).map(objName => {
                const currentFile = this.props.data[objName]
                return(
                    <div className="ImagesPreview--container">
                        <div>

                            <div className="ImagesPreview--imageContainer">
                                <img className="ImagesPreview--image" alt={currentFile.fileName} src={currentFile.preview} />
                                <input
                                type="text" 
                                className="ImagesPreview--fileName"
                                placeholder={currentFile.fileName}
                                >
                                </input>
                            </div>

                            <div className="ImagesPreview--indexContainer">
                                <span>Index:</span>
                                <div className="ImagesPreview--index"></div>
                            </div>
                        </div>
                        <Button
                        className="ImagesPreview--button"
                        size="sm"
                        >
                            EDIT
                        </Button>
                    </div>
                )
            }
            )
            return images
        }
    }

    render(){
        return(
            <div className="imageInfo--box ImagesPreview--cotnainer_main">
                <span style={{alignSelf: "start"}}>Image prviews :</span>
                {this.props.data ? this.createPreviews() : null}
            </div>
        )
    }
}