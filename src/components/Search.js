import React from 'react';

const Search = ({value,setter})=>{
  return (
    <div className='col col-sm-4'>
      <input 
          className="form-control" 
          value={value}
          onChange={event => setter(event.target.value)} 
          placeholder="Type to search">
      </input>
    </div>
  )
}
export default Search