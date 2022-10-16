import './ChatBox.scss';
import {useState,useRef, useEffect} from 'react';
import { collection, setDoc, doc, query, onSnapshot, where, getDocs } from "firebase/firestore"; 
import {db} from '../firebase/Firebase';

  
const ChatBox = (props)=>{
    
    const [currentMessage, setCurrentMessage] = useState('');
    const [message, setMessage] = useState([]);
    const [friends, setFriends] = useState([]);
    const [chatTo, setChatTo] = useState('');
    const chatListRef = useRef(null);

    async function sendMessage(e){
        e.preventDefault();
        if(currentMessage.length === 0) return;


        // setMessage(old=>[...old, {text:currentMessage,from_email:props.currentUser.email}]);
        document.querySelector('.input-box').value = '';
        const messageRef = doc(collection(db, 'message'));
        await setDoc( messageRef,
            {text: currentMessage, from_email: props.currentUser.email, to_email: chatTo, createtime: new Date()}
        );

        setCurrentMessage('');
    }


    function HandleClickChatButton(){
        const chatBox = document.querySelector('.chatbox-container');
        if(chatBox.classList.contains('show')) chatBox.classList.remove('show');
        else chatBox.classList.add('show');
        
    }

    // function getUserProfile(email, list){
    //     const q = query(collection(db, "message"), where("email", "==", email));
    //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //         querySnapshot.forEach((doc) => {
    //             list.push(doc.data());
    //         });
    //     });
    // }


    async function getUserFriend() {
        //Get currentUserInfo
        
        let friends = [];
        const usersRef = collection(db, "user");
        const q = query(usersRef, where("email", "==", props.currentUser.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            friends = (doc.data().friends);
        });

        return friends
    }


    async function getFriendInfo(friends) {
        const info_list = [];
        const friendsRef = collection(db, "user");
        const q = query(friendsRef, where("email", "in", friends))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            info_list.push(doc.data());
        })
        return info_list;

    }

    useEffect(()=>{
        getUserFriend().then(
            (data)=>{
                setChatTo(data[0])
                if(data.length !== 0) getFriendInfo(data).then(
                    (friends)=>{
                        setFriends(friends);
                    }
                )
            }
        )
    },[])




    // Load from messages
    useEffect(()=>{
        const q = query(collection(db, "message"), where("from_email", "==", props.currentUser.email));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messages = [];
            querySnapshot.forEach((doc) => {
                messages.push(doc);
            });
            setMessage(prev=>[...prev, ...messages]);
        });

        return unsubscribe;
    },[])


    // Load to messages
    useEffect(()=>{
        const q = query(collection(db, "message"), where("to_email", "==", props.currentUser.email));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messages = [];
            querySnapshot.forEach((doc) => {
                messages.push(doc);
            });
            setMessage(prev=>[...prev, ...messages]);
        });

        return unsubscribe;
    },[])


    useEffect(() => {
        const current = chatListRef.current;
        current.scrollTop = current.scrollHeight;
    }, [message]);


    function compare( a, b ) {
        if ( a.createtime < b.createtime ){
          return -1;
        }
        if ( a.createtime > b.createtime ){
          return 1;
        }
        return 0;
      }


      function uniqueArr(arr){
        let map = new Map();
        const result = []
        for(let i=0; i<arr.length; i++){
            if(!map.has(arr[i].id)){
                map.set(arr[i].id, arr[i].data());
                result.push(arr[i].data())
            }
        }
        return result;
      }



    function renderMessage(messages, chatTo){
        // console.log(messages);
        const msgList = uniqueArr(messages).filter((message)=>{return message.from_email===chatTo||message.to_email===chatTo})
        return msgList
    }


    return (
        <div className="chatbox-container" onTouchMove={e=>{e = e.originalEvent || e;if(e.scale > 1) e.preventDefault();}}>
            
            <div className='chat-title'>
                {/* {friends[0]===undefined?'':<img src={friends[0].avatar}></img>}
                <h3>{friends[0]===undefined?'':friends[0].username}</h3> */}
                <img src={friends[0]!==undefined?friends.find((friend)=>friend.email===chatTo).avatar:''}></img>
                <h3>{friends[0]!==undefined?friends.find((friend)=>friend.email===chatTo).username:''}</h3>
                <div className='min-bar' onClick={HandleClickChatButton}>
                    <span></span>
                </div>
            </div>
            <div className='chat-screen' ref={chatListRef}>
                {renderMessage(message, chatTo).sort(compare).map(
                    (item, index)=>{
                        return (
                            item.from_email===props.currentUser.email
                            ?<li className='message right' key={index}><p>{item.text}</p></li>
                            :<li className='message left' key={index}><p>{item.text}</p></li>
                        )
                    }
                )}
            </div>
            <div className='input-container'>
                <form onKeyDown={e=>{if(e.key === 'Enter') {
                    sendMessage(e);
                    document.querySelector('.input-box').value = '';
                }}}>
                    <textarea className='input-box' onChange={e=>setCurrentMessage(e.target.value)} disabled={friends.length===0}></textarea>
                    <button type='submit' onClick={e=>sendMessage(e)}><box-icon name='send' color='white'></box-icon></button>
                </form>
            </div>
            <div className='friend-side-bar'>
                <h2>Friend List</h2>
                <ul>
                    {friends.length!==0?friends.map(((friend, index)=>{return (
                        <li key={index} onClick={e=>{console.log(friend.email);setChatTo(friend.email)}}>
                            <img src={friend.avatar}></img>
                            <p>{friend.username}</p>
                        </li>
                    )})):'You have no friends in your list'}
                </ul>
            </div>
        </div>
    )
    
}

export default ChatBox;