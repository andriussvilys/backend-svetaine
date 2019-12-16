import React from 'react';
import axios from 'axios';

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
        relatedArtwork: {},
        mobile: document.documentElement.clientWidth < 721,
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

    this.filterByCategory = (category, hideAll) => {
        let newDisplay = {}
        let zeroDisplay = {}

        const checkbox = document.getElementById(`category-${category}`)
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
        Object.keys(newDisplay).forEach(id => {
          document.getElementById(id).classList.remove('image-hide')
        })
        
        Object.keys(zeroDisplay).forEach(id => {
            document.getElementById(id).classList.add('image-hide')
        })
        return this.setState({artworkOnDisplay: newDisplay})
        }
        //ON UN-CHECK
        if(!checkbox.checked){
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
            return this.setState({artworkOnDisplay: newDisplay})
        }
        //ON CHECK
        else{
            newDisplay={...this.state.artworkOnDisplay}
            Object.keys(this.state.visibleArtwork).forEach(fileName => {
                const file = this.state.visibleArtwork[fileName]
                if(Object.keys(file.category).includes(category)){
                    newDisplay = {...newDisplay, [fileName]: file}
                }
            })
            Object.keys(newDisplay).forEach(id => {
                document.getElementById(id).classList.remove('image-hide')
            })
            return this.setState({artworkOnDisplay: newDisplay})
        }

    }
    this.filterBySubcategory = (category, subcategory, hideAll) => {
      console.log(category)
      console.log(subcategory)
      console.log(hideAll)
        let newDisplay = {}
        let zeroDisplay = {}

        const checkbox = document.getElementById(`subcategory-${subcategory}`)

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
        Object.keys(newDisplay).forEach(id => {
          document.getElementById(id).classList.remove('image-hide')
        })
        
        Object.keys(zeroDisplay).forEach(id => {
            document.getElementById(id).classList.add('image-hide')
        })
        return this.setState({artworkOnDisplay: newDisplay})
        }

        //ON UN-CHECK
        if(!checkbox.checked){
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
            return this.setState({artworkOnDisplay: newDisplay})
        }
        //ON CHECK
        else{
            newDisplay={...this.state.artworkOnDisplay}

            Object.keys(this.state.visibleArtwork).forEach(fileName => {
                const file = this.state.visibleArtwork[fileName]
                if(file.category[category]){
                    if(Object.keys(file.category[category]).includes(subcategory)){
                        newDisplay = {...newDisplay, [fileName]: file}
                    }
                }
            })
            Object.keys(newDisplay).forEach(id => {
                document.getElementById(id).classList.remove('image-hide')
            })
            console.log("newDisplay")
            console.log(newDisplay)

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
      let newDisplay = {}
      let zeroDisplay = {}

      const checkbox = document.getElementById(`listItem-${listitem}`)

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
      Object.keys(newDisplay).forEach(id => {
        document.getElementById(id).classList.remove('image-hide')
      })
      
      Object.keys(zeroDisplay).forEach(id => {
          document.getElementById(id).classList.add('image-hide')
      })
      return this.setState({artworkOnDisplay: newDisplay})
      }

      //ON UN-CHECK
      if(!checkbox.checked){
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
          return this.setState({artworkOnDisplay: newDisplay})
      }
      //ON CHECK
      else{
          newDisplay={...this.state.artworkOnDisplay}
          Object.keys(this.state.visibleArtwork).forEach(fileName => {
              const file = this.state.visibleArtwork[fileName]
              if(file.category[category]){
                if(file.category[category][subcategory]){
                  if(file.category[category][subcategory].includes(listitem)){
                    newDisplay = {...newDisplay, [fileName]: file}
                  }
                }
              }
          })
          Object.keys(newDisplay).forEach(id => {
              document.getElementById(id).classList.remove('image-hide')
          })
          return this.setState({artworkOnDisplay: newDisplay})
      }

    }
        /**
     * @param: e
     * @param: theme
     */
    this.filterByTheme = (theme, hideAll) => {

      if(hideAll){
        let newDisplay = {}
        let zeroDisplay = {}
        Object.keys(this.state.visibleArtwork).forEach(fileName => {
          const file = this.state.visibleArtwork[fileName]
          if(file.themes.includes(theme)){
            newDisplay = {...newDisplay, [fileName]: file}
          }
          else{
            zeroDisplay ={...zeroDisplay, [fileName]: file}
          }
      })

        Object.keys(newDisplay).forEach(id => {
          document.getElementById(id).classList.remove('image-hide')
        })
        
        Object.keys(zeroDisplay).forEach(id => {
            document.getElementById(id).classList.add('image-hide')
        })

        return this.setState({artworkOnDisplay: newDisplay})
      }

      //ON UN-CHECK
      const newState = {...this.state}
      const toggleArtwork = [...newState.themesOnDisplay[theme]]
      let artworkOnDisplay = {...newState.artworkOnDisplay}

      let visibleThemesList = []
      Object.keys(artworkOnDisplay).forEach(fileName => {
            visibleThemesList = artworkOnDisplay[fileName].themes.map(theme => theme)
        }, () => visibleThemesList = Array.from(new Set(visibleThemesList)))
      
        const checkbox = document.getElementById(`theme-${theme}`)
      if(!checkbox.checked){
        toggleArtwork.forEach(item => {
          document.getElementById(item).classList.add("image-hide")
        })

        toggleArtwork.forEach(fileName => {
          delete artworkOnDisplay[fileName]
        })

          return this.setState({artworkOnDisplay})
      }

      else{
        this.state.themesOnDisplay[theme].forEach(item => {
          document.getElementById(item).classList.remove("image-hide")
        })

        toggleArtwork.forEach(fileName => {
          artworkOnDisplay = {...artworkOnDisplay, [fileName]: this.state.artworkInfoData[fileName]}
        })

        return this.setState({artworkOnDisplay})
      }
    }

    this.themeChecked = (theme) => {
      let onDisplay = []
      const artworkOnDisplay = {...this.state.artworkOnDisplay}
      onDisplay = Object.keys(artworkOnDisplay).filter(fileName => {
        return artworkOnDisplay[fileName].themes.includes(theme) === true
      })
      return onDisplay.length > 0
    }

    this.shrinkImageSelect = () => {

        const imageSelect = document.getElementById('imageSelect')
        imageSelect.style.width = "70%"
        setTimeout(() => {
            imageSelect.style.width = "35%"
        }, 100);
        setTimeout(() => {
            imageSelect.style.width = "150px"
        }, 200);
        setTimeout(() => {
          Array.from(document.getElementsByClassName("ImagesPreview--imageContainer")).forEach(preview => {
            preview.classList.add("low-opacity")
          })
        }, 300);
    }
    this.extendImageSelect = () => {
      Array.from(document.getElementsByClassName("ImagesPreview--imageContainer")).forEach(preview => {
        preview.classList.remove("low-opacity")
      })
        const imageSelect = document.getElementById('imageSelect')
        imageSelect.style.width = "25%"
        setTimeout(() => {
            imageSelect.style.width = "50%"
        }, 100);
        setTimeout(() => {
            imageSelect.style.width = "100%"
        }, 200);
    }
    this.showMenu = () => {
      if(this.state.mobile){
        document.getElementById("TagsMenu").classList.toggle("show-menu")
      }
      //DESKTOP
      else{
        let mainContainer = document.getElementById("images")
        if(this.state.enlarge){
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
            document.getElementById("TagsMenu").classList.add("show-menu-desktop")
            document.getElementById("imageSelect").classList.remove("imageSelect-slide")
              if(this.state.enlarge.open){
                const imageSelectWidth = document.getElementById("imageSelect").offsetWidth
                const imagesContainerWidth = document.getElementById("images").clientWidth
                document.getElementById("enlargeContainer").style.width = `${imagesContainerWidth - imageSelectWidth}px`
                setTimeout(() => {
                  this.animateEnlarge(this.state.enlarge.foreground)
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
    this.enlarge = (id) => {
        console.log('ENLARGE RUNS')
            const file = this.state.artworkOnDisplay[id]
            const imageSelect = document.getElementById('imageSelect')
            if(!this.state.enlarge){

              let enlarge = {}
              enlarge.foreground = file
              enlarge.background = file

              this.setState({enlarge}, () => {
                  if(!imageSelect.classList.contains('minimized')){
                      imageSelect.classList.add('minimized')
                      this.shrinkImageSelect()
                  }
                  document.getElementById('enlargeContainer').style.zIndex = "-1"
                  // document.getElementById('enlargeContainer').style.transform = "translateX(0)"
                  document.getElementById('enlargeContainer').style.zIndex = 0
              })
            }
            else{
              const file = this.state.artworkOnDisplay[id]
              const foreground = document.getElementById('foreground')
              // foreground.style.opacity = 1

              let enlarge = this.state.enlarge
              enlarge.background = file
              this.setState({enlarge}, () => {
                foreground.style.opacity = 0
                setTimeout(() => {
                  enlarge.foreground = file
                  this.setState(enlarge, () => {
                    foreground.style.opacity = 1
                  })
                }, 400);
                // if(!imageSelect.classList.contains('minimized')){
                //     imageSelect.classList.add('minimized')
                //     this.shrinkImageSelect()
                // }
                // document.getElementById('enlargeContainer').style.zIndex = "-1"
                // document.getElementById('enlargeContainer').style.transform = "translateX(0)"
                // document.getElementById('enlargeContainer').style.zIndex = 0
            })

            }
    }
    this.hideArtworkInfo = (e) => {
      if(e){
        e.stopPropagation()
      }
      if(document.getElementById('ArtworkInfo') && document.getElementById('ArtworkInfo').classList.contains("info-up")){
        document.getElementById('ArtworkInfo').classList.remove('info-up')
        return 200
      }
      else { return 1}
    }
    this.closeEnlarge = (e) => {
      e.stopPropagation()
        if(document.getElementsByClassName("info-up").length > 0){
          document.getElementsByClassName("info-up")[0].classList.remove("info-up")
          return
        }
        const delay = this.hideArtworkInfo()
        setTimeout(() => {      
          const enlargeContainer = document.getElementById('enlargeContainer')
          const imagesWidth = document.getElementById('images').clientWidth

          if(this.toggleMobile() === true){
            enlargeContainer.style.transform = `translateY(-100%)`

            document.getElementById('imageSelect').classList.remove("side-scroll")
            enlargeContainer.style.height = 0


          }
          else{
            enlargeContainer.style.transform = `translateX(100%)`
            document.getElementById('imageSelect').style.width = `${imagesWidth}px`
          }
  
          const enlarge = {...this.state.enlarge}
          enlarge.open = false
          this.setState({enlarge})
        }, delay);
    }
    this.viewNext = () => {
        const familyName = this.state.enlarge.foreground.artworkFamily
        const currentImage = this.state.enlarge.background.fileName
        let currentIndex = this.state.enlarge.foreground.familyDisplayIndex
        const familyLength = this.state.relatedArtwork[familyName].column.fileIds.length
        let nextIndex = currentIndex+1 > familyLength-1 ? 0 : currentIndex+1
        console.log(`nextIndex before filter ${nextIndex}`)
        let nextPicName = this.state.relatedArtwork[familyName].column.fileIds[nextIndex]
        let nextPic = this.state.artworkInfoData[nextPicName]
        /**
         @returns current index in common sequence or the last one recorded in state
         */
        // const familySequence = () => {
        //   if(!this.state.enlarge.familySequence || this.state.enlarge.familySequence.length <= 0){
        //     const recordedSequence = this.state.relatedArtwork[familyName].column.fileIds
        //     const startIndex = this.state.relatedArtwork[familyName].column.fileIds[currentImage]
        //     const start = recordedSequence.slice(startIndex, recordedSequence.length)
        //     const end = recordedSequence.slice(0, startIndex)
        //     const newSequence = [...start, ...end]
        //     const familySequence = {startIndex, "currentIndex": startIndex, "familySequence": newSequence }
        //     this.setState({enlarge: {...this.state.enlarge, familySequence}})
        //   }
        //   nextIndex = this.state.enlarge.currentIndex + 1
        //   if(nextIndex === this.state.enlarge.familySequence.length){nextIndex = 0}
        //   if(nextIndex < 0){nextIndex = this.state.enlarge.familySequence.length-1}
        //   if(nextIndex === this.state.enlarge.commonIndex)
        // }

        const commonIndex = () => {
          const allVisible = Array.from(document.getElementsByClassName("ImagesPreview--imageContainer")).map(container => container.childNodes[0].id)
          let onDisplay = Object.keys(this.state.artworkOnDisplay)
          let indexes = allVisible.filter(id => onDisplay.includes(id))
          currentIndex = indexes.indexOf(this.state.enlarge.background.fileName)
          return currentIndex < 0 ? this.state.enlarge.commonIndex : currentIndex
        }
        if(!nextPic || familyLength <= 1 || familyName === "none" || nextIndex === 0){
          const allVisible = Array.from(document.getElementsByClassName("ImagesPreview--imageContainer")).map(container => container.childNodes[0].id)
          let onDisplay = Object.keys(this.state.artworkOnDisplay)
          let indexes = allVisible.filter(id => onDisplay.includes(id))
          nextIndex = commonIndex()+1 > indexes.length-1 ? 0 : commonIndex()+1
          nextPicName = indexes[nextIndex]

          let newState = {...this.state}
          let prevSequence = null
          if(!this.state.enlarge.prevSequence){
            prevSequence = []
          }
          else{
            prevSequence = [...this.state.enlarge.prevSequence]
          }
          prevSequence = [...prevSequence, nextPicName]
          newState.enlarge.prevSequence = prevSequence
          newState.enlarge.commonIndex = nextIndex
          this.setState(newState)
          
          nextPic = this.state.artworkInfoData[nextPicName]
        }
        else{
          let newState = {...this.state}
          let prevSequence = null
          if(!this.state.enlarge.prevSequence){
            prevSequence = []
          }
          else{
            prevSequence = [...this.state.enlarge.prevSequence]
          }
          prevSequence = [...prevSequence, nextPicName]
          newState.enlarge.prevSequence = prevSequence
          newState.enlarge.commonIndex = commonIndex()
          this.setState(newState)
        }

        this.animateEnlarge(nextPic)
          
    }
    this.viewPrev = () => {
      // const familyName = this.state.enlarge.foreground.artworkFamily

      // let currentIndex = this.state.enlarge.foreground.familyDisplayIndex
      // const familyLength = this.state.relatedArtwork[familyName].column.fileIds.length
      // let nextIndex = currentIndex-1 < 0 ? familyLength-1 : currentIndex-1
      // console.log(`prevIndex before filter ${nextIndex}`)
      // let nextPicName = this.state.relatedArtwork[familyName].column.fileIds[nextIndex]
      // let nextPic = this.state.artworkInfoData[nextPicName]
      // /**
      //  @returns current index in common sequence or the last one recorded in state
      //  */
      // const commonIndex = () => {
      //   const allVisible = Array.from(document.getElementsByClassName("ImagesPreview--imageContainer")).map(container => container.childNodes[0].id)
      //   let onDisplay = Object.keys(this.state.artworkOnDisplay)
      //   let indexes = allVisible.filter(id => onDisplay.includes(id))
      //   currentIndex = indexes.indexOf(this.state.enlarge.background.fileName)
      //   return currentIndex < 0 ? this.state.enlarge.commonIndex : currentIndex
      // }
      // if(!nextPic || familyLength <= 1 || familyName === "none" || nextIndex === familyLength-1){
      //   const allVisible = Array.from(document.getElementsByClassName("ImagesPreview--imageContainer")).map(container => container.childNodes[0].id)
      //   let onDisplay = Object.keys(this.state.artworkOnDisplay)
      //   let indexes = allVisible.filter(id => onDisplay.includes(id))
      //   nextIndex = commonIndex()-1 < 0 ? indexes.length-1 : commonIndex()-1
      //   console.log(`prev INDEX: ${nextIndex}`)
      //   nextPicName = indexes[nextIndex]

      //   let newState = {...this.state}
      //   let prevSequence = null
      //   if(!this.state.enlarge.prevSequence){
      //     prevSequence = []
      //   }
      //   else{
      //     prevSequence = [...this.state.enlarge.prevSequence]
      //   }
      //   prevSequence = [...prevSequence, nextPicName]
      //   newState.enlarge.commonIndex = nextIndex
      //   newState.enlarge.prevSequence = prevSequence
      //   this.setState(newState)
        
      //   nextPic = this.state.artworkInfoData[nextPicName]
      //   console.log(nextPicName)
      // }
      // else{
      //   let newState = {...this.state}
      //   newState.enlarge.commonIndex = nextIndex
      //   this.setState(newState)
      // }

      if(!this.state.enlarge.prevSequence || this.state.enlarge.prevSequence.length < 0){
        alert('no track')
        return
      }

      let prevSequence = [...this.state.enlarge.prevSequence]
      prevSequence.pop()
      let nextPicName = prevSequence[prevSequence.length-1]
      let nextPic = this.state.artworkInfoData[nextPicName]
      if(!nextPic){
        return
      }
      this.setState({enlarge: {...this.state.enlarge, "prevSequence": prevSequence}}, () => {this.animateEnlarge(nextPic)})

      
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
      let futureHeight = Math.round(futureWidth / naturalRatio)

      if(futureWidth > maxWidth){
        futureWidth = maxWidth
        futureHeight = Math.round(maxWidth / naturalRatio)
      }

      futureHeight = futureHeight > containerHeight ? containerHeight : futureHeight

      return {width: futureWidth, height: futureHeight}
    }
    this.animateEnlarge = (file) => {

      if(document.getElementById("TagsMenu").classList.contains("show-menu")){
        document.getElementById("TagsMenu").classList.toggle("show-menu")
      }


      if(document.getElementById("ArtworkInfo")){document.getElementById("ArtworkInfo").classList.remove("info-up")}

      // this.hideArtworkInfo()
      const background = document.getElementById("background") 
      const foreground = document.getElementById("foreground") 
      const container = document.getElementById("enlargeContainer") 
      const imageSelect = document.getElementById("imageSelect")
      const images = document.getElementById("images")

      let enlarge = this.state.enlarge ? {...this.state.enlarge} : {}
      enlarge.previous = !enlarge.background ? file : enlarge.background
      enlarge.background = file

      function backgroundImage(tries, willFail) {
        return new Promise((resolve, reject) => {
          
          if (--tries > 0) {
            setTimeout(function() {
              if(document.getElementById(file.fileName)){
                resolve(document.getElementById(file.fileName))
              }
            }, 1);
          } 
          else {
            if (willFail) {
              reject('Failure');
            } else {
              if(document.getElementById(file.fileName)){
                resolve(document.getElementById(file.fileName))
              }
            }
          }
        });
      }
        
      this.setState({enlarge}, () => {

        let futureSize = null

        backgroundImage(5, true)
          .then(res => {

              if(!this.toggleMobile()){
                if(document.getElementById('background').style.width !== "100%"){
                  document.getElementById('background').style.width = "100%"
                  document.getElementById('foreground').style.width = "100%"
                }
                futureSize = this.countWidth(container.clientHeight, file.naturalSize.naturalHeight, file.naturalSize.naturalWidth)

                container.style.height = "100%"
                
                if(this.state.enlarge){
                  //if enlargeContainer will shrink
                  if(this.state.enlarge.currentWidth && this.state.enlarge.currentWidth > futureSize.width && this.state.enlarge.open){
                    imageSelect.style.width = `${images.clientWidth - futureSize.width}px`
                  }
                  else{
                    // imageSelect.style.transition = "0.4s all"
                    setTimeout(() => {
                      imageSelect.style.width = `${images.clientWidth - futureSize.width}px`
                    }, 410);
                  }
                }
                else{
                  // imageSelect.style.transition = "0.4s all"
                  setTimeout(() => {
                    imageSelect.style.width = `${images.clientWidth - futureSize.width}px`
                  }, 410);
                }
                background.style.height = `${futureSize.height}px`
                foreground.style.height = `${futureSize.height}px`
                // container.style.height = `${futureSize.height}px`
                container.style.width = `${futureSize.width}px`
              }

              //IF MOBILES**************************************************************************************
              else{
                futureSize = this.countWidth(container.clientWidth, file.naturalSize.naturalHeight, file.naturalSize.naturalWidth, true)

                  setTimeout(() => {
                    imageSelect.classList.add("side-scroll")
                  }, 410);
                
                // background.style.height = `${futureSize.height}px`
                // foreground.style.height = `${futureSize.height}px`
                container.style.height = `${images.clientHeight - 70}px`
                background.style.height = `${futureSize.height}px`
                foreground.style.height = `${futureSize.height}px`
                background.style.width = `${futureSize.width}px`
                foreground.style.width = `${futureSize.width}px`
              }

              // background.style.opacity = 1

              foreground.style.opacity = 0
      
              
              if(!this.state.enlarge || !this.state.enlarge.open){
                if(this.state.mobile){
                  container.style.transform = 'translateY(0)'
                }
                else{container.style.transform = 'translateY(0)'}
              }
      
              setTimeout(() => {
                let newState = {...this.state}
                newState.enlarge.foreground = file
                newState.enlarge.currentWidth = futureSize.width
                newState.enlarge.currentHeight = images.clientHeight - 70
                newState.enlarge.open = true
                this.setState(newState, () => {
                  foreground.style.opacity = 1
                  imageSelect.style.transition = "none"
                })
              }, 410);
          })
          .catch(err => {
            return backgroundImage(5, true)
          })
    })
  }

    this.loadEnlarge = (e, id) => {
      e.stopPropagation()

      const allVisible = Array.from(document.getElementsByClassName("ImagesPreview--imageContainer")).map(container => container.childNodes[0].id)
      let onDisplay = Object.keys(this.state.artworkOnDisplay)
      let indexes = allVisible.filter(id => onDisplay.includes(id))
      let currentIndex = indexes.indexOf(id)
      let newState = {...this.state}
      if(!newState.enlarge){
        newState.enlarge = {}
      }
      newState.enlarge.commonIndex = currentIndex
      this.setState(newState, () => {console.log('new state on load'); console.log(this.state)})

        const file = this.state.artworkInfoData[id]
        
        this.animateEnlarge(file)
  
  }
    this.showInfo = () => {
      const info = document.getElementById("ArtworkInfo")
      if(!info.classList.contains('info-up')){
        info.classList.add('info-up')
      }
      else{
        info.classList.remove('info-up')
      }
    }

    this.toggleMobile = () => {
      if(document.documentElement.clientWidth < 721){
        return true
      }
      else{
        return false
      }
    }
    this.onTouchStart= (e) => {
      const touches = e.touches
      const touch = {"x": touches[0].clientX, "y": touches[0].clientY}
      this.setState({touch})
  }

}//END OF CONTSTRUCTOR

    componentDidMount(){
        console.log("frontendindex did mount")
            let newState = {...this.state}

            this.setState({showModal: true})

            let Themes = new Promise ((resolve,rej) => {
                axios.get('/api/themes')
                .then( res => {
                newState.themesData = res.data.list
                resolve()
                })
                .catch(err => {
                     
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
                             
                            // document.location.reload(true)
                        })
                })
            }) 

            let ArtworkInfo = new Promise ((resolve, rej) => {
                this.getArtworkInfo()
                    .then(res => {
                        newState.artworkInfoData = res
                        let onDisplay = {}
                        Object.keys(res).forEach(fileName => {
                          if(res[fileName].displayMain){
                            onDisplay = {...onDisplay, [fileName]: res[fileName]}
                          }
                        })
                        
                        let allThemes = []
                        Object.keys(onDisplay).forEach(objName => {
                            allThemes = [...allThemes, ...onDisplay[objName].themes]
                        })
                        let allThemesSet = new Set(allThemes)
                        allThemesSet = Array.from(allThemesSet)

                        let artworkByTheme = {}

                        let arr = Object.keys(onDisplay).map(name => onDisplay[name])

                        allThemesSet.forEach(theme => {
                          arr.forEach(obj => {
                            if(obj.themes.includes(theme)){
                              if(!artworkByTheme[theme]){
                                artworkByTheme[theme] = []
                              }
                              artworkByTheme[theme] = [...artworkByTheme[theme], obj.fileName]
                            }
                          })
                        })
                        newState.artworkOnDisplay = onDisplay
                        newState.visibleArtwork = onDisplay
                        newState.themesOnDisplay = artworkByTheme
                        resolve()
                    })
            })

            let serverFiles = new Promise ((resolve, rej) => {
              axios.get('/fetchimages')
                .then(res => {
                  newState.serverData = res
                  resolve()
                })
            })

            Promise.all([Categories, ArtworkInfo, Themes, serverFiles])
                .then(res => {
                    newState.showModal = false
                    newState.mobile = this.toggleMobile()
                    window.addEventListener("resize", ()=>{this.setState({mobile: this.toggleMobile()})})
                    
                    this.setState(newState)
                })
                .catch(err => {
                     
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

            filterByTheme: this.filterByTheme,
            themeChecked: this.themeChecked,

            showMenu: this.showMenu,
            toggleMobile: this.toggleMobile,
            onTouchStart: this.onTouchStart,

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

