import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import File from './File'
import './css/dragAndDrop.css';

export default class Column extends React.Component{
    render(){
        return(
            <div>
                <div className="dnd-container imageInfo--box" style={{display: "block"}}>
                <span className="dnd-title">Order Files:</span>
                    <Droppable droppableId={this.props.column.id}
                    direction="horizontal">
                        {provided =>{
                            return(
                                <div 
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="filesList"
                                // style={{display: "flex", flexWrap: "wrap"}}
                                >
                                    {this.props.files.map((file, fileIndex) => {
                                        console.log(this.props.column)
                                        return (<File 
                                            key={file.id} 
                                            file={file} 
                                            // index={this.props.column.fileIds.indexOf(file.id)}
                                            index={fileIndex}
                                            >
                                            </File>
                                        )
                                    })}
                                    {provided.placeholder}
                                </div>
                            )
                        }}
                    </Droppable>
                </div>
            </div>
        ) 
    }
} 