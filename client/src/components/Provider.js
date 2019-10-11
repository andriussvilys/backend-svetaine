import React from 'react';
import axios from 'axios';

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
        categoriesData: [],
        themesData: [],
        artworkFamilyList: [],
            
    }
        
    this.changeFileName = (e) => {
        let nameWithFileType = `${e.target.value.split('.')[0]}.${this.state.fileType.split('/')[1]}`
        this.setState({ fileName: nameWithFileType, filePath: `uploads/${nameWithFileType}` })
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

            // if(string === "themes" || string ==="seeAlso"){
            //     if(!this.state.fileData.files[fileName][string]){
            //         this.state.fileData.files[fileName][string] = []
            //     }
            // }
            // else{
            //     this.state.fileData.files[fileName][string] = null
            // }

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

                let newState = {
                    ...this.state,
                    fileData: {
                        ...newFileData
                    }
                }

                this.fileDataMethods.getFamilyDisplayIndex(newState.fileData.column.fileIds, newState)
                
                console.log(newFileData)
                this.setState(newState)
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
                                src: `uploads/${file.name}`
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
                .then(res => {
                })
                .catch(err => alert(err))
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
        
                let newState = {
                    ...this.state,
                    fileData: {
                        ...this.state.fileData,
                        column: {
                            ...this.state.fileData.column,
                            [newColumn.id]: newColumn    
                        }
                    }
                }

                // Object.keys(this.state.fileData.files).forEach(fileName => {
                //     const file = newState.fileData.files[fileName]
                //     file.familyDisplayIndex = this.fileDataMethods.getFamilyDisplayIndex(file)
                // })

                newState = this.fileDataMethods.getFamilyDisplayIndex(newColumn.fileIds, newState)
        
                this.setState(newState)
        },
        postArtworkInfo: (fileName) => {

            const fileData = this.state.fileData.files[fileName]

            let fileDataObject = 
            {                          
            category: fileData.category ?  fileData.category : null,
            filePath: `uploads/${fileData.fileName}`,
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

            fileData.familyDisplayIndex = this.state.fileData.column.fileIds.indexOf(fileName)

            console.log(fileDataObject)
            axios.post('/api/artworkInfo/create', fileDataObject)
                .then( res => { console.log(res.data)})
                .then(res => this.fileDataMethods.uploadFile(fileName))
                    // .then(() => axios.get('/api/artworkInfo'))
                    //   .then( res => console.log(res.data))
        },
        getFamilyDisplayIndex: (newColumnOrder, newStateCopy) => {

            //the array of fileIds after drag ends
            const fileIdsArray = newColumnOrder
            //context state after drag
            let newState = {...newStateCopy}

            let hasNotFamilyName = newColumnOrder.filter(fileName => !newState.fileData.files[fileName].artworkFamily)
            console.log('HASNOTFAMILYNAME AT INITIATION')
            console.log(hasNotFamilyName)
            let hasFamilyName = []
            let familyChildren = {}

            fileIdsArray.forEach(fileName => {
                const file = newStateCopy.fileData.files[fileName]
                // file.artworkFamily ? hasFamilyName.push(fileName) : hasNotFamilyName.push(fileName)
                console.log('file artworkFamily')
                console.log(file.artworkFamily)
                if(hasNotFamilyName.includes(fileName)){
                    newState.fileData.files[fileName].familyDisplayIndex = hasNotFamilyName.indexOf(fileName)
                }
                else{
                    if(!familyChildren[file.artworkFamily]){
                        familyChildren[file.artworkFamily] = []
                    }
                    familyChildren[file.artworkFamily].push(fileName)
                    console.log('family children index')
                    console.log(familyChildren[file.artworkFamily].indexOf(fileName))
                    newState.fileData.files[fileName].familyDisplayIndex = familyChildren[file.artworkFamily].indexOf(fileName)
                }
            })

            console.log('familyChildren Array')
            console.log(familyChildren)
            console.log('noFamilyChildren Array')
            console.log(hasNotFamilyName)

            return newState
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
        getAllByArtworkFamily: (artworkFamily, fileName) => {
            console.log(artworkFamily)
            axios.get(`/api/artworkInfo/all/${artworkFamily}`)

                .then(res => {
                    let newState ={...this.state}
                    let fileNest = {...this.state.fileData.files[fileName]}
                    newState = {...this.state.fileData.files[fileName], relatedAtwork: res.data}
                    this.setState(newState)
                })
        }
    
    }
    //this deals with creating and pulling artwork family data and attaching it to files
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
        },
        getFamilySetup: (value, string, fileName) => {
    
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

                    this.fileDataMethods.getFamilyDisplayIndex(newState.fileData.column.fileIds, newState)
    
                    // console.log('newState')
                    // console.log(newFamilySetup)
    
                    this.setState(newState)
                    return
                }
    
                this.setState({ familySetupData: newFamilySetup})
                // this.fileDatamethods.getFamilyDisplayIndex()
    
            })
            .catch(err => 
                {
                alert(err)
                this.setState({familySetupData: {...this.state.familySetupData, artworkFamily: value}})
                }
            )
    
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
            const seeAlso = this.state.familySetupData.seeAlso ? this.state.familySetupData.seeAlso : [];
            const location = this.state.familySetupData.location ? this.state.familySetupData.location : "";
            const year = this.state.familySetupData.year ? this.state.familySetupData.year : "";
    
            let requestBody = {
                category: category,
                artworkFamily: artworkFamily,
                familyDescription: familyDescription,
                themes: themes,
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
        }

    }

}   //END OF CONTSTRUCTOR

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

