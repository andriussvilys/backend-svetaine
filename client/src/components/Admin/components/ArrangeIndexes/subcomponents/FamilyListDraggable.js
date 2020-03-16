import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import FilePreview from '../../FilePreview'

const DnDListDraggable = (props) => {
    if(!props.file){
        return null
    }
    return(
        <Draggable
        draggableId={props.file.fileName} 
        index={props.index}
        >
        {(provided)=>{
            return(
                <div className="ImagesPreview--container"
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >       
                        
                        <div className="image-index-box">
                            <FilePreview 
                                file={props.file}
                            />

                            <div className="ImagesPreview--indexContainer">
                                <span>family display index:</span>
                                <div className="ImagesPreview--index">{ props.relatedArtwork.column.fileIds.indexOf(props.file.fileName) }</div>
                            </div> 
                        </div>
                        
                            
                        <div className="button-container">
                                <div className="ImagesPreview--dragHandle custom-button"
                                id={`draghandle--${props.index}`}
                                {...provided.dragHandleProps}
                                onMouseDown={(e)=>{
                                    const dragHandle = e.target
                                    if(!e.target.classList.contains('mouseDown')){
                                        e.target.classList.add('mouseDown')
                                    }
                                    provided.dragHandleProps.onMouseDown(e)

                                    document.addEventListener('mouseup', () => {dragHandle.classList.remove('mouseDown')})
                                    }
                                }
                                >
                                    DRAG
                                </div>   
                        </div>

                
                </div>
            )
        }}
    </Draggable>
    )
}

export default DnDListDraggable