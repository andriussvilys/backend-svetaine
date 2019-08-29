import React, { Component } from 'react';
import { Context } from './Provider'
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/components/navigationInfo.css';

const navData = require('../JSON/navigation.json');
const categories = Object.keys(navData);

export default class NavigationInfo extends Component{

    static contextType = Context;

    // onCheck = (e) => {
    //     console.log('runs')
    //     // let parent = e.target.parentNode.parentNode
    //     const parentCheckbox = (target) => Array.from(target.getElementsByTagName('input'))[0];

    //     const classNameCheck = (name) => {
    //     return e.target.parentNode.classList.contains(name)
    //     }

    //     const checkboxCheck = (checkbox, subcategory, e) => {
    //         checkbox.checked = true
    //         console.log(`parentcheckbox ${checkbox.value}`)
    //         this.setState({ category: {...this.context.category, [checkbox.value]: {} } })
    //         //if we click listitem, then pass and check subcategory
    //         if(subcategory){
    //         subcategory.checked = true;
    //         // this.setState({ category: {...this.state.category, [checkbox.value]: { [subcategory.value]: []} } }, 
    //         //   () => {console.log(this.state.category[checkbox.value][subcategory.value])}
    //         // )
    //         this.setState({ category: {
    //             ...this.state.category, [checkbox.value]:{
    //             ...this.state.category[checkbox.value], [subcategory.value]:[]
    //             } 
    //             } 
    //         })
    //         }
    //     }

    //     let category = parentCheckbox(e.target.parentNode.parentNode)
    //     let subcategory = parentCheckbox(e.target.parentNode)

    //     switch (true) {

    //     case classNameCheck('list--category'):
    //         this.setState({ category: {...this.context.category, [e.target.value]: {} } })
    //     break;
        
    //     case classNameCheck('list--subcategory'):
    //         console.log('subcategory was clicked')

    //         checkboxCheck(category)
            
    //         this.setState({ category: {
    //         ...this.state.category, [category.value]:{
    //             ...this.state.category[category.value], [subcategory.value]:[]
    //             } 
    //         } 
    //         })

    //     break;
            
    //     case classNameCheck('list--listitem'):

    //         category = parentCheckbox(e.target.parentNode.parentNode.parentNode)
    //         subcategory = parentCheckbox(e.target.parentNode.parentNode)
            
    //         checkboxCheck(category, subcategory);

    //         this.setState({ category: {
    //         ...this.state.category, [category.value]: {
    //             ...this.state.category[category.value], [subcategory.value]:[
    //             ...this.state.category[category.value][subcategory.value], e.target.value
    //             ]
    //             } 
    //         } 
    //         })

    //         // this.setState({ category: {
    //         //   ...this.state.category, [category.value]:{
    //         //     ...this.state.category[category.value], [subcategory.value]:[
    //         //         e.target.value
    //         //       ]
    //         //     } 
    //         //   } 
    //         // })


    //     break;
    //     default:
    //         return
    //     }

    //     //THIS REMOVES CHECK AND E.TARGET.VALUE FROM STATE
    //     // else{
    //     //   this.setState({[stateKey]: this.state[stateKey].filter(item => item !== e.target.value)})
    //     // }
    // }

    //****************************************************************************************************
    //THIS METHOD DYNAMICALLY CREATES THE MENU 
    makeCategories = () => {
        let result = categories.map((category, index) => {
        // console.log(category)
        let subcategories = Object.keys(navData[category]).map(subcategory => {
            // console.log(navData[category][subcategory])
            let listitems = navData[category][subcategory].map((listitem, index) => {
            return(
                <li key={`${listitem}${index}}`} className="list--listitem list-group-item">
                <input type="checkbox" value={listitem} id={listitem} onChange={this.context.onCheck} />
                <span>{listitem}</span>  
                </li>
            )
            })
            return(
            <ul key={subcategory} value={subcategory} className="list--subcategory list-group list-group-item">
                <input type="checkbox" value={subcategory} onChange={this.context.onCheck} />
                <span>{subcategory}</span>
                {listitems}
            </ul>
            )
        })
    return(
        <div key={category} label={category} className="list-group">
        <ul value={category} className="list--category"> <input type="checkbox" value={category} onChange={this.context.onCheck} /> <span>{category}</span>
        {subcategories}
        </ul>
        </div>
    )
    })
    return result
    }

  render(){
    return(
        <Context.Consumer>
            { () => {return(
                <div>
                    <h3>categories</h3>
                    <div className="list--container">
                            {this.makeCategories()}
                    </div>
                </div>
            )}
            }
        </Context.Consumer>
    )
  }
}