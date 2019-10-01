import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default class DnDListDraggable extends React.Component{

    render(){
        return(
            <Draggable
                draggableId={this.props.file.id} 
                index={this.props.index}
            >
                {(provided)=>{
                    return(
                        <div className="ImagesPreview--container"
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >
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
                }}
            </Draggable>
        )
    }
}
