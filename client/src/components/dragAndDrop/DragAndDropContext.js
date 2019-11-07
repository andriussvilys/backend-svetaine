import React, { Component } from 'react';
import { Context } from '../Provider';
import { DragDropContext } from 'react-beautiful-dnd';
import Button from 'react-bootstrap/Button'

import Column from './Column';
import "bootstrap/dist/css/bootstrap.min.css";
import '../../css/components/navigationInfo.css';
import '../../css/components/imageInfo.css';

export default class DragAndDropContext extends Component{

    static contextType = Context;

    constructor(props){
        super(props);
        this.state = null
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

            let newFileIds = Array.from(column.fileIds)


            newFileIds.splice(source.index - this.state.columnOrder.indexOf(column.id) * 4, 1)
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

            let newState ={...this.state, columns: {...this.state.columns}}

            const reorderFiles = () => {

            // if(finishColumn.fileIds.length === 4){
            //     return
            // }

            // const cascadeStartIndex = this.state.columnOrder.indexOf(finishColumn.id)
            const columnOrder = this.state.columnOrder

            let cascadeStartIndex = this.state.columnOrder.indexOf(finishColumn.id)
            let cascadeEndIndex = cascadeStartIndex + 1
            let dummyColumns = this.state.columns


            //check if element goes up or down
            //if destination is below 
            if(this.state.columnOrder.indexOf(startColumn.id) < this.state.columnOrder.indexOf(finishColumn.id) ||
                this.state.columnOrder.indexOf(startColumn.id) === this.state.columnOrder.length - 1  &&
                this.state.columnOrder.indexOf(finishColumn.id) === 0){

                for(var i = 0; i < columnOrder.length; i++  ){

                    //first duplicate the last element on source array
                    if(cascadeEndIndex > columnOrder.length - 1 ){
                        cascadeEndIndex = 0
                    }
                    if(cascadeStartIndex > columnOrder.length - 1 ){
                        cascadeStartIndex = 0
                    }


                    let cascadeStartArray = dummyColumns[columnOrder[cascadeStartIndex]].fileIds
                    let cascadeFinishArray = dummyColumns[columnOrder[cascadeEndIndex]].fileIds
                    
                    //put the last element of finish column to first position in start column
                    cascadeFinishArray.unshift(cascadeStartArray[cascadeStartArray.length -1])
                    const startStateTarget = columnOrder[cascadeStartIndex]
                    cascadeStartIndex += 1;

                    //THEN POP THE LAST ELEMENT FROM THE SOURCE ARRAY

                    cascadeStartArray.pop()
                    const finishStateTarget = columnOrder[cascadeEndIndex]
                    cascadeEndIndex += 1;

                    newState.columns[startStateTarget].fileIds = cascadeStartArray
                    newState.columns[finishStateTarget].fileIds = cascadeFinishArray
                    }
                    
                }
            else{

                let sourceArray = this.state.columns[source.droppableId].fileIds
                let finishArray = this.state.columns[destination.droppableId].fileIds

                finishArray.splice(destination.index, 0, draggableId)
                sourceArray.splice(source.index - this.state.columnOrder.indexOf(source.droppableId) * 4, 1) 
                sourceArray.unshift(finishArray[finishArray.length - 1])
                finishArray.pop()

                newState.columns[source.droppableId].fileIds = sourceArray
                newState.columns[destination.droppableId].fileIds = finishArray
            }
                this.setState(newState)
            }


            this.setState(newState, reorderFiles())
            return
        }

    fetchFiles = (data) => {
        // const newState = this.props.data
        this.setState(data)
    }


    render(){
        return(
            <div className="dnd-container imageInfo--box" 
            style={{display: "block"}}
            >
                <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between"}}>
                    <span style={{whiteSpace: "nowrap"}}>{this.props.title}</span>
                    <Button
                    style={{marginBottom: "5px", whiteSpace: "nowrap"}}
                    size="sm"
                    onClick={
                        () => this.fetchFiles(this.props.data)
                    }
                    >
                        Fetch files
                    </Button>
                </div>
                <div>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        {this.state ? this.state.columnOrder.map(columnId => {
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
                        }) : null}
                    </DragDropContext>
                </div>
            </div>
        )
    }
}