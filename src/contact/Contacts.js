import React, {useEffect, useState} from 'react';
import { ContactCard } from './ContactCard';
import './css/Contacts.css';
import { Pagination } from './Pagination';
import { UserModal } from './UserModal';
export const Contact = ()=>{

    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(5);

    useEffect(()=>{
        const fetchUsers = async () => {
            await fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => {return res.json();})
            .then((res) => {setUsers(res); setLoading(false)})
            .catch((exp) => {console.error(exp);})
        } 

        fetchUsers();
    }, []);



    const currentUsers = users.slice((currentPage-1) * perPage, currentPage * perPage);

    const paginate = (pageNumber)=> {
        setCurrentPage(pageNumber);
    }

    return (
        <>
            <div className='contact-container'>
                <h1 style={{fontFamily:'sans-serif', textAlign:'center'}}>{loading?'Loading...':'Contact'}</h1>
                {
                    currentUsers.map(
                        (user) => {
                            return (
                                <li key={user.id} >
                                    <ContactCard user={user} onSelectUser={(e) => setCurrentUser(e)}/>
                                </li>
                            )
                        }
                    )
                }
                <div>
                    <Pagination perPage={perPage} total={users.length} paginate={paginate}/>
                </div>
                
            </div>
            {(!loading)?<UserModal user={currentUser}/>:<></>}
        </>
    )
}