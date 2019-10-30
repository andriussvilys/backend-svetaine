import React from 'react';
import FamilyList from './FamilyList'


const MainContainer = (props) => {
    
    let filesData = () => Object.keys(props.data.files).map(objName => {
        return props.data.files[objName]
    })
    
    /**
     * @returns returns an object with 
     * #1: familyNames: an Array of FamilyNames of uploaded files 
     * #2: fileByFamily: an Object that's a collection of arrays sorted by artworkFamily
     */
    const sortByFamily = () => {

        let fileByFamily = {}
        let familyNames = []

            filesData().forEach(file => {
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

    const renderNames = (data) => {
        if(!data){
            return
        }

        const sortedData = sortByFamily()

        let list = sortByFamily().familyNames.map(familyName => {
            return (
                <FamilyList 
                familyName={familyName}
                files={sortedData.fileByFamily[familyName]}
                />
            ) 
        })
        return list
    }
    

    return(
        <div>
            <h5>family Names:</h5>
            {renderNames(props.data)}
        </div>
    )
}

export default MainContainer