import React from 'react';
import axios from 'axios';
import auth from './Auth'

// import FilePreview from './FilePreview'

export const Context = React.createContext();

export class Provider extends React.Component{
  constructor(props){
    super(props);
    this.state = {

        fileData: {
            files: {},
            column: {
                id: 'column-1',
                fileIds: []
            },
            columnOrder: ['column-1']
        },
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
        relatedArtwork: {},
        categoriesData: [],
        seeAlsoData: {renderFiles: {fileNames: []}},
        themesData: [],
        artworkFamilyList: [],
        serverFileDir: [],
        showModal: false,
    }
        
    this.changeFileName = (e) => {
        let nameWithFileType = `${e.target.value.split('.')[0]}.${this.state.fileType.split('/')[1]}`
        this.setState({ fileName: nameWithFileType, filePath: `/uploads/${nameWithFileType}` })
    }

    this.onChange = (e, key, fileName) => {
        let target = null
        let newState = {...this.state}
        if(fileName){
            target = newState.fileData.files[fileName]
        }
        else{
            target = newState.familySetupData
        }
        if(!target[key]){
            target[key] = null
        }
        target[key] = e.target.value
        this.setState(newState)
    }

    //adds new family name/theme
    this.addNew = (e, id, router, requestKey, stateKey, callback) => {

        e.preventDefault();
        const newAddition = document.getElementById(id).value;
        if(requestKey === "artworkFamily"){
            // promise = 
            console.log(requestKey)
            return new Promise((resolve, reject) => {
                axios.post(router, {[requestKey]: newAddition})
                .then( res => {
                    console.log("res")
                    console.log(res)
                    let addition = res.data[requestKey]
                      if(callback){
                          callback("Successfully recored")
                      }
                    // this.setState({ [stateKey]: [...this.state[stateKey], newAddition]}, () => {
                    //   if(callback){
                    //       callback("Successfully recored")
                    //   }
                      resolve(addition)
                  })
                  .catch( err => {
                      console.log("error!!!")
                      console.log(err)
                      if(callback){
                        callback(err.toString())
                        }
                      reject(err)
                  })
            })
        }
        else{
            console.log(requestKey)
            // promise = 
            return new Promise((resolve, reject) => {
                axios.put(router, {[requestKey]: newAddition})
                .then( res => {
                    let addition = res.data[requestKey]
                    this.setState({ [stateKey]: [...this.state[stateKey], newAddition]}, () => {
                      if(callback){
                          callback("Successfully recored")
                      }
                      resolve(addition)
                    })
                  })
                  .catch( err => {
                      console.log("error!!!")
                      console.log(err)
                      if(callback){
                        callback(err.toString())
                        }
                      reject(err)
                  })
            }) 
        }
    }

    //creates an array of all files in the server uploads folder
    /**
     * @returns 
     */
    this.readImageDir = () => {
        return new Promise ((resolve, reject) => {
            axios.get('/fetchImages')
            .then(res => {
                console.log(res)
                resolve(res)
                // this.setState({serverFileDir: res.data})
            })
            .catch(err => {console.log("readImageDir failed"); console.log(err); reject(err)})
        })
    }

    //this takes care of CATEGORIES used for navigation
    this.categoryMethods = {

        getCategoryNames: () => {

            let categoryDomList = Object.keys(this.state.categoriesOptionList.data).map(name => {
                return <option key={`add-category-${name}`} value={name}>{name}</option>
            })

            let newState = {...this.state}
            newState.categoriesOptionList.DOM = {}
            newState.categoriesOptionList.DOM.categories = categoryDomList
            this.setState(newState)
        },

        getSubcategoryNames: () => {
            let newState = {...this.state}

            if(!newState.categoriesOptionList.DOM){
                newState.categoriesOptionList.DOM = {}
            }

            let subCategoryDomList = []
            let optGroups = null
        
            if(document.getElementById("add-category").value){
                if(Object.keys(this.state.categoriesOptionList.data).includes(document.getElementById("add-category").value)){
                    console.log('input has value')
                    let selectedCategory = document.getElementById("add-category").value;
    
                    subCategoryDomList = this.state.categoriesOptionList.data[selectedCategory].map(subcategory => {
                        return <option key={`add-subcategory-${subcategory}`} value={subcategory}>{subcategory}</option>
                    })
                }
            }
            else{
                optGroups = []
                optGroups = Object.keys(this.state.categoriesOptionList.data).map(cat => {
                    return <optgroup key={cat} label={cat}>
                        {this.state.categoriesOptionList.data[cat].map(subCat => {
                            return <option key={`add-subcategory-${subCat}`} value={subCat}>{subCat}</option>
                        })}
                    </optgroup>
                })
            }
            console.log(optGroups)
            newState.categoriesOptionList.DOM.subCategories = subCategoryDomList
            if(optGroups){
                newState.categoriesOptionList.DOM.subCategories = optGroups
            }
            this.setState(newState)
            
        },

        submitNewCategory: () => {
            console.log("submitNew")

            const categoryInput = document.getElementById("add-category")
            const subcategoryInput = document.getElementById("add-subcategory")
            const listitemInput = document.getElementById("add-listitem")

            const allCats = Object.values(this.state.categoriesData)
    
            let reqBody = {category: null, subcategory: {}}
            console.log('all cats')
            console.log(allCats)
            //IF THE VALUE DOES NOT EXIST IN THE CATEGORYNAMES ARRAY IE IS NEW
                reqBody = {category: categoryInput.value}
                if(subcategoryInput.value){
                    reqBody.subcategory = {[subcategoryInput.value]: []}
                }
                else{reqBody.subcategory = []}
                if(listitemInput.value){
                    reqBody.subcategory[subcategoryInput.value] = [listitemInput.value]
                }
                console.log(reqBody)
                axios.post('/api/categories/create', reqBody)
                .then(res => {
                    let newState = {...this.state}
                    newState.categoriesData = [...newState.categoriesData, res.data]
                    newState.categoriesOptionList.data = {...newState.categoriesOptionList.data, [categoryInput.value]:[]}
                    this.setState(newState)
                })
                .catch(err => console.log(err))
            
        },
        updateCategory: () => {
            const categoryInput = document.getElementById("add-category")
            const subcategoryInput = document.getElementById("add-subcategory")
            const listitemInput = document.getElementById("add-listitem")

            const allCats = Object.values(this.state.categoriesData).map(obj => obj.category)
            console.log('updatecategory')
            console.log(allCats)

            //check if the CATGORY input value is already recorded in the database
            //if it is run submitNewCategory method instead and exit this function
            if(!allCats.includes(categoryInput.value)){
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

            console.log("objToUpdate")
            console.log(objToUpdate)
             let newState = {...this.state}
             newState.categoriesData[objIndex] = objToUpdate
            axios.put('/api/categories/update', objToUpdate)
                .then(res => this.setState(newState))
            // this.setState({categoriesDataUpdate},
            //     () => {axios.put('/api/categories/update', objToUpdate)}
            //     )
        },
        autoCheckCategories: (fileName, category, subcategory, listitem) => {

            let statePath = this.state.familySetupData.category

            if(fileName){
                statePath = this.state.fileData.files[fileName].category
            }

            if(listitem){
                if(!statePath){return}
                if(statePath[category]){
                    if(statePath[category][subcategory]){
                        if(statePath[category][subcategory].includes(listitem)){
                            return true
                        } 
                        else{
                            return false
                        }
                    }
                    return false
                }
                return false
            }

            if(subcategory){
                if(!statePath){return}
                if(statePath[category]){
                    if(statePath[category][subcategory]){
                        return true
                    }
                    else{
                        return false
                    }
                }
                return false
            }

            if(category){
                if(!statePath){return}
                if(statePath[category]){
                        return true
                    }
                    else{
                        return false
                    }
            }    
        },
        onCheck: (e, fileName) => {

            let statePath = this.state.familySetupData
            
            if(fileName){
                console.log('checked NOT in global setup')
                statePath = this.state.fileData.files[fileName]
                if(!this.state.fileData.files[fileName].category){
                    this.state.fileData.files[fileName].category = {}
                }
            }
    
            const listItemPath = (category, subcategory, newListitems, fileName) => {
                let newState = {}
    
                if(fileName){
                    newState = {
                        ...this.state,
                       fileData: {
                           ...this.state.fileData,
                           files: {
                               ...this.state.fileData.files,
                               [fileName]: {
                                    ...this.state.fileData.files[fileName],
                                    category: {
                                        ...this.state.fileData.files[fileName].category,
                                            [category]: {
                                                ...this.state.fileData.files[fileName].category[category],
                                                [subcategory]: newListitems
                                            }
                                        }
                                    }
                                }
                            }
                        }                        
                    }
    
                    else{
    
                        newState = {
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
                    }
                    return newState
            }
    
            const categoryPath = (newCategory, fileName) => {
                let newState = {}
    
                    if(fileName){
                        newState = { 
                                ...this.state,
                                fileData:{
                                    ...this.state.fileData,
                                    files: {
                                        ...this.state.fileData.files,
                                        [fileName]: {
                                            ...this.state.fileData.files[fileName],
                                            category: {
                                                ...this.state.fileData.files[fileName].category,
                                                [newCategory]:{}
                                            }
                                        }
                                    }
                                } 
                            }
                        }
    
                    else{
                        newState = { 
                            ...this.state,
                            familySetupData:{
                                ...this.state.familySetupData,
                                category: {
                                    ...this.state.familySetupData.category, [newCategory]:{}
                                    } 
                                }
                            }
                    }
                    return newState
            }
    
            const subcategoryPath = (newCategory, newSubcategory, fileName) => {
                let newState = {}
    
                if(fileName){
                    newState = { 
                            ...this.state,
                            fileData:{
                                ...this.state.fileData,
                                files: {
                                    ...this.state.fileData.files,
                                    [fileName]: {
                                        ...this.state.fileData.files[fileName],
                                        category: {
                                            ...this.state.fileData.files[fileName].category,
                                            [newCategory]:{ 
                                                ...this.state.fileData.files[fileName].category[newCategory],
                                                [newSubcategory]: []
                                            }
                                        }
                                    }
                                }
                            } 
                        }
                    }
    
                else{
                    newState = { 
                        ...this.state,
                        familySetupData:{
                            ...this.state.familySetupData,
                            category: {
                                ...this.state.familySetupData.category, 
                                [newCategory]:{
                                    ...this.state.familySetupData.category[newCategory],
                                    [newSubcategory]: []
                                }
                            } 
                        }
                    }
                }
                return newState
            }
    
            //this is handled if a checkbox is UNCHECKED
            if(!e.target.checked){
                let classname = e.target.classList[1]
                let checkboxId = e.target.value
                let subcategory = null
                let category = null
                let listItemNest = null
                let newListitems = null
                let stateCopy = {...statePath}
                let newState = {...this.state}
                let target = null

                if(fileName){
                    target = newState.fileData.files[fileName].displayTriggers
                }
                else{ target = newState.familySetupData.displayTriggers}
    
                if(classname === "listitem"){
                    console.log(fileName)
                    console.log("listItem")
                    console.log("stateCopy")
                    console.log(stateCopy)
                    subcategory = e.target.parentNode.parentNode.id
                    category = e.target.parentNode.parentNode.parentNode.id
                    listItemNest = statePath.category[category][subcategory]
                    newListitems = listItemNest.filter(item => item !== checkboxId)
    
                    newState = listItemPath(category, subcategory, newListitems, fileName)

                    target[classname] = newListitems
                    // this.setState(listItemPath(category, subcategory, newListitems, fileName))
                    // return     
                }
                else if (classname === "subcategory"){
                    console.log(fileName)
                    console.log("subCategory")
                    console.log("stateCopy")
                    console.log(stateCopy)
                    category = e.target.parentNode.parentNode.parentNode.id
    
                    delete stateCopy.category[category][checkboxId]
                    Array.from(document.getElementById(checkboxId).getElementsByTagName('input'))
                        .forEach(item => item.checked = false)
                        if(fileName){
                            newState = {
                                fileData: {
                                    ...this.state.fileData,
                                    files: {
                                        ...this.state.fileData.files,
                                        [fileName]: {
                                            ...this.state.fileData.files[fileName],
                                            category: stateCopy.category
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            newState = {
                                familySetupData: {
                                    ...this.state.familySetupData,
                                    category: stateCopy.category
                                }
                            }
                        }

                    const listitemsToRemove =  this.state.categoriesData.filter(obj => obj.category === category)[0].subcategory[checkboxId]
                    target.listitems = target.listitems.filter(trigger => !listitemsToRemove.includes(trigger)) 
                    target[classname] = target[classname].filter(trigger => trigger !== checkboxId)
                    // this.setState(newState)
                    // return
                }
                else if (classname === "category"){
                    category = e.target.parentNode.parentNode.id
                    delete stateCopy.category[category]
                    Array.from(document.getElementById(category).getElementsByTagName('input'))
                        .forEach(item => item.checked = false)
                        if(fileName){
                            newState = {
                                fileData: {
                                    ...this.state.fileData,
                                    files: {
                                        ...this.state.fileData.files,
                                        [fileName]: {
                                            ...this.state.fileData.files[fileName],
                                            category: stateCopy.category
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            newState = {
                                familySetupData: {
                                    ...this.state.familySetupData,
                                    category: stateCopy.category
                                }
                            }
                        }
                    
                    let subcategoriesValues =  Object.values(this.state.categoriesData.filter(obj => obj.category === category)[0].subcategory)
                    
                    let listitemsToRemove = subcategoriesValues.flat()

                    target.listitems = target.listitems.filter(trigger => !listitemsToRemove.includes(trigger)) 
                    target[classname] = target[classname].filter(trigger => trigger !== category)
                    target.subcategory = target.subcategory.filter(trigger => !this.state.categoriesOptionList.data[category].includes(trigger))
                    // this.setState(newState)
                    // return
                }
                this.setState(newState)
                return     
            };
    
            //This creates checkbox trees and and values to it
            const parentCheckbox = (target) => {
                return Array.from(target.getElementsByTagName('input'))[0]; 
            };
        
            //returns a boolean for SWITCH statement
            //checks for className of input parent 
            const classNameCheck = (name) => {
    
                if(name === "list--listitem"){
                    return e.target.parentNode.classList.contains(name)    
                }
                return e.target.parentNode.parentNode.classList.contains(name)
            }
    
            let category = parentCheckbox(e.target.parentNode.parentNode.parentNode)
            let subcategory = parentCheckbox(e.target.parentNode.parentNode)
        
            switch (true) {
        
            case classNameCheck('list--category'):
                this.setState(categoryPath(category.value, fileName))
            break;
    
            case classNameCheck('list--listitem'):
                category = parentCheckbox(e.target.parentNode.parentNode.parentNode)
                subcategory = parentCheckbox(e.target.parentNode.parentNode)
    
                const newListItem = e.target.value;
                let newList = [newListItem]
    
                if(statePath.category){
                    if(statePath.category[category.value]){
                        if(statePath.category[category.value][subcategory.value]){
                            if(statePath.category[category.value][subcategory.value].length > 0){
                                newList = [...statePath.category[category.value][subcategory.value], newListItem]
                            }
                        }
                    }
                }
                this.setState(listItemPath(category.value, subcategory.value, newList, fileName))
            break;
            
            case classNameCheck('list--subcategory'):
                this.setState(subcategoryPath(category.value, subcategory.value, fileName))
            break;
            default:
                return
            }
        }
    }
    //this deal with file input uploads and uploads to server
    this.fileDataMethods = {

        deleteImage: (fileName) => {
            axios.delete(`/deleteImage`, fileName)
            .then(res => {
                alert(res)
            })
        },

        deleteDBrecord: (fileName, artworkFamily, cb) => {
            // const id = this.state.relatedArtwork[familyName].files[fileName]._id
            // console.log(id)
            return new Promise ((resolve, rej) => {
                const file = this.state.artworkInfoData[fileName]
                const paths = {
                    "mobilePath": `file.mobilePath`,
                    "thumbnailPath": `file.thumbnailPath`,
                    "desktopPath": `file.desktopPath`
                }
                axios.delete(`/api/artworkInfo/delete/${fileName}`)
                    .then(res => {
                        axios.delete(`/deleteImage/delete/${fileName}`, paths)
                        .then(res => {
                            console.log(`file deleted:`)
                            console.log(res)
                            let relatedArtwork = {...this.state.relatedArtwork}
                            delete relatedArtwork[artworkFamily].files[fileName]
                            const fileIds = relatedArtwork[artworkFamily].column.fileIds
                            console.log("fileIds")
                            console.log(fileIds)
                            let newFileIds = fileIds.filter(name => name !== fileName)
                            console.log("fileIds")
                            console.log(newFileIds)
                            relatedArtwork[artworkFamily].column.fileIds = newFileIds
                            console.log("********** NEW relatedArtwork")
                            console.log(relatedArtwork)
                            let artworkOnDisplay = this.state.artworkOnDisplay
                            delete artworkOnDisplay[fileName]
                            let artworkInfoData = this.state.artworkInfoData
                            delete artworkInfoData[fileName]
                            this.setState({relatedArtwork, artworkInfoData, artworkOnDisplay}
                                , resolve("File and its DB record deleted")
                                )
                        })
                        .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
            })
        },

        serverFileToState: (file) => {
            let newState = {...this.state}
            newState.fileData.files = {...newState.fileData.files, [file.fileName]: file}
                if(!file.displayTriggers){
                    newState.fileData.files[file.fileName].displayTriggers = {category: [], subcategory: [], listitems: [], themes: [], year: "", location: ""}
                }
            this.setState(newState)
        },
        
        /**
         * @param value the value to be added to state
         * @param string the name of the family nest where the new value will be added
         * @param fileName optional: decided which file to update with new value
         * @returns updated context state
         */
        onChange: (value, string, fileName, cb) => {

            console.log("string")
            console.log(string)



            let nestType = () => {
                if(string === "themes"){
                    return "array"
                }
                if(string !== "year" && string !== "location"){
                    return "category"
                }
                else{ 
                    return "string"
                }
            }

            let nestTypeResult = nestType()

            console.log("nestType()")
            console.log(nestTypeResult)

            let newState = {...this.state}

            if(string === "themes"){
                let newList = []
                console.log("array runs")
                if(!newState.fileData.files[fileName][string]){
                    newState.fileData.files[fileName][string] = []
                }
                if(!newState.fileData.files[fileName].displayTriggers[string]){
                    newState.fileData.files[fileName].displayTriggers[string] = []
                }
                    if(this.state.fileData.files[fileName][string].includes(value)){
                        newList = this.state.fileData.files[fileName][string].filter(item => item !== value)
                    }
                    else{
                        newList = [...this.state.fileData.files[fileName][string], value]
                    }
                        // let newState = []    

        
                        newState = {
                            ...this.state,
                            fileData: {
                                ...this.state.fileData,
                                files: {
                                    ...this.state.fileData.files,
                                    [fileName]: {
                                        ...this.state.fileData.files[fileName],
                                        [string]: newList,

                                        displayTriggers: {
                                            ...this.state.fileData.files[fileName].displayTriggers, 
                                            [string]: newList
                                        }
                                    }
                                }
                            }
                        }

                        console.log("newState")
                        console.log(newState)
                            
                        this.setState(newState, () => {
                            if(cb){
                                cb()
                            }
                        })
                        return
                    
                
            }

            else if(string !== "year" && string !== "location"){
                console.log("category runs")
                if(!newState.fileData.files[fileName].displayTriggers[string]){
                    newState.fileData.files[fileName].displayTriggers[string] = []
                }
                    if(this.state.fileData.files[fileName].displayTriggers[string].includes(value)){
                        // let newState = []    
                        let newList = this.state.fileData.files[fileName].displayTriggers[string].filter(item => item !== value)
        
                        newState = {
                            ...this.state,
                            fileData: {
                                ...this.state.fileData,
                                files: {
                                    ...this.state.fileData.files,
                                    [fileName]: {
                                        ...this.state.fileData.files[fileName],
                                        displayTriggers: {
                                            ...this.state.fileData.files[fileName].displayTriggers, 
                                            [string]: newList
                                        }
                                    }
                                }
                            }
                        }
                        this.setState(newState, () => {
                            if(cb){
                                cb()
                            }
                        })
                        return
                    }
                }
            else{    
                console.log("string runs")
                          
                newState = {
                    ...this.state,
                    fileData: {
                        ...this.state.fileData,
                        files: {
                            ...this.state.fileData.files,
                            [fileName]: {
                                ...this.state.fileData.files[fileName],
                                [string]: value,
                                displayTriggers: {...this.state.fileData.files[fileName].displayTriggers, [string]: value}
                            }
                        }
                    }
                }
            }

            this.setState(newState)

        },
        onChangeDisplayTriggers: (value, string, fileName, familySetup, cb) => {
            console.log("familySetup")
            console.log(familySetup)

            let nestType = () => {
                if(string !== "year" && string !== "location"){
                    return "themes"
                }
                else{ 
                    return "string"
                }
            }

            let nestTypeResult = nestType()

            let newState = {...this.state}
            let target = null
            let nest = null
            if(!familySetup){
                target = newState.fileData.files[fileName]
            }
            else{
                target = newState.familySetupData
            }
            if(!target.displayTriggers){
                target.displayTriggers = {
                    category: [],
                    subcategory: [],
                    listitems: [],
                    themes: [],
                    year: "",
                    location: ""
                }
            }
            nest = target.displayTriggers
            if(nestTypeResult === "themes"){
                let newList = []
                if(!nest[string]){
                    nest[string] = []
                }
                    if(nest[string].includes(value)){
                        newList = nest[string].filter(item => item !== value)
                    }
                    else{
                        newList = [...nest[string], value]
                    }

                        if(!familySetup){
                            newState = {
                                ...this.state,
                                fileData: {
                                    ...this.state.fileData,
                                    files: {
                                        ...this.state.fileData.files,
                                        [fileName]: {
                                            ...this.state.fileData.files[fileName],
                                            displayTriggers: {
                                                ...this.state.fileData.files[fileName].displayTriggers, 
                                                [string]: newList
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            newState = {
                                ...this.state,
                                familySetupData: {
                                    ...this.state.familySetupData,
                                    displayTriggers: {
                                        ...this.state.familySetupData.displayTriggers,
                                        [string]: newList
                                    }
                                }
                            }
                        }
                            
                        this.setState(newState, () => {
                            if(cb){
                                cb()
                            }
                        })
                        return
                    
                
                    }
            //if category, subcategory or listitems
            else if(string !== "year" && string !== "location"){
                if(!nest[string]){
                    nest[string] = []
                }
                    if(this.nest[string].includes(value)){
                        // let newState = []    
                        let newList = nest[string].filter(item => item !== value)
                        
                        if(!familySetup){
                            newState = {
                                ...this.state,
                                fileData: {
                                    ...this.state.fileData,
                                    files: {
                                        ...this.state.fileData.files,
                                        [fileName]: {
                                            ...this.state.fileData.files[fileName],
                                            displayTriggers: {
                                                ...this.state.fileData.files[fileName].displayTriggers, 
                                                [string]: newList
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            newState = {
                                ...this.state,
                                familySetupData: {
                                    ...this.state.familySetupData,
                                    displayTriggers: {
                                        ...this.state.familySetupData.displayTriggers,
                                        [string]: newList
                                    }
                                }
                            }
                        }
                        this.setState(newState, () => {
                            if(cb){
                                cb()
                            }
                        })
                        return
                    }
            }
            //if year or location
            else{
                if(nest[string] === value){
                    value = ""
                }
                if(!familySetup){
                    newState = {
                        ...this.state,
                        fileData: {
                            ...this.state.fileData,
                            files: {
                                ...this.state.fileData.files,
                                [fileName]: {
                                    ...this.state.fileData.files[fileName],
                                    // [string]: value,
                                    displayTriggers: {...this.state.fileData.files[fileName].displayTriggers, [string]: value}
                                }
                            }
                        }
                    }
                }
                else{
                    newState = {
                        ...this.state,
                        familySetupData: {
                            ...this.state.familySetupData,
                            displayTriggers: {
                                ...this.state.familySetupData.displayTriggers,
                                [string]: value
                            }
                        }
                    }
                }
            }
            this.setState(newState)
        },

        transferState: (file, radioValue) => {
            console.log("transfer state runs")
            let newState = {...this.state}

            //on check
            if(radioValue === true){
                console.log("radio value true")
                this.setState({showModal: true})

                //overwrite file data witch each familySetUp property
                Object.keys(this.state.familySetupData).forEach(property => {
                    newState = {
                        ...newState,
                        fileData: {
                            ...newState.fileData,
                            files: {
                                ...newState.fileData.files,
                                [file.fileName]: {
                                    ...newState.fileData.files[file.fileName],
                                    [property]: this.state.familySetupData[property]
                                }
                            }
                        }
                    }
                })

                // let displayTriggers = {
                //     category: Object.keys(this.state.familySetupData.category)
                // }
                let newDisplayTriggers = {}
                newDisplayTriggers.category = Object.keys(this.state.familySetupData.category)

                const getSubcategories = () => {
                    let categories = Object.keys(this.state.familySetupData.category)
                    let subcategories = []
                    categories.forEach(category => {
                        subcategories = [...subcategories, ...Object.keys(this.state.familySetupData.category[category])]
                    })
                    return subcategories
                }
                newDisplayTriggers.subcategory = getSubcategories()

                const getListitems = () => {
                    const categories = Object.keys(this.state.familySetupData.category)
                    let listItems = []
                    categories.forEach(category => {
                        let subcategories = Object.keys(this.state.familySetupData.category[category])
                        subcategories.forEach(sub => {
                            if(!this.state.familySetupData.category[category][sub].length > 0){return}
                            listItems = [...listItems, ...this.state.familySetupData.category[category][sub]]
                        })
                    })
                    return listItems
                }
                newDisplayTriggers.listitems = getListitems()

                newDisplayTriggers.themes = this.state.familySetupData.themes

                newDisplayTriggers.year = this.state.familySetupData.year
                newDisplayTriggers.location = this.state.familySetupData.location    

                newState.fileData.files[file.fileName].displayTriggers = newDisplayTriggers

                const relatedArtworkPromise = this.familySetupMethods.getRelatedArtwork(newState.fileData.files[file.fileName].artworkFamily, newState)

                relatedArtworkPromise.then(res => {
                    newState.relatedArtwork = {...newState.relatedArtwork, [newState.fileData.files[file.fileName].artworkFamily]: res}
                    newState.fileData.files[file.fileName].relatedArtwork = res
                    newState.fileData.files[file.fileName].useFamilySetup = true
                    delete newState.fileData.files[file.fileName]._id
                    delete newState.fileData.files[file.fileName].__v
                    this.setState(newState, this.setState({showModal: false})
                    )
                })
            }

            else{
                console.log("radio value false")
                const checkType = (elem) => {
                    let elemType = null
                    elemType = typeof elem
                    if(elemType === "object"){
                        if(Array.isArray(elem)){
                            return new Array
                        }
                        else{
                            return new Object
                        }
                    }
                    else{
                        return new String
                    }
                }

                Object.keys(this.state.familySetupData).forEach(property => {
                    newState = {
                        ...newState,
                        fileData: {
                            ...newState.fileData,
                            files: {
                                ...newState.fileData.files,
                                [file.fileName]: {
                                    ...newState.fileData.files[file.fileName],
                                    [property]: checkType(this.state.fileData.files[file.fileName][property])
                                }
                            }
                        }
                    }
                })
                newState.fileData.files[file.fileName].useFamilySetup = false
                this.setState(newState)
            }
        },

        isChecked: (string, value, fileName) => {
            if(this.state.fileData.files[fileName][string].includes(value)){
                return true
            }
            else return false
        },
            //This iss triggered upon upload files using file upload input
        addFileToState: (e) => {

            const fileInput = e.target.files
            const fileCount = fileInput.length
            let filename = null

            let obj = {
                files: {},
                column: {
                    id: 'column-1',
                    fileIds: []
                },
                columnOrder: ['column-1']
            }
            let newState = {...this.state}
            let objCounter = 0;

                let objPromise = new Promise ((resolve, rejects) => {
                    Array.from(fileInput).forEach((file, index) => {

                    const reader = new FileReader();
                        
                    if(this.state.fileData.column.fileIds.indexOf(file.name) >= 0){
                        alert(`the file ${file.name} has already been selected`)
                        return
                    }

                        reader.onload = () => {
                            if(file.name.includes(" ") || file.name.includes("/")){
                                alert("File name cannot contain spaces or '/'")
                                return
                            }

                            obj.files[file.name] = {                    
                                preview: reader.result,
                                file: fileInput[index],
                                fileName: file.name, 
                                fileType: file.type,
                                familyDisplayIndex: null,
                                src: `/uploads/${file.name}`,
                                themes: [],
                                seeAlso: [],
                                category: {"studio": {"misc": []}},
                                displayTriggers: {"category": ["studio"], "subcategory": ["misc"], "listitems": []},
                                artworkFamily: "none"
                            }
            
                            if(file.type.match("application/pdf")){
                                alert('pdf not supported yet')
                                return
                            }

                            newState = {
                                ...this.state, 
                                fileData: {
                                    ...this.state.fileData,
                                    files: {...newState.fileData.files, [file.name]: obj.files[file.name]},
                                    column: {...newState.fileData.column, fileIds: [...newState.fileData.column.fileIds, file.name]}
                            }} 
        
                            objCounter += 1
        
                            if(objCounter === fileCount){
                                filename = file.name
                                resolve()
                            }
                            
                        }
                        reader.readAsDataURL(file)
                })
            })
        
            objPromise.then(res => {this.setState(newState)})
        },
        //THIS UPLOADS FILE TO SERVER

        uploadFile: (fileName) => {
            return new Promise((resolve, reject) => {
                const fileData = this.state.fileData.files
    
                const fd = new FormData();
                fd.append('artworkImage', fileData[fileName].file, fileData[fileName].artwrokTitle || fileData[fileName].fileName)
    
                axios.post('/api/artworkInfo/imageUpload', fd)
                    .then(res => {
                        console.log("og image uploaded")
                        axios.post(`/resize/${fileName}`)
                        .then(res => { 
                            this.readImageDir()
                                .then(res => {
                                    return resolve("uploads folder successfully read")
                                })
                        })
                        .catch(err => reject(err))
                    })
            })

            //     if(this.state.serverFileDir.includes(fileName)){
            //         resolve()
            //     }
            // })
        },
        //Removes selected file from state and thus DOM
        removeFile: (fileName, familyName) => {
        
            let newFiles = {...this.state.fileData.files}
        
            delete newFiles[fileName]
        
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
            
            if(familyName){
                delete newState.relatedArtwork[familyName].files[fileName]
                newState.relatedArtwork[familyName].column.fileIds = newState.relatedArtwork[familyName].column.fileIds.filter(file => file !== fileName)
            }
            this.setState(newState)
        },
        //change display index by dragging file preview
        onDragEnd: (result) => {

            const {destination, source, draggableId} = result;
        
            if(!destination){
                return
            }
            
            const column = this.state.fileData.column[source.droppableId];
        
                let newFileIds = this.state.fileData.column.fileIds
        
                newFileIds.splice(source.index, 1)
                newFileIds.splice(destination.index, 0, draggableId)
        
                const newColumn = {
                    ...column,
                    fileIds: newFileIds
                }
                
                let newState = {...this.state}

                newState.fileData.column[newColumn.id] = newColumn

                // newState = this.fileDataMethods.getFamilyDisplayIndex(newColumn.fileIds, newState)
        
                this.setState(newState)
        },
        onDragEndFamilyList: (result) => {

            const {destination, source, draggableId} = result;

            if(!destination){
                return
            }

            const fileName = result.destination.droppableId
            const artworkFamily = fileName.slice(0, fileName.match("-relatedArtworks").index)

            const column = this.state.relatedArtwork[artworkFamily].column[source.droppableId];
        
            let newFileIds = this.state.relatedArtwork[artworkFamily].column.fileIds
            // const column = this.state.fileData.files[fileName].relatedArtwork.column[source.droppableId];
        
            // let newFileIds = this.state.fileData.files[fileName].relatedArtwork.column.fileIds
    
            newFileIds.splice(source.index, 1)
            newFileIds.splice(destination.index, 0, draggableId)
    
            const newColumn = {
                ...column,
                fileIds: newFileIds
            }
            
            let newState = {...this.state}

            newState.relatedArtwork[artworkFamily].column[newColumn.id] = newColumn



            this.setState(newState)
        },
        updateArtworkInfo: (file) => {
            return new Promise((resolve, reject) => {
                if(!file.category || !Object.keys(file.category).length > 0 ){
                    resolve(`To submit, select categories for file ${file.fileName}`)
                }

                else{
                    if(file.artworkFamily){
                        const artworkFamily = file.artworkFamily
                        const updateLength = Object.keys(this.state.relatedArtwork[artworkFamily].files).length 
                        let progressCount = 0
        
                        Object.keys(this.state.relatedArtwork[artworkFamily].files).forEach(objName => {

                            
                            let obj = this.state.artworkInfoData[objName]
                            // let obj = this.state.relatedArtwork[artworkFamily].files[objName]
                            if(objName === file.fileName){
                                obj = this.state.fileData.files[file.fileName]
                            }
                            // const familyIndex = this.state.relatedArtwork[artworkFamily].column.fileIds.indexOf(obj.fileName)
                            const familyIndex = this.state.relatedArtwork[artworkFamily].column.fileIds.indexOf(obj.fileName)
                            let fileData =  obj
                                fileData.familyDisplayIndex = familyIndex
                                axios.put(`/api/artworkInfo/update/${obj.fileName}`, fileData)
                                    .then(res => {
                                        progressCount += 1
                                        console.log(progressCount)
                                        if(progressCount === updateLength){
                                            resolve('file updated')
                                        }
                                    })
                            })
                    }
                }
        })
    },

        updateArtworkByFamily: (familyName) => {
            if(!familyName){
                return
            }

            this.familySetupMethods.updateFamilySetup(this.state.familySetupData.artworkFamily)

            const fileNamesInFamily = Object.keys(this.state.relatedArtwork[familyName].files)
            const updateLength = fileNamesInFamily.length
            let progress = 0
            if(updateLength > 0){
                this.state.relatedArtwork[familyName].column.fileIds.forEach((fileName, index) => {
                    const familyDisplayIndex = this.state.relatedArtwork[familyName].column.fileIds.indexOf(fileName)

                    const familyData = this.state.familySetupData
                    const {category, themes, seeAlso, familyDescription, year, location, displayTriggers} = familyData
                    let fileData = this.state.relatedArtwork[familyName].files[fileName]
                    delete fileData.__v
                    delete fileData._id
                    delete fileData.relatedArtwork
                    fileData = {...fileData, familyDisplayIndex, category, themes, seeAlso, familyDescription, year, location, displayTriggers}
                    console.log(fileData)
                    axios.put(`/api/artworkInfo/update/${fileName}`, fileData)
                        .then(res => {
                            progress += 1
                            console.log(`progress: ${progress}/${updateLength}`)
                            if(progress === updateLength){
                                axios.get(`/api/artworkInfo/${familyName}`)
                                    .then(res => {
                                        console.log("artworks updated")
                                        console.log(res)
                                        return res
                                    })

                            }
                        })
                        .catch(res => {
                            console.log("error")
                            console.log(res)
                            return res
                        })
                })
            }
        },

        postArtworkInfo: (file) => {
            console.log('post artwork info RUNS with')
            console.log(file)
            return new Promise((resolve, rej) => {
                if(this.state.serverFileDir.includes(file.fileName)){
                    return resolve('A file with the same name has been registered before. To update it, select "EDIT" tab')
                }

                if(!file.category || !Object.keys(file.category).length > 0 ){
                    return resolve('To submit, select categories for this file')
                }

                const image = document.getElementById(`${file.fileName}-upload`)
                let naturalSize = {}
                if(image){
                    naturalSize = {naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight}
                }
                else{naturalSize = null}

                const artworkFamily = file.artworkFamily || "none"

                // const recorded = axios.get(`/api/artworkInfo/${artworkFamily}`).then(res => {
                //     console.log('RECORDED RES***********')
                //     console.log(res)
                // })
                    console.log(`registering to ${artworkFamily}`)

                        const obj = this.state.relatedArtwork[artworkFamily].files[file.fileName]
                        const familyIndex = this.state.relatedArtwork[artworkFamily].column.fileIds.indexOf(file.fileName)
                        let fileData = null
                        
                        //check if the file is uploaded to server
                        if(this.state.serverFileDir.includes(file.fileName)){
                            return resolve(`file ${file.fileName} already exists on the server. Choose a different name, file, or edit records`)
                        }
            
                        else{
                            
                            fileData = this.state.fileData.files[file.fileName]

                            const newName = fileData.fileName.slice(0, fileData.fileName.indexOf("."))
                            const fileExtension = fileData.fileName.slice(fileData.fileName.indexOf("."), fileData.fileName.length)
                            
                
                            let fileDataObject = {                                                 
                            category: fileData.category ? fileData.category : null,
                            displayTriggers: fileData.displayTriggers,
                            filePath: `/uploads/${fileData.fileName}`,
                            thumbnailPath: `/uploads/thumbnails/${newName}-thumbnail${fileExtension}`,
                            mobilePath: `/uploads/mobile/${newName}-mob${fileExtension}`,
                            desktopPath: `/uploads/desktop/${newName}-desktop${fileExtension}`,
                            fileName: fileData.fileName,
                            fileType: fileData.fileType,
                
                            artworkFamily: artworkFamily ?  artworkFamily : null,
                            familyDescription: fileData.familyDescription ?  fileData.familyDescription : null,
                            artworkTitle: fileData.artworkTitle ?  fileData.artworkTitle : null,
                            artworkDescription: fileData.artworkDescription ?  fileData.artworkDescription : null,
                            themes: fileData.themes ?  fileData.themes : null,
                            seeAlso: fileData.seeAlso ?  fileData.seeAlso : null,
                            location: fileData.location ?  fileData.location : null,
                            year: fileData.year ? fileData.year : null,
                            naturalSize, 
                            displayMain: fileData.displayMain ? fileData.displayMain : null
                            }
                
                            fileDataObject.familyDisplayIndex = familyIndex
                            
                            console.log(fileDataObject)

                            axios.post('/api/artworkInfo/create', fileDataObject)
                            .then( res => { 
                                // this.fileDataMethods.updateArtworkByFamily(artworkFamily)
                                    console.log('new record craeted')
                                    console.log(res)
                                    this.fileDataMethods.uploadFile(file.fileName)
                                        .then(res => {
                                            console.log("file uploaded")
                                            console.log(res)
                                            return resolve("file uploaded")
                                        })
                                        // let newState = {...this.state}
                                        // this.familySetupMethods.getArtworkInfo()
                                        //     .then(res => {
                                        //         console.log("getArtworkInfo")
                                        //         newState.artworkInfoData = res
                                        //         newState.serverFileDir = [...this.state.serverFileDir, file.fileName]
                                        //         this.setState(newState, () => {return resolve(`new file registered in "${file.artworkFamily}" family`)})
                                                
                                        //     })
                                        //     .catch(err=>console.log(err))
                                })
                                .catch(err => {console.log(err); return rej('upload failed')})
                        }
            })

        },

        initialIndex: () => {
            let newState = {...this.state}
            this.state.fileData.column.fileIds.forEach((fileName, index) => {
                this.state.fileData.files[fileName].familyDisplayIndex = index
            })
            this.setState(newState)
        },
        /**
         * @param: fileName = file to be updated
         * @param: newItem = an array of items to be added to seeAlso
         * @param: boolean = if true - add, if false = remove
         */
        relateSeeAlso: (fileName, newItem, boolean) => {
            console.log("RELATE SEE ALSO RUNS")
            console.log(fileName)
            console.log(newItem)
            if(boolean){
                console.log('RELATE SEE ALSO === TRUE')
                return new Promise ((res, rej) => {
                    let record = this.state.artworkInfoData[fileName]
                    let seeAlso = [...record.seeAlso]
                    let newSeeAlso = [...seeAlso]
                    if(Array.isArray(newItem)){
                        newSeeAlso = newItem.map(name => {
                            return name
                        })
                    }
                    else{newSeeAlso = [...seeAlso, newItem]}
                    newSeeAlso = new Set(newSeeAlso)
                    newSeeAlso = Array.from(newSeeAlso)
                    record.seeAlso = newSeeAlso
                    console.log(newSeeAlso)
                    console.log(fileName)
                    console.log(newItem)
                    console.log(record)

                    axios.put(`/api/artworkInfo/update/${fileName}`, record)
                        .then(resolve => {console.log("file upadted");res()})
                        .catch(reject => rej())
                })
            }
            else{
                return new Promise ((res, rej) => {
                    let record = this.state.relatedArtwork[fileName]
                    let seeAlso = [...this.state.artworkInfoData.seeAlso]
                    let newSeeAlso = []
                    if(Array.isArray(newItem)){
                        newSeeAlso = seeAlso.filter(name => !newItem.includes(name))
                    }
                    else{newSeeAlso = seeAlso.filter(name => name !== newItem)}
                    newSeeAlso = new Set(newSeeAlso)
                    newSeeAlso = Array.from(newSeeAlso)
                    record.seeAlso = newSeeAlso

                    console.log(newSeeAlso)
                    console.log(fileName)
                    console.log(newItem)
                    console.log(record)

                    axios.put(`/api/artworkInfo/update/${fileName}`, record)
                        .then(resolve => res())
                        .catch(reject => rej())
                })
            }
        },
    
    }//END OF file data methods

    //this deals with creating and pulling artwork family data and attaching it to files
    this.familySetupMethods = {
        filterByFamily: (value, fileName) => {
            let newRenderList = {}
            Object.keys(this.state.seeAlsoData.fileList).forEach(fileName => {
                const file = this.state.seeAlsoData.fileList[fileName]
                if(file.artworkFamily === value){
                    newRenderList = {...newRenderList, [file.fileName]: file}
                    newRenderList.fileNames = Object.keys(newRenderList).map(fileName => fileName)
                }
            })

            this.setState({seeAlsoData: {...this.state.seeAlsoData, renderFiles: newRenderList}})
            // this.setState({renderList: newRenderList})
        },
        getArtworkInfo: () => {
                return new Promise((resolve, rej) => {
        
                    let serverFileNames = null;
                    
                    //get an array of all file names in the server
                    axios.get('/fetchImages')
                        .then(res => {
                            serverFileNames = res.data
                            serverFileNames = serverFileNames.map(name => {
                                return name.replace("-thumbnail", "")
                            })

            
                            //get all artwork records from database
                            axios.get('/api/artworkInfo')
                                .then(res => {
                                    let databaseFiles = {}
                                    let usedNames = []
                                    console.log()
                                    console.log(res.data)
                                    //check that a record has a file in the server
                                    serverFileNames.forEach(fileName => {
                                        res.data.forEach(obj => {
                                            if(obj.fileName === fileName && !usedNames.includes[fileName]){
                                                usedNames = [...usedNames, fileName]
                                             databaseFiles = {...databaseFiles, [fileName]: obj}
                                            databaseFiles[fileName].useFamilySetup = false
                                        }
                                    })
                                    })

                                    //add an array of all file object
                                    // renderFiles.fileNames = Object.keys(renderFiles).filter(fileName => fileName !== "fileList")
    
                                    resolve(databaseFiles)
                                })
                        })   
                        .catch(err => rej(err))
                })
        },
        resetRenderFiles: () => {
            let newState = this.state
            newState.seeAlsoData.renderFiles = {...newState.seeAlsoData.fileList, fileNames: newState.seeAlsoData.renderFiles.fileNames, }
            this.setState(newState)
        },
        onChange: (value, string, e, cb) => {
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
                // this.setState(newState)
                return newState
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
                    // this.setState(newState)
                    return newState
                }
            }
            
            if(this.state.familySetupData[string] && this.state.familySetupData[string].includes(value)){
                let newState = removeValue(value)
                // this.familySetupMethods.renderAllFiles(newState.familySetupData.seeAlso).then(res => {
                //     let seeAlsoData = {}
                //     newState = {...newState, seeAlsoData: res}
                //     this.setState(newState, () => {if(cb){cb()}})
                // })
                this.setState(newState, () => {if(cb){cb()}})
            }
            else{
                let newState = addNewValue(value)
                // this.familySetupMethods.renderAllFiles(newState.familySetupData.seeAlso).then(res => {
                //     newState = {...newState, seeAlsoData: res}
                //     this.setState(newState, () => {if(cb){cb()}})
                // })
                this.setState(newState, () => {if(cb){cb()}})
            }
        },
        isChecked: (string, value) => {
            if(string === "artworkFamily"){
                if(this.state.familySetupData.artworkFamily === value){
                    return true
                }
                else{ return false}
            }
            if(this.state.familySetupData[string].includes(value)){
                return true
            } 
            else{
                return false
            } 
        },
        getFamilySetup: (value, string, fileName) => {

            console.log("get family setup")
            axios.get(`/api/familySetup/${value}`)
            .then( res => {
    
                let newFamilySetup = {}
                let newState = {...this.state}

                if(fileName){
                    newFamilySetup = {...this.state.fileData.files[fileName]}

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
                    let newDisplayTriggers = {}
                    newDisplayTriggers.category = Object.keys(res.data.category)
    
                    const getSubcategories = () => {
                        let categories = Object.keys(res.data.category)
                        let subcategories = []
                        categories.forEach(category => {
                            subcategories = [...subcategories, ...Object.keys(res.data.category[category])]
                        })
                        return subcategories
                    }
                    newDisplayTriggers.subcategory = getSubcategories()
    
                    const getListitems = () => {
                        const categories = Object.keys(res.data.category)
                        let listItems = []
                        categories.forEach(category => {
                            let subcategories = Object.keys(res.data.category[category])
                            subcategories.forEach(sub => {
                                if(!res.data.category[category][sub].length > 0){return}
                                listItems = [...listItems, ...res.data.category[category][sub]]
                            })
                        })
                        return listItems
                    }
                    newDisplayTriggers.listitems = getListitems()
    
                    newDisplayTriggers.themes = res.data.themes
    
                    newDisplayTriggers.year = res.data.year
                    newDisplayTriggers.location = res.data.location    
    
                    newState.fileData.files[fileName].displayTriggers = newDisplayTriggers
                }

                else if(!fileName){
                    Object.keys(res.data).forEach(objKey => {
                        newFamilySetup = {
                            ...newFamilySetup,
                            [objKey]: res.data[objKey]
                        }
                    })
                    
                    newState = {...this.state, familySetupData: newFamilySetup}
                }

                const withRelatedArtwork = this.familySetupMethods.getRelatedArtwork(value, newState)

                withRelatedArtwork
                    .then(  res => {

                        newState = {...newState, relatedArtwork: {...newState.relatedArtwork, [value]: res}}
                        let fileIds = Object.keys(res)

                        // this.familySetupMethods.renderAllFiles(newState.familySetupData.seeAlso).then(res =>{ 
                        //     newState.seeAlsoData = res
                        //     this.setState(newState)
                        // })
                        this.setState(newState)

                    } 
                    )
            })
            .catch(err => 
                {
                console.log("err")
                console.log(err)
                let newState = {...this.state}
                newState.familySetupData.artworkFamily = value
                this.setState(newState)
                }
            )
    
        },
        restoreFamilySetup: (fileName) => {
            let newState ={
                ...this.state,
                fileData: {
                    ...this.state.fileData,
                    files: {
                        ...this.state.fileData.files,
                        [fileName]: {

                        }
                    }
                }
            }
        },
        useFamilySetup: (value) => {
    
            let newState = {
                ...this.state,
                familySetupData: {
                    ...this.state.familySetupData,
                    useFamilySetup: value
                }
            }
    
            this.setState(newState)
        },
        createFamilySetup: () => {

            console.log('create family setup runs')

            const artworkFamily = this.state.familySetupData.artworkFamily;
            const category = this.state.familySetupData.category ? this.state.familySetupData.category : {};
            const familyDescription = this.state.familySetupData.familyDescription ? this.state.familySetupData.familyDescription : "";
            const themes = this.state.familySetupData.themes ? this.state.familySetupData.themes : [];
            const relatedArtwork = this.state.familySetupData.relatedArtwork ? this.state.familySetupData.relatedArtwork : [];
            const seeAlso = this.state.familySetupData.seeAlso ? this.state.familySetupData.seeAlso : [];
            const location = this.state.familySetupData.location ? this.state.familySetupData.location : "";
            const year = this.state.familySetupData.year ? this.state.familySetupData.year : "";
    
            let requestBody = {
                category: category,
                artworkFamily: artworkFamily,
                familyDescription: familyDescription,
                themes: themes,
                relatedArtwork: relatedArtwork,
                seeAlso: seeAlso,
                location: location,
                year: year
            }
            return new Promise ((res, rej) => {
                axios.post('/api/familySetup/create', requestBody)
                    .then( res => {
                        console.log("create fam succes")
                        console.log(res)
                        res("create fam succes")
                    })
                    .catch(err => {
                        console.log("create fam failed")
                        console.log(err)
                        res("create fam failed")
                    })
            })
        },
        updateFamilySetup: (familyName) => {
            const artworkFamily = this.state.familySetupData.artworkFamily;
            const category = this.state.familySetupData.category ? this.state.familySetupData.category : {};
            const familyDescription = this.state.familySetupData.familyDescription ? this.state.familySetupData.familyDescription : "";
            const themes = this.state.familySetupData.themes ? this.state.familySetupData.themes : [];
            const relatedArtwork = this.state.familySetupData.relatedArtwork ? this.state.familySetupData.relatedArtwork : [];
            const seeAlso = this.state.familySetupData.seeAlso ? this.state.familySetupData.seeAlso : [];
            const location = this.state.familySetupData.location ? this.state.familySetupData.location : "";
            const year = this.state.familySetupData.year ? this.state.familySetupData.year : "";
    
            let requestBody = {
                category: category,
                artworkFamily: artworkFamily,
                familyDescription: familyDescription,
                themes: themes,
                relatedArtwork: relatedArtwork,
                seeAlso: seeAlso,
                location: location,
                year: year
            }

            if(!this.state.familySetupData.artworkFamily){
                return
            }

            return new Promise((resolve, reject) => {
                axios.put(`/api/familySetup/update/${familyName}`, requestBody)
                    .then( res => { 
                        console.log(res)
                        resolve(`Artwork Family ${familyName} succesfully updated`)
                    })
                    .catch(err => {
                        console.log(err)
                        reject("Artwork family update failed")
                    })
            })

        },
        getRelatedArtwork: (artworkFamily, newState) => {

            let relatedArtwork = {}
            //get all records from the selected family from database
            return new Promise((resolve, reject) => {

                axios.get(`/api/artworkInfo/${artworkFamily}`)
                    .then(res =>{
                        res.data.forEach((obj, index) => {
                        Object.keys(obj).forEach(property => {
                                relatedArtwork = {
                                    ...relatedArtwork,
                                        [obj.fileName]: {
                                            ...relatedArtwork[obj.fileName],
                                            [property]: obj[property]
                                        }
                                    }
                            })
                        })        
                        
                        if(newState.fileData.files){
                            Object.keys(newState.fileData.files).forEach(fileName => {
                                if(newState.fileData.files[fileName].artworkFamily === artworkFamily){
            
                                    Object.keys(newState.fileData.files[fileName]).forEach(property => {
                                        relatedArtwork = {
                                            ...relatedArtwork,
                                                [fileName]: {
                                                    ...relatedArtwork[fileName],
                                                    [property]: newState.fileData.files[fileName][property]
                                                }
                                            }
                                    })
                                }
                            })
                        }
                        let fileIds = []
                        let noIndex = []

                        Object.keys(relatedArtwork).forEach((fileName, index) => {
                            const familyDisplayIndex = relatedArtwork[fileName].familyDisplayIndex
                            if(familyDisplayIndex < 0 || familyDisplayIndex === null || undefined){
                                noIndex.push(fileName)
                            }
                            else{fileIds[familyDisplayIndex] = fileName}
                        })
                        noIndex.forEach(fileName => fileIds.push(fileName))
                        fileIds = fileIds.filter(fileName => fileName !== null || undefined)
                        let finalRelatedArtwork = {
                                files: relatedArtwork,
                                column: {
                                    fileIds,
                                    id: `${artworkFamily}-relatedArtworks`
                                },
                                columnOrder: [`${artworkFamily}-relatedArtworks`]
                        };
                            resolve(finalRelatedArtwork)
                    })
            }) 
        },

        updateContext: (value, propertyName) => {
            return this.setState({[propertyName]: value})
        }
    }//end of familySetupMethods
    this.verify = (props) => {
        if(auth.guest){
        return {
            showModal: true, 
            modalMessage: "You do not have the rights for this action. Log in using admin level account"
        }
        }
        if(props){
            if(props.addNew && !this.state.familySetupData.artworkFamily){
                return {
                    showModal: true,
                    modalMessage: props && props.customError ? props.customError : "Select or add a new artwork family"
                }
            }
        }

        else{return "verified"}
    }

}//END OF CONTSTRUCTOR

    componentDidMount(){
            console.log('backend provider mount')
            let newState = {...this.state}

            this.setState({showModal: true})

            let Themes = new Promise((resolve, rej) => {
                axios.get('/api/themes')
                    .then( res => {
                    newState.themesData = res.data.list
                    resolve()
                    })
            }) 
            
            let FamilyList = new Promise ((resolve, rej) => {
                axios.get('/api/familySetup')
                    .then(res => {
                        let familyList = Object.keys(res.data).map(obj => {
                            return res.data[obj].artworkFamily
                        })
                        newState.artworkFamilyList = familyList
                        resolve()
                    })
            })    

            let Categories = new Promise ((resolve, rej) => {
                FamilyList.then(res => {
                    axios.get('/api/categories')
                        .then(res => {

                                let categoryNames = Object.values(res.data).map(obj => obj.category)
                                let categoryObj = {}
                                categoryNames.forEach(categoryName => {
                                    const currentObj = res.data.find(item => item.category === categoryName)
                                    return categoryObj = {...categoryObj, [categoryName]: Object.keys(currentObj.subcategory)}
                                })

                            newState.categoriesData = res.data
                            newState.categoriesOptionList = {}
                            newState.categoriesOptionList.data = categoryObj

                            newState.artworkFamilyList.forEach(familyName => {
                                this.familySetupMethods.getRelatedArtwork(familyName, newState).then(res => 
                                    newState.relatedArtwork[familyName] = res

                                )
                            })
                            resolve()
                        })
                })
            })
                
            let ArtworkInfo = new Promise((resolve, rej) => {
                console.log("artwork info gather runs")
                this.familySetupMethods.getArtworkInfo()
                    .then(res => {
                        console.log(res)
                        newState.artworkInfoData = res
                        newState.artworkOnDisplay = res
                        resolve()
                    })
            }) 

            let ServerFiles = new Promise((resolve, rej) => {
                axios.get('/fetchImages')
                    .then(res => {
                        newState.serverFileDir = res.data; 
                        resolve()
                    })
            }) 

            // let RenderAllFiles = this.familySetupMethods.renderAllFiles(this.state.familySetupData.seeAlso)

            Promise.all([Categories, ArtworkInfo, Themes, ServerFiles])
                .then(res => {
                    newState.showModal = false
                    this.setState(newState)
                })
                .catch(err => {console.log(err); document.location.reload(true)})
    }

    render(){
    return(
        <Context.Provider value={ {
            state: this.state, 
            
            categoryMethods: this.categoryMethods,
            onCheck: this.categoryMethods.onCheck, 

            fileDataMethods: this.fileDataMethods,
            removeFile: this.fileDataMethods.removeFile,
            uploadFile: this.fileDataMethods.uploadFile, 
            addFileToState: this.fileDataMethods.addFileToState,
            onDragEnd: this.fileDataMethods.onDragEnd,

            createFamilySetup: this.familySetupMethods.createFamilySetup,
            getFamilySetup: this.familySetupMethods.getFamilySetup,
            useFamilySetup: this.familySetupMethods.useFamilySetup,
            familySetupMethods: this.familySetupMethods,

            readImageDir: this.readImageDir,
            changeFileName: this.changeFileName,
            onChange: this.onChange,
            verify: this.verify,
            addNew: this.addNew,

            } }>
        {this.props.children}
        </Context.Provider>
    )
    }

}
