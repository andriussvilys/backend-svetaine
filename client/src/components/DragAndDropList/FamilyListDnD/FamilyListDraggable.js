import React from 'react';
import { Context } from '../../Provider';
import { Draggable } from 'react-beautiful-dnd';

import FilePreview from '../../FilePreview'

import '../css/ImagesPreview.css';

export default class DnDListDraggable extends React.Component{
    static contextType = Context;

    constructor(props){
        super(props)
        this.state = {
            tomato: "yes"
        }
    }

    // componentDidMount(){
    //     this.context.fileDataMethods.transferState(this.props.file.fileName)
    // }

    // componentDidMount(){
    //     console.log('FAMILY LIST DRAGGABLE PROPS')
    //     console.log(this.props)
    //     this.context.fileDataMethods.initialIndex()
    // }

    render(){
        return(
            <Context.Consumer>
                {() => {
                    if(!this.props){
                        return
                    }
                    else
                    console.log('DRAGGABLE PROPS')
                    console.log(this.props)
                    return(
                        <Draggable
                        draggableId={this.props.file.fileName} 
                        index={this.props.index}
                        >
                        {(provided)=>{
                            // console.log('DRAGGABLE PROPS')
                            // console.log(this.props)
                            // if(this.context.state)
                            return(
                                <div className="ImagesPreview--container"
                                    {...provided.draggableProps}
                                    ref={provided.innerRef}
                                >       
                                        
                                        <div className="image-index-box">
                                            <FilePreview 
                                                file={this.props.file}
                                            />
     
                                            <div className="ImagesPreview--indexContainer">
                                                <span>family display index:</span>
                                                <div className="ImagesPreview--index">{ this.props.relatedArtwork.column.fileIds.indexOf(this.props.file.fileName) }</div>
                                            </div> 
                                        </div>
                                        
                                            
                                        <div className="button-container">
                                                <div className="ImagesPreview--dragHandle custom-button"
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
                                        </div>
        
                               
                                </div>
                            )
                        }}
                    </Draggable>
                    )
                }
                }
            </Context.Consumer>
        )
    }
}
