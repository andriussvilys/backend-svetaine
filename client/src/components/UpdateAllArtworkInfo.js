import React from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

const UpdateAllArtworkInfo = (props) => {

    const getSubcategories = (file) => {
        let categories = Object.keys(file.category)
        let subcategories = []
        categories.forEach(category => {
            subcategories = [...subcategories, ...Object.keys(file.category[category])]
        })
        return subcategories
    }
    const getListitems = (file) => {
        const categories = Object.keys(file.category)
        let listItems = []
        categories.forEach(category => {
            let subcategories = Object.keys(file.category[category])
            subcategories.forEach(sub => {
                if(!file.category[category][sub].length > 0){return}
                listItems = [...listItems, ...file.category[category][sub]]
            })
        })
        return listItems
    }

    const commenceUpdate = () => {
        // const allDocuments = props.context.state.artworkInfoData
        // const allDocumentNames = Object.keys(props.context.state.artworkInfoData)
        const allFams = axios.get('/api/familysetup')
        
        allFams.then(res => {
            const allFamNames = res.data.map(obj => obj.artworkFamily)
            
            let progressCount = 0
            let updateLength = allFamNames.length
            console.log("allFams")
            console.log(res.data)
            console.log("allFamNames")
            console.log(allFamNames)
            console.log("updateLength")
            console.log(updateLength)

            res.data.forEach(artwork => {
                let fileData = artwork
    
                    let displayTriggers = {category: [], subcategory: [], listitems: [], themes: [], year: "", location: ""}
                    displayTriggers.category = Object.keys(fileData.category)
                    displayTriggers.subcategory = getSubcategories(fileData)
                    displayTriggers.listitems = getListitems(fileData)
                    displayTriggers.themes = fileData.themes
                    displayTriggers.year = fileData.year
                    displayTriggers.location = fileData.location
                    fileData.displayTriggers = displayTriggers
    
                console.log(fileData)
                console.log("********************************************")
    
                progressCount += 1
                console.log(`${progressCount} / ${updateLength}`)
                if(progressCount === updateLength){
                    console.log('files updated')
                }
    
                axios.put(`/api/familysetup/update/${artwork}`, fileData)
                .then(res => {
                    console.log(res)
                    progressCount += 1
                    console.log(`${progressCount} / ${updateLength}`)
                    if(progressCount === updateLength){
                        console.log('files updated')
                    }
                })
                })
            })
        }
    
    return(
        <Button
            onClick={() => {
                commenceUpdate()
            }}
        >
            Update all Artworks
        </Button>
    )
}

export default UpdateAllArtworkInfo