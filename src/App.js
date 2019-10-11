import React, {Component} from 'react';
import './App.css';
import {recipes} from './tempList';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';

class App extends Component {
  state = {
    recipes: recipes,
    url: "https://www.food2fork.com/api/search?key=19010e89d75c956040b48172bcd1a5e2",
    details_id: 35384,
    pageIndex: 1
  };

  async getRecipes(){

    try {
      const data = await fetch(this.state.url);
      const jsonData = await data.json();

      this.setState({
        recipes:jsonData.recipes
      });
    } catch (error) {
        console.log(error);
    }
}


componentDidMount(){
  this.getRecipes();
}

dispalyPage = (index) => {
  switch(index){
    default:
    case 1:
    return <RecipeList recipes = {this.state.recipes} handleDetails={this.handleDetails
    } />;
    case 0:
    return <RecipeDetails id= {this.state.details_id} handleIndex={this.handleIndex} />;
  }
};

handleIndex = index => {
  this.setState({
    pageIndex: index
  });
};

handleDetails = (index,id) => {
  this.setState({
    pageIndex: index,
    details_id: id
  });
};

  render(){
    //console.log(this.state.recipes);

    return (
      <React.Fragment>
        {this.dispalyPage(this.state.pageIndex)}
      </React.Fragment> 
    );
  }
}
export default App;
