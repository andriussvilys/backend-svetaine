import React from 'react';
import axios from 'axios';
import pullUp from './components/functions/pullUp'
import staticState from './staticState'

export const Context = React.createContext();

export class Provider extends React.Component{
  constructor(props){
    super(props);
  this.state = {}

  this.enlarge = {}

    this.resetAll = (hide) => {
      let newState = {...this.state}
      const artworkOnDisplay = {...this.state.artworkOnDisplay}
      const allArtworkNames = {...this.state.visibleArtwork}
      //If VIEW ALL
      if(hide){
        newState.filters.onDisplay = newState.filters.empty
        newState.artworkOnDisplay = {}
      }
      //IF HIDE ALL
      else{
        newState.artworkOnDisplay = newState.initialOnDisplay
        newState.filters.onDisplay = newState.filters.initialOnDisplay
      }
      this.setState(newState)
    }

    this.categoryChecked = (category) => {
        let onDisplay = false
        Object.keys(this.state.artworkOnDisplay).forEach(fileName => {
            const file = this.state.artworkOnDisplay[fileName]
            if(Object.keys(file.category).includes(category)){
                onDisplay = true
            }
        })
        // console.log(`${category} is checked: ${onDisplay}`)
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

      console.log("COMPOUND FILTERS")
      let newOnDisplay = {...newState.filters.empty}
      console.log("this.state.filters.onDisplay.subcategory.indexOf(subcategory)")
      console.log(this.state.filters.onDisplay[displayTrigger].indexOf(value))
      if(this.state.filters.onDisplay[displayTrigger].indexOf(value) >= 0){
        console.log("remove")
        newOnDisplay[displayTrigger] = []
      }
      else{
        console.log("add")
        newOnDisplay[displayTrigger] = [value]

        Object.keys(this.state.visibleArtwork).forEach(artworkName => {
          const artwork = this.state.visibleArtwork[artworkName]
          if(artwork.displayTriggers[displayTrigger].indexOf(value) >= 0){
            newArtworkonDisplay[artworkName] = artwork
          }
        })
      }
      console.log("newOnDisplay")
      console.log(newOnDisplay)

      newState.artworkOnDisplay = newArtworkonDisplay
      newState.filters.onDisplay = newOnDisplay
      this.setState(newState)
      return
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
          if(this.state.artworkOnDisplay[fileName].displayTriggers[displayTrigger].indexOf(value) < 0){
            newArtworkOnDisplay[fileName] = this.state.visibleArtwork[fileName]
          }
        })
      }
      //IF WILL CHECK
      else{
        console.log("Will BE CHECKED")
        newArtworkOnDisplay = {...this.state.artworkOnDisplay}
        Object.keys(this.state.visibleArtwork).forEach(fileName => {
          if(this.state.visibleArtwork[fileName].displayTriggers[displayTrigger].indexOf(value) >= 0){
            newArtworkOnDisplay[fileName] = this.state.visibleArtwork[fileName]
          }
        })
      }

      console.log("newArtworkOnDisplay")
      console.log(newArtworkOnDisplay)

      if(Object.keys(newArtworkOnDisplay).length > 0){
        Object.keys(newArtworkOnDisplay).forEach(artworkName => {
          const filterNames = Object.keys(newFilters.onDisplay)
          filterNames.forEach(filterName => {
            const dataToAdd = newArtworkOnDisplay[artworkName].displayTriggers[filterName]
            newFilters.onDisplay[filterName] = [...newFilters.onDisplay[filterName], ...dataToAdd]
          })
        })
      }

      newState.artworkOnDisplay = newArtworkOnDisplay

      Object.keys(newFilters.onDisplay).forEach(filterName => {
        newFilters.onDisplay[filterName] = new Set(newFilters.onDisplay[filterName])
        newFilters.onDisplay[filterName] = Array.from(newFilters.onDisplay[filterName])
      })
      newState.filters = newFilters
      console.log("NEWSTATE COMPONUDED FILTERS_________________")
      console.log(newState)
      return this.setState(newState)
    }
    this.filterBySubcategory = (e, category, subcategory, hideAll) => {
      console.log(e.target)
      e.stopPropagation()
      return new Promise ((res, rej) => {
          let newDisplay = {}
          let zeroDisplay = {}
          let newState = {...this.state}
          let newFilters = {...newState.filters}

          if(hideAll){
            Object.keys(this.state.visibleArtwork).forEach(fileName => {
              const file = this.state.visibleArtwork[fileName]
              if(file.category[category] && file.category[category][subcategory]){
                return newDisplay = {...newDisplay, [fileName]: file}
              }
              else{
                  zeroDisplay ={...zeroDisplay, [fileName]: file}
              }
          })
          return this.setState({artworkOnDisplay: newDisplay}, () => res('filtered by subcategory'))
          }

          if(!this.state.compoundFilters){
            console.log("COMPOUND FILTERS")
            return this.filter("subcategory", subcategory)
          }
          else{
            return this.compoundFilter("subcategory", subcategory)
          }
      })

    }
    this.filterByListitem = (e, category, subcategory, listitem, hideAll) => {
      e.stopPropagation()
      return new Promise ((res, rej) => {
        let newDisplay = {}
        let zeroDisplay = {}
        let newState = {...this.state}

        if(hideAll){
          Object.keys(this.state.visibleArtwork).forEach(fileName => {
            const file = this.state.visibleArtwork[fileName]
            if(file.category[category] && file.category[category][subcategory]){
              if(file.category[category][subcategory].includes(listitem)){
                return newDisplay = {...newDisplay, [fileName]: file}
              }
              else{
                zeroDisplay ={...zeroDisplay, [fileName]: file}
              }
            }
            else{
                zeroDisplay ={...zeroDisplay, [fileName]: file}
            }
        })
        return this.setState({artworkOnDisplay: newDisplay}, () => {res('fitlered by listitem')})
        }
        if(!this.state.compoundFilters){
          console.log("COMPOUND FILTERS")
          return this.filter("listitems", listitem)
        }
        // if(this.state.compoundFilters){
        //   let newOnDisplay = {...newState.filters.empty}
        //   if(this.state.filters.onDisplay.subcategory.indexOf(subcategory) >= 0){
        //     newOnDisplay.subcategory = [subcategory]
        //   }
        //   else{
        //     newOnDisplay.subcategory = []
        //   }
        //   this.setState(newState)
        //   return
        // }
        else{
          return this.compoundFilter("listitems", listitem)
        }
        // //ON UN-CHECK
        // // if(!checkbox.checked){
        //   if(this.listitemChecked(category, subcategory, listitem)){
        //     Object.keys(this.state.artworkOnDisplay).forEach(fileName => {
        //         const file = this.state.artworkOnDisplay[fileName]
        //         if(file.category[category]){
        //           if(file.category[category][subcategory]){
        //             if(!file.category[category][subcategory].includes(listitem)){
        //               newDisplay = {...newDisplay, [fileName]: file}
        //             }
        //             else{
        //               zeroDisplay ={...zeroDisplay, [fileName]: file}
        //             }
        //           }
        //           else{newDisplay = {...newDisplay, [fileName]: file}}
        //         }
        //         else{newDisplay = {...newDisplay, [fileName]: file}}
        //     })
        //     Object.keys(zeroDisplay).forEach(id => {
        //         document.getElementById(id).classList.add('image-hide')
        //     })
        //   }
        //   //ON CHECK
        //   else{
        //     newDisplay={...this.state.artworkOnDisplay}
        //     Object.keys(this.state.artworkInfoData).forEach(fileName => {
        //       const file = this.state.artworkInfoData[fileName]
        //       if(file.displayTriggers.listitems.includes(listitem)){
        //             newDisplay = {...newDisplay, [fileName]: file}
        //           }
        //     })
        //     Object.keys(newDisplay).forEach(id => {
        //         document.getElementById(id).classList.remove('image-hide')
        //     })
        //   }
        // newState.artworkOnDisplay = newDisplay
        // newState.filters = this.toggleFilter("listitems", listitem)
        // console.log("newstate LISTITEM")
        // console.log(newState.filters)
        // return this.setState(newState)
      })

    }
    this.toggleFilter = (filterName, value) => {
      let newState = {...this.state}
      let filters = newState.filters
      let newFilters = newState.filters

      if(filters.onDisplay[filterName].includes(value)){
        newFilters.onDisplay[filterName] = filters.onDisplay[filterName].filter(name => name !== value)
        console.log("NEW FILTERS ON UNCHECK")
        console.log(newFilters)
      }
      else{
        console.log("NEW FILTERS ON CHECK")
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
          console.log('on theme check')
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
          console.log('on theme uncheck')
          toggleArtwork.forEach(item => {
            document.getElementById(item).classList.add("image-hide")
          })

          toggleArtwork.forEach(fileName => {
            delete artworkOnDisplay[fileName]
          })
          return this.setState({artworkOnDisplay}, () => res('filter by theme complete'))
        }

        else{
          console.log('on theme check')
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
        // newState.filters.onDisplay = newState.filters.empty
        newState.filters.onDisplay = {...newState.filters.empty}
        return setTimeout(() => {
          this.setState(newState)
          // return this.setState({artworkOnDisplay: {}})
        }, 200);
      }
      else{
        // Object.keys(this.state.visibleArtwork).forEach(id => {
        //     document.getElementById(id).classList.remove('image-hide')
        // })
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
    this.showMenu = (e) => {
      //Mobile
      if(e){
        e.stopPropagation()
      }
      console.log("run show menu")
      if(this.state.mobile){
        const images = document.getElementById("imageSelect")
        // const images = document.getElementById("images")
        console.log("show menu MOBILE")
        let delay = 1
        // if(document.getElementById("ArtworkInfo")){
        //   if(document.getElementById("ArtworkInfo").classList.contains("info-up")){
        //     // this.showInfo()
        //     document.getElementById("ArtworkInfo").classList.remove("info-up")
        //     delay += 100
        //   }
        // }
        //if menu is open
        if(document.getElementById("TagsMenu").classList.contains("show-menu")){
          console.log("menu is open")
          //if listitem drawer is open
          if(document.getElementsByClassName("scroll-down-listitem").length > 0){
            document.getElementsByClassName("scroll-down-listitem")[0].classList.remove("scroll-down-listitem")
            delay += 100
          }

          setTimeout(() => {
            if(document.getElementsByClassName("scroll-down").length > 0){
              document.getElementsByClassName("scroll-down")[0].classList.remove("scroll-down")
              delay += 50
            }
            setTimeout(() => {
              document.getElementById("TagsMenu").classList.remove("show-menu")
            }, delay);
          }, delay);

        }
        //if menu is closed
        else{
          console.log("menu is close")
          document.getElementById("TagsMenu").classList.add("show-menu")
        }
        return images.classList.toggle("explorer-view")
      }
      //DESKTOP
      else{
        console.log("show menu desktop")
        if(this.state.enlarge && this.state.enlarge.open){
          //if menu closed
          if(document.getElementById("TagsMenu").classList.contains("show-menu-desktop")){
            if(this.state.enlarge && this.state.enlarge.open){
              document.getElementById("TagsMenu").classList.remove("show-menu-desktop")
              // setTimeout(() => {
              //   this.animateEnlarge(this.state.enlarge.background)
              // }, 200);
              this.animateEnlarge(this.state.enlarge.background)
            }
            else{
              document.getElementById("TagsMenu").classList.remove("show-menu-desktop")
              document.getElementById("imageSelect").style.width = "100%"
            }
            return
          }
          //if menu open
          else{
              if(this.state.enlarge.open){
                const imageSelect = document.getElementById("imageSelect")

                imageSelect.style.width = "auto"
                document.getElementById("TagsMenu").classList.add("show-menu-desktop")
                // setTimeout(() => {
                //   this.animateEnlarge(this.state.enlarge.background)
                // }, 200);
                this.animateEnlarge(this.state.enlarge.background)
              }
              else{
                document.getElementById("imageSelect").style.width = "100%"
              }
          }
        }
        else document.getElementById("TagsMenu").classList.toggle("show-menu-desktop")
      }
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

      if(ArtworkInfo && ArtworkInfo.classList.contains("info-up")){
        ArtworkInfo.classList.remove("info-up")
        ArtworkInfo.style.transform = "translateY(0)"
        // if(ArtworkInfo)ArtworkInfo.classList.remove("show")
        // if(!clearAll)
        // return
      }
      // if(!clearAll){
      //   if(document.getElementById("TagsMenu").classList.contains("show-menu")){
      //     this.showMenu(e)
      //     return
      //   }
      // }
      // if(ArtworkInfo)ArtworkInfo.classList.remove("show")
        const delay = this.hideArtworkInfo()
        setTimeout(() => {
          const enlargeContainer = document.getElementById('enlargeContainer')
            document.getElementById('imageSelect').style.width = `100%`

            setTimeout(() => {
              enlargeContainer.classList.remove("enlarge-opacity")
              setTimeout(() => {
                enlargeContainer.classList.remove("enlarge-scroll-left")
              }, 50);
            }, 50);
          if(!clearAll){
            const enlarge = {...this.state.enlarge}
            enlarge.open = false
            this.setState({enlarge})
          }
        }, 50);
    }
    this.viewNext = (direction) => {
      console.log("__________________________")
      console.log("view next")
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
              //   const artworkOnDisplay = this.state.artworkOnDisplay
              //   let nextPicName = commonSequence.find(fileName => {
              //     if(artworkOnDisplay[fileName].artworkFamily !== familyName){
              //       if(commonSequence.indexOf(fileName) > commonIndex){
              //         return commonSequence.indexOf(fileName)
              //       }
              //     }
              //     return
              //     })
              
              //     if(!nextPicName){
              //       nextPicName = commonSequence[0]
              //     }
              // let nextPic = this.state.artworkInfoData[nextPicName]

              // options = this.createFamilySequence(nextPic)
              // sequence = commonSequence
              // nextIndex = commonSequence.indexOf(nextPicName)
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
            //   let prevPicName = null
            //   const artworkOnDisplay = this.state.artworkOnDisplay
            //   if(commonIndex === 0){
            //     prevPicName = commonSequence[commonSequence.length-1]
            //   }
            //   else{
            //     prevPicName = commonSequence[commonIndex-1]
            //   }
            // console.log(prevPicName)
            // console.log("prevPicName")

            // let prevPic = this.state.artworkInfoData[prevPicName]

            // const familyArray = this.state.relatedArtwork[prevPic.artworkFamily].column.fileIds
            // const lastOfFamilyFile = this.state.artworkInfoData[prevPicName]
            //   options = this.createFamilySequence(lastOfFamilyFile)

            //   sequence = options.state.enlarge.familySequence.familySequence
            //   nextIndex = sequence.indexOf(lastOfFamilyFile.fileName)
            //   options.reverse = true
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
        console.log("sequence")
        console.log(sequence)
        console.log("nextIndex")
        console.log(nextIndex)
        const nextPic = this.state.artworkInfoData[nextPicName]

        if(!options.state.enlarge.familySequence.commonSequence.includes(nextPicName)){
          console.log("will not scroll")
          options.scroll = false
        }

        this.animateEnlarge(nextPic, options)
    }


    this.countWidth = (containerHeight, naturalHeight, naturalWidth, mobile, options) => {
      console.log("countWidth")
      let tagsMenuWidth = document.getElementById("TagsMenu").offsetWidth
      const imageNavWidth = document.querySelector(".Navbar") ? document.querySelector(".Navbar").offsetWidth : 0
      console.log("tagsMenuWidth")
      console.log(tagsMenuWidth)
      console.log("imageNavWidth")
      console.log(imageNavWidth)
      if(options && options.tagsMenuClosed){
        tagsMenuWidth = 0
      }

      let maxWidth = document.getElementById("images").parentNode.offsetWidth - tagsMenuWidth - imageNavWidth - 120
      const naturalRatio = naturalWidth / naturalHeight
      if(mobile){
        maxWidth = document.getElementById("images").clientWidth
        const maxHeight = document.getElementById("images").clientHeight - 90

        let futureWidth = maxWidth
        let futureHeight = Math.round(futureWidth / naturalRatio)

        if(futureHeight > maxHeight){
          futureHeight = maxHeight
          futureWidth = Math.round(futureHeight * naturalRatio)
        }

        return {width: futureWidth, height: futureHeight}

      }
      const sizeRatio = naturalHeight / containerHeight

      let futureWidth = Math.round(naturalWidth / sizeRatio)
      let futureHeight = Math.round(futureWidth / naturalRatio) - 50

      if(futureWidth > maxWidth){
        futureWidth = maxWidth
        futureHeight = Math.round(maxWidth / naturalRatio)
      }

      futureHeight = futureHeight > containerHeight ? containerHeight : futureHeight

      return {width: futureWidth, height: futureHeight}
    }
    this.animateEnlarge = (file, options) => {
      this.enlarge.loaded = false
      let fgLoaded = null

      // if(document.getElementById("TagsMenu").classList.contains("show-menu")){
      //   document.getElementById("TagsMenu").classList.remove("show-menu")
      // }
      // const artworkInfo = document.getElementById("ArtworkInfo")
      // if(artworkInfo && artworkInfo.classList.contains("info-up")){
      //   this.showInfo()
      // }

      const background = document.getElementById("background")
      const foreground = document.getElementById("foreground")
      const container = document.getElementById("enlargeContainer")
      const imageSelect = document.getElementById("imageSelect")
      const images = document.getElementById("images")

      let enlarge = this.state.enlarge ? {...this.state.enlarge} : options.state.enlarge
      enlarge.previous = !enlarge.background ? file : enlarge.background
      enlarge.background = file

      let bgSrc = null
      let fgSrc = null

      if(this.state.mobile){
        bgSrc = file.thumbnailPath
        fgSrc = file.mobilePath
      }
      else{
        bgSrc = file.mobilePath
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

        backgroundLoad
          .then(res => {
            let futureSize = null

                  //COUNT FUTURE SIZES
                  //DESKTOP
                  if(!this.state.mobile){
                    if(background.style.width !== "100%" || background.style.height !== "100%"){
                      console.log("reset desktop enlarge")
                      document.getElementById('background').style.width = "100%"
                      document.getElementById('foreground').style.width = "100%"
                      document.getElementById('background').style.height = "100%"
                      document.getElementById('foreground').style.height = "100%"
                    }
                    futureSize = this.countWidth(container.clientHeight, file.naturalSize.naturalHeight, file.naturalSize.naturalWidth)
                  }
                  //MOBILES**************************************************************************************
                  else{
                    futureSize = this.countWidth(container.clientWidth, file.naturalSize.naturalHeight, file.naturalSize.naturalWidth, true)

                    background.style.height = `${futureSize.height}px`
                    foreground.style.height = `${futureSize.height}px`
                    background.style.width = `${futureSize.width}px`
                    foreground.style.width = `${futureSize.width}px`
                  }

                  let newState = options && options.state ? options.state : {...this.state}
                  newState.enlarge = enlarge

                  foreground.classList.add("fade-out")
                  let scrollToDelay = 0

                    if(!container.classList.contains("enlarge-scroll-left")){
                      container.classList.add("enlarge-scroll-left")
                      container.style.width = `${futureSize.width}px`
                      setTimeout(() => {
                        imageSelect.style.width = `${images.clientWidth - futureSize.width}px`
                      }, 50);
                    }
                    else{
                      //if enlargeContainer will shrink
                      if(this.state.enlarge.currentWidth && this.state.enlarge.currentWidth > futureSize.width && this.state.enlarge.open){
                        console.log("enlargeContainer will shrink")

                        imageSelect.style.width = `${images.clientWidth - futureSize.width}px`
                        setTimeout(() => {
                          container.style.width = `${futureSize.width}px`
                        }, 50);
                      }
                      //
                      else{
                        console.log("enlargeContainer will GROW")
                        const momentum = futureSize.width / container.offsetWidth
                        console.log("mmentum")
                        let delay = 300 * momentum
                        delay = delay.toFixed(3)
                        console.log(delay)
                        container.style.width = `${futureSize.width}px`
                        setTimeout(() => {
                          imageSelect.style.width = `${images.clientWidth - futureSize.width}px`
                        }, 50);
                      }
                    }
                    document.querySelector(".pinch-to-zoom-area").style.height = `${futureSize.height}px`
                  
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

                    newState.enlarge.foreground = enlarge.background
                    newState.enlarge.currentWidth = futureSize.width
                    // newState.enlarge.currentHeight = images.clientHeight - 90
                    newState.enlarge.open = true

                    this.setState(newState)

                     const loadForeground = () => {
                      console.log("loadForeground")
                       return new Promise((res, rej) => {
                         document.querySelector("#foreground-img").src= fgSrc
                         document.querySelector("#foreground-img").addEventListener('load', () => {
                           if(!fgLoaded){
                             foreground.classList.remove("fade-out")
                             this.enlarge.loaded = false
                              fgLoaded = true
                            res("finished")
                           }
                           else{rej(fgLoaded)}
                         });
                       })
                     }

                     setTimeout(() => {

                       loadForeground()
                       .then(res => {
                        //  document.getElementById("ArtworkInfo").classList.add("show")
                        })
                        .catch(rej => {
                          console.log("enlarge.fgLoaded")
                          console.log(rej)
                        })
                        this.scrollToHorizontal(`previewBubble-${file.fileName}`, "previewBubble-wrapper", {increment: 50})
                        pullUp({parentId: "ArtworkInfo", childId: "ArtworkInfo", vertical: true})
                        // pullUp({parentId: "enlargeContainer", childId: "ArtworkInfo", vertical: true})


                     }, 200);
                     return
          })
          .catch(rej => {
            console.log(rej)
            return
          })
    }

    this.scrollToHorizontal = (id, parent_id, options) => {
      // let scrollTo = {}
      let scrollTo = {behavior: 'smooth'}
      if(!document.getElementById(parent_id)){
        console.log(`${parent_id} was not found`)
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
            console.log("scrollTo.left")
            console.log(scrollTo.left)
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

        // let newFamilySequence_start = recordedSequence.slice(0, familyIndex)
        // let newFamilySequence_end = recordedSequence.slice(familyIndex)
        // let newFamilySequence = [...newFamilySequence_end, ...newFamilySequence_start]
        let newFamilySequence = recordedSequence


        familySequence = {
          "familyName": familyName,
          "familySequence": newFamilySequence,
          "familyIndex": 0,
          "commonSequence": allVisible,
          "commonIndex": commonIndex
        }
      }

      // console.log("recordedSequence")
      // console.log(recordedSequence)

      // console.log("newFamilySequence")
      // console.log(newFamilySequence)



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
      console.log("load enlarge")

      const file = this.state.artworkInfoData[id]

      const options = this.createFamilySequence(file)

      return this.animateEnlarge(file, options)
    }
    this.showInfo = (e) => {
      if(this.state.enlarge && !this.state.enlarge.open){
        return
      }
      if(e){
        e.stopPropagation()
        console.log("run show info")
        console.log(e)
      }
      // if(e.touches){return}

      const info = document.getElementById("ArtworkInfo")
      if(info.classList.contains("info-up")){
        // document.getElementById("ArtworkInfo-container").classList.remove("ArtworkInfo-toggleTags")
        info.classList.remove("info-up")
        info.style.transform = "translateY(0)"
        return
      }
      if(document.getElementById("ArtworkInfo-container").classList.contains("ArtworkInfo-toggleTags")){
        document.getElementById("ArtworkInfo-container").classList.remove("ArtworkInfo-toggleTags")
        return
      }
      else{
        info.classList.add("info-up")
        info.style.transform = `translateY(-${info.clientHeight}px)`
      }
      if(info.classList.contains("dragged")){
        info.classList.remove("dragged")
      }

      // info.classList.toggle("info-up")
      return
    }
    this.toggleMobile = () => {
      const container = document.getElementById("enlargeContainer")
      const images = document.getElementById("images")
      const imageSelect = document.getElementById("imageSelect")
      let mobile = null
      if(document.documentElement.clientWidth < 721){
        mobile = true
        container.style.height = `${images.clientHeight - 90}px`
        document.getElementById("foreground").style.height = "auto"
        document.getElementById("background").style.height = "auto"
      }
      // else{
      //   console.log("width/height 100%")
      //   document.getElementById('background').style.width = "100%"
      //   document.getElementById('foreground').style.width = "100%"
      //   document.getElementById('background').style.height = "100%"
      //   document.getElementById('foreground').style.height = "100%"
      //   mobile = false
      // }
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
                        console.log("getArtworkInfo err")
                        console.log(err)
                      })
              })   
              .catch(err => {
                console.log("fetch images err")
                console.log(err)
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
    this.compoundFiltersSwitch = () => {
      this.setState({compoundFilters: !this.state.compoundFilters})
    }



}//END OF CONTSTRUCTOR
  componentDidMount(){
        let newState = staticState
        console.log("staticState")
        console.log(staticState)
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

        const checkFilters = (artworkCollection, propName) => {
          Object.keys(artworkCollection).forEach(fileName => {
            const fileFilters = artworkCollection[fileName].displayTriggers
  
            Object.keys(fileFilters).forEach(filterName => {
              if(typeof fileFilters[filterName] === "object"){
  
                fileFilters[filterName].forEach(content => {
                  if(newState.filters[propName][filterName].indexOf(content) < 0){
                    newState.filters[propName][filterName] = [...newState.filters[propName][filterName], content]
                  }
                })
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
        }

        checkFilters(newState.artworkOnDisplay, "onDisplay")
        checkFilters(newState.visibleArtwork, "allFilters")

        newState.initialOnDisplay = newState.artworkOnDisplay
        newState.filters.initialOnDisplay = newState.filters.onDisplay

        this.setState(newState)
  }

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
            resetAll: this.resetAll

            } }>
        {this.props.children}
        </Context.Provider>
    )
    }

}

