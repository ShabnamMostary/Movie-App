import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Heading from "./components/Heading"
import MovieList from "./components/MovieList";
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState('');
const getMovieRequest = async () => {
  const url = 'http://www.omdbapi.com/?s=star wars&apikey=8c76283b';
  const response = await fetch(url);
  const responseJson = await response.json();
  console.log(responseJson)
  //search property of responseJson object
  setMovies(responseJson.Search)

}
useEffect(()=>{
  getMovieRequest();
})
return (
  <div className="container-fluid movie-app">
    <div className="row">
     <Heading heading={"Movies"}/>
    </div>
  <div className='row'> <MovieList movies={movies}/> </div>
  </div>
);
};

export default App;
