import React from 'react';

const Movielist = ({movies}) => {

  return (
    <>
    {movies.map((movie) => (
      <div className='d-flex justify-content-start m-3'>
        <img src={movie.Poster} alt='movie'></img>
      </div>
    ))}
  </>
  )
}
export default Movielist;
