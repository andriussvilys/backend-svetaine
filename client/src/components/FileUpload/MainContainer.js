import React from 'react';
import FamilyList from './FamilyList'
import { Context } from '../Provider';


export default class MainContainer extends React.Component{

    static contextType = Context;
    
    filesData = () => Object.keys(this.props.data.files).map(objName => {
        return this.props.data.files[objName]
    })
    
    /**
     * @returns returns an object with 
     * #1: familyNames: an Array of FamilyNames of uploaded files 
     * #2: fileByFamily: an Object that's a collection of arrays sorted by artworkFamily
     */
    sortByFamily = () => {

        let fileByFamily = {}
        let familyNames = []

            this.filesData().forEach(file => {
            if(!file.artworkFamily){
                if(!fileByFamily.none){
                    fileByFamily.none = []
                }
                return fileByFamily.none = [...fileByFamily.none, file]
            }
            if(!fileByFamily[file.artworkFamily]){
                fileByFamily[file.artworkFamily] = []
            }
            fileByFamily[file.artworkFamily] = [...fileByFamily[file.artworkFamily], file]
        
            console.log('SORTED BY FMAILY NAME ****************     ')
            console.log(fileByFamily)
        })

        familyNames = Object.keys(fileByFamily)

        return {fileByFamily, familyNames}
    }

    renderNames = (data) => {
        if(!data){
            return
        }

        const sortedData = this.sortByFamily()

        let list = this.sortByFamily().familyNames.map(familyName => {
            return (
                <FamilyList 
                familyDropDown={{
                    state:this.context.state,
                    familyList: this.context.state.artworkFamilyList,
                    context:this.context,
                }}
                themesDropDown={{
                    state:this.context.state,
                    themesData:this.context.state.themesData,
                    context: this.context
                }}
                seeAlso={{
                    state: this.context.state,
                    context: this.context,
                }}
                familyName={familyName}
                files={sortedData.fileByFamily[familyName]}
                controls={{
                    removeFile: this.context.fileDataMethods.removeFile,
                    postArtworkInfo: this.context.fileDataMethods.postArtworkInfo,
                    fileDataMethods: this.context.fileDataMethods,
                    onChange: this.context.onChange
                }}

                />
            ) 
        })
        return list
    }
    
    render(){
        return(
            <Context.Consumer>
                {() => {
                    return(
                        <div>
                            <h5>family Names:</h5>
                            {this.renderNames(this.props.data.files)}
                        </div>
                    )
                }}
            </Context.Consumer>
        )
    }
}
