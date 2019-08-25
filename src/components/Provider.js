import React from 'react';
import { reject } from 'q';

export const Context = React.createContext();

export class Provider extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      category: {}
    }
    this.onCheck = (e) => {

        let stateCategory = this.state.category;
        // console.log(stateCategory)
        // console.log('runs')
        // let parent = e.target.parentNode.parentNode
        const parentCheckbox = (target) => Array.from(target.getElementsByTagName('input'))[0];
    
        const classNameCheck = (name) => {
        return e.target.parentNode.classList.contains(name)
        }
    
        const checkboxCheck = (checkbox, subcategory, callback) => {
            checkbox.checked = true
            if(!subcategory){
                this.setState({ category: {
                    ...stateCategory, [checkbox.value]: {} 
                    }                 
                  })
             }
                else{
                    const categoryPromise = new Promise((resolve, reject) => {
                        subcategory.checked = true;
                        console.log('clicked a listitem')
                        if(!this.state.category[checkbox.value]){ 
                            console.log('category doesnt exist')
                            checkbox.checked = true;
                            this.setState({ category: {
                                ...stateCategory, [checkbox.value]:{}
                                } 
                            },
                                () => {
                                    if(this.state.category[checkbox.value]){
                                        return resolve('created new category'); 
                                    }
                                    else{
                                        return reject('couldnt craete category')
                                    }
                                }
                            )
                        }
                        else{
                            return resolve('category exists')
                        }
                    })

                    categoryPromise
                    .then((resolveMessage)=>{
                        console.log(resolveMessage)
                        const subcategoryPromise = new Promise((res, reject)=>{
                            console.log('inside subcategoryPromise');
                            console.log(this.state)
                            console.log(this.state.category[checkbox.value])
                            if(!this.state.category[checkbox.value][subcategory.value]){
                                console.log('subcategory dont exist')
                                console.log(stateCategory)
                                subcategory.checked = true;
                                this.setState({ 
                                    category: {
                                        ...stateCategory, [checkbox.value]:{
                                            ...stateCategory[checkbox.value], [subcategory.value]: []
                                            }  
                                        }
                                }, 
                                    ()=>{
                                        if(this.state.category[checkbox.value][subcategory.value]){
                                            console.log('create new subcategory')
                                            return res('created new subcategory')
                                        }
                                        else{
                                            return reject('couldnt craete subcategory');
                                        }
                                    }
                                )
                            }
                            else{
                                return res('subcategory already exists');
                            }
                        })

                        subcategoryPromise.then(message=>{
                            console.log(message)
                            callback()
                        }).catch(message => console.log(message))
                        })

                    .catch((reject)=>console.log(reject))
                }
            }

    
        let category = parentCheckbox(e.target.parentNode.parentNode)
        let subcategory = parentCheckbox(e.target.parentNode)
    
        switch (true) {
    
        case classNameCheck('list--category'):
            this.setState({ category: {...this.state.category, [e.target.value]: {} } })
        break;
        
        case classNameCheck('list--subcategory'):
            console.log('subcategory was clicked')
    
            checkboxCheck(category)
            
            this.setState({ category: {
                ...this.state.category, [category.value]:{
                ...this.state.category[category.value], [subcategory.value]:[
                ]
                } 
            } 
            })
    
        break;
            
        case classNameCheck('list--listitem'):
    
            category = parentCheckbox(e.target.parentNode.parentNode.parentNode)
            subcategory = parentCheckbox(e.target.parentNode.parentNode)

            const newListItem = e.target.value;
            
            // this.setState({ category: {
                //     ...this.state.category, [category.value]: {
            //     ...this.state.category[category.value], [subcategory.value]:[
                //     ...this.state.category[category.value][subcategory.value], newListItem
            //     ]
            //     } 
            // } 
            // })
            
            const callback = () => {
                console.log('inside callback')
                console.log(this.state)
                // console.log(this.state[category.value][subcategory.value])
                const newList = [...this.state.category[category.value][subcategory.value], newListItem]
                console.log(newList)
                this.setState({ category: {
                    ...this.state.category, [category.value]: {
                        ...this.state.category[category.value], [subcategory.value]:newList
                        // [
                        // ...this.state.category[category.value][subcategory.value], newListItem
                        // ]
                    } 
                } 
            })
        }
        
        checkboxCheck(category, subcategory, callback);
    
            // this.setState({ category: {
            //   ...this.state.category, [category.value]:{
            //     ...this.state.category[category.value], [subcategory.value]:[
            //         e.target.value
            //       ]
            //     } 
            //   } 
            // })
    
    
        break;
        default:
            return
        }
    
        //THIS REMOVES CHECK AND E.TARGET.VALUE FROM STATE
        // else{
        //   this.setState({[stateKey]: this.state[stateKey].filter(item => item !== e.target.value)})
        // }
    }
}   

  render(){
    return(
      <Context.Provider value={ {state: this.state, onCheck: this.onCheck} }>
        {this.props.children}
      </Context.Provider>
    )
  }

}