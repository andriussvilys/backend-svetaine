import React from 'react';
import axios from 'axios';
import staticState from './staticState'

export const Context = React.createContext();

export class Provider extends React.Component{
  constructor(props){
    super(props);
  this.state = {
    info: {infoUp: false, toggleTags: false},
    showAll: true,
  }

  this.enlarge = {}

    this.resetAll = (hide) => {
      let newState = {...this.state}
      //If Hide ALL
      if(hide){
        newState.filters.onDisplay = {...newState.filters.empty}
        newState.artworkOnDisplay = {}
      }
      //IF View ALL
      else{
        console.log("this.state.compoundFilters")
        console.log(this.state.compoundFilters)
        newState.artworkOnDisplay = {...newState.initialOnDisplay}
        if(!this.state.compoundFilters){
          newState.filters.onDisplay = {...newState.filters.empty}
        }
        else{
          newState.filters.onDisplay = {...newState.filters.initialOnDisplay}
          this.checkFilters(newState.artworkOnDisplay, newState, "onDisplay")
        }
      }
      newState.showAll = !this.state.showAll
      newState.filters.lastValue = null
      this.setState(newState)
    }
    this.compoundFiltersSwitch = () => {
      let newState = {...this.state}
      newState.compoundFilters = !this.state.compoundFilters
      newState.showAll = false
      console.log("compoundFiltersSwitch STATE")
      console.log(newState)
      newState.filters =  this.checkFilters(newState.artworkOnDisplay, newState, "onDisplay")
      // let checkedFilters =  this.checkFilters(newState.artworkOnDisplay, newState, "onDisplay")
      // console.log("checkedFilters")
      // console.log(checkedFilters)
      this.setState(newState)
      // this.setState({compoundFilters: !this.state.compoundFilters})
    }
    this.checkFilters = (artworkCollection, newState, propName) => {

      //IF SWITCHING OFF COMBINE FILTERS
      if(!newState.compoundFilters){
        const lastValue = newState.filters.lastValue
        if(newState.filters.lastValue){
          let nestOfLastValue = null
          Object.keys(newState.filters.onDisplay).forEach(category => {
            if(newState.filters.onDisplay[category].indexOf(lastValue) >= 0){
              nestOfLastValue = category
            }
          })
          newState.filters.onDisplay = {...newState.filters.empty}
          if(nestOfLastValue){
            newState.filters.onDisplay[nestOfLastValue] = [lastValue]
            newState.artworkOnDisplay = this.filter(nestOfLastValue, lastValue).artworkOnDisplay
          }
        }

        else{
          newState.filters.onDisplay = {...newState.filters.empty}
        }
        console.log("checFilters STATE")
        console.log(newState.filters)
        return newState.filters
      }

      //IF SWITCHING COMPOUND FILTERS ON
      else{
        console.log("NEW STATE INSIDE CHECK FILTERS")
        console.log(newState)
  
        Object.keys(artworkCollection).forEach(fileName => {
          const fileFilters = artworkCollection[fileName].displayTriggers
  
  
            Object.keys(fileFilters).forEach(filterName => {
              if(typeof fileFilters[filterName] === "object"){
                if(fileFilters[filterName]){
  
                  fileFilters[filterName].forEach(content => {
                    if(newState.filters[propName][filterName].indexOf(content) < 0){
                      newState.filters[propName][filterName] = [...newState.filters[propName][filterName], content]
                    }
                  })
                }
                
              }
              else{
                if(newState.filters[propName][filterName].indexOf(fileFilters[filterName]) < 0){
                  if(fileFilters[filterName].length > 0){
                    newState.filters[propName][filterName] = [...newState.filters[propName][filterName], fileFilters[filterName]]
                  }
                }
              }
            })
          })
          console.log("newState.filters")
          console.log(newState.filters)
          return newState.filters
      }
    }
    this.filter = (displayTrigger, value) => {
      let newState = {...this.state}
      let newArtworkonDisplay = {}

      
      let newOnDisplay = {...newState.filters.empty}
        
        newOnDisplay[displayTrigger] = [value]

        Object.keys(this.state.visibleArtwork).forEach(artworkName => {
          const artwork = this.state.visibleArtwork[artworkName]
          if(artwork.displayTriggers[displayTrigger].indexOf(value) >= 0){
            newArtworkonDisplay[artworkName] = artwork
          }
        })
      newState.artworkOnDisplay = newArtworkonDisplay
      newState.filters.onDisplay = newOnDisplay

      //toggle show explorer if enlarge.open on DESKTOP
      if(!this.state.mobile && this.state.enlarge && this.state.enlarge.open){
        newState.showExplorer = true 
      }
      newState.filters.lastValue = value
      // return this.setState(newState, () => {this.enlargeWidth()})
      return newState
    }
    this.compoundFilter = (displayTrigger, value) => {
      let newState = {...this.state}
      const checked = this.state.filters.onDisplay[displayTrigger].indexOf(value) >= 0
      let newArtworkOnDisplay = null
      let newFilters = {...newState.filters}
      newFilters.onDisplay = {...newFilters.empty}
      //IF WILL UNCHECK
      if(checked){
        console.log("WILL UNCHECK")
        newArtworkOnDisplay = {}
        Object.keys(this.state.artworkOnDisplay).forEach(fileName => {
          if(this.state.artworkOnDisplay[fileName]){
            if(this.state.artworkOnDisplay[fileName].displayTriggers[displayTrigger].indexOf(value) < 0){
              newArtworkOnDisplay[fileName] = this.state.visibleArtwork[fileName]
            }
          }
        })
      }
      //IF WILL CHECK
      else{
        
        newArtworkOnDisplay = {...this.state.artworkOnDisplay}
        newFilters.lastValue = value

        Object.keys(this.state.visibleArtwork).forEach(fileName => {
          if(this.state.visibleArtwork[fileName].displayTriggers[displayTrigger].indexOf(value) >= 0){
            newArtworkOnDisplay[fileName] = this.state.visibleArtwork[fileName]
          }
        })
      }
      
      if(Object.keys(newArtworkOnDisplay).length > 0){
        Object.keys(newArtworkOnDisplay).forEach(artworkName => {
          const filterNames = Object.keys(newFilters.onDisplay)
          filterNames.forEach(filterName => {
            if(newArtworkOnDisplay[artworkName]){
            const dataToAdd = newArtworkOnDisplay[artworkName].displayTriggers[filterName]
              newFilters.onDisplay[filterName] = [...newFilters.onDisplay[filterName], ...dataToAdd]
            }
          })
        })
      }

      newState.artworkOnDisplay = newArtworkOnDisplay

      Object.keys(newFilters.onDisplay).forEach(filterName => {
        newFilters.onDisplay[filterName] = new Set(newFilters.onDisplay[filterName])
        newFilters.onDisplay[filterName] = Array.from(newFilters.onDisplay[filterName])
      })
      newState.filters = newFilters

      if(!this.state.mobile && this.state.enlarge && this.state.enlarge.open){
        console.log("TURN ON SHOW EXPLORER")
        newState.showExplorer = true 
      }
      return this.setState(newState, () => {this.enlargeWidth()})
    }
    this.categoryChecked = (category) => {
        let onDisplay = false
        Object.keys(this.state.artworkOnDisplay).forEach(fileName => {
            const file = this.state.artworkOnDisplay[fileName]
            if(Object.keys(file.category).includes(category)){
                onDisplay = true
            }
        })
        // 
        return onDisplay
    }
    this.filterByCategory = (e, category, hideAll) => {
      e.stopPropagation()
      return new Promise((res,rej) => {
        let newDisplay = {}
        let zeroDisplay = {}

        if(hideAll){
            Object.keys(this.state.visibleArtwork).forEach(fileName => {
              const file = this.state.visibleArtwork[fileName]
              if(file.category[category]){
                return newDisplay = {...newDisplay, [fileName]: file}
              }
              else{
                  zeroDisplay ={...zeroDisplay, [fileName]: file}
              }
          })
          return this.setState({artworkOnDisplay: newDisplay}, () => {res('filter by category complete')})
        }

        //ON UN-CHECK
        // if(!checkbox.checked){
          if(this.categoryChecked(category)){
            Object.keys(this.state.artworkOnDisplay).forEach(fileName => {
                const file = this.state.artworkOnDisplay[fileName]
                if(!Object.keys(file.category).includes(category)){
                    newDisplay = {...newDisplay, [fileName]: file}
                }
                else{zeroDisplay = {...zeroDisplay, [fileName]: file}}
            })
            Object.keys(zeroDisplay).forEach(id => {
                document.getElementById(id).classList.add('image-hide')
            })
            setTimeout(() => {
              return this.setState({artworkOnDisplay: newDisplay}, () => {res(150)})
            }, 200);
        }
        //ON CHECK
        else{
            newDisplay={...this.state.artworkOnDisplay}
            Object.keys(this.state.artworkInfoData).forEach(fileName => {
                const file = this.state.artworkInfoData[fileName]
                if(file.displayTriggers.category.includes(category)){
                  newDisplay = {...newDisplay, [fileName]: file}
                }
            })
            Object.keys(newDisplay).forEach(id => {
                document.getElementById(id).classList.remove('image-hide')
            })
            setTimeout(() => {
              return this.setState({artworkOnDisplay: newDisplay}, () => {res(150)})
            }, 200);
        }
      })
    }
    this.filter = (displayTrigger, value) => {
      let newState = {...this.state}
      let newArtworkonDisplay = {}

      console.log("displayTrigger")
      console.log(displayTrigger)
      console.log("value")
      console.log(value)

      let newOnDisplay = {...newState.filters.empty}
        
        newOnDisplay[displayTrigger] = [value]

        Object.keys(this.state.visibleArtwork).forEach(artworkName => {
          const artwork = this.state.visibleArtwork[artworkName]
          if(artwork.displayTriggers[displayTrigger] && artwork.displayTriggers[displayTrigger].indexOf(value) >= 0){
            newArtworkonDisplay[artworkName] = artwork
          }
        })
      newState.artworkOnDisplay = newArtworkonDisplay
      newState.filters.onDisplay = newOnDisplay

      //toggle show explorer if enlarge.open on DESKTOP
      if(!this.state.mobile && this.state.enlarge && this.state.enlarge.open){
        newState.showExplorer = true 
      }
      newState.filters.lastValue = value
      return newState
    }
    this.tagFilter = (displayTrigger, value) => {
      return new Promise((resolve, reject) => {
        console.log("run tag filters")
        let newState = {...this.filter(displayTrigger, value)}
        newState.filters = this.checkFilters(newState.artworkOnDisplay, newState, "onDisplay")
        console.log(newState)
        return this.setState(newState, () => {
          this.enlargeWidth()
          resolve()
        })
      })
    }
    this.compoundFilter = (displayTrigger, value) => {
      let newState = {...this.state}
      const checked = this.state.filters.onDisplay[displayTrigger].indexOf(value) >= 0
      let newArtworkOnDisplay = null
      let newFilters = {...newState.filters}
      newFilters.onDisplay = {...newFilters.empty}
      //IF WILL UNCHECK
      if(checked){
        console.log("WILL UNCHECK")
        newArtworkOnDisplay = {}
        Object.keys(this.state.artworkOnDisplay).forEach(fileName => {
          if(this.state.artworkOnDisplay[fileName]){
            if(this.state.artworkOnDisplay[fileName].displayTriggers[displayTrigger].indexOf(value) < 0){
              newArtworkOnDisplay[fileName] = this.state.visibleArtwork[fileName]
            }
          }
        })
      }
      //IF WILL CHECK
      else{
        
        newArtworkOnDisplay = {...this.state.artworkOnDisplay}
        newFilters.lastValue = value

        Object.keys(this.state.visibleArtwork).forEach(fileName => {
          if(this.state.visibleArtwork[fileName].displayTriggers[displayTrigger].indexOf(value) >= 0){
            newArtworkOnDisplay[fileName] = this.state.visibleArtwork[fileName]
          }
        })
      }
      
      if(Object.keys(newArtworkOnDisplay).length > 0){
        Object.keys(newArtworkOnDisplay).forEach(artworkName => {
          const filterNames = Object.keys(newFilters.onDisplay)
          filterNames.forEach(filterName => {
            if(newArtworkOnDisplay[artworkName]){
              if(!newArtworkOnDisplay[artworkName].displayTriggers || !newArtworkOnDisplay[artworkName].displayTriggers[filterName]){
                // console.log("FAILE")
                // console.log(artworkName)
                // console.log(newArtworkOnDisplay[artworkName])
                // console.log(filterName)
                return
              }
            const dataToAdd = newArtworkOnDisplay[artworkName].displayTriggers[filterName]
              newFilters.onDisplay[filterName] = [...newFilters.onDisplay[filterName], ...dataToAdd]
            }
          })
        })
      }

      newState.artworkOnDisplay = newArtworkOnDisplay

      Object.keys(newFilters.onDisplay).forEach(filterName => {
        newFilters.onDisplay[filterName] = new Set(newFilters.onDisplay[filterName])
        newFilters.onDisplay[filterName] = Array.from(newFilters.onDisplay[filterName])
      })
      newState.filters = newFilters

      if(!this.state.mobile && this.state.enlarge && this.state.enlarge.open){
        console.log("TURN ON SHOW EXPLORER")
        newState.showExplorer = true 
      }
      return this.setState(newState, () => {this.enlargeWidth()})
    }
    this.filterBySubcategory = (e, category, subcategory, options) => {
      e.stopPropagation()
      console.log(" FILTER BY SUB")
      return new Promise ((res, rej) => {
          if(!this.state.compoundFilters || options && options.tagFilter){
            let newState = this.filter("subcategory", subcategory)
            return this.setState(newState, () => {this.enlargeWidth()})
          }
          else{
            return this.compoundFilter("subcategory", subcategory)
          }
      })
    }
    this.filterByListitem = (e, category, subcategory, listitem, options) => {
      console.log("FILTER BY LIST ITEM")
      e.stopPropagation()
      return new Promise ((res, rej) => {
        if(!this.state.compoundFilters || options && options.tagFilter){
          let newState = this.filter("listitems", listitem)
          return this.setState(newState, () => {this.enlargeWidth()})
        }
        else{
          return this.compoundFilter("listitems", listitem)
        }
      })

    }
    this.toggleFilter = (filterName, value) => {
      let newState = {...this.state}
      let filters = newState.filters
      let newFilters = newState.filters

      if(filters.onDisplay[filterName].includes(value)){
        newFilters.onDisplay[filterName] = filters.onDisplay[filterName].filter(name => name !== value)
        
        
      }
      else{
        
        newFilters.onDisplay[filterName] = [...filters.onDisplay[filterName], value]
      }
      newFilters.empty = {...this.state.filters.empty}
      return newFilters
    }
    this.isFilterChecked = (filterName, value) => {
      let onDisplay = false
        onDisplay = this.state.filters.onDisplay[filterName].indexOf(value) > 0
        return onDisplay
    }
    this.listitemChecked = (category, subcategory, listitem) => {
        let onDisplay = false
        Object.keys(this.state.artworkOnDisplay).forEach(fileName => {
            const file = this.state.artworkOnDisplay[fileName]
            if(file.category[category]){
              if(file.category[category][subcategory]){
                if(file.category[category][subcategory].includes(listitem)){
                  return onDisplay = true
                }
              }
            }
        })
        return onDisplay
    }
    /**
     * @param: e
     * @param: theme
     */
    this.filterByTheme = (e, theme, hideAll) => {
      e.stopPropagation()
      return new Promise ((res, rej) => {

        const newState = {...this.state}
        const toggleArtwork = [...newState.themesOnDisplay[theme]]
        let artworkOnDisplay = {...newState.artworkOnDisplay}

        let visibleThemesList = []
        Object.keys(artworkOnDisplay).forEach(fileName => {
          visibleThemesList = artworkOnDisplay[fileName].themes.map(theme => theme)
        }, () => visibleThemesList = Array.from(new Set(visibleThemesList)))

        if(hideAll){
          
          let all = this.state.artworkInfoData
          let allNames = Object.keys(this.state.artworkInfoData)
          let artworkOnDisplay = {}

          allNames.forEach(name => {
            if(all[name].displayTriggers.themes && all[name].displayTriggers.themes.includes(theme)){
              artworkOnDisplay = {...artworkOnDisplay, [name]: this.state.artworkInfoData[name]}
            }
          })

          return this.setState({artworkOnDisplay}, () => {
            allNames.forEach(name => {
              const DOMitem = document.getElementById(name)
              if(!DOMitem.src){
                DOMitem.src = DOMitem.getAttribute('data-src')
              }
              DOMitem.classList.remove("image-hide")
            })
            res('filter complete')
          })
        }
        //ON UN-CHECK
        // if(!checkbox.checked){
        if(this.themeChecked(theme)){
          
          toggleArtwork.forEach(item => {
            document.getElementById(item).classList.add("image-hide")
          })

          toggleArtwork.forEach(fileName => {
            delete artworkOnDisplay[fileName]
          })
          return this.setState({artworkOnDisplay}, () => res('filter by theme complete'))
        }

        else{
          
          let all = this.state.artworkInfoData
          let allNames = Object.keys(this.state.artworkInfoData)

          allNames.forEach(name => {
            if(all[name].displayTriggers.themes && all[name].displayTriggers.themes.includes(theme)){
              artworkOnDisplay = {...artworkOnDisplay, [name]: this.state.artworkInfoData[name]}
            }
          })

          return this.setState({artworkOnDisplay}, () => {
            allNames.forEach(name => {
              const DOMitem = document.getElementById(name)
              if(!DOMitem.src){
                DOMitem.src = DOMitem.getAttribute('data-src')
              }
              DOMitem.classList.remove("image-hide")
              // setTimeout(() => {
              //   DOMitem.classList.remove("image-hide")
              // }, 200);
            })
            res('filter complete')
          })
        }
      })


    }

    this.filterAllThemes = (hide) => {
      let themes = []
      Object.keys(this.state.artworkOnDisplay).forEach(fileName => {
        const file = this.state.artworkOnDisplay[fileName]
        themes = [...themes, ...file.themes]
        })
      themes = Array.from(new Set(themes))

      if(hide){
        let newState = {...this.state}
        Object.keys(this.state.artworkOnDisplay).forEach(id => {
            document.getElementById(id).classList.add('image-hide')
        })
        newState.artworkOnDisplay = {}
        newState.filters.onDisplay = {...newState.filters.empty}
        return setTimeout(() => {
          this.setState(newState)
          // return this.setState({artworkOnDisplay: {}})
        }, 200);
      }
      else{
        Object.keys(this.state.artworkInfoData).forEach(id => {
            document.getElementById(id).classList.remove('image-hide')
            document.getElementById(id).classList.remove('FilePreview--imageContainer__empty')
            document.getElementById(id).src = document.getElementById(id).getAttribute("data-src")
        })
        return this.setState({artworkOnDisplay: {...this.state.visibleArtwork}})
      }
      // themes.forEach(theme => this.filterByTheme(theme, true))
    }

    this.filterByYear = (e, year) => {
      e.stopPropagation()
      //ON UN-CHECK
      const newState = {...this.state}
      const toggleArtwork = [...newState.yearLocation.all.years[year]]
      let artworkOnDisplay = {...newState.artworkOnDisplay}

      // if(!checkbox.checked){
      if(this.yearChecked(year)){

        toggleArtwork.forEach(item => {
          document.getElementById(item).classList.add("image-hide")
        })

        setTimeout(() => {

          toggleArtwork.forEach(fileName => {
            delete artworkOnDisplay[fileName]

          })
          return this.setState({artworkOnDisplay: artworkOnDisplay,
            yearLocation:{...newState.yearLocation, visible: {
              ...newState.yearLocation.visible, years: {
                ...newState.yearLocation.visible.years, [year]: []
              }
            }}
          })

        }, 400);
      }
      else{
        const all = this.state.artworkInfoData
        const allNames = Object.keys(this.state.artworkInfoData)
        allNames.forEach(name => {
          const file = all[name]
          if(file.displayTriggers.year){
            if(all[name].displayTriggers.year.includes(year)){
              artworkOnDisplay = {...artworkOnDisplay, [name]: all[name]}
              const DOMitem = document.getElementById(name)
              DOMitem.classList.remove("image-hide")
            }
          }
        })
        return this.setState({artworkOnDisplay})
      }

    }

    this.yearChecked = (year) => {

      let onDisplay = []
      const artworkOnDisplay = {...this.state.artworkOnDisplay}
      onDisplay = Object.keys(artworkOnDisplay).filter(fileName => {
        return artworkOnDisplay[fileName].year === year
      })
      return onDisplay.length > 0

    }

    this.themeChecked = (theme) => {
      let onDisplay = []
      const artworkOnDisplay = {...this.state.artworkOnDisplay}
      onDisplay = Object.keys(artworkOnDisplay).filter(fileName => {
        if(!artworkOnDisplay[fileName].displayTriggers.themes){
          return
        }
        return artworkOnDisplay[fileName].displayTriggers.themes.includes(theme) === true
      })
      return onDisplay.length > 0
    }

    this.filterByLocation = (e, location) => {
      e.stopPropagation()
      //ON UN-CHECK
      const newState = {...this.state}
      const toggleArtwork = [...newState.yearLocation.all.locations[location]]

      let artworkOnDisplay = {...newState.artworkOnDisplay}

      // if(!checkbox.checked){
        if(this.locationChecked(location)){

        toggleArtwork.forEach(item => {
          document.getElementById(item).classList.add("image-hide")
        })

        setTimeout(() => {

          toggleArtwork.forEach(fileName => {
            delete artworkOnDisplay[fileName]

          })
          return this.setState({artworkOnDisplay: artworkOnDisplay,
            yearLocation:{...newState.yearLocation, visible: {
              ...newState.yearLocation.visible, locations: {
                ...newState.yearLocation.visible.locations, [location]: []
              }
            }}
          })

        }, 400);
      }
      else{
        const all = this.state.artworkInfoData
        const allNames = Object.keys(this.state.artworkInfoData)
        allNames.forEach(name => {
          const file = all[name]
          if(file.displayTriggers.location){
            if(all[name].displayTriggers.location.includes(location)){
              artworkOnDisplay = {...artworkOnDisplay, [name]: all[name]}
              const DOMitem = document.getElementById(name)
              DOMitem.classList.remove("image-hide")
            }
          }
        })

        // this.state.yearLocation.all.locations[location].forEach(item => {
        // })

        // this.state.yearLocation.all.locations[location].forEach(fileName => {
        //   artworkOnDisplay = {...artworkOnDisplay, [fileName]: this.state.artworkInfoData[fileName]}
        // })

        return this.setState({artworkOnDisplay})
      }
    }

    this.locationChecked = (location) => {
      let onDisplay = []
      const artworkOnDisplay = {...this.state.artworkOnDisplay}
      onDisplay = Object.keys(artworkOnDisplay).filter(fileName => {
        return artworkOnDisplay[fileName].location === location
      })
      return onDisplay.length > 0
    }
    this.enlargeWidth = (options) => {
      if(!this.state.mobile){
        const container = document.getElementById("enlargeContainer")
        const images = document.getElementById("images")
        let enlargeContainerWidth = images.offsetWidth
        //check explorer
        // if(!this.state.showLess){
        //   if(!this.state.info.infoUp){
        //     if(this.state.showFilters || this.state.showExplorer){
        //       this.setState({showLess: true})
        //     }
        //   }
        // }
        if(options && options.showLess){
          return this.setState({showLess: true})
        }
        else{
          this.setState({showLess: false}, () => {
            if(this.state.showExplorer){
              enlargeContainerWidth -= 120
            }
            //check filters
            if(this.state.showFilters){
              enlargeContainerWidth -= 220
            }
            //set enlargeContainer size
            container.style.width = `${enlargeContainerWidth}px`
            return 
          })
        }
      }

      else{return}
      }
    this.showMenu = (e) => {
      //Mobile
      if(e){
        e.stopPropagation()
      }
      let newState = {...this.state}
      if(this.state.showLess){
        newState.showLess = false
      }
      
      else{
        newState.showFilters = !this.state.showFilters
        if(!this.state.mobile && this.state.enlarge && this.state.enlarge.open){
          if(newState.showFilters){
            newState.showExplorer = true
          }
        }
      }

      this.setState(newState, () => {
          if(this.state.mobile){
          }
          //DESKTOP
          else{
            this.enlargeWidth()
          }
      })
      
    }
    this.hideArtworkInfo = (e) => {
      if(e){
        e.stopPropagation()
      }
      const ArtworkInfo = document.getElementById("ArtworkInfo")
      if(ArtworkInfo && ArtworkInfo.classList.contains("info-up")){
        return 200
      }
      else { return 1}
    }
    this.closeEnlarge = (e, clearAll) => {
      if(e){
        e.stopPropagation()
      }
      const ArtworkInfo = document.getElementById("ArtworkInfo")
      const enlargeContainer = document.getElementById('enlargeContainer')
      document.getElementById('imageSelect').style.width = `100%`   
      enlargeContainer.classList.remove("enlarge-scroll-left")

      let newState = {...this.state}
      newState.enlarge.open = false
      newState.showExplorer = false
      this.setState(newState)
    }
    this.viewNext = (direction) => {
      
      
      if(!this.state.enlarge){
        return
      }
        const file = this.state.enlarge.background
        let options = this.createFamilySequence(file)

        const familyName = options.state.enlarge.familySequence.familyName
        const familySequence = options.state.enlarge.familySequence.familySequence
        const familyIndex = options.state.enlarge.familySequence.familyIndex
        const commonSequence = options.state.enlarge.familySequence.commonSequence
        const commonIndex = options.state.enlarge.familySequence.commonIndex
        let sequence = null
        let nextIndex = null
        const findNextIndex = () => {
          //VIEW NEXT
          if(direction > 0){
            //if last in currentSequence reached
            if(familyIndex+1 > familySequence.length-1){
              nextIndex = 0
              options.state.enlarge.familySequence.familyIndex = 0
              sequence = options.state.enlarge.familySequence.familySequence
            }
            else{
              nextIndex = familyIndex+1
              options.state.enlarge.familySequence.familyIndex += 1
              sequence = options.state.enlarge.familySequence.familySequence
            }
          }
          //VIEW PREVIOUS
          else{
            if(familyIndex-1 < 0 ){
            nextIndex = options.state.enlarge.familySequence.familySequence.length-1
            options.state.enlarge.familySequence.familyIndex = options.state.enlarge.familySequence.familySequence.length-1
            sequence = options.state.enlarge.familySequence.familySequence
            options.reverse = true
            }
            else{
              nextIndex = familyIndex-1
              options.state.enlarge.familySequence.familyIndex -= 1
              sequence = options.state.enlarge.familySequence.familySequence
              options.reverse = true
            }
          }
        }

        findNextIndex()
        const nextPicName = sequence[nextIndex]
        
        
        
        
        const nextPic = this.state.artworkInfoData[nextPicName]

        if(!options.state.enlarge.familySequence.commonSequence.includes(nextPicName)){
          
          options.scroll = false
        }

        this.animateEnlarge(nextPic, options)
    }
    this.countWidth = (file, containerHeight, naturalHeight, naturalWidth, mobile, options) => {
      
      let tagsMenuWidth = document.getElementById("TagsMenu").offsetWidth
      const imageNavWidth = document.querySelector(".Navbar") ? document.querySelector(".Navbar").offsetWidth : 0

      const ArtworkTitle = document.getElementById("ArtworkInfo-Title")
      
      if(options && options.tagsMenuClosed){
        tagsMenuWidth = 0
      }

      let maxWidth = document.getElementById("images").parentNode.offsetWidth - tagsMenuWidth - imageNavWidth
      // let maxWidth = document.getElementById("images").parentNode.offsetWidth - tagsMenuWidth - imageNavWidth - 120
      const naturalRatio = naturalWidth / naturalHeight
      if(mobile){
        maxWidth = document.getElementById("images").clientWidth
        // const maxHeight = document.getElementById("pinchContainer").clientHeight - 90
        const maxHeight = document.getElementById("images").clientHeight - ArtworkTitle.clientHeight


        let futureWidth = maxWidth
        let futureHeight = Math.round(futureWidth / naturalRatio)

        if(futureHeight > maxHeight){
          futureHeight = maxHeight
          futureWidth = Math.round(futureHeight * naturalRatio)
        }

        return {width: futureWidth, height: futureHeight}

      }
      let sizeRatio = naturalHeight / containerHeight

      if(!mobile){
        let withArtworkFamily = file.artoworkTitle
        sizeRatio = naturalHeight / (containerHeight - ArtworkTitle.clientHeight)
        // sizeRatio = naturalHeight / (containerHeight - 130)
      }
      let futureWidth = Math.round(naturalWidth / sizeRatio)
      let futureHeight = Math.round(futureWidth / naturalRatio)

      if(futureWidth > maxWidth){
        futureWidth = maxWidth
        futureHeight = Math.round(maxWidth / naturalRatio)
      }

      futureHeight = futureHeight > containerHeight ? containerHeight : futureHeight

      return {width: futureWidth, height: futureHeight}
    }
    this.toggleExplorer = (options) => {

      if(options && options.close){
        this.setState({showExplorer: false}, () => {
          if(!this.state.mobile){
            this.enlargeWidth()
            return 
          }
        })
      }
      if(!this.state.showExplorer){
        this.setState({showExplorer: true}, () => {
          if(!this.state.mobile){
            this.enlargeWidth()
            return 
          }
        })
      }
    }

    this.animateEnlarge = (file, options) => {
      this.enlarge.loaded = false

      const background = document.getElementById("background")
      const container = document.getElementById("enlargeContainer")
      const imageSelect = document.getElementById("imageSelect")
      const images = document.getElementById("images")
      const filters = document.getElementById("TagsMenu")

      let enlarge = this.state.enlarge ? {...this.state.enlarge} : options.state.enlarge
      enlarge.previous = !enlarge.background ? file : enlarge.background
      enlarge.background = file

      let bgSrc = null
      let fgSrc = null

      if(this.state.mobile){
        bgSrc = file.mobilePath
        // bgSrc = file.thumbnailPath
        fgSrc = file.mobilePath
      }
      else{
        bgSrc = file.desktopPath
        // bgSrc = file.mobilePath
        fgSrc = file.desktopPath
      }

        const backgroundLoad = new Promise ((res, rej) => {
          if(!this.enlarge.loaded){
            document.querySelector("#background-img").src= bgSrc
            document.querySelector("#background-img").addEventListener('load', () => {
              this.enlarge.loaded = true
              res("background loaded")
            })
          }
          else{rej("alraedy laoded")}
        })

        let newState = options && options.state ? options.state : {...this.state}
        newState.enlarge = enlarge
        newState.enlarge.foreground = enlarge.background
        newState.enlarge.open = true

            container.classList.add("enlarge-scroll-left")
        this.setState(newState, () => {
          backgroundLoad
          .then(res => {
            // container.classList.add("enlarge-scroll-left")
            let futureSize = null
            
              //COUNT FUTURE SIZES
              //DESKTOP
              if(!this.state.mobile){
                if(background.style.width !== "100%" || background.style.height !== "100%"){
                  
                  document.getElementById('background').style.width = "100%"
                  document.getElementById('background').style.height = "100%"
                }
                futureSize = this.countWidth(file, container.clientHeight, file.naturalSize.naturalHeight, file.naturalSize.naturalWidth)
              }
              //MOBILES**************************************************************************************
              else{
                futureSize = this.countWidth(file, container.clientWidth, file.naturalSize.naturalHeight, file.naturalSize.naturalWidth, true)
              }
              let scrollToDelay = 0

              if(!this.state.mobile){
                let enlargeContainerWidth = images.offsetWidth
                if(this.state.showExplorer){
                  enlargeContainerWidth -= imageSelect.offsetWidth
                }
                if(this.state.showFilters){
                  enlargeContainerWidth -= filters.offsetWidth
                }
                container.style.width = `${enlargeContainerWidth}px`
              }
  
                if(!container.classList.contains("enlarge-scroll-left")){
                  container.classList.add("enlarge-scroll-left")
                }
                // document.querySelector(".pinch-to-zoom-area").style.height = `${futureSize.height}px`
              
              if(options){
                const familySequence = options.state.enlarge.familySequence
                const artworkOnDisplay = this.state.artworkOnDisplay
                let scrollToId = null
                if(artworkOnDisplay[file.fileName]){
                  scrollToId = file.fileName
                }
                //if currentFile is not visible in imageSelector
                else{
                  scrollToId = Object.keys(artworkOnDisplay).find(fileName => {
                    if(artworkOnDisplay[fileName].artworkFamily === file.artworkFamily){
                      if(familySequence.commonSequence.indexOf(fileName) > familySequence.commonIndex){
                        return fileName
                      }
                    }
                  })
                  if(!scrollToId){
                    scrollToId = familySequence.commonSequence[familySequence.commonIndex]
                  }
                }
                setTimeout(() => {
                  this.scrollToHorizontal(scrollToId, "imageSelect")
                }, scrollToDelay);
  
              }
              return
          })
          .catch(rej => {
            return
          })
        })


    }
    this.scrollToHorizontal = (id, parent_id, options) => {
      // let scrollTo = {}
      let scrollTo = {behavior: 'smooth'}
      if(!document.getElementById(parent_id)){
        
        return
      }
      if(!id){
        scrollTo.left = 0
        document.getElementById(parent_id).scrollTo(scrollTo)
        return
      }
      let scrollDelay = document.getElementById(parent_id).scrollLeft > 0 ? 200 : 800
      if(this.state.mobile){
        setTimeout(() => {
          if(document.getElementById(id)){
            let scrollIncrement = options && options.increment ? options.increment : 5
            scrollTo.left = document.getElementById(id).getBoundingClientRect().x - scrollIncrement
            if(document.getElementById(parent_id).scrollLeft > 0){
              scrollTo.left += document.getElementById(parent_id).scrollLeft
            }
            
            
            document.getElementById(parent_id).scrollTo(scrollTo)
          }
        }, scrollDelay);
      }
    }

    this.createFamilySequence = (file) => {
      //THIS WILL BE THE RETURNED OBJECT
      let options = {state: null, scroll: null }
      let familySequence = {}

      const allVisible =  Array.from(document.querySelectorAll(".FilePreview--imageContainer:not(.FilePreview--imageContainer__empty)")).map(container => container.childNodes[0].id)
      let newState = {...this.state}

      const familyName = file.artworkFamily
      const currentImage = file.fileName

      let commonIndex = this.state.enlarge ?
      allVisible.indexOf(currentImage) < 0 ?
        this.state.enlarge.familySequence.commonIndex
        : allVisible.indexOf(currentImage)
      : 0

      //IF ARTWORK BELONGS TO FAMILY THAT IS CURRENTLY VIEW
      if(this.state.enlarge && this.state.enlarge.familySequence.familyName === familyName){

        const currentSequence = this.state.enlarge.familySequence

        let familyIndex = currentSequence.familySequence.indexOf(currentImage)

        familySequence = {
          "familyName": familyName,
          "familySequence": currentSequence.familySequence,
          "familyIndex": familyIndex,
          "commonSequence": currentSequence.commonSequence,
          "commonIndex": commonIndex
        }
      }

      //IF ARTWORK FAMILY NEEDS TO SEQUENCE/HAS NOT BEEN VIEWED
      else{

        const recordedSequence = this.state.relatedArtwork[familyName].column.fileIds
        const familyIndex = this.state.relatedArtwork[familyName].column.fileIds.indexOf(currentImage)
        let newFamilySequence = recordedSequence


        familySequence = {
          "familyName": familyName,
          "familySequence": newFamilySequence,
          "familyIndex": 0,
          "commonSequence": allVisible,
          "commonIndex": commonIndex
        }
      }
      if(!newState.enlarge){
        newState.enlarge = {}
      }
      newState.enlarge.familySequence = familySequence
      options.state = newState

      //scroll if the image is visible in the ImageSelector
      options.scroll = allVisible.indexOf(currentImage) < 0 ? false : true

      return options
    }

    this.loadEnlarge = (e, id) => {
      e.stopPropagation()
      

      const file = this.state.artworkInfoData[id]

      const options = this.createFamilySequence(file)

      return this.animateEnlarge(file, options)
    }

    this.showInfo = (e, options) => {
      if(this.state.enlarge && !this.state.enlarge.open){
        return
      }
      if(e){
        e.stopPropagation()
      }
      let newState = {...this.state}

      if(this.state.info.infoUp){
        console.log("show less")
        newState.info.infoUp = false
        newState.showLess = true
      }
      else{
        newState.info.infoUp = true
      }
      this.setState(newState, () => {
        if(!this.state.mobile){
            if(!this.state.info.infoUp){
              return
            }
            this.enlargeWidth()
          }
        })
      return
    }
    this.toggleMobile = () => {
      const container = document.getElementById("enlargeContainer")
      const images = document.getElementById("images")
      let mobile = null
      if(document.documentElement.clientWidth < 721){
        mobile = true
        container.style.height = `${images.clientHeight - 90}px`
        document.getElementById("background").style.height = "auto"
      }
      if(this.state.enlarge && this.state.enlarge.open){
        let newState = {...this.state}
        newState.mobile = mobile
        this.animateEnlarge(this.state.enlarge.background, {state: newState})
      }
      return mobile
    }
    this.onTouchStart= (e) => {
      const touches = e.touches
      const touch = {"x": touches[0].clientX, "y": touches[0].clientY}
      this.setState({touch})
    }
    this.lazyLoadImages = () => {
      const images = document.querySelectorAll(".imageSelect-FilePreview")

      const preloadImage = (img) => {
        const src = img.getAttribute("data-src")
        if(!src){
          return
        }
        img.src=src
      }

      const imgOptions = {
        threshold: 0,
        margin: "0px 0px 300px 0px"
      }

      const imgObserver = new IntersectionObserver((entries, imgObserver) => {
        entries.forEach(entry => {
          if(!entry.isIntersecting){
            return
          }
          else{
            preloadImage(entry.target);
            imgObserver.unobserve(entry.target)
          }
        }, imgOptions)
      })

      images.forEach(image => {
        imgObserver.observe(image)
      })
    }
    this.getArtworkInfo = () => {
      return new Promise((resolve, rej) => {

          let serverFileNames = null;
          
          //get an array of all file names in the server
          axios.get('/fetchImages')
              .then(res => {
                  serverFileNames = res.data
                  let newServerFileName = res.data.map(name => {
                    let start = name.substring(0, name.indexOf("-thumbnail"))
                    let cutout = "-thumbnail"
                    let extension = name.substring(name.indexOf("-thumbnail") + cutout.length)
                    let newName = `${start}${extension}`
                    return newName
                  })

                  serverFileNames = newServerFileName
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
                      .catch(err => {
                        
                        
                      })
              })   
              .catch(err => {
                
                
              })
      })
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
                  let fileIds = Object.keys(relatedArtwork).map(obj => null)
                  Object.keys(relatedArtwork).forEach(fileName => {
                      if(relatedArtwork[fileName].familyDisplayIndex < 0){
                        fileIds.push(fileName)
                      }
                      else{
                        fileIds[relatedArtwork[fileName].familyDisplayIndex] = fileName
                      }
                  })
                  fileIds = fileIds.filter(fileName => fileName !== null || false)
                  let finalRelatedArtwork = {
                          files: relatedArtwork,
                          column: {
                              // fileIds: Object.keys(relatedArtwork).map(objName => objName),
                              fileIds,
                              id: `${artworkFamily}-relatedArtworks`
                          },
                          columnOrder: [`${artworkFamily}-relatedArtworks`]
                  };
                  
                  
                  resolve(finalRelatedArtwork)
              })
      }) 
    }




}//END OF CONTSTRUCTOR

