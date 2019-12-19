import React from 'react'
import { Context } from '../../Provider';
import Accordion from './Accordion';


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
        let letters = Array.from(title).map((letter, index) => {
            return <div key={`${title}-leter-${index}`} className="title-letter">{letter}</div>
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
                    id={`listItem-${listitem}`}
                    className="TagsMenu-checkbox_listItem"
                    type="checkbox" 
                    onChange={() => this.props.context.filterByListitem(category, subcategory, listitem)} 
                    checked={this.props.context.listitemChecked(category, subcategory, listitem)}
                />
            </div>
            </li>
        })

        let list = <ul 
            className="tagsMenu-list"
            onTouchEnd={(e) => {e.stopPropagation()}}
            >{block}</ul>
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
                    key={`TagsMenu-${index}`}
                    title={this.spreadLetters(subName)}
                    // title={subName} 
                    level="subcategory-last"
                    checkbox={<input 
                        id={`subcategory-${subName}`}
                        className="TagsMenu-checkbox_subcategory"
                        type="checkbox" 
                        onChange={() => this.props.context.filterBySubcategory(category, subName)} 
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
                key={`TagsMenu-${index}`}
                title={this.spreadLetters(subName)}
                // title={subName} 
                level="subcategory"
                checkbox={<input 
                    id={`subcategory-${subName}`}
                    className="TagsMenu-checkbox_subcategory"
                    type="checkbox" 
                    onChange={() => this.props.context.filterBySubcategory(category, subName)} 
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
        
        let categories = data.map((obj, index) => {
            const toggle = Object.keys(obj.subcategory).length > 0
        return (
            <Accordion
            key={`TagsMenu-category-${index}`} 
            // title={obj.category} 
            title={this.spreadLetters(obj.category)}
            checkbox={<input 
                id={`category-${obj.category}`}
                className="TagsMenu-checkbox"
                level="category"
                type="checkbox" 
                onChange={() => this.props.context.filterByCategory(obj.category)} 
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
        className={
            !this.props.context.state.mobile ? 
                `TagsMenu-container` :
                this.props.context.state.enlarge && this.props.context.state.enlarge.open ?
                `TagsMenu-container TagsMenu-max` : 
            `TagsMenu-container`
        }
        style={{height: `${
            this.props.context.state.mobile ?
                this.props.context.state.enlarge && this.props.context.state.enlarge.open ?
                `${this.props.context.state.enlarge.currentHeight + 1}px`:
                `auto`:
            `auto`
        }`}}
        onTouchStart={(e) => {
            const touches = e.touches
            const touch = {"y": touches[0].clientY}
            this.setState({touch})
        }}
        onTouchMove={(e) => {
            this.setState({touch: {...this.state.touch, "endX": e.touches[0].clientX, "endY": e.touches[0].clientY}})
        }}
        onTouchEnd={(e) => {
            //check if any accordions are open
            const collapseShow = Array.from(document.getElementsByClassName("collapse")).filter(collapse => collapse.classList.contains("show"))

            if(Math.abs(this.state.touch.y - this.state.touch.endY) > 30){
                if(this.state.touch.y > this.state.touch.endY && collapseShow.length === 0){
                    document.getElementById("TagsMenu").classList.remove("show-menu")
                }
            }
        }
        }
        >
            {this.props.context.state.categoriesData ? this.categoryBlock(this.props.context.state.categoriesData) : null}
            {this.props.children}

        </div>
    }
}