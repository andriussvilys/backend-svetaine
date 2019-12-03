import React from 'react';
import { Context } from '../../Provider';
import { Droppable } from 'react-beautiful-dnd';
import FamilyListDraggable from './FamilyListDraggable';
import '../css/ImagesPreview.css';

export default class DndListDroppable extends React.Component{
    static contextType = Context;

    createFileIds = () => {

    }

    render(){
        console.log("PROPS IN DROPPABLE")
        console.log(this.props)
        return(
            <Context.Consumer>
                {() => {
                    return(
                        <Droppable 
                        droppableId={`${this.props.artworkFamily}-relatedArtworks`}
                        >
                        {provided =>{
                            let orderData = this.props.column.fileIds 
                            console.log('ordered array in DnD list')
                            console.log(orderData)
                            // ? this.props.column.fileIds : Object.keys(this.props.files)
                                        return(
                                            <div 
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className="DnDfilesList"
                                            >
                                                {orderData.map((fileId, index) => {
                                                    return (

                                                    <FamilyListDraggable
                                                        key={`${fileId}-in-${this.props.column.id}-${index}-familyList`} 
                                                        file={this.props.files[fileId]} 
                                                        columnId={this.props.column.id}
                                                        index={index}
                                                        relatedArtwork={this.props}
                                                        >
                                                    </FamilyListDraggable>
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
            </Context.Consumer>
            
        )
    }
}