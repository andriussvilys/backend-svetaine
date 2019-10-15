import React from 'react';
import { Context } from '../Provider';
import { DragDropContext } from 'react-beautiful-dnd';
import DnDListDroppable from './DnDListDroppable'
import './css/ImagesPreview.css'

export default class DnDListContainer extends React.Component{
    static contextType = Context;

    constructor(props){
        super(props)
        this.state = null
    }

    // onDragEnd = (result) => {

    //     const {destination, source, draggableId} = result;

    //     if(!destination){
    //         return
    //     }
        
    //     const column = this.state.column[source.droppableId];
    //     // const column = this.state.column[source.droppableId];

    //         let newFileIds = this.state.column.fileIds

    //         newFileIds.splice(source.index, 1)
    //         newFileIds.splice(destination.index, 0, draggableId)
    
    //         const newColumn = {
    //             ...column,
    //             fileIds: newFileIds
    //         }
    
    //         const newState = {
    //             ...this.state.column,
    //             columns: {
    //                 ...this.state.column,
    //                 [newColumn.id]: newColumn
    //             }
    //         }
    
    //         this.setState(newState)
    // }
    createDroppable = () => {
        return(
            <div>
                <DnDListDroppable 
                key={this.props.data.column.id}
                column={this.props.data.column}
                files={this.props.data.files}
                columnIndex={0}
                >
                </DnDListDroppable>
            </div>
        )
    }

    // setUpState = (callback) => {
    //     if(!this.state){
    //         this.setState(this.props.data, 
    //                 () => {if(callback){callback()}}
    //         )
    //         return
    //     }
    //     else{
    //         return
    //     }

    // }

    render(){
        //if this component receives props, we set up the its state
        return(
            <Context.Consumer>
                {() => {
                        if(this.props.data){
                            return(
                                <div> 
                                    <DragDropContext 
                                        onDragEnd={this.context.onDragEnd}>
                                        {this.props.data ? this.createDroppable() : null}
                                    </DragDropContext>  
                                </div>
                            )
                
                        }
                        else{
                            return null
                        }
                }

                }
            </Context.Consumer>
        )
    }
}