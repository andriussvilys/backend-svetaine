import React from 'react';
import axios from 'axios';

import FilePreview from './FilePreview'

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

    this.onChange = (e, stateTarget) => {
        let newValue = {
            ...this.state,
            familySetupData: {
                ...this.state.familySetupData,
                [stateTarget]: e.target.value
            }
        }
        this.setState(newValue)
    }

    //adds new family name/theme
    this.addNew = (e, id, router, requestKey, stateKey, callback) => {
        console.log(id)
        console.log(router)
        console.log(requestKey)
        console.log(stateKey)
        console.log(callback)

        e.preventDefault();
        const newAddition = document.getElementById(id).value;
        console.log(newAddition)
        let promise = null
        if(requestKey === "artworkFamily"){
            promise = axios.post(router, {[requestKey]: newAddition})
        }
        else{
            promise = axios.put(router, {[requestKey]: newAddition})
        }
        promise
        .then( res => {
          let addition = res.data[requestKey]
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

    //creates an array of all files in the server uploads folder
    this.readImageDir = () => {
        axios.get('/fetchImages')
        .then(res => 
            {return res}
            // this.setState({serverFileDir: res.data})
            )
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
        autoCheckCategories: (category, subcategory, listitem, fileName) => {

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
    
                if(classname === "listitem"){
                    console.log(fileName)
                    console.log("listItem")
                    console.log("stateCopy")
                    console.log(stateCopy)
                    subcategory = e.target.parentNode.parentNode.id
                    category = e.target.parentNode.parentNode.parentNode.id
                    listItemNest = statePath.category[category][subcategory]
                    newListitems = listItemNest.filter(item => item !== checkboxId)
    
                    this.setState(listItemPath(category, subcategory, newListitems, fileName))
                    return                
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
                        this.setState(newState)
                    return
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
                        this.setState(newState)
                    // e.target.parentNode.classList.toggle('themes-list--selected')
                    return
                }
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

        serverFileToState: (file) => {
            let newState = {...this.state}
            newState.fileData.files = {...newState.fileData.files, [file.fileName]: file}
            this.setState(newState)
        },
        
        /**
         * @param value the value to be added to state
         * @param string the name of the family nest where the new value will be added
         * @param fileName optional: decided which file to update with new value
         * @returns updated context state
         */
        onChange: (value, string, fileName) => {

            let nestType = () => {
                if(string === "themes" || string ==="seeAlso"){
                    return "array"
                }
                else{ return "string"}
            }

            if(nestType() === "array"){
                if(!this.state.fileData.files[fileName][string]){
                    this.state.fileData.files[fileName][string] = []
                }
            }

            if(!!this.state.fileData.files[fileName][string]){
                if(this.state.fileData.files[fileName][string].includes(value)){
                    let newState = []    
                    if(Array.isArray(this.state.fileData.files[fileName][string])){
                            let newList = this.state.fileData.files[fileName][string].filter(item => item !== value)
            
                            newState = {
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
                        }    
                    this.setState(newState)
                    return
                }
            }

            let newState = {}

            if(nestType() === "string"){              
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

            else{
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
            }

            this.setState(newState)

        },

        transferState: (file, radioValue) => {
            let newState = {...this.state}

            if(radioValue === true){
                this.setState({showModal: true})

                //pverwrite file data witch each familySetUp property
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

                const relatedArtworkPromise = this.familySetupMethods.getRelatedArtwork(newState.fileData.files[file.fileName].artworkFamily, newState)

                relatedArtworkPromise.then(res => {
                    console.log("related artwork RESOLVED")
                    console.log(res)
                    newState.relatedArtwork = {...newState.relatedArtwork, [newState.fileData.files[file.fileName].artworkFamily]: res}
                    newState.fileData.files[file.fileName].relatedArtwork = res
                    newState.fileData.files[file.fileName].useFamilySetup = true
                    this.setState(newState, this.setState({showModal: false})
                    )
                })
            }

            else{
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

                            console.log('upload file')
                            console.log(file.name)
                            console.log(reader)
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
                                categories: {},
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
                const fileData = this.state.fileData.files
    
                const fd = new FormData();
                fd.append('artworkImage', fileData[fileName].file, fileData[fileName].artwrokTitle || fileData[fileName].fileName)
    
                axios.post('/api/artworkInfo/imageUpload', fd)
                    .then(res => { this.readImageDir()
                    })
                    .catch(err => alert(err))

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
            console.log('UPDATE FILE DATA')
            console.log(file)
            return new Promise((resolve, reject) => {
                if(!file.category || !Object.keys(file.category).length > 0 ){
                    resolve('To submit, select categories for this file')
                }

                else{
                    if(file.artworkFamily){
                        const artworkFamily = file.artworkFamily
                        const updateLength = Object.keys(this.state.relatedArtwork[artworkFamily].files).length 
                        let progressCount = 0
        
                        Object.keys(this.state.relatedArtwork[artworkFamily].files).forEach(objName => {

                            
                            let obj = this.state.relatedArtwork[artworkFamily].files[objName]
                            if(objName === file.fileName){
                                obj = this.state.fileData.files[file.fileName]
                            }
                            const familyIndex = this.state.relatedArtwork[artworkFamily].column.fileIds.indexOf(obj.fileName)
                            let fileData =  obj
                                fileData.familyDisplayIndex = familyIndex
                                console.log("update with fileData")
                                console.log(fileData)
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

            this.familySetupMethods.updateFamilySetup(this.state.familySetupData.artworkFamily)

            const fileNamesInFamily = Object.keys(this.state.relatedArtwork[familyName].files)
            const updateLength = fileNamesInFamily.length
            let progress = 0
            if(updateLength > 0){
                this.state.relatedArtwork[familyName].column.fileIds.forEach((fileName, index) => {
                    const familyDisplayIndex = this.state.relatedArtwork[familyName].column.fileIds.indexOf(fileName)

                    let fileData = this.state.relatedArtwork[familyName].files[fileName]
                    delete fileData.__v
                    delete fileData._id
                    delete fileData.relatedArtwork
                    fileData = {...fileData, familyDisplayIndex}
                    console.log(fileData)
                    axios.put(`/api/artworkInfo/update/${fileName}`, fileData)
                        .then(res => {
                            progress += 1
                            console.log(`progress: ${progress}/${updateLength}`)
                            if(progress === updateLength){
                                axios.get(`/api/artworkInfo/${familyName}`)
                                    .then(res => {console.log(res)})
                            }
                        })
                })
            }
        },

        postArtworkInfo: (file) => {
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
                            console.log('server includes files already')
                            fileData = obj
                            fileData.familyDisplayIndex = familyIndex
        
                            axios.put(`/api/artworkInfo/update/${obj.fileName}`, fileData)
                                .then(res => {
                                    let newState = this.state
                                    this.familySetupMethods.getArtworkInfo()
                                        .then(res => {
                                            newState.artworkInfoData = res
                                            this.setState(newState, resolve(`new file registered in "${file.artworkFamily}" family`))
                                        })
                                })
                        }
            
                        else{
                            fileData = this.state.fileData.files[file.fileName]
                
                            let fileDataObject = {                                                 
                            category: fileData.category ? fileData.category : null,
                            filePath: `/uploads/${fileData.fileName}`,
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
                                        let newState = {...this.state}
                                        this.familySetupMethods.getArtworkInfo()
                                            .then(res => {
                                                console.log("getArtworkInfo")
                                                newState.artworkInfoData = res
                                                newState.serverFileDir = [...this.state.serverFileDir, file.fileName]
                                                this.setState(newState, resolve(`new file registered in "${file.artworkFamily}" family`))
                                                
                                            })
                                            .catch(err=>console.log(err))
                                })
                                .catch(err => console.log(err))
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
         * @param artworkFamily - query key to find appropriate database records
         * @param fileName - which file data obj receives res.data
         */
    
    }

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
        renderAllFiles: (highlighterState) => 
        {
            return new Promise((resolve, rej) => {
    
                const highlighter = (fileName) => {
                        return highlighterState.includes(fileName)
                }
    
                let serverFileNames = null;
                
                //get an array of all file names in the server
                axios.get('/fetchImages')
                    .then(res => {
                        serverFileNames = res.data
        
                        //get all artwork records from database
                        axios.get('/api/artworkInfo')
                            .then(res => {
                                let databaseFiles = []
                                let usedNames = []
                                
                                //check that a record has a file in the server
                                serverFileNames.forEach(fileName => {
                                    res.data.forEach(obj => {if(obj.fileName === fileName){return databaseFiles = [...databaseFiles, obj]}})
                                })
        
                                let fileList = []
        
                                databaseFiles.forEach((file, index) => {
                                    if(usedNames.includes(file.fileName)){
                                        return
                                    }
                                    usedNames = [...usedNames, file.fileName]
                                    let newFile = {
                                        fileName: file.fileName,
                                        artworkFamily: file.artworkFamily,
                                        checked: highlighter(file.fileName),
                                        file: 
                                            <div key={`fileLibrary-${file.fileName}`} 
                                            style={{width: "200px", display:"flex", flexDirection:"column", justifyContent:"space-between", border: "1px solid black", margin: "2px 1px 0 1px"}}
                                            className={`${highlighter(file.fileName) ? 'themes-list--selected' : 'notSelected'}`} 
                                            >
                                                <div 
                                                style={{display:"flex", flexDirection:"column", height: "100%", justifyContent:"space-between", marginBottom: "1px"}}
                                                onClick={(e) => (console.log(file))}
                                                >
                                                    <div>
                                                        <p className="subtitle">file name:</p>
                                                        <p style={{fontSize: "10px", fontWeight: "bold"}}>{file.fileName}</p>
                                                        <p className="subtitle">family name:</p>
                                                        <p style={{fontSize: "10px", fontWeight: "bold"}}>{!file.artworkFamily ? null : file.artworkFamily}</p>
                                                    </div>
                                                    <FilePreview 
                                                        key={`fileUpload-${file.fileName}-${index}`}
                                                        file={file}
                                                    />
                                                </div>
        
                                                <div style={{border: "1px solid grey", padding: "2px"}}>
                                                    <p style={{fontSize: "10px"}}>use as See Also recommendation</p>
                                                    <form style={{display:"flex", justifyContent:"space-evenly"}}>
                                                        <div className="container-radio">
                                                            <input type="radio" 
                                                            name="useAsSeeAlso" 
                                                            id="useAsSeeAlso__radio-yes" 
                                                            value="yes" 
                                                            onChange={() => {this.familySetupMethods.onChange( file.fileName, "seeAlso")}}
                                                            checked={highlighter(file.fileName)}
                                                            />
                                                            <label 
                                                            htmlFor="useAsSeeAlso_yes"
                                                            id="useAsSeeAlso_yes"
                                                            >yes</label>
                                                        </div>
                                                        <div className="container-radio">
                                                            <input type="radio" 
                                                            name="useAsSeeAlso" 
                                                            id="useAsSeeAlso__radio-no" 
                                                            value="no" 
                                                            onChange={() => {this.familySetupMethods.onChange(file.fileName, "seeAlso")}}
                                                            checked={!highlighter(file.fileName)}
                                                            />
                                                            <label htmlFor="useAsSeeAlso_no">no</label>
                                                        </div>
                                                    </form>
                                                </div>
        
                                            </div>
                                    }
                                    fileList = {...fileList, [file.fileName]: newFile}
                                })
                                
                                
                                let renderFiles = {}

                                //check RENDERLIST and filter out unselected objects 
                                if(this.state.seeAlsoData.fileList){
                                        const currentRenderFiles = Object.keys(this.state.seeAlsoData.renderFiles)

                                        Object.keys(fileList).forEach(fileName => {
                                            if(currentRenderFiles.includes(fileName)){
                                                renderFiles = {...renderFiles, [fileName]: fileList[fileName]}
                                            }
                                        })

                                }
                                else{
                                    renderFiles = fileList
                                }

                                //add an array of all file object
                                renderFiles.fileNames = Object.keys(renderFiles).filter(fileName => fileName !== "fileList")
    
                                let newSeeAlso = {fileList, renderFiles}

                                resolve(newSeeAlso)
                            })
                    })   
            })
        },
        getArtworkInfo: () => {
                return new Promise((resolve, rej) => {
        
                    let serverFileNames = null;
                    
                    //get an array of all file names in the server
                    axios.get('/fetchImages')
                        .then(res => {
                            serverFileNames = res.data
            
                            //get all artwork records from database
                            axios.get('/api/artworkInfo')
                                .then(res => {
                                    let databaseFiles = {}
                                    let usedNames = []
                                    
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
                })
        },
        resetRenderFiles: () => {
            let newState = this.state
            newState.seeAlsoData.renderFiles = {...newState.seeAlsoData.fileList, fileNames: newState.seeAlsoData.renderFiles.fileNames, }
            this.setState(newState)
        },
        onChange: (value, string, e) => {
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
                this.familySetupMethods.renderAllFiles(newState.familySetupData.seeAlso).then(res => {
                    let seeAlsoData = {}
                    newState = {...newState, seeAlsoData: res}
                    this.setState(newState)
                })
            }
            else{
                let newState = addNewValue(value)
                this.familySetupMethods.renderAllFiles(newState.familySetupData.seeAlso).then(res => {
                    newState = {...newState, seeAlsoData: res}
                    this.setState(newState)
                })
            }
        },
        isChecked: (string, value) => {
            if(this.state.familySetupData[string].includes(value)){
                return true
            } 
            else{
                return false
            } 
        },
        getFamilySetup: (value, string, fileName) => {

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

                        this.familySetupMethods.renderAllFiles(newState.familySetupData.seeAlso).then(res =>{ 
                            newState.seeAlsoData = res
                            this.setState(newState)
                        })

                    } 
                    )
            })
            .catch(err => 
                {
                let newState = {...this.state}
                newState.familySetupData.artworkFamily = value
                console.log("no record")
                console.error(err)
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
                alert('select or add new Family Name')
                return
            }
            axios.post('/api/familySetup/create', requestBody)
                .then( res => {alert('success')})
                .catch(err => {console.log(err); alert(err)})
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
                alert('select or add new Family Name')
                return
            }

            axios.put(`/api/familySetup/update/${familyName}`, requestBody)
                .then( res => { alert('success')})
                .catch(err => {console.log(err); alert(err)})

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
                        
                        //add additional properties: 
                        //column (with id and array of files in order)
                        //id
                        let fileIds = []
                        let noIndex = []

                        console.log(relatedArtwork)
                        Object.keys(relatedArtwork).forEach((fileName, index) => {
                            const familyDisplayIndex = relatedArtwork[fileName].familyDisplayIndex
                            // if(relatedArtwork[fileName].familyDisplayIndex < 0){
                            //     fileIds.push(fileName)
                            // }
                            // else{
                            //     fileIds[relatedArtwork[fileName].familyDisplayIndex] = fileName
                            // }
                            // if(relatedArtwork[fileName].familyDisplayIndex && relatedArtwork[fileName].familyDisplayIndex >= 0){
                            //     if(!fileIds[relatedArtwork[fileName].familyDisplayIndex]){
                            //         fileIds[relatedArtwork[fileName].familyDisplayIndex] = fileName
                            //     }
                            //     else{
                            //         fileIds.push(fileName)
                            //     }
                            // }
                            // else{
                            //     fileIds.push(fileName)
                            // }
                            if(familyDisplayIndex < 0 || familyDisplayIndex === null || undefined){
                                console.log('***************IRREGULAR INDEX')
                                console.log(fileName)
                                console.log(familyDisplayIndex)
                                noIndex.push(fileName)
                            }
                            else{fileIds[familyDisplayIndex] = fileName}
                        })
                        console.log('related ARTWORK fileIds after forEach')
                        console.log(fileIds)
                        noIndex.forEach(fileName => fileIds.push(fileName))
                        console.log(`noIndex, ${noIndex}`)
                        fileIds = fileIds.filter(fileName => fileName !== null || undefined)
                        console.log('fileIds final')
                        console.log(fileIds)
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
                        console.log()
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
                this.familySetupMethods.getArtworkInfo()
                    .then(res => {
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
            addNew: this.addNew,

            } }>
        {this.props.children}
        </Context.Provider>
    )
    }

}
