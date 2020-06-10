import React from 'react'
import Category from './Category'
import ClearAll from '../../ClearAll'
import CompoundFilters from '../../CoumpoundFilters'
import pullUp from '../../functions/pullUp'

const List = (props) => {
    const createList = (data) => {
        const list = data.map(categoryObj => {
            return <Category 
                        key={categoryObj.category}
                        data={categoryObj}
                        context={props.context}
                    />
                })
        return list
    }
    return(<div id="TagsMenu" className="FilterTree-container">
            <div className="hamburger"
                onClick={(e) => {
                    props.context.showMenu(e)
                }}
            ></div>
            <ClearAll
                context={props.context}
            />
            <CompoundFilters 
                context={props.context}
            />
            {props.data ? createList(props.data) : null}
        </div>
    )
}

export default List