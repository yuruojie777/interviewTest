import React, { useEffect } from 'react'
import './Dashboard.scss'
export const Dashboard = () => {




    function getArray(length) {
        const list = [];
        for(let i = 1; i <= length; i ++) {
            list.push(i);
        }
        // console.log(list);
        return list;
    }




  return (
    <div className='dashboard-container'>
        {getArray(50).map((i,index)=>{return <li key={index}>{i}</li>})}
    </div>
  )
}
