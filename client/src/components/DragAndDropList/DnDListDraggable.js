import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Button from 'react-bootstrap/Button';
import './css/ImagesPreview.css';

export default class DnDListDraggable extends React.Component{

    render(){
        return(
            <Draggable
                draggableId={this.props.file.fileName} 
                index={this.props.index}
            >
                {(provided)=>{
                    // console.log('DRAGGABLE PROPS')
                    // console.log(this.props)
                    return(
                        <div className="ImagesPreview--container"
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >
                            <div>

                                <div className="ImagesPreview--imageContainer">
                                    <img className="ImagesPreview--image" alt={this.props.file.fileName} src={this.props.file.preview} />
                                    <input
                                    type="text" 
                                    className="ImagesPreview--fileName"
                                    placeholder={this.props.file.fileName}
                                    >
                                    </input>
                                </div>

                                <div className="ImagesPreview--indexContainer">
                                    <span>index:</span>
                                    <div className="ImagesPreview--index">{this.props.index}</div>
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
                }}
            </Draggable>
        )
    }
}
