import React from 'react';
import { Context } from '../Provider';
import { DragDropContext } from 'react-beautiful-dnd';
import DnDListDroppable from './DnDListDroppable'
import Button from 'react-bootstrap/Button'
import './css/ImagesPreview.css'

export default class DnDListContainer extends React.Component{
    static contextType = Context;

    constructor(props){
        super(props)
        this.state = null
    }

    onDragEnd = (result) => {

        const {destination, source, draggableId} = result;

        if(!destination){
            return
        }
        
        const column = this.state.column[source.droppableId];
        // const column = this.state.column[source.droppableId];

            let newFileIds = this.state.column.fileIds

            newFileIds.splice(source.index, 1)
            newFileIds.splice(destination.index, 0, draggableId)
    
            const newColumn = {
                ...column,
                fileIds: newFileIds
            }
    
            const newState = {
                ...this.state.column,
                columns: {
                    ...this.state.column,
                    [newColumn.id]: newColumn
                }
            }
    
            this.setState(newState)
    }
    createDroppable = () => {
        console.log('HELLOW')
        console.log(this.props)
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

    setUpState = (callback) => {
        if(!this.state){
            console.log('no state atm, lets set up')
            this.setState(this.props.data, 
                    // console.log('DND CONTAINER STATE')
                    // console.log(this.state)

                    () => {if(callback){callback()}}
            )
            return
        }
        else{
            console.log('state exists')
        }

    }

    // componentDidUpdate(){
    //     this.setUpState()
    // }

    render(){
        //if this component receives props, we set up the its state

        return(
            <Context.Consumer>
                {() => {
                        if(this.props.data){
                            console.log('CONTEXT STATE')
                            console.log(this.context.state)
                            return(
                                <div> 
                                    {/* <Button
                                        onClick={this.setUpState()}
                                    >
                                    </Button> */}
                
                                    <DragDropContext onDragEnd={this.context.onDragEnd}>
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