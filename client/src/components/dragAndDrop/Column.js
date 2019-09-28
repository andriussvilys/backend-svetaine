import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import File from './File'

export default class Column extends React.Component{
    render(){
        return(
            <div className="dnd-container">
                <h3 className="dnd-title">{this.props.column.title}</h3>
                <Droppable droppableId={this.props.column.id}>
                    {provided =>{
                        return(
                            <div 
                            innerRef={provided.innerRef}
                            {...provided.droppableProps}
                            className="dnd-filesList"
                            style={{display: "flex", flexWrap: "wrap"}}
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
        ) 
    }
} 