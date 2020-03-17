import React from 'react'
import DropDownList from '../../DropDownList'

const SelectFamily = (props) => {
    return(
        <DropDownList 
            title={'Select Artwork Family'}
            state={props.context.state}
            array={props.context.state.artworkFamilyList}
            string={"artworkFamily"}
            onChange={props.onChange || props.context.getFamilySetup}
            fileName={props.fileName}
            // isChecked={props.context.familySetupMethods.isChecked}
            id="List-of-artwork-families"
            router={'/api/familySetup/create'}
            addNewTarget={'artworkFamilyList'}
            addNew={props.addNew}
            requestKey={"artworkFamily"}
        />
    )
}

export default SelectFamily