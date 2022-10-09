import './ChatBox.scss';
import {useState,useRef, useEffect} from 'react';
import { collection, setDoc, doc, query, orderBy, onSnapshot, where } from "firebase/firestore"; 
import {db} from '../firebase/Firebase';

  
const ChatBox = (props)=>{

    const chatTo = props.currentUser.displayName ==='Ruojie'?'miguojuanjuan@gmail.com':'yuruojie@gmail.com';
    const [currentMessage, setCurrentMessage] = useState('');
    const [message, setMessage] = useState([]);
    const [friends, setFriends] = useState([]);
    const chatListRef = useRef(null);

    async function sendMessage(e){
        e.preventDefault();
        if(currentMessage.length === 0) return;


        setMessage(old=>[...old, {text:currentMessage,from_email:props.currentUser.email}]);
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

    function getUserProfile(email, list){
        const q = query(collection(db, "message"), where("email", "==", email));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                list.push(doc.data());
            });
        });
    }



    useEffect(()=>{
        function getFriendList(){
            const q = query(collection(db, "user"), where("email", "==", props.currentUser.email));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.data().friends.forEach((friend)=>{
                        const q = query(collection(db, "user"), where("email", "==", friend));
                        const unsubscribe = onSnapshot(q, (querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                setFriends(prev=>[...prev,doc.data()]);
                            });
                        });
                    })
                });
            });
        }

        return getFriendList();
    },[])



    useEffect(()=>{
        const q = query(collection(db, "message"), orderBy("createtime"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messages = [];
            querySnapshot.forEach((doc) => {
                messages.push(doc.data());
            });

            setMessage([...messages]);
        });
    },[])

    useEffect(() => {
        const current = chatListRef.current;
        current.scrollTop = current.scrollHeight;
    }, [message]);





    return (
        <div className="chatbox-container" onTouchMove={e=>{e = e.originalEvent || e;if(e.scale > 1) e.preventDefault();}}>
            <div className='chat-title'>
                <img src={friends[0]===undefined?'':friends[0].avatar}></img>
                <h3>{friends[0]===undefined?'':friends[0].username}</h3>
                <div className='min-bar' onClick={HandleClickChatButton}>
                    <span></span>
                </div>
            </div>
            <div className='chat-screen' ref={chatListRef}>
                {message.map(
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
                    <textarea className='input-box' onChange={e=>setCurrentMessage(e.target.value)}></textarea>
                    <button type='submit' onClick={e=>sendMessage(e)}><box-icon name='send' color='white'></box-icon></button>
                </form>
            </div>
        </div>
    )
    
}

export default ChatBox;