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

            let newFileIds = Array.from(column.fileIds)


            newFileIds.splice(source.index - this.state.columnOrder.indexOf(column.id) * 4, 1)


    
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


        // let startFileIds = Array.from(startColumn.fileIds);
        // let finishFileIds = Array.from(finishColumn.fileIds);

        // const rewriteFileIdsArray = () => {
        //     startFileIds.splice(source.index - this.state.columnOrder.indexOf(startColumn.id) * 4, 1);
        //     finishFileIds.splice(destination.index, 0, draggableId);

        //     console.log("source")
        //     console.log(source)
        //     console.log("destination")
        //     console.log(destination)

        // }

        // rewriteFileIdsArray()

        // const newStart = {
        //     ...startColumn,
        //     fileIds: startFileIds
        // };

        // // finishFileIds.splice(destination.index, 0, draggableId);

        // const newFinish = {
        //     ...finishColumn,
        //     fileIds: finishFileIds,
        // };

        // const newState = {
        //     ...this.state,
        //     columns: {
        //         ...this.state.columns,
        //         [newStart.id]: newStart,
        //         [newFinish.id]: newFinish,
        //     }
        // }

            
            let newState ={...this.state, columns: {...this.state.columns}}

            const reorderFiles = () => {

            // if(finishColumn.fileIds.length === 4){
            //     return
            // }

            // const cascadeStartIndex = this.state.columnOrder.indexOf(finishColumn.id)
            const columnOrder = this.state.columnOrder

            let cascadeStartIndex = this.state.columnOrder.indexOf(finishColumn.id)
            let cascadeEndIndex = cascadeStartIndex + 1

            // console.log(this.state.columns[finishColumnId].fileIds)

            let dummyColumns = this.state.columns
            console.log('DUMMY COLUMNS')
            console.log(dummyColumns)


            //check if element goes up or down
            //if destination is below 
            if(this.state.columnOrder.indexOf(startColumn.id) < this.state.columnOrder.indexOf(finishColumn.id)){

                for(var i = 0; i < columnOrder.length; i++  ){
                    console.log(`start counter is ${cascadeStartIndex}`)
                    console.log(`finish counter is ${cascadeEndIndex}`)
                    console.log(`columnorder[currentCounter]`)
                    console.log(columnOrder[cascadeStartIndex])

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
                    console.log(`FINISH ARRAY B4 MUTATION ${cascadeFinishArray}`)
                    cascadeFinishArray.unshift(cascadeStartArray[cascadeStartArray.length -1])
                    console.log(`FINISH ARRAY after MUTATION ${cascadeFinishArray}`)
                    const startStateTarget = columnOrder[cascadeStartIndex]
                    console.log(`startStateTarget ${columnOrder[cascadeStartIndex]}`)
                    cascadeStartIndex += 1;

                    //THEN POP THE LAST ELEMENT FROM THE SOURCE ARRAY

                    console.log(`Start ARRAY before mutation ${cascadeStartArray}`)
                    cascadeStartArray.pop()
                    console.log(`Start ARRAY after mutation ${cascadeStartArray}`)
                    const finishStateTarget = columnOrder[cascadeEndIndex]
                    cascadeEndIndex += 1;

                    newState.columns[startStateTarget].fileIds = cascadeStartArray
                    newState.columns[finishStateTarget].fileIds = cascadeFinishArray
                    console.log(`END OF CYCLE ${i + 1}`)
                    }
                    
                }
            else{
                // let cascadeStartArray = dummyColumns[columnOrder[cascadeStartIndex]].fileIds
                // let cascadeFinishArray = dummyColumns[columnOrder[cascadeEndIndex]].fileIds

                // const startStateTarget = columnOrder[cascadeStartIndex]
                // const finishStateTarget = columnOrder[cascadeEndIndex]

                // console.log(`cascadeStart ${cascadeStartIndex}`)
                // console.log(`cascadeFinish ${cascadeEndIndex}`)

                // cascadeFinishArray.unshift(cascadeFinishArray[cascadeFinishArray.length -1])
                // // cascadeStartArray.unshift(cascadeStartArray[cascadeStartArray.length -1])

                // //THEN POP THE LAST ELEMENT FROM THE SOURCE ARRAY
                // cascadeFinishArray.pop()
                // cascadeFinishArray.splice(source.index, 1)

                // newState.columns[startStateTarget].fileIds = cascadeStartArray
                // newState.columns[finishStateTarget].fileIds = cascadeFinishArray

                // startColumn = this.state.columns[source.droppableId]
                // finishColumn = this.state.columns[destination.droppableId]

                let sourceArray = this.state.columns[source.droppableId].fileIds
                let finishArray = this.state.columns[destination.droppableId].fileIds

                sourceArray.unshift(finishArray[finishArray.length - 1])
                finishArray.pop()

                // let newStart = startColumn.fileIds
                // newStart.unshift(finishColumn.fileIds[finishColumn.fileIds.length - 1])
                // let newFinish = finishColumn.fileIds
                // newFinish.pop()
                newState.columns[source.droppableId].fileIds = sourceArray
                newState.columns[destination.droppableId].fileIds = finishArray
            }
                // this.setState({newState})
                console.log("new STATE")
                console.log(newState)
                this.setState(newState)
            }


            this.setState(newState, reorderFiles())
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