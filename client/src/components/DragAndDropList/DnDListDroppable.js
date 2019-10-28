import React from 'react';
import { Context } from '../Provider';
import { Droppable } from 'react-beautiful-dnd';
import DndListDraggable from './DnDListDraggable';
import './css/ImagesPreview.css';

export default class DndListDroppable extends React.Component{
    static contextType = Context;

    createDraggables = () => {

        this.props.files.map((file, index) => {
            return (
                <DndListDraggable 
                key={`${file.fileName} in ${this.props.column.id}`} 
                file={file} 
                columnId={this.props.column.id}
                index={index}
                >
                </DndListDraggable>
                )
            })
            }

    render(){
        return(
            <Context.Consumer>
                {() => {
                    return(
                        <Droppable 
                        droppableId={this.props.column.id}
                        >
                        {provided =>{
                                        return(
                                            <div 
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className="DnDfilesList"
                                            // style={{display: "flex", flexWrap: "wrap"}}
                                            >
                                                {this.props.column.fileIds.map((fileId, index) => {
                                                    console.log('this props files -----------------------')
                                                    console.log(this.props.files)
                                                    return (
                                                    <DndListDraggable
                                                        key={`${fileId} in ${this.props.column.id}`} 
                                                        file={this.context.state.fileData.files[fileId]}
                                                        // file={this.props.files[fileId]} 
                                                        columnId={this.props.column.id}
                                                        index={index}
                                                        >
                                                    </DndListDraggable>
                                                    )
                                                })}
                                                {provided.placeholder}
                                            </div>
                                        )
                                    }}
                        </Droppable>
                    )
                }
                }
            </Context.Consumer>
            
        )
    }
}