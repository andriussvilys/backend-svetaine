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
        const allDocuments = props.context.state.artworkInfoData
        const allDocumentNames = Object.keys(props.context.state.artworkInfoData)
        let progressCount = 1
        let updateLength = allDocumentNames.length
    
        allDocumentNames.forEach(artwork => {
            let fileData = allDocuments[artwork]
            if(!fileData.displayTriggers){
                let displayTriggers = {category: [], subcategory: [], listitems: [], themes: [], year: "", location: ""}
                displayTriggers.category = Object.keys(fileData.category)
                displayTriggers.subcategory = getSubcategories(fileData)
                displayTriggers.listitems = getListitems(fileData)
                displayTriggers.themes = fileData.themes
                displayTriggers.year = fileData.year
                displayTriggers.location = fileData.location
                fileData.displayTriggers = displayTriggers
            }
            else{return}

            console.log(artwork)
            console.log(fileData)
            console.log("********************************************")

            progressCount += 1
            console.log(`${progressCount} / ${updateLength}`)
            if(progressCount === updateLength){
                console.log('files updated')
            }

            axios.put(`/api/artworkInfo/update/${artwork}`, fileData)
            .then(res => {
                console.log(res)
                progressCount += 1
                console.log(`${progressCount} / ${updateLength}`)
                if(progressCount === updateLength){
                    console.log('files updated')
                }
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