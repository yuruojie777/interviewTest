import React from 'react';
import './Pagination.css';
export const Pagination = ({perPage, total, paginate}) => {


    const pageNumber = [];

    for(let i = 1; i <= Math.ceil(total / perPage); i ++) {
        pageNumber.push(i);
    }
    

  return (
    <nav  className='pagination'>
        <b>Page</b>
        {pageNumber.map(number => 
            <li className='nav-list' key={number}>
                <a href='!#' onClick={()=>paginate(number)}>{number}</a>
            </li>)}
    </nav>
  )
}
