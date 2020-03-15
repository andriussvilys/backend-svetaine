import React, { Fragment } from 'react'
import SeeAlso from '../SeeAlso/SeeAlso'

const GlobalSetup = (props) => {
    return(
        <Fragment>
            <Filters 
                context={props.context}
            />
        </Fragment>
    )
}

export default GlobalSetup