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
        

        const startColumn = this.state.columns[source.droppableId]
        const finishColumn = this.state.columns[destination.droppableId]

        if (startColumn === finishColumn){
            const column = this.state.columns[source.droppableId];
            const newFileIds = Array.from(column.fileIds)
            newFileIds.splice(source.index, 1)
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
            return;
        }

        const startFileIds = Array.from(startColumn.fileIds);
        startFileIds.splice(source.index, 1);

        const newStart = {
            ...startColumn,
            fileIds: startFileIds
        };

        const finishFileIds = Array.from(finishColumn.fileIds);
        finishFileIds.splice(destination.index, 0, draggableId);

        const newFinish = {
            ...finishColumn,
            fileIds: finishFileIds,
        };

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            }
        }

        this.setState(newState)
        return



    }

    render(){
        return(
            <div className="dnd-container imageInfo--box" style={{display: "block"}}>
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
            </div>
        )
    }
}