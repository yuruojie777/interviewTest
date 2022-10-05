import './ChatBox.scss';
import {useState,useRef, useEffect} from 'react';
const ChatBox = ()=>{

    const username = '小土豆';
    const [currentMessage, setCurrentMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([
        {'message':'hello!','userid':1},
        {'message':'早上好呀','userid':2},
        {'message':'今天中午吃什么？今天中午吃什么？今天中午吃什么？今天中午吃什么？今天中午吃什么？今天中午吃什么？今天中午吃什么？今天中午吃什么？今天中午吃什么？今天中午吃什么？','userid':1},
        {'message':'不知道呀','userid':2},
        {'message':'我也不到','userid':1},
        {'message':'你也不知道？','userid':2}
    ])

    const chatListRef = useRef(null);

    function sendMessage(e){
        e.preventDefault();
        if(currentMessage.length === 0) return;
        setChatHistory(old=>[...old, {message:currentMessage,userid:2}]);
        document.querySelector('.input-box').value = '';
        setCurrentMessage('');
    }


    useEffect(() => {
        const current = chatListRef.current;
        current.scrollTop = current.scrollHeight;
    }, [chatHistory]);

    return(
        <div className="chatbox-container" onTouchMove={e=>{e = e.originalEvent || e;if(e.scale > 1) e.preventDefault();}}>
            <h3 className='chat-title'>{username}</h3>
            <div className='chat-screen' ref={chatListRef}>
                {chatHistory.map(
                    (item, index)=>{
                        return (
                            item.userid===1
                            ?<li className='message left' key={index}><p>{item.message}</p></li>
                            :<li className='message right' key={index}><p>{item.message}</p></li>
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