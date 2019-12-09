import React from 'react'
import { Context } from '../../Provider';
import Accordion from './Accordion';
import { Button } from 'react-bootstrap';


export default class TagsMenu extends React.Component{
    static contextType = Context;
    constructor(props){
        super(props)
        this.state = {}
    }
    /**
     * @param title: takes a string and spreads it into separate divs
     */
    spreadLetters = (title) => {
        let letters = Array.from(title).map(letter => {
            return <div className="title-letter">{letter}</div>
        })
        return letters
    }
    listItemBlock = (category, subcategory, listitemData) => {
        if(listitemData <= 0){
            return null
        }
        let block = listitemData.map(listitem => {
        return <li key={listitem}>
            <div className="tagsMenu-listItem">
                <span>{listitem}</span>
                <input 
                    className="TagsMenu-checkbox_listItem"
                    type="checkbox" 
                    onChange={(e) => this.props.context.filterByListitem(e, category, subcategory, listitem)} 
                    checked={this.props.context.listitemChecked(category, subcategory, listitem)}
                />
            </div>
            </li>
        })

        let list = <ul className="tagsMenu-list">{block}</ul>
        return list
    }

    /**
     * @params : takes an object with listItem names as properties
     */ 
    subcategoryBlock = (category, subData) => {
        const subcategoriesList = Object.keys(subData)
        let subCategories = subcategoriesList.map((subName, index) => {
            const toggle = subData[subName].length > 0 
            if(index === subcategoriesList.length - 1){
                return(
                    <Accordion 
                    title={this.spreadLetters(subName)}
                    // title={subName} 
                    level="subcategory-last"
                    checkbox={<input 
                        className="TagsMenu-checkbox"
                        type="checkbox" 
                        onChange={(e) => this.props.context.filterBySubcategory(e, category, subName)} 
                        checked={this.props.context.subcategoryChecked(category, subName)}
                        />}
                    toggle={toggle} 
                    className="TagsMenu-Accordion-label">
                        {this.listItemBlock(category, subName, subData[subName])}
                    </Accordion>
                )                 
            }
            return(
                <Accordion 
                title={this.spreadLetters(subName)}
                // title={subName} 
                level="subcategory"
                checkbox={<input 
                    className="TagsMenu-checkbox"
                    type="checkbox" 
                    onChange={(e) => this.props.context.filterBySubcategory(e, category, subName)} 
                    checked={this.props.context.subcategoryChecked(category, subName)}
                    />}
                toggle={toggle} 
                className="TagsMenu-Accordion-label">
                    {this.listItemBlock(category, subName, subData[subName])}
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
            // title={obj.category} 
            title={this.spreadLetters(obj.category)}
            checkbox={<input 
                className="TagsMenu-checkbox"
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
        id="TagsMenu"
        className="TagsMenu-container"
        >
            {this.props.context.state.categoriesData ? this.categoryBlock(this.props.context.state.categoriesData) : null}
            {this.props.children}
            <Button 
            onClick={() => this.props.context.toggleMobile()}
            >
                toggle mobile
            </Button>

        </div>
    }
}