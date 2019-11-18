import React from 'react'
import { Context } from '../../Provider';
import Accordion from './Accordion';


export default class TagsMenu extends React.Component{
    static contextType = Context;
    constructor(props){
        super(props)
        this.state = {}
    }
    listItemBlock = (listitemData) => {
        if(listitemData <= 0){
            return null
        }
        let block = listitemData.map(listitem => {
        return <li key={listitem}><div>{listitem}</div></li>
        })

        let list = <ul>{block}</ul>
        return list
    }

    /**
     * @params : takes an object with listItem names as properties
     */ 
    subcategoryBlock = (category, subData) => {
        const subcategoriesList = Object.keys(subData)
        let subCategories = subcategoriesList.map(subName => {
            const toggle = subData[subName].length > 0 
            return(
                <Accordion 
                title={subName} 
                level="subcategory"
                checkbox={<input 
                    type="checkbox" 
                    onChange={(e) => this.props.context.filterBySubcategory(e, category, subName)} 
                    checked={this.props.context.subcategoryChecked(category, subName)}
                    />}
                toggle={toggle} 
                className="TagsMenu-Accordion-label">
                    {this.listItemBlock(subData[subName])}
                </Accordion>
            ) 
        })
        return subCategories
    }

    /**
     * @params : takes an Array which is a collection of Objects contain category data
     */
    categoryBlock = (data) => {
        let categories = data.map(obj => {
            const toggle = Object.keys(obj.subcategory).length > 0
        return (
            <Accordion 
            title={obj.category} 
            checkbox={<input 
                level="category"
                type="checkbox" 
                onChange={(e) => this.props.context.filterByCategory(e, obj.category)} 
                checked={this.props.context.categoryChecked(obj.category)}
                />}
            toggle={toggle} 
            className="TagsMenu-Accordion-label"
            >
                {this.subcategoryBlock(obj.category, obj.subcategory)}
            </Accordion>
        )
        })
        return categories
    }

    render(){
        return <div
        className="TagsMenu-container"
        >
            {this.props.context.state.categoriesData ? this.categoryBlock(this.props.context.state.categoriesData) : null}
            {this.props.children}
        </div>
    }
}