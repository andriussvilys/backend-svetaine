import React from 'react';
import axios from 'axios';
import FilePreview from '../FilePreview'

export const Context = React.createContext();

export class Provider extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        // FRONTEND: null,
        fileData: {
            files: {},
            column: {
                id: 'column-1',
                fileIds: []
            },
            columnOrder: ['column-1']
        },
        // familySetupData: {
        //     useFamilySetup: false,
        //     artworkFamily: null,
        //     familyDescription: null,
        //     location: null,
        //     year: null,
        //     seeAlso: [],
        //     themes: [],
        //     category: {}
        // },
        relatedArtwork: {},
        // categoriesData: [],
        // seeAlsoData: {renderFiles: {fileNames: []}},
        // themesData: [],
        // artworkFamilyList: [],
        // serverFileDir: [],
        // showModal: false,
    }

    //creates an array of all files in the server uploads folder
    this.readImageDir = () => {
        axios.get('/fetchImages')
        .then(res => 
            {return res}
            // this.setState({serverFileDir: res.data})
            )
    }

    this.getRelatedArtwork = (artworkFamily, newState) => {

        let relatedArtwork = {}
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
                    let finalRelatedArtwork = {
                            files: relatedArtwork,
                            column: {
                                fileIds: Object.keys(relatedArtwork).map(objName => objName),
                                id: `${artworkFamily}-relatedArtworks`
                            },
                            columnOrder: [`${artworkFamily}-relatedArtworks`]
                    };
                        resolve(finalRelatedArtwork)
                })
        }) 
    }

    this.getArtworkInfo = () => {
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
    }

    this.categoryChecked = (category) => {
        let onDisplay = false
        Object.keys(this.state.artworkOnDisplay).forEach(fileName => {
            const file = this.state.artworkOnDisplay[fileName]
            if(Object.keys(file.category).includes(category)){
                onDisplay = true
            }
        })
        return onDisplay
    }
    this.filterByCategory = (e, category) => {
        let newDisplay = {}

        //ON UN-CHECK
        if(!e.target.checked){
            Object.keys(this.state.artworkOnDisplay).forEach(fileName => {
                const file = this.state.artworkOnDisplay[fileName]
                if(!Object.keys(file.category).includes(category)){
                    newDisplay = {...newDisplay, [fileName]: file}
                }
            })
            return this.setState({artworkOnDisplay: newDisplay})
        }
        //ON CHECK
        else{
            newDisplay={...this.state.artworkOnDisplay}
            Object.keys(this.state.artworkInfoData).forEach(fileName => {
                const file = this.state.artworkInfoData[fileName]
                if(Object.keys(file.category).includes(category)){
                    newDisplay = {...newDisplay, [fileName]: file}
                }
            })
            return this.setState({artworkOnDisplay: newDisplay})
        }

    }
    this.filterBySubcategory = (e, category, subcategory) => {
        let newDisplay = {}

        //ON UN-CHECK
        if(!e.target.checked){
            Object.keys(this.state.artworkOnDisplay).forEach(fileName => {
                const file = this.state.artworkOnDisplay[fileName]
                if(file.category[category]){
                    if(!Object.keys(file.category[category]).includes(subcategory)){
                        return newDisplay = {...newDisplay, [fileName]: file}
                    }
                }
                else{
                    return newDisplay = {...newDisplay, [fileName]: file}
                }
            })
            return this.setState({artworkOnDisplay: newDisplay})
        }
        //ON CHECK
        else{
            newDisplay={...this.state.artworkOnDisplay}
            Object.keys(this.state.artworkInfoData).forEach(fileName => {
                const file = this.state.artworkInfoData[fileName]
                if(file.category[category]){
                    if(Object.keys(file.category[category]).includes(subcategory)){
                        newDisplay = {...newDisplay, [fileName]: file}
                    }
                }
            })
            return this.setState({artworkOnDisplay: newDisplay})
        }

    }
    this.subcategoryChecked = (category, subcategory) => {
        let onDisplay = false
        Object.keys(this.state.artworkOnDisplay).forEach(fileName => {
            const file = this.state.artworkOnDisplay[fileName]
            if(file.category[category]){
                if(Object.keys(file.category[category]).includes(subcategory)){
                    onDisplay = true
                }
            }
        })
        return onDisplay
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
            newState.categoriesOptionList.DOM.subCategories = subCategoryDomList
            if(optGroups){
                newState.categoriesOptionList.DOM.subCategories = optGroups
            }
            this.setState(newState)
            
        },

        submitNewCategory: () => {

            const categoryInput = document.getElementById("add-category")
            const subcategoryInput = document.getElementById("add-subcategory")
            const listitemInput = document.getElementById("add-listitem")

            const allCats = Object.values(this.state.categoriesData)
    
            let reqBody = {category: null, subcategory: {}}
            //IF THE VALUE DOES NOT EXIST IN THE CATEGORYNAMES ARRAY IE IS NEW
                reqBody = {category: categoryInput.value}
                if(subcategoryInput.value){
                    reqBody.subcategory = {[subcategoryInput.value]: []}
                }
                else{reqBody.subcategory = []}
                if(listitemInput.value){
                    reqBody.subcategory[subcategoryInput.value] = [listitemInput.value]
                }
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
                    subcategory = e.target.parentNode.parentNode.id
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
}//END OF CONTSTRUCTOR

    componentDidMount(){
            let newState = {...this.state}

            this.setState({showModal: true})

            let Themes = new Promise ((resolve,rej) => {
                axios.get('/api/themes')
                .then( res => {
                newState.themesData = res.data.list
                resolve()
                })
                .catch(err => {
                    console.log(err); 
                    // document.location.reload(true)
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
                .catch(err => {
                    console.log(err); 
                    document.location.reload(true)
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
                                this.getRelatedArtwork(familyName, newState).then(res => 
                                    newState.relatedArtwork[familyName] = res
            
                                )
                            })
                            resolve()
                        })
                        .catch(err => {
                            console.log(err); 
                            // document.location.reload(true)
                        })
                })
            }) 

            let ArtworkInfo = new Promise ((resolve, rej) => {
                this.getArtworkInfo()
                    .then(res => {
                        newState.artworkInfoData = res
                        newState.artworkOnDisplay = res
                        resolve()
                    })
            })

            Promise.all([Categories, ArtworkInfo, Themes])
                .then(res => {
                    newState.showModal = false
                    this.setState(newState)
                })
                .catch(err => {
                    console.log(err); 
                    // document.location.reload(true)
                })
    }

    render(){
    return(
        <Context.Provider value={ {
            state: this.state, 
            
            categoryMethods: this.categoryMethods,
            onCheck: this.categoryMethods.onCheck, 
            filterByCategory: this.filterByCategory,
            filterBySubcategory: this.filterBySubcategory,
            categoryChecked: this.categoryChecked,
            subcategoryChecked: this.subcategoryChecked,

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

