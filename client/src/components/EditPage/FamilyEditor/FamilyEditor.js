import React from 'react'
import DropDownList from '../../DropDownList'
import SeeAlsoSelector from '../../SeeAlsoSelector'
import FamilyListDnDContainer from '../../DragAndDropList/FamilyListDnD/FamilyListDnDContainer'

export default class FamilyEditor extends React.Component{

    render(){
        if(this.context.state){
            return(
                <div>
                    <h3>Family Editor</h3>
                    <DropDownList 
                        title={'Select Artwork Family'}
                        state={this.props.context.state}
                        array={this.props.context.state.artworkFamilyList}
                        string={"artworkFamily"}
                        onChange={this.props.context.getFamilySetup}
                        isChecked={this.props.context.familySetupMethods.isChecked}
                        id="List-of-artwork-families"
                        router={'/api/familySetup/create'}
                        addNewTarget={'artworkFamilyList'}
                        displayAddNew="initial"
                        requestKey={"artworkFamily"}
                    />
                    <DropDownList 
                        title={"Select Family Themes"}
                        state={this.props.context.state}
                        array={this.props.context.state.themesData}
                        string={"themes"}
                        onChange={this.props.context.familySetupMethods.onChange}
                        isChecked={this.props.context.familySetupMethods.isChecked}
                        id="Themes-list"
                        router={'/api/themes/update'}
                        addNewTarget={'themesData'}
                        displayAddNew="initial"
                        requestKey={"list"}
                    />
                    
                    <SeeAlsoSelector 
                        renderFiles={this.context.state.seeAlsoData.renderFiles}
                        renderAllFiles={this.context.familySetupMethods.renderAllFiles}
                        state={this.context.state}
                        highlighterReference={this.context.state.seeAlsoData.renderFiles}
                        array={this.context.state.familySetupData.seeAlso}
                        stateNest={this.context.state.familySetupData.seeAlso}
                        onChange={this.context.familySetupMethods.onChange}
                        isChecked={this.context.familySetupMethods.isChecked}
                        serverFileDir={this.context.state.serverFileDir}
                    />
                    
                    <FamilyListDnDContainer 
                        data={this.context.state.relatedArtwork[this.props.file.artworkFamily] ? this.context.state.relatedArtwork[this.props.file.artworkFamily]: null}
                        artworkFamily={this.context.state.familySetupData.artworkFamily}
                    />
                    {this.props.children}
                </div>
            )
        }
        else{return null}
    }
} 