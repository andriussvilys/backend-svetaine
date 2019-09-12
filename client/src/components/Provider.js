import React from 'react';
import axios from 'axios';

export const Context = React.createContext();

export class Provider extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      category: {},
      uploadURL: null,
      fileName: "",
      artworkFamily: "",
      artworkTitle: "",
      displayMain: true,
      familyDisplayIndex: Number,
      fileType: null,
      themes: [],
      seeAlso: [],
      location: "",
      year: "",
      themesData: [],
      artworkFamilyList: [],
      familySetupData: []
    }
    // this.themes = require('../JSON/themes.json')
    this.themes = []

    // this.artworkData = require('../JSON/artwork.json')
    
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
    this.uploadFile = (e) => {
        console.log('clicked input')
        // const input = document.getElementById("uploadInput");
        const input = e.target;
    
        var reader = new FileReader();
    
            reader.onload = function(){
            //   var output = document.getElementById('uploadPreview');
            //   var dataURL = reader.result;
              this.setState({ uploadURL: reader.result, fileName: input.files[0].name, fileType: input.files[0].type})
            //   output.src = dataURL;
            }.bind(this);
            reader.readAsDataURL(input.files[0])
    }
    this.changeFileName = (e) => {
        this.setState({ fileName: e.target.value })
    }
    this.themesCheck = (e, string) => {
        this.setState({ [string]: [...this.state[string], e.target.value]})
    }

    this.createDropDownList = (array, string) => {
        // console.log(array)
        let sortedArray = Array.from(new Set(array.sort()));
        // console.log(sortedArray)
        let listItems = sortedArray.map((listItem) => {
            return (
                <li className="dropdown-item themes-list" key={`${string}-${listItem}`}>
                    <span className="themes-span">{listItem}</span>
                    <input 
                    id={`${string}-${listItem}`}
                    className="themes-checkbox" 
                    type="checkbox" 
                    value={listItem} 
                    onChange={(e) => this.themesCheck(e, string)}/>
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
          let counter = 0;
          let subcounter = 10;
          listItems.forEach((item, index)=> {
            // console.log(index)
  
            if(index < 10){
                // console.log(columns[0])
              columns[0] = [...columns[0], item]
            }
            
            else{
              // index.toString().startsWith(counter.toString())
              subcounter += 1;
            //   console.log(`subcounter is ${subcounter}`)
              if(Number.isInteger(subcounter / 10)){
                counter += 1;
              }
              columns[counter] = [...columns[counter], item]
            }
          })
          console.log(columns)
          let finalList = columns.map((array, index) => {
            return(<ul className="no-padding" key={`${string}-${index}`}>
              {array}
            </ul>)
          })
          console.log(finalList)
          return finalList;
        }
  
        return columnLists()
    }

    this.makeDataList = (array, string) => {
        console.log('*****make datalist array*****')
        console.log(string)

        if(array.length === 0 || !array){
            return            
        }

        let options = array.map( optionValue => {
            return (<option key={`option-${optionValue}`} value={optionValue} />)
        })
        return (
                <form 
                    onSubmit={
                        (e) => {
                            console.log('clicked submit')
                            console.log(e.target)
                            e.preventDefault();
                            if(typeof this[string] !== 'string'){
                                this.setState({ [string]: [...this.state[string], e.target.firstChild.value] })
                            }
                            else{
                                this.setState({ [string]: e.target.firstChild.value })
                            }
                            document.getElementById(`${string}-${e.target.firstChild.value}`).checked = true
                        }
                    } 
                >
                    <input placeholder={string} list={`datalist-${string}`} name={string} />
                    <datalist id={`datalist-${string}`}>
                        {options}
                    </datalist>
                </form>
        )
    }

    this.extendList = (e, listId) => {
    e.target.classList.toggle('icon-rotate');
    document.getElementById(listId).classList.toggle('no-display');
    }

    this.onChange = (e, stateTarget) => {
        console.log(`${stateTarget} = ${e.target.value}`);
        if(e.target.value === "yes"){
            this.setState({ [stateTarget]: true})    
        }
        else if(e.target.value === "no"){
            this.setState({ [stateTarget]: false})
        }
        else{
            this.setState({ [stateTarget]: e.target.value})
        }
    }

    // this.loadData = () => {
    // console.log(`loadData ${'themes'}`)
    //     axios.get(`/api/themes/`)
    //     .then( res => {
    //         console.log('*********lLOAD DATA RES')
    //         console.log(res)
    //         let result = res.data[0].list
    //         this.themes = [...this.themes, result];
    //         console.log('********************THIS.THEMES')
    //         console.log(this.themes)
    //     })
    //     .catch(err => {console.log('**************load data error'); console.log(err)})
    // }

    this.themesGET = () => {
    axios.get('/api/themes')
    .then( res => {
        // console.log('reached 5000')
        // console.log(res.data)
        let themes = res.data[0].list
        console.log(themes)
        return themes
    })
    }

    this.addNew = (e, id, router, requestKey, stateKey) => {
        e.preventDefault();
        console.log('addNew Runs')
        console.log(id)
        console.log(router)
        console.log('***********************request KEY')
        console.log(requestKey)
        const newAddition = document.getElementById(id).value;
        console.log(newAddition)
        axios.put(router, {[requestKey]: newAddition})
        // axios.put(router, requestKey, requestValue)
        // eg.: axios.put('api/themes/update', {[key]: "value"})
        .then( res => {
          let addition = res.data[requestKey]
          console.log(addition)
          return addition
        })
        .then(res => {
            this.setState({ [stateKey]: [...this.state[stateKey], newAddition]})
        })
      }

}   //END OF CONTSTRUCTOR

componentDidMount(){
    console.log('**********************component did mount')

        axios.get('/api/themes')
        .then( res => {
        //   this.themes = res.data[0].list
          console.log('**************themes DATA')
          console.log(res.data)
          this.setState({ themesData: res.data[0].list})
          console.log(this.state.themesData)
        })
        // .then( resolved => {
        //     axios.get('/api/artworkInfo')
        //     .then( res => {
        //     //   this.themes = res.data[0].list
        //       let allNames = []
        //       res.data.forEach(obj => {
        //           if(obj.artworkFamily.length > 0){
        //             obj.artworkFamily.forEach(name => allNames.push(name))
        //           }
        //       })
        //       allNames = allNames.filter(name => name !== "")
        //       console.log('**************artworkInfo DATA')
        //       console.log(allNames)
        //       this.setState({artworkFamilyList: allNames})
        //       console.log(this.state.artworkFamilyList)
        //     })
        // }
        // )
        .then( resolved => {
            axios.get('/api/artworkFamilyList')
            .then( res => {
            //   this.themes = res.data[0].list
            console.log('**************artworkFamilyList DATA')
            console.log(res.data)
            this.setState({ artworkFamilyList: res.data[0].list})
            console.log(this.state.artworkFamilyList)
            })
        }
        )
        .then(resolved => {
            axios.get('/api/familySetup')
            .then( res => {
            //   this.themes = res.data[0].list
              console.log('**************familySetup DATA')
              console.log(res.data)
              this.setState({ familySetupData: res.data[0].list})
              console.log(this.state.familySetupData)
            })
        })
        
  
}
// componentDidUpdate(){
//     console.log('**********************component did UPDATE')

//     if(this.state.themesData.length > this.state.prevState.themesData.length){}
//     axios.get('/api/themes')
//     .then( res => {
//     //   this.themes = res.data[0].list
//       console.log('**************themes DATA')
//       console.log(res.data)
//       this.setState({ themesData: res.data[0].list})
//       console.log(this.state.themesData)
//     })
//     if(this.state.artworkFamilyList.length > this.state.prevState.artworkFamilyList.length){
//             axios.get('/api/artworkFamilyList')
//             .then( res => {
//             //   this.themes = res.data[0].list
//             console.log('**************artworkFamilyList DATA')
//             console.log(res.data)
//             this.setState({ artworkFamilyList: res.data[0].list})
//             console.log(this.state.artworkFamilyList)
//             })
//     }

//     if(this.state.familySetupData.length > this.state.prevState.familySetupData.length){
//         axios.get('/api/familySetup')
//         .then( res => {
//         //   this.themes = res.data[0].list
//           console.log('**************familySetup DATA')
//           console.log(res.data)
//           this.setState({ familySetupData: res.data[0].list})
//           console.log(this.state.familySetupData)
//         })
//     }

// }

// themesGET = () => {
//     axios.get('/api/themes')
//     .then( res => {
//       // console.log('reached 5000')
//       // console.log(res.data)
//       let themes = res.data[0].list
//       this.themes = themes;
//       console.log(themes)
//       return themes
//     })
//   }

  render(){
    return(
      <Context.Provider value={ {
          state: this.state, 
          onCheck: this.onCheck, 
          uploadFile: this.uploadFile, 
          changeFileName: this.changeFileName,
          themes: this.themes,
          artworkData: this.artworkData,
          themesCheck: this.themesCheck,
          createDropDownList: this.createDropDownList,
          makeDataList: this.makeDataList,
          extendList: this.extendList,
          onChange: this.onChange,
          add: this.add,
          loadData: this.loadData,
          themesGET: this.themesGET,
          addNew: this.addNew
          } }>
        {this.props.children}
      </Context.Provider>
    )
  }

}