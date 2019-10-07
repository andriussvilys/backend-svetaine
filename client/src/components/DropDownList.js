import React from 'react';

export default class DropDownList extends React.Component{
/**
 *@param {array} array source data for list
 *@param {string} string used for ids/names 
 */
    createDropDownList = (array, string) => {
        // console.log(array)
        let inputType = "checkbox";
        if(string === "artworkFamily"){
            inputType = "radio"
        }
        let sortedArray = Array.from(new Set(array.sort()));
        // console.log(sortedArray)
        let listItems = sortedArray.map((listItem) => {
            return (
                <li className="dropdown-item themes-list" key={`${string}-${listItem}`}>
                    <span className="themes-span">{listItem}</span>
                    <input 
                    name={string}
                    id={`${string}-${listItem}`}
                    className="themes-checkbox" 
                    type={string === "artworkFamily" ? "radio" : "checkbox"}
                    value={listItem}
                    checked={this.autoCheck(string, listItem)} 
                    onChange={(e) => {this.themesCheck(e, string)}}/>
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
            <div>{this.createDropDownList(this.props.array, this.props.string)}</div>
        )
    }
}