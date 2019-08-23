import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './css/main.css';
import JsonPreview from './components/JsonPreview';

const navData = require('./JSON/navigation.json');
const categories = Object.keys(navData);

export default class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      category: {}
    }
  }

    onCheck = (e, stateKey) => {
      console.log('runs')
      let parent = e.target.parentNode.parentNode
      const parentCheckbox = (target) => Array.from(target.getElementsByTagName('input'))[0];

      const classNameCheck = (name) => {
        return e.target.parentNode.classList.contains(name)
      }

      const checkboxCheck = (checkbox) => {
        if(checkbox.checked !== true){
          checkbox.checked = true
        }
      }
      switch (true) {

        case classNameCheck('list--category'):
            this.setState({ category: {...this.state.category, [e.target.value]: {} } })
        break;
        
        case classNameCheck('list--subcategory'):
          var category = parentCheckbox(e.target.parentNode.parentNode).value
          var subcategory = parentCheckbox(e.target.parentNode).value
          
          console.log(category)
          console.log(subcategory)
          checkboxCheck(parentCheckbox(e.target.parentNode.parentNode))
          
          this.setState({ category: {
            ...this.state.category, [category]:{
              ...this.state.category[category], [subcategory]:[
                ]
              } 
            } 
          })
        break;
            
        case classNameCheck('list--listitem'):
          console.log(parentCheckbox(e.target.parentNode.parentNode.parentNode).value)
          category = parentCheckbox(e.target.parentNode.parentNode.parentNode).value
          subcategory = parentCheckbox(e.target.parentNode.parentNode).value
          console.log(`category ${category}`)
          console.log(`subcategory ${subcategory}`)
          let listitem = e.target.value;
          
          checkboxCheck(parentCheckbox(e.target.parentNode.parentNode))
          checkboxCheck(parentCheckbox(e.target.parentNode.parentNode.parentNode))

          // if(this.state.category[category][subcategory]){
          //     this.setState({ category: {
          //     ...this.state.category, [category]: {
          //       ...this.state.category[category], [subcategory]:[
          //         ...this.state.category[category][subcategory], e.target.value
          //         ]
          //       } 
          //     } 
          //   })
          //   return
          // }
          this.setState({ category: {
            ...this.state.category, [category]:{
              ...this.state.category[category], [subcategory]:[
                e.target.value
                ]
              } 
            } 
          })
        break;
        }

      //THIS REMOVES CHECK AND E.TARGET.VALUE FROM STATE
      // else{
      //   this.setState({[stateKey]: this.state[stateKey].filter(item => item !== e.target.value)})
      // }
    }
    //****************************************************************************************************
    //THIS METHOD DYNAMICALLY CREATES THE MENU 
    makeCategories = () => {
      let result = categories.map((category, index) => {
        // console.log(category)
        let subcategories = Object.keys(navData[category]).map(subcategory => {
          // console.log(navData[category][subcategory])
          let listitems = navData[category][subcategory].map((listitem, index) => {
            return(
              <li key={`${listitem, index}`} className="list--listitem list-group-item">
                <input type="checkbox" value={listitem} id={listitem} onChange={(e) => {this.onCheck(e, 'listitem')}} />
                <span>{listitem}</span>  
              </li>
            )
          })
          return(
            <ul key={subcategory} value={subcategory} className="list--subcategory list-group list-group-item">
              <input type="checkbox" value={subcategory} onChange={(e) => {this.onCheck(e, 'subcategory')}} />
              <span>{subcategory}</span>
              {listitems}
            </ul>
          )
        })
    return(
      <div key={category} label={category} className="list-group">
        <ul value={category} className="list--category"> <input type="checkbox" value={category} onChange={(e) => {this.onCheck(e, 'category')}} /> <span>{category}</span>
        {subcategories}
        </ul>
      </div>
    )
  })
  return result
    }

  render(){
    return(
      <div>
        <div>
          <JsonPreview category={Object.keys(this.state.category)} 
              subcategory={Object.keys(this.state.category)} 
              listitem={[this.state.listitem]} />
        </div>
        <div className="container">
          {this.makeCategories()}
        </div>
      </div>
    )
  }
}

// function App() {
//   return (

//   )
// }

// export default App;

// category: {
//   medium: {
//     graphics: [cg, print],
//     photo: [],
//   public: {}
//   }


{/* <div value="medium">
  <div><input type="checkbox"/></div>
  <div category="graphics">
    <form><input type="checkbox" /></form>
    <div category="listitem">
      <form><input/></form>
    </div>
  </div>
</div> */}