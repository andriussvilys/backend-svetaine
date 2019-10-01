import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import DndListDraggable from './DnDListDraggable'

export default class DndListDroppable extends React.Component{

    render(){
        return(
            <Droppable 
               droppableId={this.props.column.id}
            >
                {(provided) => {
                    return(
                        <div 
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="filesList"
                        // style={{display: "flex", flexWrap: "wrap"}}
                        >
                            {this.props.files.map((file, fileIndex) => {
                                return (
                                    <DndListDraggable 
                                    key={`${file.id} in ${this.props.column.id}`} 
                                    file={file} 
                                    columnId={this.props.column.id}
                                    // index={this.props.column.fileIds.indexOf(file.id)}
                                    index={fileIndex + this.props.columnIndex * 4}
                                    indexColor={this.props.column.indexColor}
                                    // index={fileIndex}
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