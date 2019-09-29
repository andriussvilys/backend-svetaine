import React, { Component } from 'react';
import { Context } from '../Provider';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';
import "bootstrap/dist/css/bootstrap.min.css";
import '../../css/components/navigationInfo.css';
import '../../css/components/imageInfo.css';

export default class NavigationInfo extends Component{

    static contextType = Context;

    constructor(props){
        super(props);
        this.state = this.props.state
    }

    onDragEnd = (result) => {
        const {destination, source, draggableId} = result;
        if(!destination){
            return
        }
        if(destination.droppanleId === source.droppanleId &&
            destination.index === source.index){
                return
            }
        const column = this.state.columns[source.droppableId];
        const newFileIds = Array.from(column.fileIds)
        newFileIds.splice(source.index, 1)
        newFileIds.splice(destination.index, 0, draggableId)

        const newColumn = {
            ...column,
            fileIds: newFileIds
        }

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newColumn.id]: newColumn
            }
        }

        this.setState(newState)
    }

    render(){
        return(
            <DragDropContext onDragEnd={this.onDragEnd}>
                {this.state.columnOrder.map(columnId => {
                    const column = this.state.columns[columnId];
                    const files = column.fileIds.map(fileId => {
                        return this.state.files[fileId]
                    })
                    return <Column 
                    key={column.id}
                    column={column}
                    files={files}
                    ></Column>
                })}
            </DragDropContext>
        )
    }
}