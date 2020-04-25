import React, { Fragment } from 'react'
import FamilyDescription from './subcomponents/FamilyDescription'
import SelectFamily from './subcomponents/SelectFamily'
import Accordion from '../Accordion'
import SubmitFamilyInfo from './subcomponents/SubmitFamilyInfo'

const EditFamilyInfo = (props) => {
    return(
        <Fragment>
            <SelectFamily 
                context={props.context}
                addNew={props.addNew}
                parent={"EditFamilyInfo"}
                fileName={props.fileName}
            />
            <FamilyDescription 
                context={props.context}
                fileName={props.fileName}
            />
        </Fragment>
    )
}

export default EditFamilyInfo