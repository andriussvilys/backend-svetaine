import React from 'react'

import FilePreview from '../FilePreview'

//this component returns a div with a family name and FilePreviews of each child in the family

const FamilyList = (props) => {

    console.log('FAMILY LIST PROPS')
    console.log(props)

    /**
     * 
     * @param {*} data = takes an array of files data
     */

    const renderList = (data) => {
        let list = data.map(file => {
            return (
                <FilePreview 
                    file={file}
                />
            )
        }); 

        return list
    }

    return (
        <div>
            <h5>{props.familyName}</h5>
            {renderList(props.files)}
        </div>
    ) 
}

export default FamilyList