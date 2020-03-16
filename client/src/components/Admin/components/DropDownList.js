import React from 'react';
// import '../css/main.css';
import Accordion from './Accordion'
import AddNew from './AddNew';

export default class DropDownList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          category: {}
        }
      }

/**
 *@param {array} array source data for list
 *@param {string} string used for ids/names 
 *@param {state} object main App state context or redux
 *@param {fileName} string targets a particular file record in state
 */
    createDropDownList = (array, string, state, fileName) => {
        let statePath = state.familySetupData

        if(fileName){
            statePath = state.fileData.files[fileName]
        }

        const highlighter = (string, listItem) => {
            if(string === "artworkFamily"){
            }
            if(!statePath[string]){
                return false
            }
            if(statePath[string]){
                if(typeof statePath[string] === 'string'){
                    return statePath[string] === listItem
                }
                else if( Array.isArray(statePath[string]) ){
                        return statePath[string].includes(listItem)
                    }
            }
            else return false
        }

        let sortedArray = Array.from(new Set(array.sort()));
        let listItems = sortedArray.map((listItem) => {
            return (
                <li 
                className={` themes-list ${highlighter(string, listItem) ? 'themes-list--selected' : null}`} 
                key={`${string}-${listItem}`}
                >
                    <span className="themes-span">{listItem}</span>
                    <input 
                    className="themes-checkbox" 
                    type={string === "artworkFamily" ? "radio" : "checkbox"}
                    value={listItem}
                    checked={highlighter(string, listItem)}
                    // checked={highlighter(string, listItem)}
                    onChange={(e) => this.props.onChange(e.target.value, string, fileName)}
                    />
                </li>
            )
        })

        function columnLists(){
          const groups = Math.ceil(sortedArray.length / 10);
          let columns = [[]];
          //This create an array with a number of Arrays equal to UL tags that will be needed
          for (let index = 1; index < groups; index++) {
            columns = [...columns, []];
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

            <div className="themeSelector ">
                        
            <div 
            className="extendedList--form imageInfo--box"
            style={{margin: 0}}
            >
                <p>{this.props.listName}</p>
                    <div style={{display: "flex", flexWrap: "wrap"}}>
                        {this.createDropDownList(this.props.array, this.props.string, this.props.state, this.props.fileName)}
                    </div>
                    <AddNew 
                        addNew={this.props.addNew}
                        router={this.props.router}
                        stateKey={this.props.addNewTarget}
                        requestKey={this.props.requestKey}
                    />
            </div>
            </div>
        )
    }
}