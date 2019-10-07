import React from 'react';
import '../css/main.css';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import AddNew from './AddNew';
import '../css/components/extendedList.css';
import '../css/components/imageInfo.css';

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
 */
    createDropDownList = (array, string, state) => {

        console.log('this.context.state.familySetupData[string]')
        console.log(string)
        console.log(state.familySetupData[string])

        const highlighter = (string, listItem) => {
            if(state.familySetupData[string]){
                if( typeof state.familySetupData[string] === 'string'|| Array.isArray(state.familySetupData[string]) ){
                        return state.familySetupData[string].includes(listItem)
                    }
            }
            else return null
        }

        let sortedArray = Array.from(new Set(array.sort()));
        let listItems = sortedArray.map((listItem) => {
            return (
                <li 
                className={`dropdown-item themes-list ${highlighter(string, listItem) ? 'themes-list--selected' : null}`} 
                key={`${string}-${listItem}`}
                >
                    <span className="themes-span">{listItem}</span>
                    <input 
                    className="themes-checkbox" 
                    type={string === "artworkFamily" ? "radio" : "checkbox"}
                    value={listItem}
                    checked={highlighter(string, listItem) ? true : false}
                    onChange={() => this.props.onChange(listItem, string)}
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
  
        return <div style={{width: "100%", display: "flex"}}>{columnLists()}</div>
    }

    render(){
        return(

            <div className="themeSelector ">
                        
            <div 
            className="extendedList--form imageInfo--box"
            style={{margin: 0}}
            >
                <p>{this.props.listName}</p>
                {/* {this.context.makeDataList(this.props.array, this.props.string, this.props.id)} */}

                <Accordion >
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            <h6>{this.props.title}</h6>
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body style={{display: "flex", flexWrap: "wrap"}}>
                                {this.createDropDownList(this.props.array, this.props.string, this.props.state)}
                                <AddNew 
                                    displayAddNew={this.props.displayAddNew}
                                    router={this.props.router}
                                    stateKey={this.props.addNewTarget}
                                    requestKey="list"
                                />
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>  
            </div>
            </div>

            // <div>
            //     <h3>{`DROPDOWNLIST ${this.props.string}`}</h3>
            //     <div>{this.createDropDownList(this.props.array, this.props.string, this.props.state)}</div>
            // </div>
        )
    }
}