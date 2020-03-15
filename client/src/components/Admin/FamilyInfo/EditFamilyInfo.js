import React, { Fragment } from 'react'
import FamilyDescription from './subcomponents/FamilyDescription'
import SelectFamily from './subcomponents/SelectFamily'

const EditFamilyInfo = (props) => {
    return(
        <Fragment>
            <SelectFamily 
                context={props.context}
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