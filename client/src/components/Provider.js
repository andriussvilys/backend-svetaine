import React from 'react';
import axios from 'axios';

export const Context = React.createContext();

export class Provider extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      category: {},

      file: null,
      filePath: "",
      imagePreview: null,
      fileName: "",
      fileType: null,
      fileData: {
          files: {},
          column: {
          id: 'column-1',
          fileIds: []
      },
      columnOrder: ['column-1']},

      artworkFamily: "",
      familyDescription: "",
      themes: [],
      seeAlso: [],
      location: "",
      year: "",

      artworkTitle: "",
      artworkDescription: "",
      displayMain: true,
      familyDisplayIndex: Number,

      themesData: [],
      artworkFamilyList: [],
      familySetupData: {
          artworkFamily: null,
          familyDescription: null,
          location: null,
          year: null,
          seeAlso: [],
          themes: [],
          category: {}
      },

      categoriesData: [],
      categoryNames: [],

      imageDir: { 
          files: {
              "file-1": {id: "file-1", content: 'uploads/galaxy-s10plus-g975f-sm-g975fckhseb-backceramicblack.png'},
              "file-2": {id: "file-2", content:  "uploads/image-2019-08-16-12-43-14-175.png"},
              "file-3": {id: "file-3", content: "uploads/MO-JtoA.jpg"},
              "file-4": {id: "file-4", content: "uploads/test.png"},
              "file-5": {id: "file-5", content: "uploads/galaxy-s10plus-g975f-sm-g975fckhseb-backceramicblack.png"},
              "file-6": {id: "file-6", content:  "uploads/image-2019-08-16-12-43-14-175.png"},
              "file-7": {id: "file-7", content: "uploads/MO-JtoA.jpg"},
              "file-8": {id: "file-8", content: "uploads/test.png"},
              "file-9": {id: "file-9", content: "uploads/galaxy-s10plus-g975f-sm-g975fckhseb-backceramicblack.png"},
              "file-10": {id: "file-10", content:  "uploads/image-2019-08-16-12-43-14-175.png"},
              "file-11": {id: "file-11", content: "uploads/MO-JtoA.jpg"},
              "file-12": {id: "file-12", content: "uploads/test.png"}
            },
          columns: {
              "column-1": {
                  id: "column-1",
                  title: "Order files:",
                  fileIds: ["file-1","file-2","file-3","file-4",],
                  indexColor: "#f2ff3b"
              },
              "column-2": {
                id: "column-2",
                title: "Order files-2:",
                fileIds: ["file-5","file-6","file-7","file-8"],
                indexColor: "#c1ff3b"
              },
              "column-3": {
                id: "column-3",
                title: "Order files-2:",
                fileIds: ["file-9","file-10","file-11","file-12"],
                indexColor: "#7de63c"
              }
          },
          columnOrder: ["column-1", "column-2", "column-3"]
        }
            
    }

    // this.themes = () => {
    //     axios.get('/api/themes')
    //     .then( res => {
    //        console.log("******************THEMES ACTIVATED") 
    //        let data = res.data[0].list 
    //        console.log(data)
    //       return data

    //     })
    // }
    
    //FUNCTION THE CHECKS BOXES IN CATEGORY COMPONENT
    this.onCheck = (e) => {

        //this is handled if a checkbox is UNCHECKED
        if(!e.target.checked){
            let classname = e.target.classList[1]
            let checkboxId = e.target.value
            let subcategory = null
            let category = null
            let listItemNest = null
            let subcategoryNest = null
            let newListitems = null
            let stateCopy = {...this.state.familySetupData}

            if(classname === "listitem"){
                subcategory = e.target.parentNode.parentNode.id
                category = e.target.parentNode.parentNode.parentNode.id
                listItemNest = this.state.familySetupData.category[category][subcategory]

                // console.log('LISTITEM ID')
                // console.log(checkboxId)

                // newListitems = listItemNest.splice(
                //     listItemNest.indexOf(checkboxId), 1
                // )

                newListitems = listItemNest.filter(item => item !== checkboxId)
                console.log('***********************listitem unchecked')
                console.log(newListitems)

                let newState = { 
                    ...this.state,
                    familySetupData: {
                        ...this.state.familySetupData,
                        category: {
                            ...this.state.familySetupData.category,
                            [category]: {
                                ...this.state.familySetupData.category[category],
                                 [subcategory]: newListitems
                            }
                        }
                    }
                }

                console.log('new state after listitem uncheck')
                console.log(newState)
                this.setState(newState)
                return                
            }
            else if (classname === "subcategory"){
                category = e.target.parentNode.parentNode.id
                delete stateCopy.category[category][checkboxId]
                Array.from(document.getElementById(checkboxId).getElementsByTagName('input'))
                    .forEach(item => item.checked = false)
                this.setState(stateCopy)
                return
            }
            else if (classname === "category"){
                category = e.target.parentNode.id
                delete stateCopy.category[category]
                Array.from(document.getElementById(category).getElementsByTagName('input'))
                    .forEach(item => item.checked = false)
                this.setState(stateCopy)
                // e.target.parentNode.classList.toggle('themes-list--selected')
                return
            }
            }

        let stateCategory = this.state.familySetupData.category;
        const parentCheckbox = (target) => Array.from(target.getElementsByTagName('input'))[0];
    
        const classNameCheck = (name) => {
        return e.target.parentNode.classList.contains(name)
        }
    
        const checkboxCheck = (checkbox, subcategory, callback) => {
            // checkbox.checked = true
            if(!subcategory){
                this.setState({ 
                    ...this.state,
                    familySetupData: {
                        ...this.state.familySetupData,
                        category: {
                        ...this.state.familySetupData.category, [checkbox.value]: {} 
                        }                 
                    }
                  })
             }
                else{
                    const categoryPromise = new Promise((resolve, reject) => {
                        // subcategory.checked = true;
                        console.log('clicked a listitem')
                        if(!this.state.familySetupData.category[checkbox.value]){ 
                            console.log('category doesnt exist')
                            checkbox.checked = true;
                            this.setState({ 
                                ...this.state,
                                familySetupData:{
                                    ...this.state.familySetupData,
                                    category: {
                                    ...this.state.familySetupData.category, [checkbox.value]:{}
                                    } 
                                }
                            },
                                () => {
                                    if(this.state.familySetupData.category[checkbox.value]){
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
                            if(!this.state.familySetupData.category[checkbox.value][subcategory.value]){
                                console.log('subcategory dont exist')
                                console.log(stateCategory)
                                subcategory.checked = true;
                                this.setState({ 
                                    ...this.state,
                                    familySetupData:{
                                        ...this.state.familySetupData,
                                        category: {
                                            ...this.state.familySetupData.category, 
                                            [checkbox.value]:{
                                                ...this.state.familySetupData.category[checkbox.value], 
                                                [subcategory.value]: []
                                                }  
                                            }
                                    }
                                }, 
                                    ()=>{
                                        if(this.state.familySetupData.category[checkbox.value][subcategory.value]){
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
            let newState = {
                familySetupData:{
                    ...this.state.familySetupData,
                    category: {
                        ...this.state.familySetupData.category, 
                        [e.target.value]: {} 
                    }
                }
            }
            this.setState(newState)

        break;
        
        case classNameCheck('list--subcategory'):
            console.log('subcategory was clicked')
    
            checkboxCheck(category)

            this.setState({ 
                familySetupData:{
                ...this.state.familySetupData,
                    category: {
                        ...this.state.familySetupData.category, [category.value]:{
                            ...this.state.familySetupData.category[category.value], [subcategory.value]:[
                            ]
                        } 
                    } 
            } 
            })
    
        break;
            
        case classNameCheck('list--listitem'):
            category = parentCheckbox(e.target.parentNode.parentNode.parentNode)
            subcategory = parentCheckbox(e.target.parentNode.parentNode)

            const newListItem = e.target.value;
            
            const callback = () => {
                console.log('inside callback')
                console.log(this.state)
                // console.log(this.state[category.value][subcategory.value])
                const newList = [...this.state.familySetupData.category[category.value][subcategory.value], newListItem]
                console.log('*************************************NEW LIST *********************************')
                console.log(newList)
                let newState = { 
                        ...this.state,
                        familySetupData: {
                            ...this.state.familySetupData,
                            category: {
                            ...this.state.familySetupData.category, [category.value]: {
                                ...this.state.familySetupData.category[category.value], 
                                [subcategory.value]: newList
                            } 
                        } 
                        }
                }
                this.setState(newState)
        }
        
        checkboxCheck(category, subcategory, callback);
        break;
        default:
            return
        }
    }

    this.addFileToState = (e) => {

        const fileCount = e.target.files.length

        // let fileData = []
        let obj = {
            files: {},
            column: {
                id: 'column-1',
                fileIds: []
            },
            columnOrder: ['column-1']
        }
        
        
        Array.from(e.target.files).forEach(file => {
            const reader = new FileReader();
            
            if(this.state.fileData.column.fileIds.indexOf(file.name) >= 0){
                alert(`the file ${file.name} has already been selected`)
                return
            }

            reader.onload = () => {
                console.log("FILE")
                console.log(file.name)

                obj.files[file.name] = {                    
                    preview: String(reader.result),
                    file: file,
                    fileName: file.name, 
                    fileType: file.type,
                    src: `uploads/${file.name}`
                }

                let newState = {
                    ...this.state, 
                    fileData: {
                        ...this.state.fileData,
                        files: {...this.state.fileData.files, [file.name]: obj.files[file.name]},
                        column: {...this.state.fileData.column, fileIds: [...this.state.fileData.column.fileIds, file.name]}
                }} 


                obj.column.fileIds.push(file.name)

                if(obj.column.fileIds.length === fileCount){
                    console.log(obj)                    
                }
                // this.setState({fileData: obj})
                this.setState(newState)

            }
            reader.readAsDataURL(file);
        });
    }
    //THIS UPLOADS FILE TO SERVER
    this.uploadFile = () => {
        console.log('UPLOAD FILE RUNS')
        const fd = new FormData();
        fd.append('artworkImage', this.state.file, this.state.fileName)
        // fd.append('name', this.state.fileName)
        axios.post('/api/artworkInfo/imageUpload', fd)
            .then(res => {
                console.log(res)
            })
            .catch(err => alert(err))
    }
    
    this.changeFileName = (e) => {
        let nameWithFileType = `${e.target.value.split('.')[0]}.${this.state.fileType.split('/')[1]}`
        this.setState({ fileName: nameWithFileType, filePath: `uploads/${nameWithFileType}` })

        // let fileReader = this.state.file
        // console.log(fileReader)
        // fileReader.name = e.target.value
        // this.setState({ fileReader, fileName: e.target.value
        // })
    }

    this.themesCheck = (e, string) => {
        if(e.target.checked){
            if(string === "artworkFamily"){
                this.setState({ [string]:  e.target.value},
                    () => this.getFamilySetup(
                        function callback(){
                            if(document.getElementById("familyDisplaySetup__radio-yes").checked){
                                console.log("RADIO IS CHECKED ********************************")
                                this.useFamilySetup()
                            }
                        }
                    )
                    )


                return
            }
            let newState = {
                ...this.state,
                familySetupData: {
                    ...this.state.familySetupData,
                    [string]: [...this.state.familySetupData[string], e.target.value]
                }
            }
            this.setState(newState)
            e.target.parentNode.classList.toggle('themes-list--selected')
        }
        else{
            let newNest = this.state.familySetupData[string].filter(item => item !== e.target.value);
            let newState = {
                ...this.state,
                familySetupData: {
                    ...this.state.familySetupData,
                    [string]: newNest
                }
            }
            this.setState(newState)
            e.target.parentNode.classList.toggle('themes-list--selected')
        }
    }

    this.autoCheckCategory = () => {

    }

    //this is used for non-nested inputs like ARTWORK FAMILY or THEMES
    this.autoCheck = (stateKey, value) => {

        if(stateKey === "artworkFamily"){
            return
        }
        let inputParent = null

        if(document.getElementById(`${stateKey}-${value}`)){
            inputParent = document.getElementById(`${stateKey}-${value}`).parentNode;
        }

        if(this.state.familySetupData[stateKey]){
            if(this.state[stateKey].includes(value) || this.state.familySetupData[stateKey].includes(value)){
                if(!inputParent.classList.contains('themes-list--selected')){
                    inputParent.classList.add('themes-list--selected')
                }
                return true
            }
        }
        else if(!this.state.familySetupData[stateKey]){
            if(this.state[stateKey].includes(value)){
                if(!inputParent.classList.contains('themes-list--selected')){
                    inputParent.classList.add('themes-list--selected')
                }
                return true
            }
        }

            if(inputParent && inputParent.classList.contains('themes-list--selected')){
                inputParent.classList.remove('themes-list--selected')
            }
            return false
    }

    this.createDropDownList = (array, string) => {
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
                    type={inputType}
                    value={listItem}
                    checked={this.autoCheck(string, listItem)} 
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

    this.makeDataList = (array, string, listId) => {
        // console.log('*****make datalist array*****')
        // console.log(string)

        if(array.length === 0 || !array){
            return            
        }

        let options = array.map( optionValue => {
            return (<option key={`option-${optionValue}`} value={optionValue}/>)
        })
        let datalist = <datalist id={`datalist-${string}`}>{options}</datalist>
        return (
            <div>
                <form 
                    className="center-column"
                    onSubmit={
                        (e) => {
                            console.log('clicked submit')
                            console.log(e.target)
                            e.preventDefault();
                            if(!array.includes(e.target.firstChild.value)){
                                alert(`no such ${string} exists. Please "ADD NEW" and repeat`)
                                return
                            }
                            if(typeof this[string] !== 'string'){
                                console.log('this is not a string')
                                console.log(string)
                                // this.setState({ [string]: [...this.state[string], e.target.firstChild.value] })
                            }
                            else{
                                this.setState({ [string]: e.target.firstChild.value })
                            }
                            document.getElementById(`${string}-${e.target.firstChild.value}`).checked = true
                        }
                    } 
                >
                    <input 
                    placeholder={string} 
                    // value={typeof this.state[string] === 'string' ? this.state[string] : this.state[string][this.state[string].length-1]}
                    list={`datalist-${string}`} 
                    name={`datalist-${string}`} 
                    id={`datalist-input-${string}`}
                    // onFocus={() => {document.getElementById(listId).classList.remove('no-display')}}
                    />
                    <label htmlFor={`datalist-input-${string}`} className="subtitle" style={{fontSize: "11px"}}>
                        double click to view list of options<br/>
                        press 'Enter' to submit
                        </label>

                    {datalist}               
                </form>
            </div>
        )
    }

    this.extendList = (e, listId) => {
        console.log(listId)
        console.log(e.target)
    // e.target.classList.toggle('icon-rotate');
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
    this.addNew = (e, id, router, requestKey, stateKey, callback) => {
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
        .then(res => {
            if(callback){
                callback()
            }
        })
      }

    this.createFamilySetup = () => {
        let requestBody = {
            category: this.state.category,
            artworkFamily: this.state.artworkFamily,
            familyDescription: this.state.familyDescription,
            themes: this.state.themes,
            seeAlso: this.state.seeAlso,
            location: this.state.location,
            year: this.state.year
        }
        if(!this.state.artworkFamily){
            alert('select or add new Family Name')
            return
        }
        console.log(requestBody)
        axios.post('/api/familySetup/create', requestBody)
            .then( res => console.log(res))
            .catch(err => {console.log(err); alert(err)})
    }

    // SAMPLE MODEL
            // {
            //     "category": {
            //       "studio": {
            //         "studio": []
            //       }
            //     },
            //     "artworkFamily":
            //       "new"
            //     ,
            //     "themes": [
            //       "ANDRIUS",
            //       "<3",
            //       "Kamil",
            //       "fruit"
            //     ],
            //     "seeAlso": [
            //       "UUUUUUUUU"
            //     ],
            //     "location": "",
            //     "year": ""
            //   }

    this.getFamilySetup = (callback) => {
        let familyName = this.state.artworkFamily;

        axios.get(`/api/familySetup/${familyName}`)
        .then( res => {

            this.setState({ familySetupData: res.data}, 
                callback
            )

        })

    }

    this.useFamilySetup = () => {

        if(this.state.familySetupData){
            Object.keys(this.state.familySetupData).forEach(property => {
                // console.log(property)
                // console.log(this.state.familySetupData[property] === "")
                // console.log("_____________________________________________________")
                this.setState({ [property]: this.state.familySetupData[property]})
            })
        }
        else{
            this.setState({
                familyDescription: "",
                themes: [],
                seeAlso: [],
                location: "",
                year: "",
                category: {

                }              
            })
        }

    // {   
    //     category: Schema.Types.Mixed,
    //     artworkFamily: {
    //     },
    //     familyDescription: {
    //     },
    //     themes: {
    //     },
    //     seeAlso: {
    //     },
    //     location: {
    //     },
    //     year: {
    //     }
    // }

    }

    this.categoryMethods = {
        getCategoryNames: () => {
            if(this.state.categoryNames.length < 1){
                console.log('***get category names')
                if(this.state.categoriesData){
                    let categoryNames =  this.state.categoriesData.map(obj => obj.category)
                    this.setState({categoryNames: categoryNames}, ()=>{
                        let categoryOptionList = this.state.categoryNames.map(name => {
                            return <option key={`add-category-${name}`} value={name}>{name}</option>
                        })
                        return this.setState({categoryDatalist: categoryOptionList})
                    })
                }
            }
            else{return}
        },

        getSubcategoryNames: () => {
            if(document.getElementById("add-category").value){
                let selectedCategory = document.getElementById("add-category").value;
                let subcategories = this.state.categoriesData.find(item => item.category === selectedCategory)
                if(subcategories && subcategories.subcategory){
                    let subcategoriesDatalist = Object.keys(subcategories.subcategory).map(subcategory => {
                        let option = <option key={`add-subcategory-${subcategory}`} value={subcategory}>{subcategory}</option> 
                        console.log(option)
                        return option
                    })
                    this.setState({subcategoryDatalist: subcategoriesDatalist})
                }
            }
    
        },

        submitNewCategory: () => {

            const categoryInput = document.getElementById("add-category")
            const subcategoryInput = document.getElementById("add-subcategory")
            const listitemInput = document.getElementById("add-listitem")
    
            let reqBody = {category: null, subcategory: {}}
            //IF THE VALUE DOES NOT EXIST IN THE CATEGORYNAMES ARRAY IE IS NEW
            if(this.state.categoryNames.indexOf(categoryInput.value) < 0){
                reqBody = {category: categoryInput.value}
                if(subcategoryInput.value){
                    reqBody.subcategory = {[subcategoryInput.value]: []}
                }
                if(listitemInput.value){
                    reqBody.subcategory[subcategoryInput.value] = [listitemInput.value]
                }
                // reqBody = JSON.stringify(reqBody)
                // console.log(reqBody)
                axios.post('/api/categories/create', reqBody)
                .then(res => {
                    console.log(res)
                    this.setState({
                        categoriesData: [...this.state.categoriesData, res.data], 
                        categoryNames: [...this.state.categoryNames, res.data.category]
                    })
                })
                .catch(err => console.log(err))
            }
        },

        updateCategory: () => {
            const categoryInput = document.getElementById("add-category")
            const subcategoryInput = document.getElementById("add-subcategory")
            const listitemInput = document.getElementById("add-listitem")

            //check if the CATGORY input value is already recorded in the database
            //if it is run submitNewCategory method instead and exit this function
            if(this.state.categoryNames.indexOf(categoryInput.value) < 0){
                console.log('this category doesnt exist')
                this.categoryMethods.submitNewCategory()
                return
            }

            //if category name already exists
            let objToUpdate = this.state.categoriesData.find(obj => obj.category === categoryInput.value)
            console.log(objToUpdate)
            let objIndex = this.state.categoriesData.indexOf(objToUpdate)


            let categoriesDataUpdate = this.state.categoriesData
            let subcategoryArray = categoriesDataUpdate[objIndex].subcategory[subcategoryInput.value]
            //if subcategory doesnt exist, initiate it
            if(!subcategoryArray){
                subcategoryArray = []
                categoriesDataUpdate[objIndex].subcategory[subcategoryInput.value] = subcategoryArray
            }
            //if new listitem has been entered
            if(listitemInput.value){
                categoriesDataUpdate[objIndex].subcategory[subcategoryInput.value] = [...subcategoryArray, listitemInput.value];
            }
            this.setState({categoriesDataUpdate},
                () => {console.log(objToUpdate);
                axios.put('/api/categories/update', objToUpdate)
                })
        }
    
    }
           
    this.readImageDir = () => {
        axios.get('/fetchImages')
        // .then(res => {console.log(res.data)})
        .then(res => this.setState({imageDir: res.data}))
    }
}   //END OF CONTSTRUCTOR

themes = {}

onDragEnd = (result) => {

    const {destination, source, draggableId} = result;

    if(!destination){
        return
    }
    
    const column = this.state.fileData.column[source.droppableId];
    // const column = this.state.column[source.droppableId];

        let newFileIds = this.state.fileData.column.fileIds

        newFileIds.splice(source.index, 1)
        newFileIds.splice(destination.index, 0, draggableId)

        const newColumn = {
            ...column,
            fileIds: newFileIds
        }

        const newState = {
            ...this.state.fileData.column,
            columns: {
                ...this.state.fileData.column,
                [newColumn.id]: newColumn
            }
        }

        this.setState(newState)
}

removeFile = (fileName) => {
    let newFiles = {}
    Object.keys(this.state.fileData.files).forEach(file => {
        console.log('CURRENT FILE')
        console.log(file)
        if(file.fileName === fileName){
            return
        }
        newFiles = {...newFiles, [file]: this.state.fileData.files[file]}
    })

    console.log('NEW FIELS')
    console.log(newFiles)

    let newState = {
        ...this.state,
        fileData: {
            ...this.state.fileData,
            column: {
                ...this.state.fileData.column,
                fileIds: this.state.fileData.column.fileIds.filter(file => file !== fileName)
            },
            files: newFiles
        }}
    
    this.setState(newState)
}

componentDidMount(){
    console.log('**********************component did mount')

        axios.get('/api/themes')
        .then( res => {
          console.log('**************themes DATA')
          console.log(res.data)
          this.setState({ themesData: res.data.list})
          console.log(this.state.themesData)
          this.themes = res.data.list
          console.log("*********************THEMES PROP")
          console.log(this.themes)
        })

        .then( resolved => {
            axios.get('/api/artworkFamilyList')
            .then( res => {
            console.log('**************artworkFamilyList DATA')
            console.log(res.data)
            this.setState({ artworkFamilyList: res.data[0].list})
            console.log(this.state.artworkFamilyList)
            })
        }
        )  
        .then(resolved => {
            axios.get('/api/categories')
            .then(res => {
                console.log('*********************categories DATA')
                console.log(res.data)
                this.setState({categoriesData: res.data})
            })
        })
        .then(res => this.readImageDir())
}

  render(){
    return(
      <Context.Provider value={ {
          state: this.state, 
          onCheck: this.onCheck, 
          uploadFile: this.uploadFile, 
          addFileToState: this.addFileToState,
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
          addNew: this.addNew,
          createFamilySetup: this.createFamilySetup,
          getFamilySetup: this.getFamilySetup,
          useFamilySetup: this.useFamilySetup,
          categoryMethods: this.categoryMethods,
          onDragEnd: this.onDragEnd,
          removeFile: this.removeFile
          } }>
        {this.props.children}
      </Context.Provider>
    )
  }

}

