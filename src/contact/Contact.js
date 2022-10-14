import React, { useEffect, useState } from 'react'
import './Contact.scss';
import { collection, setDoc, addDoc, doc, query, onSnapshot, where, getDocs, updateDoc, runTransaction, arrayUnion} from "firebase/firestore"; 
import {db} from '../firebase/Firebase';

export const Contact = (props) => {


    const [email, setEmail] = useState('');
    const [user, setUser] = useState();
    const [friendRequest, setfriendRequest] = useState([]);
    const [confirmLoading, setConfirmLoading] = useState(false);


    async function searchUser(e){
        e.preventDefault();
        const searchRef = collection(db, "user");
        const q = query(searchRef, where("email", "==", email))
        try{
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(element => {
                setUser(element.data());
            });
        } catch{
            console.error('Failed to get search result!');
        }
    }






    function HandleClickMinButton(){
        const searchBox = document.querySelector('.friend-container');
        if(searchBox.classList.contains('show')) searchBox.classList.remove('show');
        else searchBox.classList.add('show');
        
    }


    async function HandleAddFriend(to){
        await setDoc(doc(db, "request", (props.currentUser.email+to).replaceAll('@','').replaceAll('.','')), 
            {
                from: props.currentUser.email,
                to: to,
                result: 0,
                createtime: new Date()
            }
        );
    }


    async function confirmRequest(email){
        setConfirmLoading(true);
        console.log('confirm!'+email)
        setfriendRequest(friendRequest.filter((friend)=>{return friend.from!==email}))
        //set request status = 1
        const requestRef = doc(db, "request",(email+props.currentUser.email).replaceAll('@','').replaceAll('.',''));
        try{
            await updateDoc(requestRef, {
                result: 1
            });
        } catch{
            console.error('Failed to delete!');
        }
        //add request email to friend list

        //add self email to request friend list

        try {
            await runTransaction(db, async (transaction) => {
              
              const fromRef = doc(db, 'user', email);
              const toRef = doc(db, 'user', props.currentUser.email)
              const fromDoc = await transaction.get(fromRef);
              const toDoc = await transaction.get(toRef);
              if (!fromDoc.exists() || !toDoc.exists()) {
                throw "Document does not exist!";
              }
              transaction.update(fromRef, { friends: arrayUnion(props.currentUser.email) });
              transaction.update(toRef, { friends: arrayUnion(email) });
            });
            console.log("Transaction successfully committed!");
            setConfirmLoading(false);
        } catch (e) {
            console.log("Transaction failed: ", e);
        }
    }

    async function deleteRequest(email){
        console.log('delete!'+email)
        // console.log()

        setfriendRequest(friendRequest.filter((friend)=>{return friend.from!==email}))
        const requestRef = doc(db, "request",(email+props.currentUser.email).replaceAll('@','').replaceAll('.',''));
        try{
            await updateDoc(requestRef, {
                result: 2
            });
        } catch{
            console.error('Failed to delete!');
        }
        // setfriendRequest(friendRequest=>{friendRequest.filter((friend)=>{return friend.email!==email})})
        //set request status = 2
    }



    function requestStatus(request) {
        if(request.result === 0) return (
            <div className='btn-group'>
                <button className='confirm-btn' value={request.from} onClick={e=>confirmRequest(e.target.value)}>Confirm</button>
                <button className='delete-btn' value={request.from} onClick={e=>deleteRequest(e.target.value)}>Delete</button>
            </div>
        )
        if(request.result === 1) return (
            <label>{confirmLoading?'Loading...':<box-icon name='check' color='#0bf70a' ></box-icon>}</label>
        )
        else return(
            <label><box-icon name='x' color='#f72a0a' ></box-icon></label>
        )
    }


      //Listen friend request
    
      useEffect(()=>{
        const q = query(collection(db, "request"), where("to", "==", props.currentUser.email));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const request = [];
            querySnapshot.forEach((doc) => {
                request.push(doc.data());
            });
            setfriendRequest([...request]);
        });
      },[])




  return (
    <div className='friend-container'>
        <div className='search-title'>
            <h2>Search your friend here!</h2>
            <div className='min-bar' onClick={HandleClickMinButton}>
                <span></span>
            </div>
        </div>

        <form onSubmit={e=>searchUser(e)}>
            <input placeholder="Input Your Friend's Email" onChange={e=>setEmail(e.target.value)}></input>
            <button type='submit'><box-icon name='search' color='#f3efef' ></box-icon></button>
        </form>
        <ul>
            <li style={{background:'black', padding:'0.2rem', userSelect: 'none'}}>
                <span>Username</span>
                <span>Email</span>
                <span>Action</span>
            </li>
            
            {
                user!==undefined?
                <li>
                    <span>{user.username}</span>
                    <span>{user.email}</span>
                    <div className='btn-group'>
                        <button className='clear-btn' onClick={e=>setUser(user=> undefined )}>Clear</button>
                        <button className='add-btn' disabled={user.email === props.currentUser.email} value={user.email} onClick={e=>HandleAddFriend(e.target.value)}>Add</button>
                    </div>
                    
                </li>:
                <p>No result found</p>
            }
        </ul>

        <div className='request-box'>
            <ul>
                {friendRequest.map((request, index)=>{return (
                    <li key={index}>
                        <p><span>{request.from}</span> wants to add you</p>
                        {
                            requestStatus(request)
                        }
                    </li>
                )})}
            </ul>
        </div>
    </div>
  )
}
