import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Button from 'react-bootstrap/Button';

import ArtowrkInfo from '../ArtworkInfo'
import JsonPreview from '../JsonPreview'
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
                            ref={provided.innerRef}
                        >
                            <ArtowrkInfo syle={{width: "75%"}} />
                            <JsonPreview />


                            <div >
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
                            
                                <div>
                                <div className="ImagesPreview--dragHandle"
                                id={`draghandle--${this.props.index}`}
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

                                <Button
                                className="ImagesPreview--button"
                                size="sm"
                                >
                                    EDIT
                                </Button>
                            </div>                                 
                            
                            </div> 
                            
                       
                        </div>
                    )
                }}
            </Draggable>
        )
    }
}
