import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

const Homepage = ({handleLogout, userTheme, setUserTheme}) => {

    const [searchInput, setsearchInput] = useState("");
    const [state, setState] = useState({recipe: {}, view: 'Fresh', movies: {}, drink: {}});
    const [dietChoice, setdietChoice] = useState("");
    const [recipeInstructions, setrecipeInstructions] = useState([]);
    const [excludedIngredients, setexcludedIngredients] = useState("");
    const [theme, setTheme] = useState(userTheme);
    
    
  
    const handleThemeChange = (e) => {
        
    
      setTheme((s) => {
        return !s;
      })
      setUserTheme((s) => {
          return !s;
      })
      
    }
  
  
    const getRecipes = async (event) => {
      event.preventDefault();
  
      let randomOffset = Math.floor(Math.random() * 100);
      if (searchInput === '') {
        alert('Empty Search');
        return;
      } else {
        const param = {query: searchInput, number: 1, diet: dietChoice, excludeIngredients: excludedIngredients, offset: randomOffset};
        const rooturl = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search';
  
        const options = {
          method: 'GET',
          url: rooturl,
          params: param,
          headers: {
            'x-rapidapi-key': '2a7ed19adamsha33b413aee93b98p1bb071jsn66a8d8868452',
            'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
          }
        };
        
        let result = await axios(options);
        //console.log(result)
        console.log(result.data);
        console.log(result.data.results);
        let recipe;
        recipe = result.data.results;
        //console.log(recipe);
        console.log(recipe)
        setState(() => {
          return {recipe: recipe, view: 'Searched'};
        })
        
      }
  
      
    }
  
    const handleRefresh = (event) => {
      event.preventDefault();
      setState(() => {
        return {recipe: {}, view: 'Fresh', movies: {}, drink: {}}
      })
      setsearchInput("");
      setdietChoice("");
      setexcludedIngredients("");
      
    }
  
    const handleDietChange = (e) => {
      setdietChoice(e.target.value);
    }
  
    const handleInstructions =  async (e) => {
      e.preventDefault();
      const param = {stepBreakdown: true};
      const rootURL = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${state.recipe[0]['id']}/analyzedInstructions`;
      const instruction = {
        method: 'GET',
        url: rootURL,
        params: param,
        headers: {
          "x-rapidapi-key": "2a7ed19adamsha33b413aee93b98p1bb071jsn66a8d8868452",
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
        }
      }
  
  
      let result = await axios(instruction);
      console.log(result);
      //let instructions;
      //instructons = result.data;
      let i;
      i = result.data;
      setrecipeInstructions(i);
      console.log(i);
      setState((prevState) => {
        return {recipe: prevState.recipe, view: 'InstructionView'}
      })
      
  
    }
  
    
  
    const getDrink = async (e) => {
      e.preventDefault();
      
      const rootURL = "https://the-cocktail-db.p.rapidapi.com/random.php"
      const restCall = {
        method: 'GET',
        url: rootURL,
        
        headers: {
          "x-rapidapi-key": "2a7ed19adamsha33b413aee93b98p1bb071jsn66a8d8868452",
            "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com"
          
        }
      }
  
      let result = await axios(restCall);
      console.log(result);
      let k;
      k = result.data.drinks;
      console.log(k)
      setState(() => {
        return {recipe: {}, view: 'Drink', movies: {}, drink: k};
      })
      
  
    }
  
  
    const getMovies = async (event) => {
      event.preventDefault();
      let randomPage = Math.floor(Math.random() * 200);
      const param = {type: "get-random-movies", page: randomPage}
      const rootURL = "https://movies-tvshows-data-imdb.p.rapidapi.com/";
      const call = {
        method: 'GET',
        url: rootURL,
        params: param,
        headers: {
          'x-rapidapi-key': '2a7ed19adamsha33b413aee93b98p1bb071jsn66a8d8868452',
          'x-rapidapi-host': 'movies-tvshows-data-imdb.p.rapidapi.com'
        }
      };
  
      let result = await axios(call);
      console.log(result);
      let holder;
      holder = result.data.movie_results;
      console.log(holder);
      setState(() => {
        return {recipe: {}, view: "Movie", movies: holder};
      })
      
    }
  
    
  
    let curView;
  
    if (state.view === 'Fresh' && theme === true) {
      curView = (
        <div className="app">
          <div className="header">
            <h2 className="logo">Date Create</h2>
            <button className="themeButton" type="button" onClick={handleThemeChange}>Change Theme</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="stepOne">
            <h2>Step 1: Find A Recipe To Cook</h2>
            <h5>Get a random recipe based on your search criteria</h5>
            <form className="searchbox" onSubmit={getRecipes}>
              <input className="inputbox" type="text" placeholder="Search by Ingredients or Food Type"
              value={searchInput} onChange={(e) => setsearchInput(e.target.value)}>
              </input>
              <input className="searchButton" type="submit" value="Search">
              </input>
              <div className="selectors">
              <select
                value={dietChoice}
                onChange={handleDietChange}
                className="dropdown"
              >
                <option value="">No Special Diet Option</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="pescetarian">Pescetarian</option>
                <option value="lacto vegetarian">Lacto-Vegetarian</option>
                <option value="vegan">Vegan</option>
              </select>
              <input
              type="text" placeholder="List Ingredients You Don't Like (separate with ,)"
              value={excludedIngredients} onChange={(e) => setexcludedIngredients(e.target.value)}
              className="excluded"
              >
              </input>
          
          
              </div>
            </form>
          </div>
          <div className="steptwo">
            <h2>Step 2: Find A Cocktail Recipe</h2>
            <h5>Get a random cocktail recipe to make in your home</h5>
            <div>
              <form
              className="drinksearch" onSubmit={getDrink}
              >
                
                <input className="searchButton" type="submit" value="Search Drink"></input>
              </form>
            </div>
          </div>
          <div className="stepthree">
            <h2>Step 3: Find A Movie To Watch</h2>
            <h5>Get a list of 20 random movies to choose from</h5>
            <button className="movieButton" type="button" onClick={getMovies}>Search For Movies</button>
          </div>
        </div>
      )
    }  else if (state.view === 'Fresh' && theme === false) {
      curView = (
        <div className="app_dark">
        <div className="header">
          <h2 className="logo">Date Create</h2>
          <button className="themeButton" type="button" onClick={handleThemeChange}>Change Theme</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className="stepOne_dark">
          <h2>Step 1: Find A Recipe To Cook</h2>
          <h5>Get a random recipe based on your search criteria</h5>
          <form className="searchbox" onSubmit={getRecipes}>
            <input className="inputbox_dark" type="text" placeholder="Search by Ingredients or Food Type"
            value={searchInput} onChange={(e) => setsearchInput(e.target.value)}>
            </input>
            <input className="searchButton_dark" type="submit" value="Search">
            </input>
            <div className="selectors">
            <select
              value={dietChoice}
              onChange={handleDietChange}
              className="dropdown_dark"
            >
              <option value="">No Special Diet Option</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="pescetarian">Pescetarian</option>
              <option value="lacto vegetarian">Lacto-Vegetarian</option>
              <option value="vegan">Vegan</option>
            </select>
            <input
            type="text" placeholder="List Ingredients You Don't Like (separate with ,)"
            value={excludedIngredients} onChange={(e) => setexcludedIngredients(e.target.value)}
            className="excluded_dark"
            >
            </input>
        
        
            </div>
          </form>
        </div>
        <div className="steptwo_dark">
          <h2>Step 2: Find A Cocktail Recipe</h2>
          <h5>Get a random cocktail recipe to make in your home</h5>
          <div>
            <form
            className="drinksearch" onSubmit={getDrink}
            >
              
              <input className="searchButton_dark" type="submit" value="Search Drink"></input>
            </form>
          </div>
        </div>
        <div className="stepthree_dark">
          <h2>Step 3: Find A Movie To Watch</h2>
          <h5>Get a list of 20 random movies to choose from</h5>
          <button className="movieButton_dark" type="button" onClick={getMovies}>Search For Movies</button>
        </div>
      </div>
      )
    
    } else if (state.view === 'Searched' && theme === true) {
      curView = (
        <div className="recipeView">
          <h2>Try this Recipe</h2>
          <button className="refreshButton" type="button" onClick={handleRefresh}>Create New Search</button>
          <div className="recipeCard1">
            <h4>{state.recipe[0]['title']}</h4>
            <p className="recipeText">Recipe Servings: {state.recipe[0]['servings']}</p>
            <p className="recipeText">Ready in {state.recipe[0]['readyInMinutes']} min</p>
            <button className="instructionButton" type="button" onClick={handleInstructions}>Get Recipe Now!</button>
          </div>
        </div>
      )
    } else if (state.view === 'Searched' && theme === false) {
      curView = (
        <div className="recipeView_dark">
          <h2>Try this Recipe</h2>
          <button className="refreshButton_dark" type="button" onClick={handleRefresh}>Create New Search</button>
          <div className="recipeCard1_dark">
            <h4>{state.recipe[0]['title']}</h4>
            <p className="recipeText">Recipe Servings: {state.recipe[0]['servings']}</p>
            <p className="recipeText">Ready in {state.recipe[0]['readyInMinutes']} min</p>
            <button className="instructionButton" type="button" onClick={handleInstructions}>Get Recipe Now!</button>
          </div>
        </div>
      )
    
    } else if (state.view === "InstructionView" && theme === true) {
      curView = (
        <div>
          <h3>Here is your recipe's instrutions...</h3>
          <div>
            
          </div>
          <div>
            <ol>
            {recipeInstructions[0].steps.map((s) => (
              <li key={s.number}>{s.step}</li>
              
            ))}
            </ol>
          </div>
          
          <button type="button" onClick={handleRefresh}>Find New Recipe</button>
          
        </div>
      )
    } else if (state.view === 'InstructionView' && theme === false) {
      curView = (
        <div className="instructionview_dark">
          <h3>Here is your recipe's instrutions...</h3>
          <div>
            
          </div>
          <div>
            <ol>
            {recipeInstructions[0].steps.map((s) => (
              <li key={s.number}>{s.step}</li>
              
            ))}
            </ol>
          </div>
          
          <button className="refreshButton_dark"type="button" onClick={handleRefresh}>Find New Recipe</button>
          
        </div>
      )
    
  
    } else if (state.view === 'Movie' && theme === true) {
      curView = (
        <div>
          <div className="movieButtons">
            <button className="movieToHome" type="button" onClick={handleRefresh}>Go Back</button>
            <button className="movieNewSet"type="button" onClick={getMovies}>Get New Movies</button>
            <h2 className="logoMovie">Date Create</h2>
          </div>
          {state.movies.map((item) => (
            <div className="movieCard">
              <h4>{item.title}</h4>
              <div className="movieInfo">
                <p>Release Year: {item.year}</p>
                <p>IMDB rating: {item.imdb_rating}</p>
                <p>Movie Length: {item.runtime} minutes</p>
              </div>
            </div>
          ))}
          <div className="movieButtons">
            <button className="movieToHome" type="button" onClick={handleRefresh}>Go Back</button>
            <button className="movieNewSet"type="button" onClick={getMovies}>Get New Movies</button>
          </div>
        </div>
      )
    } else if (state.view === 'Movie' && theme === false) {
      curView = (
        <div className="movieview_dark">
          <div className="movieButtons">
            <button className="movieToHome_dark" type="button" onClick={handleRefresh}>Go Back</button>
            <button className="movieNewSet_dark"type="button" onClick={getMovies}>Get New Movies</button>
            <h2 className="logoMovie">Date Create</h2>
          </div>
          {state.movies.map((item) => (
            <div className="movieCard">
              <h4>{item.title}</h4>
              <div className="movieInfo">
                <p>Release Year: {item.year}</p>
                <p>IMDB rating: {item.imdb_rating}</p>
                <p>Movie Length: {item.runtime} minutes</p>
              </div>
            </div>
          ))}
          <div className="movieButtons">
            <button className="movieToHome_dark" type="button" onClick={handleRefresh}>Go Back</button>
            <button className="movieNewSet_dark"type="button" onClick={getMovies}>Get New Movies</button>
          </div>
        </div>
      )
    
    } else if (state.view === 'Drink' && theme === true) {
      curView = (
        <div className="drinkView">
          <h2 className="drinkTitle">{state.drink[0]["strDrink"]}</h2>
          <div>
            <h4><u>Cocktail Recipe:</u></h4>
            <p className="drinkrecipe">{state.drink[0]["strInstructions"]}</p>
          </div>
          <div className="drinkIngredients">
            <h4><u>Ingredients:</u></h4>
            <ul>
              <li>{state.drink[0]["strIngredient1"]}</li>
              <li>{state.drink[0]["strIngredient2"]}</li>
              <li>{state.drink[0]["strIngredient3"]}</li>
              <li>{state.drink[0]["strIngredient4"]}</li>
              <li>{state.drink[0]["strIngredient5"]}</li>
              <li>{state.drink[0]["strIngredient6"]}</li>
              <li>{state.drink[0]["strIngredient7"]}</li>
            </ul>
          </div>
          <div className="drinkButtons">
            <button className="drinkNew" type="type" onClick={getDrink}>Get New Drink</button>
            <button className="drinkHome" type="type" onClick={handleRefresh}>Go Back Home</button>
          </div>
          
  
        </div>
      )
    } else if (state.view === 'Drink' && theme === false) {
      curView = (
        <div className="drinkView_dark">
          <h2 className="drinkTitle">{state.drink[0]["strDrink"]}</h2>
          <div>
            <h4 className="cocktail_dark"><u>Cocktail Recipe:</u></h4>
            <p className="drinkrecipe_dark">{state.drink[0]["strInstructions"]}</p>
          </div>
          <div className="drinkIngredients_dark">
            <h4><u>Ingredients:</u></h4>
            <ul>
              <li>{state.drink[0]["strIngredient1"]}</li>
              <li>{state.drink[0]["strIngredient2"]}</li>
              <li>{state.drink[0]["strIngredient3"]}</li>
              <li>{state.drink[0]["strIngredient4"]}</li>
              <li>{state.drink[0]["strIngredient5"]}</li>
              <li>{state.drink[0]["strIngredient6"]}</li>
              <li>{state.drink[0]["strIngredient7"]}</li>
            </ul>
          </div>
          <div className="drinkButtons">
            <button className="drinkNew_dark" type="type" onClick={getDrink}>Get New Drink</button>
            <button className="drinkHome_dark" type="type" onClick={handleRefresh}>Go Back Home</button>
          </div>
          
  
        </div>
      )
    }
  
    return (
      <div>
        {curView}
      </div>
    );
}

export default Homepage;
