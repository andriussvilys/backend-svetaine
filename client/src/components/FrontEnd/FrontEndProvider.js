import React from 'react';
import axios from 'axios'

export const Context = React.createContext();

export class Provider extends React.Component{
  constructor(props){
    super(props);
  this.state = {}

  this.enlarge = {}

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

    this.filterByCategory = (category, hideAll) => {
      console.log("filter by category")
      console.log(category)
      return new Promise((res,rej) => {
        let newDisplay = {}
        let zeroDisplay = {}

        if(hideAll){
          console.log("hideAll true")
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
          console.log("checkbox unchecked")
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
          console.log("checkbox checked")
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

    this.filterBySubcategory = (category, subcategory, hideAll) => {
      return new Promise ((res, rej) => {
          let newDisplay = {}
          let zeroDisplay = {}

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

          //ON UN-CHECK
          if(this.subcategoryChecked(category, subcategory)){
              Object.keys(this.state.artworkOnDisplay).forEach(fileName => {
                  const file = this.state.artworkOnDisplay[fileName]
                  if(file.category[category]){
                      if(!Object.keys(file.category[category]).includes(subcategory)){
                          return newDisplay = {...newDisplay, [fileName]: file}
                      }
                      else{
                          zeroDisplay ={...zeroDisplay, [fileName]: file}
                      }
                  }
                  else{
                      return newDisplay = {...newDisplay, [fileName]: file}
                  }
              })

              Object.keys(zeroDisplay).forEach(id => {
                  document.getElementById(id).classList.add('image-hide')
              })
              setTimeout(() => {
                return this.setState({artworkOnDisplay: newDisplay})
              }, 200);
          }
          //ON CHECK
          else{
              newDisplay={...this.state.artworkOnDisplay}

              Object.keys(this.state.artworkInfoData).forEach(fileName => {
                  const file = this.state.artworkInfoData[fileName]
                  if(file.displayTriggers.subcategory.includes(subcategory)){
                    newDisplay = {...newDisplay, [fileName]: file}
                  }
              })
              Object.keys(newDisplay).forEach(id => {
                  document.getElementById(id).classList.remove('image-hide')
              })

              setTimeout(() => {
                return this.setState({artworkOnDisplay: newDisplay})
              }, 200);
          }
      })

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
    this.filterByListitem = (category, subcategory, listitem, hideAll) => {
      return new Promise ((res, rej) => {
        let newDisplay = {}
        let zeroDisplay = {}

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

        //ON UN-CHECK
        // if(!checkbox.checked){
          if(this.listitemChecked(category, subcategory, listitem)){
            Object.keys(this.state.artworkOnDisplay).forEach(fileName => {
                const file = this.state.artworkOnDisplay[fileName]
                if(file.category[category]){
                  if(file.category[category][subcategory]){
                    if(!file.category[category][subcategory].includes(listitem)){
                      newDisplay = {...newDisplay, [fileName]: file}
                    }
                    else{
                      zeroDisplay ={...zeroDisplay, [fileName]: file}
                    }
                  }
                  else{newDisplay = {...newDisplay, [fileName]: file}}
                }
                else{newDisplay = {...newDisplay, [fileName]: file}}
            })
            Object.keys(zeroDisplay).forEach(id => {
                document.getElementById(id).classList.add('image-hide')
            })
            setTimeout(() => {
              return this.setState({artworkOnDisplay: newDisplay})
            }, 200);
        }
        //ON CHECK
        else{
            newDisplay={...this.state.artworkOnDisplay}
            Object.keys(this.state.artworkInfoData).forEach(fileName => {
                const file = this.state.artworkInfoData[fileName]
                  if(file.displayTriggers.listitems.includes(listitem)){
                    newDisplay = {...newDisplay, [fileName]: file}
                  }
            })
            Object.keys(newDisplay).forEach(id => {
                document.getElementById(id).classList.remove('image-hide')
            })
            setTimeout(() => {
              return this.setState({artworkOnDisplay: newDisplay})
            }, 200);
        }
      })

    }
    /**
     * @param: e
     * @param: theme
     */
    this.filterByTheme = (theme, hideAll) => {

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
        Object.keys(this.state.artworkOnDisplay).forEach(id => {
            document.getElementById(id).classList.add('image-hide')
        })
        setTimeout(() => {
          return this.setState({artworkOnDisplay: {}})
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

    this.filterByYear = (year) => {
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

    this.filterByLocation = location => {
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
        console.log("show menu MOBILE")
        let delay = 1
        if(document.getElementById("ArtworkInfo")){
          if(document.getElementById("ArtworkInfo").classList.contains("info-up")){
            // this.showInfo()
            document.getElementById("ArtworkInfo").classList.remove("info-up")
            delay += 100
          }
        }
        //if menu is open
        if(document.getElementById("TagsMenu").classList.contains("show-menu")){
          console.log("menu is open")
          //if listitem drawer is open
          if(document.getElementsByClassName("scroll-down-listitem").length > 0){
            document.getElementsByClassName("scroll-down-listitem")[0].classList.remove("scroll-down-listitem")
            delay += 100
          }

          return setTimeout(() => {
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
          return document.getElementById("TagsMenu").classList.add("show-menu")
        }
      }
      //DESKTOP
      else{
        console.log("show menu desktop")
        if(this.state.enlarge && this.state.enlarge.open){
          //if menu closed
          if(document.getElementById("TagsMenu").classList.contains("show-menu-desktop")){
            if(this.state.enlarge && this.state.enlarge.open){
              document.getElementById("TagsMenu").classList.remove("show-menu-desktop")
              setTimeout(() => {
                this.animateEnlarge(this.state.enlarge.background)
              }, 200);
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
                const imageSelectWidth = document.getElementById("imageSelect").offsetWidth
                const imageSelect = document.getElementById("imageSelect")
                imageSelect.style.width = `${imageSelectWidth+250}px`
                setTimeout(() => {
                  document.getElementById("TagsMenu").classList.add("show-menu-desktop")
                }, 200);
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
        if(ArtworkInfo)ArtworkInfo.classList.remove("show")
        if(!clearAll)
        return
      }
      if(!clearAll){
        if(document.getElementById("TagsMenu").classList.contains("show-menu")){
          this.showMenu(e)
          return
        }
      }
      // if(ArtworkInfo)ArtworkInfo.classList.remove("show")
        const delay = this.hideArtworkInfo()
        setTimeout(() => {
          const enlargeContainer = document.getElementById('enlargeContainer')

          //if mobile
          if(this.state.mobile){
            document.getElementById('imageSelect').classList.remove("side-scroll")
            setTimeout(() => {
              enlargeContainer.classList.remove("enlarge-scroll-down")
              if(ArtworkInfo){
                ArtworkInfo.classList.remove("show")
              }
            }, 400);
          }
          //if dekstop
          else{
            document.getElementById('imageSelect').style.width = `100%`

            setTimeout(() => {
              enlargeContainer.classList.remove("enlarge-scroll-left")
            }, 200);
          }

          if(!clearAll){
            const enlarge = {...this.state.enlarge}
            enlarge.open = false
            this.setState({enlarge})
          }
        }, delay);
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
                const artworkOnDisplay = this.state.artworkOnDisplay
                let nextPicName = commonSequence.find(fileName => {
                  if(artworkOnDisplay[fileName].artworkFamily !== familyName){
                    if(commonSequence.indexOf(fileName) > commonIndex){
                      return commonSequence.indexOf(fileName)
                    }
                  }
                  return
                  })
              
                  if(!nextPicName){
                    nextPicName = commonSequence[0]
                  }

              // options.state.enlarge.familySequence.commonIndex = commonSequence.indexOf(nextPicName)
              let nextPic = this.state.artworkInfoData[nextPicName]

              console.log("nextPicName")
              console.log(nextPicName)


              options = this.createFamilySequence(nextPic)
              // sequence = options.state.enlarge.familySequence.familySequence
              sequence = commonSequence
              nextIndex = commonSequence.indexOf(nextPicName)
            }
            else{
              nextIndex = familyIndex+1
              options.state.enlarge.familySequence.familyIndex += 1
              sequence = options.state.enlarge.familySequence.familySequence
            }
          }
          //VIEW PREVIOUS
          else{
            //if current image is the first in the familySequence
            if(familyIndex-1 < 0 ){
              let prevPicName = null
              const artworkOnDisplay = this.state.artworkOnDisplay
              if(commonIndex === 0){
                prevPicName = commonSequence[commonSequence.length-1]
              }
              else{
                prevPicName = commonSequence[commonIndex-1]
              }


              // else{
              //   const filteredSequence = commonSequence.filter(fileName => {
              //       if(fileName === file.fileName || artworkOnDisplay[fileName].artworkFamily !== familyName){
              //         return fileName
              //       }
              //   })

              //   const nextFileIndex = filteredSequence.indexOf(file.fileName)-1
              //   prevPicName = filteredSequence[nextFileIndex]

              // }
              
              // if(!prevPicName){
              //   prevPicName = commonSequence[commonSequence.length-1]
              // }

            // options.state.enlarge.familySequence.commonIndex = commonSequence.indexOf(prevPicName)
            console.log(prevPicName)
            console.log("prevPicName")

            let prevPic = this.state.artworkInfoData[prevPicName]

            const familyArray = this.state.relatedArtwork[prevPic.artworkFamily].column.fileIds
            // const lastOfFamilyName = familyArray[familyArray.length-1]
            const lastOfFamilyFile = this.state.artworkInfoData[prevPicName]

              // options = this.createFamilySequence(prevPic)
              options = this.createFamilySequence(lastOfFamilyFile)

              sequence = options.state.enlarge.familySequence.familySequence
              nextIndex = sequence.indexOf(lastOfFamilyFile.fileName)
              // nextIndex = sequence.indexOf(prevPicName)

              // nextIndex = sequence.length-1
              options.reverse = true
            }
            else{
              nextIndex = familyIndex-1
              // const prevPicName = familySequence[nextIndex]
              // const prevPic = this.state.artworkInfoData[prevPicName]
              // options = this.createFamilySequence(prevPic)
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


    this.countWidth = (containerHeight, naturalHeight, naturalWidth, mobile) => {
      let maxWidth = document.getElementById("images").clientWidth - 120
      const naturalRatio = naturalWidth / naturalHeight

      if(mobile){
        maxWidth = document.getElementById("images").clientWidth
        const maxHeight = document.getElementById("images").clientHeight - 70

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
      console.log("animate enlarge runs")
      this.enlarge.loaded = false
      let fgLoaded = null

      if(document.getElementById("TagsMenu").classList.contains("show-menu")){
        document.getElementById("TagsMenu").classList.remove("show-menu")
      }

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
                    //flip from mobile to desktop reset
                    if(document.getElementById('background').style.width !== "100%"){
                      document.getElementById('background').style.width = "100%"
                      document.getElementById('foreground').style.width = "100%"
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
                  //APPLY SIZE CHANGES
                  //MOBILE
                  if(this.state.mobile){
                    if(!container.classList.contains("enlarge-scroll-down")){
                      container.style.height = `${images.clientHeight - 90}px`
                      container.classList.add("enlarge-scroll-down")
                      scrollToDelay = 400
                      setTimeout(() => {
                          imageSelect.classList.add("side-scroll")
                      }, 200);
                    }
                  }
                  //DESKTOP
                  else{
                    if(!container.classList.contains("enlarge-scroll-left")){
                      container.classList.add("enlarge-scroll-left")
                      container.style.width = `${futureSize.width}px`
                      setTimeout(() => {
                        imageSelect.style.width = `${images.clientWidth - futureSize.width}px`
                      }, 250);
                    }
                    else{
                      //if enlargeContainer will shrink
                      if(this.state.enlarge.currentWidth && this.state.enlarge.currentWidth > futureSize.width && this.state.enlarge.open){

                        imageSelect.style.width = `${images.clientWidth - futureSize.width}px`
                        setTimeout(() => {
                          container.style.width = `${futureSize.width}px`
                        }, 400);
                      }
                      //
                      else{
                        container.style.width = `${futureSize.width}px`
                        setTimeout(() => {
                          imageSelect.style.width = `${images.clientWidth - futureSize.width}px`
                        }, 400);
                      }
                    }
                    background.style.height = `${futureSize.height}px`
                    foreground.style.height = `${futureSize.height}px`
                    // container.style.width = `${futureSize.width}px`
                  }
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
                    newState.enlarge.currentHeight = images.clientHeight - 90
                    newState.enlarge.open = true

                    this.setState(newState)

                     const loadForeground = () => {

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
                         document.getElementById("ArtworkInfo").classList.add("show")
                        })
                        .catch(rej => {
                          console.log("enlarge.fgLoaded")
                          console.log(rej)
                        })
                        this.scrollToHorizontal(`previewBubble-${file.fileName}`, "previewBubble-wrapper", {increment: 50})

                     }, 200);
                     return
          })
          .catch(rej => {
            console.log(rej)
            return
          })
    }

    this.scrollToHorizontal = (id, parent_id, options) => {
      let scrollTo = {}
      // let scrollTo = {behavior: 'smooth'}
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
      console.log("load enlarge")
      e.stopPropagation()

      const file = this.state.artworkInfoData[id]

      const options = this.createFamilySequence(file)

      return this.animateEnlarge(file, options)
    }


    this.showInfo = (e) => {
      if(this.state.enlarge && !this.state.enlarge.open){
        return
      }
      console.log("run show info")
      const info = document.getElementById("ArtworkInfo")
      if(!this.state.mobile && !info.classList.contains("info-up")){
        if(!info.classList.contains("info-up")){
          info.classList.add("info-up")
        }
        else info.classList.remove("info-up")
        return
      }
      if(!info.classList.contains('show')){
        let counter = 1
        if(this.state.mobile){
          if(document.getElementById("TagsMenu").classList.contains("show-menu")){
            this.showMenu(e)
            counter = 1
          }
        }
        setTimeout(() => {
          setTimeout(() => {
            info.classList.add('info-up')
          }, 100);
          info.classList.add('show')
        }, counter);
      }

      // else{
      //   let delay = 0
      //   if(document.getElementById("ArtworkInfo").classList.contains("ArtworkInfo-toggleTags")){
      //       document.getElementById("ArtworkInfo").classList.remove("ArtworkInfo-toggleTags")
      //     delay += 150
      //   }
      //   // info.classList.remove('info-up')
      //   setTimeout(() => {
      //     info.classList.remove('info-up')
      //     // info.classList.remove('show')
      //   }, delay);
      // }
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
          Array.from(document.getElementsByClassName("scroll-down")).forEach(item => {
            item.classList.remove("scroll-down")
          })
          // container.classList.add("enlarge-scroll-down")
      }
      else{
        mobile = false
        // container.style.height = "calc(100% - 50px)"
        container.style.width = `${this.state.enlarge ? this.state.enlarge.background.currentWidth : 0}px`
      }

      if(this.state.enlarge && this.state.enlarge.open){
          setTimeout(() => {
            let newState = {...this.state}
            newState.mobile = mobile
            if(mobile){
              imageSelect.classList.add("side-scroll")
              this.scrollToHorizontal(this.state.enlarge ? this.state.enlarge.background.fileName : null, "imageSelect")
            }
            else{
                // this.animateEnlarge(this.state.enlarge.background, {state: newState})
            }
          }, 400);
        }

      // if(this.state.enlarge && this.state.enlarge.open){
      //   let newState = {...this.state}
      //   newState.mobile = mobile
      //   this.animateEnlarge(this.state.enlarge.background, {state: newState})
      // }
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


}//END OF CONTSTRUCTOR

  //   componentDidMount(){
  //     console.log("compoenent did mount")
  //     let newState = {...this.state}

  //     this.setState({showModal: true, modalMessage: "loading data"})

  //     let FamilyList = new Promise ((resolve, rej) => {
  //         axios.get('/api/familySetup')
  //         .then(res => {
  //             let familyList = Object.keys(res.data).map(obj => {
  //                 return res.data[obj].artworkFamily
  //             })
  //             newState.artworkFamilyList = familyList
  //             console.log("Families loaded")
  //             console.log(res)
  //             resolve()
  //         })
  //         .catch(err => {
  //              rej(err)
  //              console.log("family list laod error")
  //             // document.location.reload(true)
  //         })
  //     })

  //     let Categories = new Promise ((resolve, rej) => {
  //         FamilyList
  //         .then(res => {
  //                 axios.get('/api/categories')
  //                 .then(res => {
      
  //                         let categoryNames = Object.values(res.data).map(obj => obj.category)
  //                         let categoryObj = {}
  //                         categoryNames.forEach(categoryName => {
  //                             const currentObj = res.data.find(item => item.category === categoryName)
  //                             return categoryObj = {...categoryObj, [categoryName]: Object.keys(currentObj.subcategory)}
  //                         })
      
  //                     newState.categoriesData = res.data
  //                     newState.categoriesOptionList = {}
  //                     newState.categoriesOptionList.data = categoryObj
      
  //                     const progressLength = newState.artworkFamilyList.length
  //                     let counter = 0
  //                     newState.artworkFamilyList.forEach(familyName => {
  //                         this.getRelatedArtwork(familyName, newState)
  //                         .then(res => {
  //                           if(!newState.relatedArtwork){
  //                             newState.relatedArtwork = {}
  //                           }
  //                           newState.relatedArtwork[familyName] = res
  //                           counter += 1
  //                           if(counter === progressLength){
  //                             resolve()
  //                           }
  //                         })
  //                         .catch(err => {
  //                           console.log("getrelated artwork err")
  //                           console.log(err)
  //                           rej("getrelated artwork err")
  //                         })
  //                     })
  //                     // resolve()
  //                 })
  //                 .catch(err => {
  //                      console.log("get categories err")
  //                      console.log(err)
  //                      rej("get categories err")
  //                     // document.location.reload(true)
  //                 })
  //         })
  //         .catch(err => {
  //           console.log("categories error")
  //           console.log(err)
  //           rej(err)
  //         })
  //     }) 

  //     let ArtworkInfo = new Promise ((resolve, rej) => {
  //         this.getArtworkInfo()
  //             .then(res => {
  //                 console.log("this.getArtworkInfo res")
  //                 console.log(res)
  //                 newState.artworkInfoData = res
  //                 let onDisplay = {}
  //                 Object.keys(res).forEach(fileName => {
  //                   if(res[fileName].displayMain){
  //                     onDisplay = {...onDisplay, [fileName]: res[fileName]}
  //                   }
  //                 })
                  
  //                 let allThemes = []
  //                 Object.keys(res).forEach(objName => {
  //                     allThemes = [...allThemes, ...res[objName].themes]
  //                 })
  //                 let allThemesSet = new Set(allThemes)
  //                 allThemesSet = Array.from(allThemesSet)

  //                 let artworkByTheme = {}

  //                 let themesArr = Object.keys(res).map(name => res[name])

  //                 allThemesSet.forEach(theme => {
  //                   themesArr.forEach(obj => {
  //                     if(obj.themes.includes(theme)){
  //                       if(!artworkByTheme[theme]){
  //                         artworkByTheme[theme] = []
  //                       }
  //                       if(obj.displayTriggers.themes && obj.displayTriggers.themes.includes(theme)){
  //                         artworkByTheme[theme] = [...artworkByTheme[theme], obj.fileName]
  //                       }
  //                     }
  //                   })
  //                 })

  //                 let artworkOnDisplay = {}
  //                 let displayThemes = ["metal", "social", "tools", "cloud"]
  //                 let hideThemes = ["celestial body"]
  //                 let artworkNames = Object.keys(onDisplay)
  //                 artworkNames.forEach(fileName => {
  //                   displayThemes.forEach(theme => {
  //                     if(onDisplay[fileName].themes.includes(theme)){
  //                       hideThemes.forEach(hideTheme => {
  //                         if(!onDisplay[fileName].themes.includes(hideTheme)){
  //                           artworkOnDisplay[fileName] = onDisplay[fileName]
  //                         }
  //                       })
  //                     }
  //                   })
  //                 })

  //                 let years = []
  //                 let locations = []
  //                 let artworkByYear = {}
  //                 let artworkByLocation = {}
              
  //                 const allFiles = Object.keys(res)
              
  //                 allFiles.forEach(fileName => {
  //                     const file = res[fileName]
  //                     if(file.year){
  //                         years = [...years, file.year]
  //                         if(!artworkByYear[file.year]){
  //                           artworkByYear[file.year] = []
  //                         }
  //                         artworkByYear = {...artworkByYear, [file.year]: [...artworkByYear[file.year], fileName]}
  //                     }
  //                     if(file.location){
  //                         locations = [...locations, file.location]
  //                         if(!artworkByLocation[file.location]){
  //                           artworkByLocation[file.location] = []
  //                         }
  //                         artworkByLocation = {...artworkByLocation, [file.location]: [...artworkByLocation[file.location], fileName]}
  //                     }
  //                 })
              
  //                 years = new Set(years)
  //                 years = Array.from(years).sort()
              
  //                 locations = new Set(locations)
  //                 locations = Array.from(locations).sort()

  //                 const yearLocOnDisplay = {years: artworkByYear, locations: artworkByLocation}

  //                 newState.yearLocation = {years, locations, "visible": yearLocOnDisplay, "all": yearLocOnDisplay}
  //                 newState.artworkOnDisplay = artworkOnDisplay
  //                 newState.visibleArtwork = onDisplay
  //                 newState.themesOnDisplay = artworkByTheme
  //                 resolve()
  //             })
  //             .catch(err => {
  //               console.log("getArtworkInfo err")
  //               console.log(err)
  //               rej(err)
  //             })
  //     })

  //     let serverFiles = new Promise ((resolve, rej) => {
  //       axios.get('/fetchimages')
  //         .then(res => {
  //           newState.serverData = res
  //           resolve()
  //         })
  //         .catch(err => rej(err))
  //     })

  //     Promise.all([
  //       serverFiles,
  //       Categories, 
  //       ArtworkInfo, 
  //       // Themes, 
  //     ])
  //     .then(res => {
  //         newState.showModal = false
  //         newState.modalMessage = null
  //         newState.mobile = this.toggleMobile()
  //         window.addEventListener("resize", ()=>{this.setState({mobile: this.toggleMobile()})})
  //         console.log("newState")
  //         console.log(newState)
  //         this.setState(newState)
  //     })
  //     .catch(err => {
  //           console.log("promise all err")
  //           console.log(err)
  //     })
  // }
  componentDidMount(){
      axios.get(`/staticState`)
      .then(res => {
        window.addEventListener("resize", ()=>{this.setState({mobile: this.toggleMobile()})})
        let newState = res.data
        newState.mobile = this.toggleMobile()
        this.setState(newState)
      })
      .catch(err => {
        console.log("COMPONENT DID MOUNT ERR")
        console.log(err)
      })
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

            } }>
        {this.props.children}
        </Context.Provider>
    )
    }

}

