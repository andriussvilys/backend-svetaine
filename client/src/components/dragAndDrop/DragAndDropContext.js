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

        if(destination.droppableId === source.droppableId &&
            destination.index === source.index){
                return
            }
        

        const startColumn = this.state.columns[source.droppableId]
        const finishColumn = this.state.columns[destination.droppableId]

        if (startColumn === finishColumn){
            const column = this.state.columns[source.droppableId];
            console.log('COLUMN')
            console.log(column.id)
            console.log(this.state.columnOrder)
            console.log(this.state.columnOrder.indexOf(column.id))
            let newFileIds = Array.from(column.fileIds)
            console.log("source")
            console.log(source)
            console.log("destination")
            console.log(destination)

            console.log("source INDEX")
            console.log(source.index)
            newFileIds.splice(source.index - this.state.columnOrder.indexOf(column.id) * 4, 1)

            console.log(newFileIds)
            console.log('calculated Index')
            console.log(destination.index)
            newFileIds.splice(destination.index, 0, draggableId)
            console.log(newFileIds)
    
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


        let startFileIds = Array.from(startColumn.fileIds);
        let finishFileIds = Array.from(finishColumn.fileIds);

        // const removeFromFinish = () => {
        //     //if draggable moved to last position in the destination column
        //     if(destination.index > finishColumn.fileIds.length-1){
        //         //pop the first elemenet and return it at the end of source column
        //         finishFileIds.shift()
        //         startFileIds.push(finishColumn.fileIds[0])
        //         return
        //     }
        //     else{
        //         finishFileIds.pop()
        //         startFileIds.unshift(finishColumn.fileIds[finishColumn.fileIds.length - 1])
        //     }
        // }

        // removeFromFinish()

        const rewriteFileIdsArray = () => {
            startFileIds.splice(source.index - this.state.columnOrder.indexOf(startColumn.id) * 4, 1);
            finishFileIds.splice(destination.index, 0, draggableId);


            console.log("source")
            console.log(source)
            console.log("destination")
            console.log(destination)


            // //if destination index is before last
            // if(destination.index < finishFileIds.length -1){
            //     finishFileIds.splice(destination.index, 0, draggableId);
            //     startFileIds.splice(source.index - this.state.columnOrder.indexOf(startColumn.id) * 4, 1);
            //     startFileIds.unshift(finishFileIds[finishFileIds.length-1])
            //     finishFileIds.pop()
            //     return
            // }
            // //if destination is the last index
            // else{
            //     finishFileIds.shift()
            //     startFileIds.push(finishFileIds[0])
            //     finishFileIds.push(draggableId)
            //     startFileIds.splice(source.index - this.state.columnOrder.indexOf(startColumn.id) * 4, 1);
            //     console.log(this.state)
            // }
        }

        rewriteFileIdsArray()

        const newStart = {
            ...startColumn,
            fileIds: startFileIds
        };

        // finishFileIds.splice(destination.index, 0, draggableId);

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
                        columnIndex={this.state.columnOrder.indexOf(column.id)}
                        ></Column>
                    })}
                </DragDropContext>
            </div>
        )
    }
}