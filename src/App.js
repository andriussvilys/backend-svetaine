import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './css/main.css';

const navData = require('./JSON/navigation.json');
const categories = Object.keys(navData);

export default class App extends Component{

  constructor(props){
    super(props);

    this.state = {
      subcategories: () => {
        let result = categories.map(item => Object.keys(navData[item]))
        return result
      },

      // makeSubcategories: () => {
      //   let result = navData[]
      // },

      makeCategories: () => {
          let result = categories.map((category, index) => {
            console.log(category)
            let subcategories = Object.keys(navData[category]).map(subcategory => {
              console.log(navData[category][subcategory])
              let listitems = navData[category][subcategory].map((listitem, index) => {
                return(
                  <li key={`${listitem, index}`} className="list--listitem list-group-item">
                    <input type="checkbox" value={listitem} />
                    <span>{listitem}</span>  
                  </li>
                )
              })
              return(
                <ul key={subcategory} value={subcategory} className="list--subcategory list-group list-group-item">
                  <input type="checkbox" value={subcategory} />
                  <span>{subcategory}</span>
                  {listitems}
                </ul>
              )
            })
        return(
          <div key={category} label={category} className="list--category list-group">
            <ul> <input type="checkbox" value={category} /> <span>{category}</span>
            {subcategories}
            </ul>
          </div>
        )
      })
      return result
      }
    }
    console.log(this.state.subcategories())
    console.log(navData)
    console.log(categories)
    }

  render(){
    return(
      <div className="container">
        {this.state.makeCategories()}
      </div>
    )
  }
}

// function App() {
//   return (

//   )
// }

// export default App;
