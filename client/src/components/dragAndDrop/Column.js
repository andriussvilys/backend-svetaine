import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import File from './File'
import './css/dragAndDrop.css';

export default class Column extends React.Component{
    render(){
        return(
            <div>
                <span className="dnd-title">
                {/* {this.props.column.title} */}
                </span>
                    <Droppable droppableId={this.props.column.id}
                    direction="horizontal">
                        {provided =>{
                            console.log('RENDERING COLUMNS');
                            console.log(this.props.files);
                            return(
                                <div 
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="filesList"
                                // style={{display: "flex", flexWrap: "wrap"}}
                                >
                                    {this.props.files.map((file, fileIndex) => {
                                        return (<File 
                                            key={`${file.id} in ${this.props.column.id}`} 
                                            file={file} 
                                            columnId={this.props.column.id}
                                            // index={this.props.column.fileIds.indexOf(file.id)}
                                            index={fileIndex + this.props.columnIndex * 4}
                                            indexColor={this.props.column.indexColor}
                                            // index={fileIndex}
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
        ) 
    }
} 