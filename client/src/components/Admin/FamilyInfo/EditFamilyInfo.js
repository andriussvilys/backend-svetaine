import React from 'react'
import FamilyDescription from './subcomponents/FamilyDescription'
import SelectFamily from './subcomponents/SelectFamily'
import Accordion from '../Accordion'

const EditFamilyInfo = (props) => {
    return(
        <Accordion
            title={"Family Name and Description"}
        >
            <SelectFamily 
                context={props.context}
                fileName={props.fileName}
                addNew={props.addNew}
            />
            <FamilyDescription 
                context={props.context}
                fileName={props.fileName}
            />
        </Accordion>
    )
}

export default EditFamilyInfo