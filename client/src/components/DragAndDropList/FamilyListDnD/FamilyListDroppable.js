import React from 'react';
import { Context } from '../../Provider';
import { Droppable } from 'react-beautiful-dnd';
import FamilyListDraggable from './FamilyListDraggable';
import '../css/ImagesPreview.css';

export default class DndListDroppable extends React.Component{
    static contextType = Context;

    // createDraggables = () => {
    //     console.log('CREATE FAMILY DRAGGABLES PROPS')
    //     console.log(this.props)
    //     this.props.files.map((file, index) => {
    //         console.log('DROPPABLE PROPS')
    //         return (
    //             <FamilyListDraggable 
    //             key={`${file.fileName}-in-${this.props.column.id}`} 
    //             file={file} 
    //             columnId={this.props.column.id}
    //             index={index}
    //             >
    //             </FamilyListDraggable>
    //             )
    //         })
    //         }

    render(){
        return(
            <Context.Consumer>
                {() => {
                    return(
                        <Droppable 
                        droppableId={`${this.props.column.id}-familyList`}
                        >
                        {provided =>{
                                        return(
                                            <div 
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className="DnDfilesList"
                                            // style={{display: "flex", flexWrap: "wrap"}}
                                            >
                                                {this.props.column.fileIds.map((fileId, index) => {
                                                    console.log('craete dragables')
                                                    console.log(this.props)
                                                    console.log(fileId)
                                                    return (

                                                    <FamilyListDraggable
                                                        key={`${fileId}-in-${this.props.column.id}-${index}-familyList`} 
                                                        file={this.props.files[index]} 
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