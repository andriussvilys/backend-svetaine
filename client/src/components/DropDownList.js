import React from 'react';
import '../css/main.css'

export default class DropDownList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          category: {}
        }
      }

      onRadioCheck = (e) => {

      }

    //   onChange= (e, string) => {

    //     const addNewValue = (newValue) => {
    //         let newState = {}
    //         //if state nest is a String, eg artworkFamily
    //         if(typeof this.state.familySetupData[string] === "string"){              
    //             newState = {
    //                 ...this.state,
    //                 familySetupData: {
    //                     ...this.state.familySetupData,
    //                     [string]: newValue
    //                 }
    //             }
    //         }
    //         //if state nest is Array (eg themes or seeAlso)
    //         else{              
    //             newState = {
    //                 ...this.state,
    //                 familySetupData: {
    //                     ...this.state.familySetupData,
    //                     [string]: [...this.state.familySetupData[string], newValue]
    //                 }
    //             }
    //         }
    //         this.setState(newState)
    //     }

    //     const removeValue = (value) => {
    //         let newState = {}
    //         if(typeof this.state.familySetupData[string] === "string"){
    //             return
    //         }
    //         else{
    //             let valueIndex = this.state.familySetupData[string].indexOf(value)
    //             let newArray = this.state.familySetupData[string].splice(valueIndex, 1)
    //             newState = {
    //                 ...this.state,
    //                 familySetupData: {
    //                     ...this.state.familySetupData,
    //                     [string]: newArray
    //                 }
    //             }
    //             this.setState(newState)
    //         }
    //     }

    //     if(this.state.familySetupData[string].includes(e.target.value)){
    //         removeValue(e.target.value)
    //     }
    //     else{
    //         addNewValue(e.target.value)
    //     }
    //   }

/**
 *@param {array} array source data for list
 *@param {string} string used for ids/names 
 */
    createDropDownList = (array, string, state) => {
        console.log('DROP DOWN LIST STATE')
        console.log(state)
        if(!state.familySetupData[string]){
            return
        }
        let sortedArray = Array.from(new Set(array.sort()));
        // console.log(sortedArray)
        let listItems = sortedArray.map((listItem) => {
            return (
                <li 
                className={`dropdown-item themes-list ${state.familySetupData[string].includes(listItem) ? 'themes-list--selected' : null}`} 
                key={`${string}-${listItem}`}
                >
                    <span className="themes-span">{listItem}</span>
                    <input 
                    // name={`${string}-dropdown`}
                    // id={`${string}-${listItem}-dropDown`}
                    className="themes-checkbox" 
                    type={string === "artworkFamily" ? "radio" : "checkbox"}
                    value={listItem}
                    // checked={this.autoCheck(string, listItem)} 
                    // onChange={(e) => {this.themesCheck(e, string)}}
                    checked={this.props.state.familySetupData[string].includes(listItem) ? true : false}
                    onChange={(e) => {
                        this.props.onChange(e, string)
                    }}
                    />
                </li>
            )
        })

        function columnLists(){
          const groups = Math.round(sortedArray.length / 10);
          let columns = [[]];
          //This create an array with a number of Arrays equal to UL tags that will be needed
          for (let index = 1; index < groups; index++) {
            columns = [...columns, []];
            console.log('COLUMNS')
            console.log(columns)
          }
          //this defines column index
          let counter = 0;
          //this counts the number of LIs in a coumn
          let subcounter = 0;

          listItems.forEach((li) => {
              columns[counter] = [...columns[counter], li]
                subcounter += 1
                //if theres 10 LIs in the column, increment column index (push LIs to the next column)
                if(subcounter === 10 ){
                    counter += 1;
                    subcounter = 0
                }
            })

          let finalList = columns.map((array, index) => {
            return(<ul className="no-padding" key={`${string}-${index}`}>
              {array}
            </ul>)
          })
          return finalList;
        }
  
        return columnLists()
    }

    render(){
        return(
            <div>
                <h3>{`DROPDOWNLIST ${this.props.string}`}</h3>
                <div>{this.createDropDownList(this.props.array, this.props.string, this.props.state)}</div>
            </div>
        )
    }
}