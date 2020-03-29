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
            if(this.props.highlighted){
                let highlighted = null
                if(this.props.highlighted[string] && this.props.highlighted[string].includes(listItem)){
                    highlighted = true
                }
                else{
                    highlighted = false
                }
                if(highlighted){
                }
                return highlighted
            }

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

        // array = array.map(item => item.toUpperCase())

        let lettersArray = []
        array.forEach(item => {
            if(!lettersArray.includes(item[0].toUpperCase())){
                lettersArray = [...lettersArray, item[0].toUpperCase()]
            }
        })

        let sortedByLetter = {}

        lettersArray.sort().forEach(letter => {
            if(Object.keys(lettersArray).includes(letter)){
                sortedByLetter[letter] = []
            }
            sortedByLetter[letter] = array.filter(item => {
                return item[0].toUpperCase() === letter.toUpperCase()
            })
        })
        let listItem = (listItem) => {
            return (
                <li 
                className={` themes-list ${highlighter(string, listItem) ? 'themes-list--selected' : null}`} 
                key={`${string}-${listItem}`}
                >
                    <label htmlFor={`${string}-${listItem}`} className="themes-span">{listItem}</label>

                    {this.props.uncontrolled ?   
                        <input 
                            id={`${string}-${listItem}`}
                            className="themes-checkbox" 
                            type={ !this.props.checkbox ? "radio" : "checkbox"}
                            checked={highlighter(string, listItem)}
                            value={listItem}
                            onChange={(e) => {
                                this.props.onChange(e.target.value, e.target.checked, string)
                                    // e.target.parentNode.classList.toggle('themes-list--selected')
                                return
                            }}
                        />

                        :

                        <input 
                            id={`${string}-${listItem}`}
                            className="themes-checkbox" 
                            type={ !this.props.checkbox ? "radio" : "checkbox"}
                            value={listItem}
                            checked={highlighter(string, listItem)}
                            onChange={(e) => {
                                this.props.onChange(e.target.value, string, fileName)
                                return
                            }}
                        />   
                    }

                </li>
            )
        }

        const listsByLetter = () => {
            let finalList = Object.keys(sortedByLetter).map(letter => {
                return <div 
                            key={`dropdown-${string}-${letter}`}
                            className="dropdown-container"
                        >
                        <p className="dropdown-headline">{letter.toUpperCase()}</p>
                        <ul>
                            {sortedByLetter[letter].sort().map(item => {
                            return listItem(item)
                            })}
                        </ul>
                       </div>
            })
            return finalList
        }

        return listsByLetter()
    }

    render(){
        return(

            <div className="themeSelector ">
                <div 
                className="extendedList--form imageInfo--box"
                style={{margin: 0}}
                >
                        <div className="dropdown-wrapper">
                            {this.createDropDownList(this.props.array, this.props.string, this.props.state, this.props.fileName)}
                            <AddNew 
                                addNew={this.props.addNew}
                                router={this.props.router}
                                stateKey={this.props.addNewTarget}
                                requestKey={this.props.requestKey}
                            />
                        </div>
                </div>
            </div>
        )
    }
}