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
    
    //FUNCTION THE CHECKS BOXES IN CATEGORY COMPONENT
    this.onCheck = (e, fileName) => {

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

    this.addFileToState = (e) => {

        const fileCount = e.target.files.length

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
    
                    newState = {
                        ...this.state, 
                        fileData: {
                            ...this.state.fileData,
                            files: {...newState.fileData.files, [file.name]: obj.files[file.name]},
                            column: {...newState.fileData.column, fileIds: [...newState.fileData.column.fileIds, file.name]}
                    }} 
    
    
                    // newState.fileData.column.fileIds.push(file.name)

                    objCounter += 1

                    console.log(`objCounter ${objCounter}`)
                    console.log(`fileCount ${fileCount}`)

                    if(objCounter === fileCount){
                        console.log(objCounter === fileCount)
                        console.log(newState)
                        resolve()
                    }
                    
                }
                reader.readAsDataURL(file);
            });
            
        }) 

        objPromise.then(res => {this.setState(newState)})
            
            
        // console.log(obj)
        // this.setState({fileData: obj}, console.log(this.state))

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
          const groups = Math.ceil(sortedArray.length / 10);
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
        .then(res => this.setState({serverFileDir: res.data}))
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
        }
    }
           
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

            if(this.state.fileData.files[fileName][string]){
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

