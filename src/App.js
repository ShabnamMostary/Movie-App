import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Heading from './components/Heading'
import Search from  './components/Search'
import MovieList from './components/MovieList'
import AddFavorites from './components/AddFavorites'
import RemoveFavorites from './components/RemoveFavorites'
import './App.css';
require('dotenv').config()

const App = () => {
  const [movies, setMovies] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState('');
  
  const getMovieRequest = async (searchValue) => {
  const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;
  const response = await fetch(url);
  const responseJson = await response.json();
  
  //if searchValue is empty do not call setSearchValue
    if (responseJson.Search){
        const promises = responseJson.Search.map(async (movie) => {
        const urlMovie = `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;
        const result = await fetch(urlMovie);
        const resultJson = await result.json();
          return resultJson;
      });
      const movieResult = await Promise.all(promises);

      //search property of responseJson object
      setMovies(movieResult)
    } 
 }
  useEffect(()=>{
    getMovieRequest(searchValue);
    },[searchValue])
    
  useEffect (()=>{
      const movieFavorites = JSON.parse(localStorage.getItem('react-movie-app-favorites'))
      if (movieFavorites) {
        setFavorites(movieFavorites);}
      },[])


  const saveToLocalStorage =(items)=>{
    //Convert a JavaScript object into a string with JSON.stringify()
    localStorage.setItem('react-movie-app-favorites', JSON.stringify(items))
  }
  
  const addFavoriteMovie = (movie)=> {
    const FavoriteList = favorites.filter(
      (favorite) => favorite.imdbID === movie.imdbID
    );
    if (FavoriteList.length === 0){
    const newFavoriteList = [...favorites, movie]
    setFavorites(newFavoriteList)
    saveToLocalStorage(newFavoriteList)
    }
  }
  const removeFavoriteMovie = (movie)=>{
    const newFavoriteList = favorites.filter((favorite)=> favorite.imdbID !== movie.imdbID)
    setFavorites(newFavoriteList)
    saveToLocalStorage(newFavoriteList)
  }
return (
  <div className="container-fluid movie-app">
    <div className="row d-flex align-items-center mt-3 mb-3">
     <Heading heading={"Movies"}/>
     <Search value={searchValue} setter={setSearchValue}/>
    </div>
    <div className='row'> 
    <MovieList 
    movies={movies} 
    favoriteComponent={AddFavorites} 
    favoriteHandler={addFavoriteMovie}/> 
    </div>
    <div className="row d-flex align-items-center mt-3 mb-3">
     <Heading heading={"Favourites"}/>
    </div>
    <div className='row'> 
    <MovieList 
    movies={favorites} 
    favoriteComponent={RemoveFavorites} 
    favoriteHandler={removeFavoriteMovie}/> 
    </div>
  </div>
);
};

export default App;
