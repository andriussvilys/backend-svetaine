import React, { Fragment } from 'react'
import Filters from '../Filters/Filters'
import EditFamilyInfo from '../FamilyInfo/EditFamilyInfo'

const GlobalSetup = (props) => {
    return(
        <Fragment>
            <EditFamilyInfo 
                context={props.context}
            />
            <Filters 
                context={props.context}
            />
        </Fragment>
    )
}

export default GlobalSetup