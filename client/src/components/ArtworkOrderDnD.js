import React, { Component } from 'react';
import { Context } from './Provider';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { DragDropContext } from 'react-beautiful-dnd'
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/components/navigationInfo.css';
import '../css/components/imageInfo.css';

export default class ArtworkOrderDnD extends Component{

    static contextType = Context;

    constructor(props){
        super(props);
        this.state = {
            categoryNames: [],
            categoryDatalist: null,
            selectedCategory: null,
            subcategoryDatalist: null,
            imagesArray: null

        }

        this.createImages = () => {

            if(this.context.state.imageDir){
                let images = [];
                const files = this.context.state.imageDir.files
                images = Object.keys(this.context.state.imageDir.files).map(fileRecord => {
                    console.log(`uploads/${files[fileRecord].content}`)
                    return(
                    <li key={files[fileRecord].content} className="dnd-listItem">
                        <img 
                        className="dnd-image" 
                        src={`uploads/${files[fileRecord].content}`} 
                        alt={files[fileRecord].content} />
                    </li>
                    )
                })
                // return <ul>{images}</ul>
                this.setState({ imagesArray: images})
            }
            else{
                alert('no data')
            }
        }
    }


    render(){
        return(
            <Context.Consumer>
            {
                ()=>{
                return(
                    <div style={{backgroundColor: "#f3ff96"}}>
                        <h5>THIS IS ARTWORK ORDER DND</h5>

                        <DragDropContext>
                            <div id="dnd-container" className="imageInfo--box">
                                {this.state.imagesArray ? <ul className="dnd-list">{this.state.imagesArray}</ul> : <div>...loading</div>}
                                <button 
                                onClick={this.createImages}
                                >
                                    load images
                                </button>
                            </div>
                        </DragDropContext>
                    </div>
                )
                }
            }
            </Context.Consumer>
        )
    }
}