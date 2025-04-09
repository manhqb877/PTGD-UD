import React from "react";
import './DemoHead.css'
class DemoHead extends React.Component{
   

    render(){
        return(
            <>
              <h1>Chefify</h1>
              <input type="text" name="" id="" placeholder="What would you like to cook?" />
              <span>
                <ul>
                    <li>What to cook</li>
                    <li>Recipes</li>
                    <li>Ingredients</li>
                    <li>Occasions</li>
                    <li>About Us</li>
                </ul>
              </span>
              <button>Your Recipe Box</button>
            </>
        )
    }
}

export default DemoHead