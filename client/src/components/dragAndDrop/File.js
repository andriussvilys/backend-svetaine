import React from 'react';
import {Draggable} from "react-beautiful-dnd"

export default class File extends React.Component{
    render(){
        return (
            <Draggable 
            draggableId={this.props.file.id} 
            index={this.props.index}
            >
                {(provided)=>{
                    return(
                        <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            innerRef={provided.innerRef}
                        >
                            <img 
                            style={{
                                height: "150px",
                                width: "150px",
                                objectFit: "contain",
                                border: "1px solid black"
                            }}
                            src={`uploads/${this.props.file.content}`}
                            alt={this.props.file.content}
                            />
                            <p>{this.props.index}</p>
                        </div>
                    )
                }}
            </Draggable>
        )
    }
} 