import React from 'react'
import DropDownList from '../../DropDownList'

const SelectFamily = (props) => {
    return(
        <DropDownList 
            title={'Select Artwork Family'}
            state={props.context.state}
            array={props.context.state.artworkFamilyList}
            onChange={props.onChange || props.context.getFamilySetup}
            uncontrolled={props.uncontrolled}
            checkbox
            fileName={props.fileName}
            string={"artworkFamily"}
            id="List-of-artwork-families"
            highlighted={props.highlighted}

            router={'/api/familySetup/create'}
            addNewTarget={'artworkFamilyList'}
            addNew={props.addNew}
            requestKey={"artworkFamily"}
        />
    )
}

export default SelectFamily