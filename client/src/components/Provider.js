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
          useFamilySetup: false,
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
    
    //FUNCTION THE CHECKS BOXES IN CATEGORY COMPONENT
    this.onCheck = (e) => {

        //this is handled if a checkbox is UNCHECKED
        if(!e.target.checked){
            let classname = e.target.classList[1]
            let checkboxId = e.target.value
            let subcategory = null
            let category = null
            let listItemNest = null
            let newListitems = null
            let stateCopy = {...this.state.familySetupData}

            if(classname === "listitem"){
                subcategory = e.target.parentNode.parentNode.id
                console.log('clicked listitem')
                console.log(subcategory)
                category = e.target.parentNode.parentNode.parentNode.id
                listItemNest = this.state.familySetupData.category[category][subcategory]
                newListitems = listItemNest.filter(item => item !== checkboxId)

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

                this.setState(newState)
                return                
            }
            else if (classname === "subcategory"){
                category = e.target.parentNode.parentNode.parentNode.id

                delete stateCopy.category[category][checkboxId]
                Array.from(document.getElementById(checkboxId).getElementsByTagName('input'))
                    .forEach(item => item.checked = false)
                this.setState(stateCopy)
                return
            }
            else if (classname === "category"){
                category = e.target.parentNode.parentNode.id
                delete stateCopy.category[category]
                Array.from(document.getElementById(category).getElementsByTagName('input'))
                    .forEach(item => item.checked = false)
                this.setState(stateCopy)
                // e.target.parentNode.classList.toggle('themes-list--selected')
                return
            }
            }


        //This creates checkbox trees and and values to it
        const parentCheckbox = (target) => {
            return Array.from(target.getElementsByTagName('input'))[0]; 
        };
    
        const classNameCheck = (name) => {

            if(name === "list--listitem"){
                return e.target.parentNode.classList.contains(name)    
            }
            return e.target.parentNode.parentNode.classList.contains(name)
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
                        if(!this.state.familySetupData.category[checkbox.value]){ 
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
                        const subcategoryPromise = new Promise((res, reject)=>{
                            if(!this.state.familySetupData.category[checkbox.value][subcategory.value]){
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
                            callback()
                        }).catch(message => console.log(message))
                        })

                    .catch((reject)=>console.log(reject))
                }
        }

        let category = parentCheckbox(e.target.parentNode.parentNode.parentNode)
        let subcategory = parentCheckbox(e.target.parentNode.parentNode)
    
        switch (true) {
    
        case classNameCheck('list--category'):
            let newState = {
                familySetupData:{
                    ...this.state.familySetupData,
                    category: {
                        ...this.state.familySetupData.category, 
                        [category.value]: {} 
                    }
                }
            }
            this.setState(newState)

        break;

        case classNameCheck('list--listitem'):
            category = parentCheckbox(e.target.parentNode.parentNode.parentNode)
            subcategory = parentCheckbox(e.target.parentNode.parentNode)

            const newListItem = e.target.value;
            
            const callback = () => {
                const newList = [...this.state.familySetupData.category[category.value][subcategory.value], newListItem]
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
        
        case classNameCheck('list--subcategory'):
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
                }
                this.setState(newState)

            }
            reader.readAsDataURL(file);
        });
    }
    //THIS UPLOADS FILE TO SERVER
    this.uploadFile = () => {
        const fd = new FormData();
        fd.append('artworkImage', this.state.file, this.state.fileName)
        // fd.append('name', this.state.fileName)
        axios.post('/api/artworkInfo/imageUpload', fd)
            .then(res => {
            })
            .catch(err => alert(err))
    }
    
    this.changeFileName = (e) => {
        let nameWithFileType = `${e.target.value.split('.')[0]}.${this.state.fileType.split('/')[1]}`
        this.setState({ fileName: nameWithFileType, filePath: `uploads/${nameWithFileType}` })
    }

    this.themesCheck = (e, string) => {
        
            if(string === "artworkFamily"){

                this.getFamilySetup(e.target.value)
                return
            }
            if(e.target.checked){
                let newState = {
                    ...this.state,
                    familySetupData: {
                        ...this.state.familySetupData,
                        [string]: [...this.state.familySetupData[string], e.target.value]
                    }
                }
                this.setState(newState)
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
            }
    }

    this.autoCheckCategory = () => {

    }

    //this is used for non-nested inputs like ARTWORK FAMILY or THEMES
    this.autoCheck = (stateKey, value) => {

        let inputParent = null

        if(document.getElementById(`${stateKey}-${value}`)){
            inputParent = document.getElementById(`${stateKey}-${value}`).parentNode;
        }

        //if state contains this key (e.g. artworkFamily)
        if(this.state.familySetupData[stateKey]){
            //check if the checkbox value is recorded in this state nest:
            if(this.state.familySetupData[stateKey].includes(value)){
                //if checkbox parent is not highlighted, highlight it
                if(inputParent){
                    if(!inputParent.classList.contains('themes-list--selected')){
                        inputParent.classList.add('themes-list--selected')
                    }
                }
                //check the checkbox 
                return true
            }
            //if the value is not present in state
            else {
                //unhighlight checkbox parent
                if(inputParent){
                    if(inputParent.classList.contains('themes-list--selected')){
                        inputParent.classList.remove('themes-list--selected')
                    }
                }
                // set checked={} to false
                return false
            }
        }

        else return false
    }

    this.createDropDownList = (array, string) => {
        let sortedArray = Array.from(new Set(array.sort()));
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
                            e.preventDefault();

                            if(string === "artworkFamily"){
                                const newTarget = document.getElementById(`datalist-input-${string}`).value
                                this.getFamilySetup(newTarget)
                                return
                            }

                            if(!array.includes(e.target.firstChild.value)){
                                alert(`no such ${string} exists. Please "ADD NEW" and repeat`)
                                return
                            }
                            if(typeof this[string] !== 'string'){
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
    document.getElementById(listId).classList.toggle('no-display');
    }

    this.onChange = (e, stateTarget) => {
        let newValue = {
            ...this.state,
            familySetupData: {
                ...this.state.familySetupData,
                [stateTarget]: e.target.value
            }
        }

        this.setState(newValue)
        // if(e.target.value === "yes"){
        //     this.setState({ [stateTarget]: true})    
        // }
        // else if(e.target.value === "no"){
        //     this.setState({ [stateTarget]: false})
        // }
        // else{
        //     this.setState({ [stateTarget]: e.target.value})
        // }
    }
    this.addNew = (e, id, router, requestKey, stateKey, callback) => {
        e.preventDefault();
        const newAddition = document.getElementById(id).value;
        console.log('ITEM TO ADD')
        console.log(newAddition)
        axios.put(router, {[requestKey]: newAddition})
        .then( res => {
          let addition = res.data[requestKey]
          console.log("JSON obj")
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
            category: this.state.familySetupData.category,
            artworkFamily: this.state.familySetupData.artworkFamily,
            familyDescription: this.state.familySetupData.familyDescription,
            themes: this.state.familySetupData.themes,
            seeAlso: this.state.familySetupData.seeAlso,
            location: this.state.familySetupData.location,
            year: this.state.familySetupData.year
        }
        if(!this.state.familySetupData.artworkFamily){
            alert('select or add new Family Name')
            return
        }
        axios.post('/api/familySetup/create', requestBody)
            .then( res => {console.log(res); alert('success')})
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

    this.getFamilySetup = (value, string, fileName) => {

        console.log('GET FAMILY SETUP*******************************')
        console.log(`value ${value}`)
        console.log(`fileName ${fileName}`)

        axios.get(`/api/familySetup/${value}`)
        .then( res => {

            let newFamilySetup = {}
            let newState = {}

            if(fileName){
                newFamilySetup = {...this.state.fileData.files[fileName]}
            }

            Object.keys(res.data).forEach(objKey => {
                newFamilySetup = {
                    ...newFamilySetup,
                    [objKey]: res.data[objKey]
                    }
            })

            console.log('new family setup')
            console.log(newFamilySetup)

            if(fileName){

                Object.keys(res.data).forEach(objKey => {
                    newFamilySetup = {
                        ...newFamilySetup,
                            [objKey]: res.data[objKey]
                        }
                })

                newState = {...this.state,
                    fileData: {
                        ...this.state.fileData,
                        files: {
                            ...this.state.fileData.files,
                            [fileName]: newFamilySetup
                        }
                    }
                }

                console.log('newState')
                console.log(newFamilySetup)

                this.setState(newState)
                return
            }

            this.setState({ familySetupData: newFamilySetup})

        })
        .catch(err => 
            {
            alert(err)
            this.setState({familySetupData: {...this.state.familySetupData, artworkFamily: value}})
            }
        )

    }

    this.useFamilySetup = (value) => {

        let newState = {
            ...this.state,
            familySetupData: {
                ...this.state.familySetupData,
                useFamilySetup: value
            }
        }

        this.setState(newState)
    }

    this.readImageDir = () => {
        axios.get('/fetchImages')
        .then(res => this.setState({imageDir: res.data}))
    }

    this.categoryMethods = {
        getCategoryNames: () => {
            if(this.state.categoryNames.length < 1){
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
                axios.post('/api/categories/create', reqBody)
                .then(res => {
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
                this.categoryMethods.submitNewCategory()
                return
            }

            //if category name already exists
            let objToUpdate = this.state.categoriesData.find(obj => obj.category === categoryInput.value)
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
        },
        autoCheckListItem: (category, subcategory, listitem) => {
            if(!this.state.familySetupData.category){return}
            if(this.state.familySetupData.category[category]){
                if(this.state.familySetupData.category[category][subcategory]){
                    if(this.state.familySetupData.category[category][subcategory].includes(listitem)){
                        return true
                    } 
                    else{
                        return false
                    }
                }
                return false
            }
            return false
        },
        autoCheckSubcategory: (category, subcategory) => {
            if(!this.state.familySetupData.category){return}
            if(this.state.familySetupData.category[category]){
                if(this.state.familySetupData.category[category][subcategory]){
                    return true
                }
                else{
                    return false
                }
            }
            return false
        },
        autoCheckCategory: (category) => {
            if(!this.state.familySetupData.category){return}
            if(this.state.familySetupData.category[category]){
                    return true
                }
                else{
                    return false
                }
        }
    
    }
           
    this.fileDataMethods = {
        onChange: (value, string, fileName) => {

            if(string !== "artworkFamily"){
                if(!this.state.fileData.files[fileName][string]){
                    this.state.fileData.files[fileName][string] = []
                }
            }

            if(this.state.fileData.files[fileName][string].includes(value) && 
                Array.isArray(this.state.fileData.files[fileName][string])
                ){
                let newList = this.state.fileData.files[fileName][string].filter(item => item !== value)

                let newState = {
                    ...this.state,
                    fileData: {
                        ...this.state.fileData,
                        files: {
                            ...this.state.fileData.files,
                            [fileName]: {
                                ...this.state.fileData.files[fileName],
                                [string]: newList
                            }
                        }
                    }
                }

                this.setState(newState)
                return
            }
            // let newState = {
            //     ...this.state,
            //     fileData: {
            //         ...this.state.fileData,
            //         files: {
            //             ...this.state.fileData.files,
            //             [fileName]: {
            //                 ...this.state.fileData.files[fileName],
            //                 [string]: string !== "artworkFamily" ?  
            //                           [...this.state.fileData.files[fileName][string], value] : 
            //                           value
            //             }
            //         }
            //     }
            // }
            // this.setState(newState)

            let newState = {}
            //if state nest is a String, eg artworkFamily
            if(string === "artworkFamily"){              
                newState = {
                    ...this.state,
                    fileData: {
                        ...this.state.fileData,
                        files: {
                            ...this.state.fileData.files,
                            [fileName]: {
                                ...this.state.fileData.files[fileName],
                                [string]: value
                            }
                        }
                    }
                }
            }

            newState = {
                ...this.state,
                fileData: {
                    ...this.state.fileData,
                    files: {
                        ...this.state.fileData.files,
                        [fileName]: {
                            ...this.state.fileData.files[fileName],
                            [string]: [...this.state.fileData.files[fileName][string], value]
                        }
                    }
                }
            }

            this.setState(newState)

        },

        transferState: (fileName) => {
                let newFileData = this.state.fileData;
                Object.keys(this.state.familySetupData).forEach(key => {
                    newFileData = {
                        ...newFileData, 
                            files: {
                                ...newFileData.files,
                                [fileName]: {
                                    ...newFileData.files[fileName],
                                    [key]: this.state.familySetupData[key]
                                }
                            }
                        }
                    })
                newFileData = {
                    ...newFileData, 
                    files: {
                        ...newFileData.files,
                        [fileName]: {
                            ...newFileData.files[fileName],
                                useFamilySetup: true
                            }
                        }
                    }
                console.log(newFileData)
                this.setState({fileData: newFileData})
        },

        isChecked: (string, value, fileName) => {
            if(this.state.fileData.files[fileName][string].includes(value)){
                return true
            }
            else return false
        },
        
    //     if(this.state.familySetupData[string] && this.state.familySetupData[string].includes(value)){
    //         removeValue(value)
    //     }
    //     else{
    //         addNewValue(value)
    //     }
    //   },
    
        }

    this.familySetupMethods = {
        onChange: (value, string) => {

            console.log(`value ${value}`)
            console.log(`string ${string}`)

            const addNewValue = (newValue) => {
                let newState = {}
                //if state nest is a String, eg artworkFamily
                if(typeof this.state.familySetupData[string] === "string"){              
                    newState = {
                        ...this.state,
                        familySetupData: {
                            ...this.state.familySetupData,
                            [string]: newValue
                        }
                    }
                }
                //if state nest is Array (eg themes or seeAlso)
                else{              
                    newState = {
                        ...this.state,
                        familySetupData: {
                            ...this.state.familySetupData,
                            [string]: [...this.state.familySetupData[string], newValue]
                        }
                    }
                }
                this.setState(newState)
            }
    
            const removeValue = (value) => {
                let newState = {}
                if(typeof this.state.familySetupData[string] === "string"){
                    return
                }
                else{
                    let newArray = this.state.familySetupData[string].filter(item => item !== value)
                    newState = {
                        ...this.state,
                        familySetupData: {
                            ...this.state.familySetupData,
                            [string]: newArray
                        }
                    }
                    this.setState(newState)
                }
            }
            

            if(this.state.familySetupData[string] && this.state.familySetupData[string].includes(value)){
                removeValue(value)
            }
            else{
                addNewValue(value)
            }
          },

        isChecked: (string, value) => {
            if(this.state.familySetupData[string].includes(value)){
                return true
            } 
            else return false
        }
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

    alert('REMOVE FILE')

    // let newState = {...this.state}

    // delete newState.fileData.files[fileName]

    // console.log("REMOVE FILE")
    // console.log(newState)

    let newFiles = {}
    Object.keys(this.state.fileData.files).forEach(file => {
        if(file.fileName === fileName){
            return
        }
        newFiles = {...newFiles, [file]: this.state.fileData.files[file]}
    })

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

        axios.get('/api/themes')
        .then( res => {
          this.setState({ themesData: res.data.list})
          this.themes = res.data.list
        })
        .then( res => {
            axios.get('/api/familySetup')
            .then(res => {
                let familyList = Object.keys(res.data).map(obj => {
                    return res.data[obj].artworkFamily
                })
                this.setState({artworkFamilyList: familyList})
            })
        })
        .then(resolved => {
            axios.get('/api/categories')
            .then(res => {
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
          fileDataMethods: this.fileDataMethods,
          familySetupMethods: this.familySetupMethods,
          onDragEnd: this.onDragEnd,
          removeFile: this.removeFile
          } }>
        {this.props.children}
      </Context.Provider>
    )
  }

}

