import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import searchicon from '../../assets/images/search-icon.png';
import './search.scss'
const Search = () => {

  const history = useHistory();

  const [keyword, setKeyword] = useState('');

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (keyword) {
      history.push(`/products/${keyword}`);
    }
    else {
      history.push('/products');
    }

  };
  return (
    <React.Fragment>
      <form className='nav__searchbar' onSubmit={searchSubmitHandler}>
        <input className="searchfield"
          type="text"
          placeholder="Searching for ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit" className='searchicon'>
          <img alt='iconimg' className='iconimg' src={searchicon}></img>
        </button>

      </form>
    </React.Fragment>
  );
}

export default Search