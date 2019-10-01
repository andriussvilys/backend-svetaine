import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DndListDroppable from './DnDListDroppable'

export default class DndListContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = null
    }

    onDragEnd = () => {
        const column = this.state.columns[source.droppableId];

            let newFileIds = Array.from(column.fileIds)


            newFileIds.splice(source.index - this.state.columnOrder.indexOf(column.id), 1)
            newFileIds.splice(destination.index, 0, draggableId)
    
            const newColumn = {
                ...column,
                fileIds: newFileIds
            }
    
            const newState = {
                ...this.state.columns,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn
                }
            }
    
            this.setState(newState)
    }

    render(){
        return(
            <DragDropContext
             onDragEnd={this.onDragEnd}
            >
                {this.state ? this.state.columnOrder.map(columnId => {
                    const column = this.state.columns[columnId];
                    const files = column.fileIds.map(fileId => {
                        return this.state.files[fileId]
                    })
                    return <DndListDroppable 
                    key={column.id}
                    column={column}
                    files={files}
                    columnIndex={this.state.columnOrder.indexOf(column.id)}
                    >
                    </DndListDroppable>
                }) : null}
            </DragDropContext>
        )
    }
}