import './ChatBox.scss';
import {useState,useRef, useEffect} from 'react';

// initialize firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, setDoc, doc, query, orderBy, onSnapshot} from "firebase/firestore"; 


const firebaseConfig = {
  apiKey: "AIzaSyAxsKt9f2cpo8MM243ZuOT_QZ_jKmmlpdU",
  authDomain: "test-for-yuruojie.firebaseapp.com",
  projectId: "test-for-yuruojie",
  storageBucket: "test-for-yuruojie.appspot.com",
  messagingSenderId: "547159601573",
  appId: "1:547159601573:web:1a19221d336a867a6b784c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


  
const ChatBox = (props)=>{

    const username = props.currentUser.username;
    const chatTo = props.currentUser.username==='Ruojie'?'miguojuanjuan@gmail.com':'yuruojie@gmail.com';
    const [currentMessage, setCurrentMessage] = useState('');
    const [message, setMessage] = useState([])
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


    function HandleClickChatButton(e){
        const chatBox = document.querySelector('.chatbox-container');
        if(chatBox.classList.contains('show')) chatBox.classList.remove('show');
        else chatBox.classList.add('show');
        
    }

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
                <img src='https://avatars.dicebear.com/api/male/john.svg?background=%230000ff'></img>
                <h3>{username}</h3>
                <div className='min-bar' onClick={e=>HandleClickChatButton(e)}>
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