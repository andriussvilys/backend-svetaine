import React, { Fragment } from 'react'
import { Context } from '../../Provider';
import Accordion from './Accordion';
import YearLocation from './YearLocation/YearLocation';
import Themes from './Themes/Themes';
import ClearAll from './ClearAll';
import About from './About/About';
import Contact from './About/Contact'
import Category from './TagsMenu/Category';


export default class TagsMenu extends React.Component{
    static contextType = Context;
    constructor(props){
        super(props)
        this.state = {subcategory: null, listItems: null}
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
            <div 
            // className="tagsMenu-listItem"
            className={this.props.context.listitemChecked(category, subcategory, listitem) ? "tagsMenu-listItem checkbox-selected" : "tagsMenu-listItem"}
            >
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
            //CHECK IF LAST IN LIST
            if(index === subcategoriesList.length - 1){
                return(
                    <Accordion 
                    key={`TagsMenu-${index}`}
                    title={this.spreadLetters(subName)}
                    // title={subName} 
                    level="subcategory-last"
                    checkbox={<input 
                        id={`subcategory-${subName}`}
                        // className="TagsMenu-checkbox_subcategory"
                        className={`TagsMenu-checkbox_subcategory ${!toggle? 'clickable' : null}`}
                        type="checkbox" 
                        onChange={() => this.props.context.filterBySubcategory(category, subName)} 
                        checked={this.props.context.subcategoryChecked(category, subName)}
                        />}
                    open={!this.props.context.state.mobile ? "1" : "0"}
                    checked={this.props.context.subcategoryChecked(category, subName)}
                    toggle={toggle} 
                    // level="subcategory"
                    className="TagsMenu-Accordion-label">
                        {this.listItemBlock(category, subName, subData[subName])}
                    </Accordion>
                )                 
            }
            if(toggle){
                return(
                    <Accordion 
                    key={`TagsMenu-${index}`}
                    title={this.spreadLetters(subName)}
                    // title={subName} 
                    level="subcategory"
                    checkbox={<input 
                        id={`subcategory-${subName}`}
                        className={`TagsMenu-checkbox_subcategory ${!toggle? 'clickable' : null}`}
                        type="checkbox" 
                        onChange={() => this.props.context.filterBySubcategory(category, subName)} 
                        checked={this.props.context.subcategoryChecked(category, subName)}
                        />}
                    toggle
                    open={!this.props.context.state.mobile ? "1" : "0"}
                    checked={this.props.context.subcategoryChecked(category, subName)}
                    level="subcategory"
                    className="TagsMenu-Accordion-label">
                        {this.listItemBlock(category, subName, subData[subName])}
                    </Accordion>
                ) 
            }
            else{
                return <div
                            className={`
                            TagsMenu-Card-Title 
                            subcategory 
                            subcateogry_empty
                            tagsMenu-Button
                            tagsMenu-Button_subcategory
                            ${this.props.context.subcategoryChecked(category, subName) ? 'checkbox-selected' : null}
                            `}
                        >
                                {this.spreadLetters(subName)}
                                <input 
                                id={`subcategory-${subName}`}
                                className={`TagsMenu-checkbox_subcategory ${!toggle? 'clickable' : null}`}
                                type="checkbox" 
                                onChange={() => this.props.context.filterBySubcategory(category, subName)} 
                                checked={this.props.context.subcategoryChecked(category, subName)}
                                />
                        </div>
            }
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
            <div
            key={`TagsMenu-category-${index}`} 
            className={this.props.context.categoryChecked(obj.category) ? "TagsMenu-Accordion-label checkbox-selected" : "TagsMenu-Accordion-label"}
            >
                {this.spreadLetters(obj.category)}
                <input 
                id={`category-${obj.category}`}
                className="TagsMenu-checkbox"
                level="category"
                type="checkbox" 
                onChange={() => this.props.context.filterByCategory(obj.category)} 
                checked={this.props.context.categoryChecked(obj.category)}
                />
            </div>
        )
        })
        return categories
    }

    showContent = (category) => {
        console.log(`show ${category}`)
    }

    onCategoriesClick = (category) => {
        document.getElementById("TagsMenu-subcategory-container").childNodes.forEach(child => {
            child.classList.remove("scroll-down-category")
        })
        document.getElementById(`${category}-subcategories`).classList.toggle("scroll-down-category")
    }

    onSubcategoriesClick = (subcategory) => {
        document.getElementById("TagsMenu-subcategory-container").childNodes.forEach(child => {
            child.classList.remove("scroll-down-category")
        })
        document.getElementById(`${subcategory}-listitem`).classList.toggle("scroll-down-category")
    }


    createCategories = (data) => {

        let buttons = data.map(obj => {
            console.log("tags menu")
            console.log(obj.category)
            return <Category 
            category={obj.category}
            level="category"
            context={this.props.context}
            onChange={() => this.props.context.filterByCategory(obj.category)}
            isChecked={this.props.context.categoryChecked(obj.category)}
            showContent={this.onCategoriesClick}
            />
        })

        return buttons
    }
    /**
     * return a div with listitems for a subcategory
     */
    createListItems = (listItemArray, subcategory, category) => {
        let listItems = listItemArray.map(listitem => {
            return <Category 
                            category={listitem}
                            level="listitem"
                            context={this.props.context}
                            onChange={() => this.props.context.filterBySubcategory(category, subcategory, listitem)}
                            isChecked={this.props.context.listitemChecked(category, subcategory, listitem)}
                    />
        })
        return <div className="TagsMenu-listitems-container" id={`${subcategory}-listitem`}>{listItems}</div>
    }

    createSubcategories = (data) => {
        let buttons = []
        let subCatBlocks = []
        let combined = []
        data.forEach(obj => {
            let listitemsContainer = []
            const subcategories = Object.keys(obj.subcategory)
            let subContainer = subcategories.map(subcategory => {
                    if(obj.subcategory[subcategory].length > 0){
                        listitemsContainer = [...listitemsContainer, this.createListItems(obj.subcategory[subcategory], subcategory, obj.category)]
                    }
                    return <Fragment>
                        <Category 
                        category={subcategory}
                        level="subcategory"
                        context={this.props.context}
                        onChange={() => this.props.context.filterBySubcategory(obj.category, subcategory)}
                        isChecked={this.props.context.subcategoryChecked(obj.category, subcategory)}
                        showContent={this.showContent}
                        />
                        {/* { obj.subcategory[subcategory].length > 0 ?
                            this.createListItems(obj.subcategory[subcategory], subcategory, obj.category) :
                            null
                        } */}
                    </Fragment>
                
            })

            // subContainer = [...subContainer, this.createListItems(obj.subcategory[subcategory], subcategory, obj.category)]
        subCatBlocks = [...subCatBlocks, 
            <Fragment>
                <div className="TagsMenu-subcategories" id={`${obj.category}-subcategories`}>
                    <div id="subcategories">
                        {subContainer}
                    </div>
                    <div className="TagsMenu-listItems-container" >
                        {listitemsContainer}
                    </div>
                </div>
            </Fragment>
    ]
        })
        return subCatBlocks
    }

    render(){
        return <div
        id="TagsMenu"
        className={
            !this.props.context.state.mobile ? 
                `TagsMenu-container show-menu-desktop` :
                this.props.context.state.enlarge && this.props.context.state.enlarge.open ?
                `TagsMenu-container TagsMenu-max` : 
            `TagsMenu-container`
        }
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
            <div className="TagsMenu-categories">
                {/* {this.props.context.state.categoriesData ? this.categoryBlock(this.props.context.state.categoriesData) : null} */}
                <div className="TagsMenu-category-container">

                    <div className="TagsMenu-category-button-container">
                        {this.props.context.state.categoriesData ? this.createCategories(this.props.context.state.categoriesData) : null}
                        
                        <YearLocation 
                            yearLocation={this.props.context.state.yearLocation || {years: [], locations: []}}
                            filterByYear={this.props.context.filterByYear}
                            isChecked={ this.props.context.yearChecked}
                            // data={this.context.state.artworkInfoData || {}}
                            state={this.props.context.state}
                            context={this.props.context}
                        />
                        <Themes
                            state={this.props.context.state}
                            context={this.props.context}
                        />
                        <ClearAll 
                            context={this.props.context}
                            enlarge={this.props.context.state.enlarge}
                        />
                    </div>
                </div>
                    <div id="TagsMenu-subcategory-container" className="TagsMenu-subcategory-container">
                        {this.props.context.state.categoriesData ? this.createSubcategories(this.props.context.state.categoriesData) : null}
                        {/* <div className="TagsMenu-about-contact">about contact</div> */}
                    </div>
                </div>
                {/* <div className="TagsMenu-listItems-container">{this.state.listItems}</div>
                <div className="TagsMenu-bottomButtons">
                    <About 
                        loadEnlarge={this.props.context.loadEnlarge}
                        collapseId="about-image"
                    />
                    <Contact />
                </div> */}
                {this.props.children}

        </div>
    }
}