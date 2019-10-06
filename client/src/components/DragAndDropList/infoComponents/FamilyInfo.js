import React, { Component } from 'react';
import { Context } from '../../Provider';
import ExtendedList from './ExtendedList';
import AddNew from './AddNew';
import ThemeSelector from './ThemeSelector';
import Button from 'react-bootstrap/Button'
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/jsonPreview.css';
import '../css/imageInfo.css'

export default class FamilyInfo extends Component {
    static contextType = Context;

    constructor(props){
        super(props);
    }

    useFamilySetup = (stateKey) => {
        if(this.context.state.familySetupData[stateKey] 
            && this.context.state.familySetupData.useFamilySetup
            && !this.context.state.fileData.files[this.props.fileName][stateKey]){
                return this.context.state.familySetupData[stateKey] 
            }
        if(this.context.state.fileData.files[this.props.fileName][stateKey]){
            return this.context.state.fileData.files[this.props.fileName][stateKey]
        }
        else return null
    }



    // componentDidMount(fileName){
    //     if(this.context.state.familySetupData.useFamilySetup){
    //         let newFileData = this.state.fileData;
    //         Object.keys(this.state.familySetupData).forEach(key => {
    //             newFileData = {
    //                 ...newFileData, 
    //                     files: {
    //                         ...newFileData.files,
    //                         [fileName]: {
    //                             ...newFileData.files[fileName],
    //                             [key]: this.state.familySetupData[key]
    //                         }
    //                     }}
    //         });
    //         console.log('DRAGGABLE DID MOUNT -- THIS IS NEW STATE')
    //         this.setState({fileData: newFileData})
    //     }
    // }

    render(){
        return(
            <Context.Consumer>
                {()=>{
                    return(
                        <div>
                            <div className="DnD-imageInfo--box" style={{display: 'flex'}}>
                                <span>use family setup</span>
                                <form >
                                    <div className="container-radio">
                                        <label 
                                        htmlFor="familyDisplaySetup_yes"
                                        id="familyDisplaySetup_yes"
                                        >yes</label>
                                        <input type="radio" 
                                        name="familyDisplaySetup" 
                                        id="familyDisplaySetup__radio-yes" 
                                        value="yes" 
                                        disabled={this.context.state.familySetupData.artworkFamily === null ? true : false}
                                        onClick={() => this.context.useFamilySetup(true)}
                                        checked={this.context.state.familySetupData.useFamilySetup}
                                        />
                                    </div>
                                    <div className="container-radio">
                                        <label htmlFor="familyDisplaySetup_no">no</label>
                                        <input type="radio" 
                                        name="familyDisplaySetup" 
                                        id="familyDisplaySetup__radio-no" 
                                        value="no" 
                                        disabled={this.context.state.familySetupData.artworkFamily === null ? true : false}
                                        onClick={() => this.context.useFamilySetup(false)}
                                        checked={!this.context.state.familySetupData.useFamilySetup}
                                        defaultChecked 
                                        />
                                    </div>
                                </form>
                            </div>  
                            <ExtendedList 
                                listName="select artwork family: "
                                // array={this.artworks()}
                                array={this.context.state.artworkFamilyList}
                                string="artworkFamily"
                                id="familyList"
                            />                    
                            <ExtendedList 
                                listName="add 'see also' items: "
                                array={this.context.state.artworkFamilyList}
                                string="seeAlso"
                                id="seeAlso"
                            />
                            <div className="DnD-imageInfo--box" style={{display: "block"}}>
                                <div>
                                    <p>Family description:</p> 
                                    {/* <p className="subtitle">(different from family name):</p> */}
                                </div>
                                <textarea
                                value={this.useFamilySetup("familyDescription")}
                                onChange={
                                    (e) => this.props.onChange(e, this.props.fileName, "familyDescription")
                                }
                                style={{width: "100%"}}
                                ></textarea>
                            </div>

                            <ThemeSelector/>
                        </div>
                    )
                }}
            </Context.Consumer>
        )
    }
}