//ASYNC VERSION
  componentDidMount(){
        axios.get('/staticState')
        .then(res => {
          let newState = {}
          newState = res.data

          window.addEventListener("resize", ()=>{this.setState({mobile: this.toggleMobile()})})
          newState.mobile = this.toggleMobile()
          newState.compoundFilters = false
          newState.filters = {}
          newState.filters.onDisplay = {
            category: [],
            subcategory: [],
            listitems: [],
            themes: [],
            year: [],
            location: []
          }
          newState.filters.allFilters = {
            category: [],
            subcategory: [],
            listitems: [],
            themes: [],
            year: [],
            location: []
          }
          newState.filters.empty = {
            category: [],
            subcategory: [],
            listitems: [],
            themes: [],
            year: [],
            location: []
          }
          // const checkFilters = (artworkCollection, propName) => {
          //   Object.keys(artworkCollection).forEach(fileName => {
          //     const fileFilters = artworkCollection[fileName].displayTriggers
  
          //       Object.keys(fileFilters).forEach(filterName => {
          //         if(typeof fileFilters[filterName] === "object"){
          //           if(fileFilters[filterName]){
  
          //             fileFilters[filterName].forEach(content => {
          //               if(newState.filters[propName][filterName].indexOf(content) < 0){
          //                 newState.filters[propName][filterName] = [...newState.filters[propName][filterName], content]
          //               }
          //             })
          //           }
                    
          //         }
          //         else{
          //           if(newState.filters[propName][filterName].indexOf(fileFilters[filterName]) < 0){
          //             if(fileFilters[filterName].length > 0){
          //               newState.filters[propName][filterName] = [...newState.filters[propName][filterName], fileFilters[filterName]]
          //             }
          //           }
          //         }
          //       })
          //   })
          // }
  
          // checkFilters(newState.artworkOnDisplay, "onDisplay")
          // checkFilters(newState.visibleArtwork, "allFilters")
  
          newState.initialOnDisplay = newState.artworkOnDisplay
          newState.filters.initialOnDisplay = newState.filters.onDisplay
  
          this.setState(newState)
        })
        
        
  }

  // componentDidMount(){
  //   let newState = {...staticState}
  //   console.log("staticState on FE-Provider")
  //   console.log(newState)
  //   window.addEventListener("resize", ()=>{this.setState({mobile: this.toggleMobile()})})
  //   newState.mobile = this.toggleMobile()
  //       newState.compoundFilters = false
  //         newState.filters = {}
  //         newState.filters.onDisplay = {
  //           category: [],
  //           subcategory: [],
  //           listitems: [],
  //           themes: [],
  //           year: [],
  //           location: []
  //         }
  //         newState.filters.allFilters = {
  //           category: [],
  //           subcategory: [],
  //           listitems: [],
  //           themes: [],
  //           year: [],
  //           location: []
  //         }
  //         newState.filters.empty = {
  //           category: [],
  //           subcategory: [],
  //           listitems: [],
  //           themes: [],
  //           year: [],
  //           location: []
  //         }
  //   newState.initialOnDisplay = {...newState.artworkOnDisplay}
  //   newState.filters.initialOnDisplay = newState.filters.onDisplay
  //   this.setState(newState)
  // }

    render(){
      return(
          <Context.Provider value={ {
              state: this.state,

              filterByCategory: this.filterByCategory,
              filterBySubcategory: this.filterBySubcategory,
              filterByListitem: this.filterByListitem,
              categoryChecked: this.categoryChecked,
              subcategoryChecked: this.subcategoryChecked,
              listitemChecked: this.listitemChecked,

              enlarge: this.enlarge,
              loadEnlarge: this.loadEnlarge,
              closeEnlarge: this.closeEnlarge,
              hideArtworkInfo: this.hideArtworkInfo,

              viewNext: this.viewNext,
              viewPrev: this.viewPrev,

              showInfo: this.showInfo,

              filterAllThemes: this.filterAllThemes,
              filterByTheme: this.filterByTheme,
              themeChecked: this.themeChecked,

              filterByYear: this.filterByYear,
              yearChecked: this.yearChecked,
              filterByLocation: this.filterByLocation,
              locationChecked: this.locationChecked,

              showMenu: this.showMenu,
              toggleExplorer: this.toggleExplorer,
              toggleMobile: this.toggleMobile,
              onTouchStart: this.onTouchStart,

              lazyLoadImages: this.lazyLoadImages,
              scrollToHorizontal: this.scrollToHorizontal,

              readImageDir: this.readImageDir,
              changeFileName: this.changeFileName,
              onChange: this.onChange,
              addNew: this.addNew,
              isFilterChecked: this.isFilterChecked,
              compoundFiltersSwitch: this.compoundFiltersSwitch,
              resetAll: this.resetAll,
              tagFilter: this.tagFilter

              } }>
          {this.props.children}
          </Context.Provider>
      )
    }

}

