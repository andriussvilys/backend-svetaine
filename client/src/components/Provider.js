import React from 'react';
import axios from 'axios';
import BootstrapModal from './Admin/components/BootstrapModal'
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
            category: {},
            displayTriggers: {category: [], subcategory: [], listitems: [], themes: [], year: "", location: ""}
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
            console.log(newState.fileData.files[fileName])
        }
        else{
            target = newState.familySetupData
        }

        if(!target[key]){
            target[key] = []
        }
        target[key] = [...target[key], e.target.value]
        this.setState(newState)
    }

    //adds new family name/theme
    this.addNew = (e, id, router, requestKey, stateKey, callback) => {

        e.preventDefault();

        return new Promise((resolve, reject) => {

            const newAddition = document.getElementById(id).value;
            if(!this.verify().verified){
                console.log("requestKey")
                console.log(requestKey)
                console.log("stateKey")
                console.log(stateKey)
                let newState = {...this.state}
                if(newState[stateKey].includes(newAddition)){
                    return reject()
                }
                newState[stateKey] = [...newState[stateKey], newAddition]
                this.setState(newState, resolve({modalMessage: "State updated."})) 
                return
            }
            if(requestKey === "artworkFamily"){
                // promise = 
                console.log(requestKey)
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
                        let newState = {...this.state}
                        // newState[stateKey] = [...newState[stateKey], newAddition]
                        // newState.artworkFamilyList = [...newState.artworkFamilyList, newAddition]
                        newState.familySetupData.artworkFamily = newAddition
                        this.setState(newState, () => resolve())
                      })
                      .catch( err => {
                          console.log("error!!!")
                          console.log(err.toJSON())
                          if(callback){
                            callback(err.toString())
                            // callback(err.toString())
                            }
                          reject(err)
                      })
            }
            else{
                console.log(requestKey)
                // promise = 
                    axios.put(router, {[requestKey]: newAddition})
                    .then( res => {
                        console.log("______________________________")
                        console.log(res)
                        console.log("______________________________")
                        this.setState({ [stateKey]: [...this.state[stateKey], newAddition]}, () => {
                          if(callback){
                              callback(res.data)
                              resolve()
                          }
                          else{
                              resolve()
                          }
                        //   let newState = {...this.state}
                        //   newState[stateKey] = [...newState[stateKey], newAddition]
                        //   this.setState(newState, () => resolve())
                        })
                      })
                      .catch( err => {
                          console.log("error!!!")
                          console.log(err.toJSON())
                          if(callback){
                            callback(`Theme ${newAddition} has already been recorded`)
                            }
                          reject()
                      })
            }
        })

    }

    this.deleteTheme = (theme) => {
        console.log("deleteTheme runs")
        return new Promise((resolve, reject) => {
            if(!this.verify().verified){
                console.log("NOT verified")
                let newState = {...this.state}
                newState.themesData = newState.themesData.filter(oldtheme => oldtheme !== theme )
                this.setState(newState, () => resolve({modalMessage: "State updated."}))
            }
            else{
                console.log("run api/themes/delte")
                console.log(`theme: ${theme}`)
                axios.put('/api/themes/delete', {"list": theme})
                    .then(res => {
                        console.log("themee deleted")
                        let newState = {...this.state}
                        newState.themesData = newState.themesData.filter(oldtheme => oldtheme !== theme )
                        console.log("newState.themesData")
                        console.log(newState.themesData)
                        this.setState(newState, () => {
                            resolve()
                        })
                    })
                    .catch(err => reject())
            }
        })
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
            return new Promise((resolve, reject) => {
                console.log("submitNew")
    
                const categoryInput = document.getElementById("add-category")
                const subcategoryInput = document.getElementById("add-subcategory")
                const listitemInput = document.getElementById("add-listitem")
                
                if(!categoryInput.value || categoryInput.value === "" || categoryInput.value === " "){
                    reject({modalMessage: "Action failed. Cannot submit empty value."})
                }

                let reqBody = {category: categoryInput.value, subcategory: {}}
                //IF THE VALUE DOES NOT EXIST IN THE CATEGORYNAMES ARRAY IE IS NEW
                    if(subcategoryInput.value){
                        reqBody.subcategory = {[subcategoryInput.value]: []}
                    }
                    else{reqBody.subcategory = {}}
                    if(listitemInput.value){
                        reqBody.subcategory[subcategoryInput.value] = [listitemInput.value]
                    }
                    else{
                        reqBody.subcategory[subcategoryInput.value] = []
                    }

                    console.log("reqBody")
                    console.log(reqBody)

                    if(!this.verify({customGuestMessage: true}).verified){
                        let newState = {...this.state}
                        newState.categoriesData.push(reqBody)
                        return this.setState(newState, resolve({modalMessage: "State updated"}))
                    }
                    else{
                        axios.post('/api/categories/create', reqBody)
                        .then(res => {
                            let newState = {...this.state}
                            newState.categoriesData = [...newState.categoriesData, res.data]
                            newState.categoriesOptionList.data = {...newState.categoriesOptionList.data, [categoryInput.value]:[]}
                            this.setState(newState, resolve({modalMessage: "New category registered."}))
                        })
                        .catch(err => {console.log(err); reject({modalMessage: "Action failed."})})
                    }
            })
            
        },
        updateCategory: () => {
            return new Promise((resolve, reject) => {

                const categoryInput = document.getElementById("add-category")
                const subcategoryInput = document.getElementById("add-subcategory")
                const listitemInput = document.getElementById("add-listitem")
    
                const allCats = Object.values(this.state.categoriesData).map(obj => obj.category)
    
                //check if the CATGORY input value is already recorded in the database
                //if it is run submitNewCategory method instead and exit this function
                if(!allCats.includes(categoryInput.value)){
                    this.categoryMethods.submitNewCategory()
                        .then(res => resolve({modalMessage: "New category registered."}))
                        .catch(err => reject({modalMessage: "Action failed."}))
                    return
                }
    
                //if category name already exists
                let objToUpdate = this.state.categoriesData.find(obj => obj.category === categoryInput.value)
                let objIndex = this.state.categoriesData.indexOf(objToUpdate)
    
    
                let categoriesDataUpdate = {...this.state.categoriesData}
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

                if(!this.verify({customGuestMessage: true}).verified){
                    let newState = {...this.state}
                    newState.categoriesData[objIndex] = objToUpdate
                    return this.setState(newState, resolve({modalMessage: "State updated."}))
                }
                else{
                    axios.put('/api/categories/update', objToUpdate)
                        .then(res => {
                            let newState = {...this.state}
                            newState.categoriesData[objIndex] = res.data
                            this.setState(newState, resolve({modalMessage: "Database updated."}))
                            })
                        .catch(err => reject({modalMessage: "Action failed."}))
                }
            })
        },
        deleteCategory: (categoryName, updateContent, deletedItem) => {
            return new Promise((resolve, reject) => {

                if(!this.verify({customGuestMessage: true}).verified){
                    
                    let newState = {...this.state}
                    const deletetedCategoryIndex = newState.categoriesData.indexOf(deletedItem.category)

                    //if category is deleted
                    if(!updateContent){
                        newState.categoriesData = newState.categoriesData.filter(obj => obj.category !== deletedItem.category)
                    }
                    //if subcategory or listitem is deleted
                    else{
                        newState.categoriesData.splice(deletetedCategoryIndex, 1, updateContent)
                    }
                    return this.setState(newState, resolve({modalMessage: "State updated."}))
                }

                else{
                    axios.put('/api/categories/delete', {categoryName, updateContent})
                        .then(res => {
    
                            let newState = {...this.state}
                            const categoryObj = newState.categoriesData.find(category => category.category === categoryName)
                            const categoryIndex = newState.categoriesData.indexOf(categoryObj)
                            //delete category
                            if(!deletedItem.subcategory){
                                newState.categoriesData = newState.categoriesData.filter(category => category.category !== categoryName)
                                res.modalMessage = <span>Category <strong>{deletedItem.category}</strong> deleted.</span>
                            }
                            //delete listitem
                            else if(deletedItem.listitem){
                                let newArray = newState.categoriesData[categoryIndex].subcategory[deletedItem.subcategory]
                                newState.categoriesData[categoryIndex].subcategory[deletedItem.subcategory] = newArray.filter(listItem => listItem !== deletedItem.listitem)
                            res.modalMessage = <span>Listitem <strong>{deletedItem.listitem}</strong> deleted from <strong>{deletedItem.subcategory}</strong> subcategory in <strong>{deletedItem.category}</strong> category.</span>
                            }
                            //delete subcategory
                            else if(deletedItem.subcategory && !deletedItem.listitem){
                                delete newState.categoriesData[categoryIndex]
                                newState.categoriesData[categoryIndex] = res.data
                                res.modalMessage = <span>Subcategory <strong>{deletedItem.subcategory}</strong> deleted from <strong>{deletedItem.category}</strong> category.</span>
                            }
                            this.setState(newState, () => {
                                resolve(res)
                            })
                        })
                        .catch(err => {
                            err.modalMessage = "Action failed"
                            reject(err)
                        })
                }
            })
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
                    subcategory = e.target.parentNode.parentNode.id
                    category = e.target.parentNode.parentNode.parentNode.id
                    listItemNest = statePath.category[category][subcategory]
                    newListitems = listItemNest.filter(item => item !== checkboxId)
    
                    newState = listItemPath(category, subcategory, newListitems, fileName)

                    target[classname] = newListitems
                }
                else if (classname === "subcategory"){
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
                }
                this.setState(newState)
                return     
            };
    
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
                            let relatedArtwork = {...this.state.relatedArtwork}
                            delete relatedArtwork[artworkFamily].files[fileName]
                            const fileIds = relatedArtwork[artworkFamily].column.fileIds
                            let newFileIds = fileIds.filter(name => name !== fileName)
                            relatedArtwork[artworkFamily].column.fileIds = newFileIds
                            let artworkOnDisplay = this.state.artworkOnDisplay
                            delete artworkOnDisplay[fileName]
                            let artworkInfoData = this.state.artworkInfoData
                            delete artworkInfoData[fileName]
                            this.setState({relatedArtwork, artworkInfoData, artworkOnDisplay}
                                , () => {
                                    res.modalMessage = "File and its DB record deleted"
                                    resolve(res)
                                }
                                )
                        })
                        .catch(err => {
                            console.log(err)})
                    })
                    .catch(err => console.log(err))
            })
        },

        serverFileToState: (file) => {
            return new Promise((resolve, reject) => {
                if(!file){
                    reject("file record not found")
                }
                let newState = {...this.state}
                newState.fileData.files = {...newState.fileData.files, [file.fileName]: file}
                    if(!file.displayTriggers){
                        newState.fileData.files[file.fileName].displayTriggers = {category: [], subcategory: [], listitems: [], themes: [], year: "", location: ""}
                    }
                this.setState(newState, () => {resolve("file transferred")})
            })
        },
        
        /**
         * @param value the value to be added to state
         * @param string the name of the family nest where the new value will be added
         * @param fileName optional: decided which file to update with new value
         * @returns updated context state
         */
        onChange: (value, string, fileName, cb) => {
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

            let newState = {...this.state}

            if(string === "themes"){
                let newList = []
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
                            
                        this.setState(newState, () => {
                            if(cb){
                                cb()
                            }
                        })
                        return
                    
                
            }

            else if(string !== "year" && string !== "location"){
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

        transferState: (file, radioValue, options) => {
            let newState = {...this.state}

            //on check
            if(radioValue === true){
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
                axios.get(`/api/familySetup/none`)
                    .then(res => {
                        let newFamInfo = res.data
                        delete newFamInfo.__v
                        delete newFamInfo._id

                        const currentInfo = this.state.fileData.files[file.fileName]
                        let newFileInfo = {...currentInfo}
                        
                        Object.keys(newFamInfo).forEach(propertyName => {
                            newFileInfo[propertyName] = newFamInfo[propertyName]
                        })
                        newFileInfo.useFamilySetup = false

                        newState.fileData.files[file.fileName] = newFileInfo
                        this.setState(newState)
                    })
                    .catch(err => {
                        console.log(err)
                    })

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

            return new Promise((resolve, reject) => {
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
    
                    let objPromise = new Promise ((resolve, reject) => {
                        let messages = {}

                        const fileList = Array.from(fileInput)
                        let filteredList = []
                        fileList.forEach(file => {
                            if(this.state.fileData.column.fileIds.includes(file.name)){
                                console.log("error")
                                messages = {...messages, [file.name]: `Fail (already selected)`}
                            }
                            else if(this.state.serverFileDir.includes(file.name)){
                                console.log("error")
                                messages = {...messages, [file.name]: `Fail (already uploaded)`}
                            }
                            else if(file.name.includes(" ") || file.name.includes("/")){
                                console.log("error")
                               messages = {...messages, [file.name]: "Fail (File name cannot contain spaces or '/')"}
                            }
                            else if(file.type.match("application/pdf")){
                                console.log("error")
                                messages = {...messages, [file.name]: 'Fail (PDF not supported yet)'}
                            }
                            else{
                                filteredList = [...filteredList, file]
                            }
                        })

                        if(filteredList.length < 1){
                            let modalMessages = Object.keys(messages).map(fileName => {
                                return <div key={`fileUpload-${fileName}`}>
                                            <em>{fileName}</em>
                                            <p>{messages[fileName]}</p>
                                        </div>
                            })
                            document.getElementById("uploadFileInput").value = ""
                            reject(modalMessages)
                        }
                        
                        filteredList.forEach((file, index) => {
                        const reader = new FileReader();
                            reader.onload = () => {

                                    var image = new Image()

                                    image.src = reader.result;

                                    image.onload = () => {
                                        let naturalSize = {naturalHeight: image.naturalHeight, naturalWidth: image.naturalWidth}

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
                                            displayTriggers: {"category": [], "subcategory": [], "listitems": []},
                                            artworkFamily: "none",
                                            naturalSize
                                        }    
        
                                        newState = {
                                            ...this.state, 
                                            fileData: {
                                                ...this.state.fileData,
                                                files: {...newState.fileData.files, [file.name]: obj.files[file.name]},
                                                column: {...newState.fileData.column, fileIds: [...newState.fileData.column.fileIds, file.name]}
                                            },
                                            relatedArtwork: {
                                                ...this.state.relatedArtwork,
                                                "none": {
                                                    ...this.state.relatedArtwork.none,
                                                    files: {...newState.relatedArtwork.none.files, [file.name]: obj.files[file.name]},
                                                    column: {...newState.relatedArtwork.none.column, fileIds: [...newState.relatedArtwork.none.column.fileIds, file.name]}
                                                }
                                            }
                                        } 

                                        newState.artworkInfoData = {...newState.artworkInfoData, [file.name]: obj.files[file.name]}
                                        messages =  {...messages, [file.name]: "Success"}
                                        objCounter += 1    
                                        console.log("objCounter")
                                        console.log(objCounter)
                                        if(objCounter === filteredList.length){
                                            console.log("objCounter === fileCount")
                                            let modalMessages = Object.keys(messages).map(fileName => {
                                                return <div key={`fileUpload-${fileName}`}>
                                                            <strong>{fileName}:</strong>
                                                            <p className="subtitle">{messages[fileName]}</p>
                                                        </div>
                                            })
                                            resolve(modalMessages)
                                            // resolve(messages)
                                        }
                                    }
                            }       
                            
                            reader.readAsDataURL(file)       
                        })
                })
            
                objPromise
                    .then(res => {
                        this.setState(newState, () => resolve(res))
                    })
                    .catch(err => reject(err))
            })

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
                        .catch(err => {console.log("upload file fail"); console.log(err); reject(err)})
                    })
            })
        },

        //Removes selected file from state and thus DOM
        removeFile: (fileName, familyName) => {

            if(document.getElementById("uploadFileInput")){
                document.getElementById("uploadFileInput").value = ""
            }
        
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
                    reject(`To submit, select categories for file ${file.fileName}`)
                }

                else{
                    if(file.artworkFamily){
                        const artworkFamily = file.artworkFamily
                        //check if display index has changed
                        const currentFamilyDisplayIndex = this.state.relatedArtwork[artworkFamily].column.fileIds.indexOf(file.fileName)
                        const ogData = axios.get(`/api/artworkInfo/fileName/${file.fileName}`)
                        ogData.then(res => {
                            console.log("res.data.familyDisplayIndex")
                            console.log(res.data)
                            console.log(res.data[0].familyDisplayIndex)
                            if(res.data[0].familyDisplayIndex === currentFamilyDisplayIndex){
                                console.log("fam index not changed")
                                const fileData = this.state.fileData.files[file.fileName]
                                this.fileDataMethods.relateSeeAlso(file)
                                .then(res => { 
                                    axios.put(`/api/artworkInfo/update/${file.fileName}`, fileData)
                                    .then(res => {
                                        resolve('file updated')
                                    })
                                    .catch(rej => {
                                        console.log("Record update failed")
                                        console.log(rej)
                                        reject("Record update failed")
                                    })
                                })
                                .catch(err => {
                                    console.log(err)
                                    reject()
                                })
                            }
                            //his will update each file in the family with new index
                            else{
                                this.fileDataMethods.relateSeeAlso(file)
                                    .then(res => {                                        
                                        const updateLength = Object.keys(this.state.relatedArtwork[artworkFamily].files).length 
                                        let progressCount = 0
                                        Object.keys(this.state.relatedArtwork[artworkFamily].files).forEach(objName => {
                                            let obj = this.state.artworkInfoData[objName]
                                            if(objName === file.fileName){
                                                obj = this.state.fileData.files[file.fileName]
                                            }
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
                                                    .catch(rej => {
                                                        console.log("Record update failed")
                                                        console.log(rej)
                                                        reject("Record update failed")
                                                    })
                                            })
                                    })
                                    .catch(err => {
                                        console.log("relate see also error")
                                        console.log(err)
                                        reject(err)
                                    })
                            }

                        })
                    }
                }
        })
        },
        updateArtworkByFamily: (familyName) => {
            if(!familyName){
                return
            }

            return new Promise((resolve, reject) => {

                this.familySetupMethods.updateFamilySetup(this.state.familySetupData.artworkFamily)
                .then(res => {
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
                                                resolve(res)
                                            })
                                            .catch(rej => {
                                                console.log("error")
                                                console.log(rej)
                                                reject(rej)
                                            })
        
                                    }
                                })
                                .catch(rej => {
                                    console.log("error")
                                    console.log(rej)
                                    reject(rej)
                                })
                        })
                    }
    
                })
                .catch(rej => {
                    console.log(rej);
                    reject(rej)
                })
            })
        },
        postArtworkInfo: (file) => {
            console.log('post artwork info RUNS with')
            console.log(file)
            this.setState({showModal: true})
            return new Promise((resolve, reject) => {
                if(this.state.serverFileDir.includes(file.fileName)){
                    reject('A file with the same name has been registered before. To update it, select "EDIT" tab')
                }

                if(!file.category || !Object.keys(file.category).length > 0 ){
                    reject('To submit, select categories for this file')
                }

                const artworkFamily = file.artworkFamily || "none"

                        const familyIndex = this.state.relatedArtwork[artworkFamily].column.fileIds.indexOf(file.fileName)
                        let fileData = null
                        
                        if(this.state.serverFileDir.includes(file.fileName)){
                            reject(`file ${file.fileName} already exists on the server. Choose a different name, file, or edit records`)
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
                            naturalSize: fileData.naturalSize, 
                            displayMain: fileData.displayMain ? fileData.displayMain : null
                            }
                
                            fileDataObject.familyDisplayIndex = familyIndex

                            this.fileDataMethods.relateSeeAlso(file)
                                .then(res => {
                                    axios.post('/api/artworkInfo/create', fileDataObject)
                                    .then( res => { 
                                            this.fileDataMethods.uploadFile(file.fileName)
                                                .then(res => {
                                                    let newState = {...this.state}
                                                    delete newState.fileData.files[file.fileName]
                                                    resolve("file uploaded")
                                                })
                                                .catch(err => {
                                                    console.log(err); 
                                                    reject("error")
                                                })
                                        })
                                    .catch(err => {
                                        console.log(err); 
                                        reject("error")
                                    })
                                })
                                .catch(err => {
                                    console.log("relateSeeAlso singleFileUpload error")
                                    console.log(err)
                                    reject(err)
                                })
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
        relateSeeAlso: (file) => {
            const fileName = file.fileName
            console.log("relate see also init _____________________________________")
            console.log(file)
            const makeSet = (array) => {
                let newArray = new Set(array)
                newArray = [...newArray]
                return newArray
            }
            return new Promise((resolve, reject) => {
                axios.get(`/api/artworkInfo/fileName/${fileName}`)
                    .then(res => {
                        const newState = {...this.state}
                        const prevSeeAlso = makeSet(res.data[0].seeAlso)
                        const currentSeeAlso = makeSet(file.seeAlso)
                        const newToAdd = currentSeeAlso.filter(record => {
                            return !prevSeeAlso.includes(record)
                        })
                        const newToRemove = prevSeeAlso.filter(record => {
                            return !currentSeeAlso.includes(record)
                        })
                        const removeSeeAlsos = new Promise((resolve, reject) => {
                            let counter = 0
                            let progressLength = newToRemove.length
                            if(progressLength === 0){
                                resolve()
                            }
                            newToRemove.forEach(seeAlsoParent => {
                                let fileData = newState.artworkInfoData[seeAlsoParent]
                                let newSeeAlso = fileData.seeAlso.filter(record => record !== fileName)
                                newSeeAlso = makeSet(newSeeAlso)
                                fileData.seeAlso = newSeeAlso
                                axios.put(`/api/artworkInfo/update/${seeAlsoParent}`, fileData)
                                    .then(res => {
                                        counter += 1
                                        if(counter === progressLength){
                                            resolve()
                                        }
                                    })
                                    .catch(err => {
                                        console.log(err)
                                        reject()
                                    })
                            })
                        }) 
                        const addSeeAlsos = new Promise((resolve, reject) => {
                            let counter = 0
                            let progressLength = newToAdd.length
                            if(progressLength === 0){
                                resolve()
                            }
                            newToAdd.forEach(seeAlsoParent => {
                                let fileData = newState.artworkInfoData[seeAlsoParent]
                                let newSeeAlso = [...fileData.seeAlso, fileName]
                                newSeeAlso = makeSet(newSeeAlso)
                                fileData.seeAlso = newSeeAlso
                                axios.put(`/api/artworkInfo/update/${seeAlsoParent}`, fileData)
                                .then(res => {
                                    counter += 1
                                    if(counter === progressLength){
                                        resolve()
                                    }
                                })
                                .catch(err => {
                                    console.log(err)
                                    reject()
                                })
                            })
                        })
                        
                        console.log("pre Promise all")
                        Promise.all([removeSeeAlsos, addSeeAlsos])
                        .then(res => {
                            console.log("Promise All resolve")
                            resolve()
                        })
                        .catch(err => {
                            console.log(err);
                            //  document.location.reload(true)
                            reject()
                        })
                    })
                    //if new file (cannot find file name in database)
                    .catch(err => {
                        console.log("new file")
                        const newState = {...this.state} 
                        const newToAdd = makeSet(file.seeAlso)
                        const addSeeAlsos = new Promise((resolve, reject) => {
                            let counter = 0
                            let progressLength = newToAdd.length
                            if(progressLength === 0){
                                resolve()
                            }
                            newToAdd.forEach(seeAlsoParent => {
                                let fileData = newState.artworkInfoData[seeAlsoParent]
                                let newSeeAlso = [...fileData.seeAlso, fileName]
                                newSeeAlso = makeSet(newSeeAlso)
                                fileData.seeAlso = newSeeAlso
                                axios.put(`/api/artworkInfo/update/${seeAlsoParent}`, fileData)
                                .then(res => {
                                    counter += 1
                                    if(counter === progressLength){
                                        resolve()
                                    }
                                })
                                .catch(err => {
                                    console.log(err)
                                    reject()
                                })
                            })
                        })
                        addSeeAlsos.then(res => {resolve("single file see also resolve")}).catch(err => {reject(err)})
                    })
            })
        },
        updateSeeAlso: (newValue, parent) => {
            // if(!parent || !newValue){
            //     return
            // }
            console.log("newValue")
            console.log(newValue)
            console.log("Parent")
            console.log(parent)
            let target = null
            let newState = {...this.state}
            if(parent){
                target = newState.fileData.files[parent]
            }
            else{
                target = newState.familySetupData
            }
            if(target.seeAlso.includes(newValue)){
                target.seeAlso = target.seeAlso.filter(value => value !== newValue)
            }
            else{
                target.seeAlso = [...target.seeAlso, newValue]
            }
            this.setState(newState)
        }
    
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
            console.log("getFamilySetup runs")
            console.log("value")
            console.log(value)
            console.log("fileName")
            console.log(fileName)
            return new Promise((resolve, reject) => {
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
                            this.setState(newState, () => resolve(res))
                        })
                    })
                .catch(err => {
                    reject(err)
                })
            })
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
            return new Promise ((resolve, reject) => {
                if(!this.state.familySetupData.artworkFamily){
                    reject("Please select artwork family or add a new one")
                }
                axios.post('/api/familySetup/create', requestBody)
                    .then( res => {
                        console.log("create fam succes")
                        console.log(res)
                        resolve("create fam succes")
                    })
                    .catch(err => {
                        console.log("create fam failed")
                        console.log(err)
                        reject("create fam failed")
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

            // if(!this.state.familySetupData.artworkFamily){
            //     return
            // }

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

    this.verify = (options) => {
        if(auth.guest){
            return {
                showModal: true,
                verified: false, 
                modalMessage: options && options.customMessage ? options.customMessage : "You do not have the rights for this action. Log in using admin level account"
            }
        }
        else if(options){
            if(options.addNew && !this.state.familySetupData.artworkFamily){
                return {
                    verfied: true,
                    showModal: true,
                    modalMessage: options && options.customError ? options.customError : "Select or add a new artwork family"
                }
            }
            else{
                return{ verified: true}
            }
        }

        else if (!options){return {verified: true}}
    }

}//END OF CONTSTRUCTOR

    componentDidMount(){
            console.log('backend provider mount')
            let newState = {...this.state}

            this.setState({showModal: true, progress: 0})

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
                                this.familySetupMethods.getRelatedArtwork(familyName, newState).then(res => {
                                    newState.relatedArtwork[familyName] = res
                                }
                                )
                            })
                            resolve()
                        })
                        .catch(err => {
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
                        const serverFileDir = res.data.map(name => {
                            return name.replace("-thumbnail", "")
                        })
                        newState.serverFileDir = serverFileDir
                        // newState.serverFileDir = res.data; 
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
            deleteTheme: this.deleteTheme

            } }>
        {this.props.children}

        {/* <BootstrapModal 
            showModal={this.state.showModal}
            message={this.state.modalMessage}
            onClose={() => {this.setState({showModal: false})}}
            confirm={this.state.confirm || false}
            confirmedAction={() => {
            this.state.confirmedAction()
                .then(res => {
                this.setState({
                    confirm: res.confirm,
                    modalMessage: res.modalMessage
                })
                })
                .catch(err => {
                this.setState({
                    confirm: err.confirm,
                    modalMessage: err.modalMessage
                })
                })
            }}
        >
            {this.state.progress ?
            <ProgressBar now={this.state.progress ? this.state.progress : 100} /> :
            null
            }
        </BootstrapModal> */}

        </Context.Provider>
    )
    }

}
