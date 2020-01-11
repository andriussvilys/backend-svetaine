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
    onCategoriesClick = (category) => {
        if(document.getElementById(`${category}-subcategories`).classList.contains("scroll-down")){
            Array.from(document.getElementsByClassName("scroll-down")).forEach(item => item.classList.remove("scroll-down"))
            return
        }

        document.getElementById("TagsMenu-subcategory-container").childNodes.forEach(child => {
            child.classList.remove("scroll-down")
        })
        Array.from(document.getElementsByClassName("TagsMenu-listitem")).forEach(item => item.classList.remove("scroll-down"))
        document.getElementById(`${category}-subcategories`).classList.toggle("scroll-down")
    }

    onSubcategoriesClick = (subcategory) => {
        if(document.getElementById(`${subcategory}-listitem`) && document.getElementById(`${subcategory}-listitem`).classList.contains("scroll-down")){
            Array.from(document.getElementsByClassName("scroll-down")).forEach(item => item.classList.remove("scroll-down"))
            return
        }
        Array.from(document.getElementsByClassName("TagsMenu-listitem")).forEach(item => item.classList.remove("scroll-down"))
        if(document.getElementById(`${subcategory}-listitem`))
        document.getElementById(`${subcategory}-listitem`).classList.toggle("scroll-down")
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
                            showContent={() => {return}}
                    />
        })
        return <div className="button-wrapper TagsMenu-listitem" id={`${subcategory}-listitem`}>{listItems}</div>
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
                        showContent={this.onSubcategoriesClick}
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
                    <div id="subcategories" className="button-wrapper subcategories">
                        {subContainer}
                    </div>
                    <div className="TagsMenu-listItems-container" >
                        {listitemsContainer}
                    </div>
                </div>
            </Fragment>
    ]
        })
        subCatBlocks = [...subCatBlocks, 
            <div class="TagsMenu-subcategories" id="themes-subcategories">
                <Themes
                    state={this.props.context.state}
                    context={this.props.context}
                />
            </div>,
            <div class="TagsMenu-subcategories" id="year/location-subcategories">
                <YearLocation 
                    yearLocation={this.props.context.state.yearLocation || {years: [], locations: []}}
                    filterByYear={this.props.context.filterByYear}
                    isChecked={ this.props.context.yearChecked}
                    // data={this.context.state.artworkInfoData || {}}
                    state={this.props.context.state}
                    context={this.props.context}
                />
            </div>
        ]
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
            <div className="button-wrapper TagsMenu-about-contact">
                {this.props.children}
            </div>
            <Fragment>
                    <div className="TagsMenu-category-button-container">
                        {this.props.context.state.categoriesData ? this.createCategories(this.props.context.state.categoriesData) : null}
                        
                        <Category 
                            category="year/location"
                            context={this.props.context}
                            button
                            showContent={this.onCategoriesClick}
                        />
                        <Category 
                            category="themes"
                            context={this.props.context}
                            button
                            showContent={this.onCategoriesClick}
                        />
                        

{/* 
                        <YearLocation 
                            yearLocation={this.props.context.state.yearLocation || {years: [], locations: []}}
                            filterByYear={this.props.context.filterByYear}
                            isChecked={ this.props.context.yearChecked}
                            // data={this.context.state.artworkInfoData || {}}
                            state={this.props.context.state}
                            context={this.props.context}
                        /> */}
                        <ClearAll 
                            context={this.props.context}
                            enlarge={this.props.context.state.enlarge}
                        />
                    </div>
                    <div id="TagsMenu-subcategory-container" className="TagsMenu-subcategory-container">
                        {this.props.context.state.categoriesData ? this.createSubcategories(this.props.context.state.categoriesData) : null}
                    </div>
            </Fragment>
    

        </div>
    }
}