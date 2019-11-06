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

    //creates an array of all files in the server uploads folder
    this.readImageDir = () => {
        axios.get('/fetchImages')
        .then(res => this.setState({serverFileDir: res.data}))
    }

    //this takes care of CATEGORIES used for navigation
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
    
                    console.log(newState)
                    return newState
            }
    
            const categoryPath = (newCategory, fileName) => {
                console.log('category path runs')
                let newState = {}
    
                    if(fileName){
                        console.log("*********FILENAME IN CATEGORYPATH")
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
    
                    console.log('state with new category')
                    console.log(newState)
                    return newState
            }
    
            const subcategoryPath = (newCategory, newSubcategory, fileName) => {
                console.log('SUBCATEGORY PATH RUNS')
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
    
                console.log('state with new SUBcategory')
                console.log(newState)
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
    
                if(classname === "listitem"){
                    subcategory = e.target.parentNode.parentNode.id
                    console.log('clicked listitem')
                    console.log(subcategory)
                    category = e.target.parentNode.parentNode.parentNode.id
                    listItemNest = statePath.category[category][subcategory]
                    newListitems = listItemNest.filter(item => item !== checkboxId)
    
                    this.setState(listItemPath(category, subcategory, newListitems, fileName))
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
            
    
            //creates nests in category obj
            const checkboxCheck = (checkbox, subcategory, callback) => {
    
                //if we only need to set a category
                if(!subcategory){
                    this.setState(categoryPath(checkbox.value, fileName), console.log('just created a category'))
                }
                else{
                    this.setState(categoryPath(checkbox.value, fileName), 
                        this.setState(subcategoryPath(checkbox.value, subcategory.value),
                            callback()
                        )
                    )
                }
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

            console.log('on change')
            console.log(value)

            console.log('STRING')
            console.log(string)

            console.log('fileName')
            console.log(fileName)

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

                    newState.relatedArtwork = {...newState.relatedArtwork, [newState.fileData.files[file.fileName].artworkFamily]: res}
                    newState.fileData.files[file.fileName].relatedArtwork = res
                    newState.fileData.files[file.fileName].useFamilySetup = true
                    console.log("********************************************NEW STATE")
                    console.log(newState)
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

            console.log('FILE INPUT')

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

                            obj.files[file.name] = {                    
                                preview: reader.result,
                                file: fileInput[index],
                                fileName: file.name, 
                                fileType: file.type,
                                familyDisplayIndex: null,
                                src: `/uploads/${file.name}`,
                                themes: [],
                                seeAlso: [],
                                categories: {}
                            }
            
                            if(file.type.match("application/pdf")){
                                // const previewInfo = "data:application/pdf;base64,"
                                // const previewSlice = obj.files[file.name].preview.slice(previewInfo.length)
                                // console.log(previewSlice)
                                // obj.files[file.name].preview = atob(previewSlice)
                                // console.log( obj.files[file.name])

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
        
            objPromise.then(res => {console.log('objPromise RESOLVED'); this.setState(newState, 
                console.log(filename)
                )})
        },
        //THIS UPLOADS FILE TO SERVER

        uploadFile: (fileName) => {
                const fileData = this.state.fileData.files
    
                const fd = new FormData();
                fd.append('artworkImage', fileData[fileName].file, fileData[fileName].fileName)
    
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
        removeFile: (fileName) => {

            alert('REMOVE FILE')
        
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
            
            this.setState(newState)
        },
        //change display index by dragging file preview
        onDragEnd: (result) => {
            console.log('ondragend result')
            console.log(result)

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

            console.log('RESULT AND FAMILY NAME*****************')
            console.log(result)
            console.log(fileName)
            console.log(artworkFamily)

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
        postArtworkInfo: (file) => {
            console.log('POST ARTWORK INFO FILE*****************//////////////')
            console.log(file)
            if(!Object.keys(file.category).length > 0){
                alert(`please select categories for file ${file.fileName}`)
                return
            }
            this.setState({showModal: true})

            const postPromise = new Promise((resolve, rej) => {
                if(!file.artworkFamily){

                    const fileData = file
                    console.log("fileData")
                    console.log(fileData)
        
                    let fileDataObject = {                          
                    category: fileData.category ?  fileData.category : null,
                    filePath: `/uploads/${fileData.fileName}`,
                    fileName: fileData.fileName,
                    fileType: fileData.fileType,
        
                    artworkFamily: fileData.artworkFamily ?  fileData.artworkFamily : null,
                    familyDescription: fileData.familyDescription ?  fileData.familyDescription : null,
                    artworkTitle: fileData.artworkTitle ?  fileData.artworkTitle : null,
                    artworkDescription: fileData.artworkDescription ?  fileData.artworkDescription : null,
                    // familyDisplayIndex: fileData.familyDisplayIndex ?  fileData.familyDisplayIndex : null,
                    themes: fileData.themes ?  fileData.themes : null,
                    seeAlso: fileData.seeAlso ?  fileData.seeAlso : null,
                    location: fileData.location ?  fileData.location : null,
                    year: fileData.year ? fileData.year : null,
        
                    displayMain: fileData.displayMain ? fileData.displayMain : null 
                    }
        
                    // fileData.familyDisplayIndex = this.state.fileData.column.fileIds.indexOf(fileName)
                    fileDataObject.familyDisplayIndex = null
                    
                    console.log("fileDataObject")
                    console.log(fileDataObject)
                    axios.post('/api/artworkInfo/create', fileDataObject)
                        .then( res => { 
                            console.log(res.data); 
                            this.fileDataMethods.uploadFile(file.fileName)
                            resolve()
                        })
                        .catch(err => console.error(err))
                    }
                else{
                        const artworkFamily = file.artworkFamily
                        const updateLength = Object.keys(this.state.relatedArtwork[artworkFamily].files).length 
     
                        let progressCount = 0
        
                        Object.keys(this.state.relatedArtwork[artworkFamily].files).forEach(objName => {
                            
                            const obj = this.state.relatedArtwork[artworkFamily].files[objName]
                            const familyIndex = this.state.relatedArtwork[artworkFamily].column.fileIds.indexOf(obj.fileName)
                            let fileData = null
            
                            console.log('const OBJ')
                            console.log(obj)
                            console.log("familyIndex")
                            console.log(familyIndex)
                            
            
                            //check if the file is uploaded to server
                            if(this.state.serverFileDir.includes(obj.fileName)){
                                alert('update')
                                fileData = obj
                                fileData.familyDisplayIndex = familyIndex
            
                                console.log("fileData")
                                console.log(fileData)
            
                                axios.put(`api/artworkInfo/update/${obj.fileName}`, fileData)
                                    .then(res => {
                                        progressCount += 1
                                        console.log("updateLength")
                                        console.log(updateLength)
                                        console.log("progressCount")
                                        console.log(progressCount)
                                        if(progressCount === updateLength){
                                            resolve()
                                        }
                                    })
        
                            }
                
                            else{
                                // fileData = this.state.fileData.files[obj.fileName]
                                fileData = this.state.relatedArtwork[artworkFamily].files[obj.fileName]
            
                                console.log("fileData")
                                console.log(fileData)
                    
                                let fileDataObject = {                                                 
                                category: fileData.category ?  fileData.category : null,
                                filePath: `/uploads/${fileData.fileName}`,
                                fileName: fileData.fileName,
                                fileType: fileData.fileType,
                    
                                artworkFamily: fileData.artworkFamily ?  fileData.artworkFamily : null,
                                familyDescription: fileData.familyDescription ?  fileData.familyDescription : null,
                                artworkTitle: fileData.artworkTitle ?  fileData.artworkTitle : null,
                                artworkDescription: fileData.artworkDescription ?  fileData.artworkDescription : null,
                                // familyDisplayIndex: fileData.familyDisplayIndex ?  fileData.familyDisplayIndex : null,
                                themes: fileData.themes ?  fileData.themes : null,
                                seeAlso: fileData.seeAlso ?  fileData.seeAlso : null,
                                location: fileData.location ?  fileData.location : null,
                                year: fileData.year ? fileData.year : null,
                    
                                displayMain: fileData.displayMain ? fileData.displayMain : null 
                                }
                    
                                // fileData.familyDisplayIndex = this.state.fileData.column.fileIds.indexOf(fileName)
                                fileDataObject.familyDisplayIndex = familyIndex

                                alert(`displaIndex ${familyIndex}`)
                                
                                console.log("fileDataObject")
                                console.log(fileDataObject)
                                axios.post('/api/artworkInfo/create', fileDataObject)
                                    .then( res => { console.log(res.data);                                    
                                        this.fileDataMethods.uploadFile(file.fileName)
                                        progressCount += 1
                                        console.log("updateLength")
                                        console.log(updateLength)
                                        console.log("progressCount")
                                        console.log(progressCount)
                                        if(progressCount === updateLength){
                                            resolve()
                                            return
                                        }
                                    })
                            }
                        })

                }
            })

            postPromise.then(res => {
                this.setState({showModal: false})
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
            console.log(`filterByFmaily ${value}`)
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

                                console.log("databaseFiles**************************************")
                                console.log(databaseFiles)
        
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
                                            style={{maxWidth: "200px", display:"flex", flexDirection:"column", justifyContent:"space-between", border: "1px solid black", margin: "2px 1px 0 1px"}}
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
            console.log(`check if ${value} is included in ${string}`)
            if(this.state.familySetupData[string].includes(value)){
                console.log(`includes ${value}`)
                return true
            } 
            else{
                console.log(`doesnt include ${value}`)
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
                    console.log('if FILE NAME state')
                    console.log(newState)
                }

                else if(!fileName){
                    Object.keys(res.data).forEach(objKey => {
                        newFamilySetup = {
                            ...newFamilySetup,
                            [objKey]: res.data[objKey]
                        }
                    })
                    
                    newState = {...this.state, familySetupData: newFamilySetup}
                    console.log(newState)
                }

                const withRelatedArtwork = this.familySetupMethods.getRelatedArtwork(value, newState)
    
                withRelatedArtwork
                    .then(  res => {
                        console.log('   with related artwork  ')
                        console.log(res)

                        newState = {...newState, relatedArtwork: {...newState.relatedArtwork, [value]: res}}

                        this.familySetupMethods.renderAllFiles(newState.familySetupData.seeAlso).then(res =>{ 
                            
                            console.log('promise res')
                            console.log(res)
                            newState.seeAlsoData = res
                            console.log("newState")
                            console.log(newState)
                            this.setState(newState)
                        })

                    } 
                    )
            })
            .catch(err => 
                {
                console.error(err)
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
                .then( res => {console.log(res); alert('success')})
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

            console.log(requestBody)
            console.log(`/api/familySetup/update/${this.state.familySetupData.artworkFamily}`)

            if(!this.state.familySetupData.artworkFamily){
                alert('select or add new Family Name')
                return
            }

            axios.put(`/api/familySetup/update/${familyName}`, requestBody)
                .then( res => {console.log(res); alert('success')})
                .catch(err => {console.log(err); alert(err)})

        },
        getRelatedArtwork: (artworkFamily, newState) => {

            let relatedArtwork = {}

            console.log('AXIOS RUNS')
            //get all records from the selected family from database
            return new Promise((resolve, reject) => {
                // if(this.state.relatedArtwork[value]){
                //     relatedArtwork = {...this.state.relatedArtwork}
                // }

                axios.get(`/api/artworkInfo/${artworkFamily}`)
                    .then(res =>{

                    //for each fileData object in res.data array 
                        res.data.forEach((obj, index) => {
                        //paste all properties of this file object unto relatedArtwork object
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
                                        console.log(`file ${fileName} with familyName in state`)
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
                            console.log('relatedArtwork from state')
                            console.log(relatedArtwork)
                        }
                        

                        //add additional properties: 
                        //column (with id and array of files in order)
                        //id
                        let finalRelatedArtwork = {
                                files: relatedArtwork,
                                column: {
                                    fileIds: Object.keys(relatedArtwork).map(objName => objName),
                                    id: `${artworkFamily}-relatedArtworks`
                                },
                                columnOrder: [`${artworkFamily}-relatedArtworks`]
                        };
                            console.log("finalRelatedArtwork")
                            console.log(finalRelatedArtwork)
                            resolve(finalRelatedArtwork)
                    })
            }) 
        },
        updateContext: (value, propertyName, callback) => {
            console.log('callback')
            console.log(callback)
            this.setState({[propertyName]: value}, callback())
        }
    }//end of familySetupMethods

}//END OF CONTSTRUCTOR

    componentDidMount(){

            let newState = {...this.state}

            axios.get('/api/themes')
            .then( res => {
            newState.themesData = res.data.list
            })
            .then( res => {
                axios.get('/api/familySetup')
                .then(res => {
                    let familyList = Object.keys(res.data).map(obj => {
                        return res.data[obj].artworkFamily
                    })
                    newState.artworkFamilyList = familyList
                })
            })
            .then(resolved => {
                axios.get('/api/categories')
                .then(res => {
                    newState.categoriesData = res.data
                })
            })
            .then(res => this.readImageDir())
            .then(res => {this.familySetupMethods.getArtworkInfo()
                .then(res => {
                    newState.artworkInfoData = res
                    this.setState(newState)
                })
            })
            // .then(res => {
            //     this.familySetupMethods.renderAllFiles(this.state.familySetupData.seeAlso).then(res => {
            //         newState.seeAlsoData = res
            //         console.log('newSTATE after context MOUNT')
            //         console.log(newState)
            //         newState.showModal = false
            //         this.setState(newState)
            //     })
            // })
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

