import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Heading from './components/Heading'
import Search from  './components/Search'
import MovieList from './components/MovieList'
import AddFavorites from './components/AddFavorites'
import RemoveFavorites from './components/RemoveFavorites'
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState('');
  
  const getMovieRequest = async (searchValue) => {
  const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=8c76283b`;
  const response = await fetch(url);
  const responseJson = await response.json();
  //if searchValue is empty do not call setSearchValue
    if (responseJson.Search){
      //search property of responseJson object
      setMovies(responseJson.Search)
    } 
 }
 useEffect(()=>{
  getMovieRequest(searchValue);
  },[searchValue])
  
  const addFavoriteMovie = (movie)=> {
    const newFavoriteList = [...favorites, movie]
    setFavorites(newFavoriteList)
  }
  const removeFavoriteMovie = (movie)=>{
    const newFavoriteList = favorites.filter((favorite)=> favorite.imdbID !== movie.imdbID)
    setFavorites(newFavoriteList)
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
     <Heading heading={"Favorites"}/>
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
