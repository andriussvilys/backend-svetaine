import React, { Component } from 'react';
import { Context } from './Provider';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
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

        }
    }

    render(){
        console.log('******these are all iamges')
        axios.get('/fethcImages')
            .then(res => {console.log(res)})
        return(
            <div>THIS IS ARTWORK ORDER DND</div>
        )
    }
}