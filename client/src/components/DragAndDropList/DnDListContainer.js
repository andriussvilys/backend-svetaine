import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DnDListDroppable from './DnDListDroppable'
import Button from 'react-bootstrap/Button'
import './css/ImagesPreview.css'

export default class DnDListContainer extends React.Component{
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
        console.log(this.state)
        return(
            <div>
                <DnDListDroppable 
                key={this.state.column.id}
                column={this.state.column}
                files={this.state.files}
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

    componentDidUpdate(){
        this.setUpState()
    }

    render(){
        //if this component receives props, we set up the its state



        if(this.props.data){
            return(
                <div> 
                    {/* <Button
                        onClick={this.setUpState()}
                    >
                    </Button> */}

                    <DragDropContext onDragEnd={this.onDragEnd}>
                        {this.state ? this.createDroppable() : null}
                    </DragDropContext>  
                </div>
            )

        }
        else{
            return null
        }
    }
}