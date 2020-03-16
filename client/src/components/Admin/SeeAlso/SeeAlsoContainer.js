import React, { Fragment } from 'react'
import SeeAlso from './SeeAlso'

const SeeAlsoContainer = (props) => {
    const renderContainer = (props) => {
        const list = Object.values(props.initialData).map(obj => {
            console.log(obj.fileName)
            return <SeeAlso 
                        key={`seeAlso-${obj.fileName}`}
                        file={obj}
                        directory={props.directory}
                    />
        })
    return <div className="admin-seeAlso-container">{list}</div>
    }
    const list = renderContainer(props)
    return(
        list
    )
}

export default SeeAlsoContainer