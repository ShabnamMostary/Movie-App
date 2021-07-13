import React from 'react';

const Movielist = ({movies,favoriteComponent,favoriteHandler}) => {
  const Favorite = favoriteComponent
 
  return (
    <>
    {movies.map((movie) => (
      <div className='image-container d-flex justify-content-start m-3'>
        <img src={movie.Poster} alt='movie'></img>
        <div onClick={()=>favoriteHandler(movie)} className='overlay d-flex align-items-center justify-content-center'>
          <Favorite  />
        </div>
      </div>
    ))}
  </>
  )
}
export default Movielist;
