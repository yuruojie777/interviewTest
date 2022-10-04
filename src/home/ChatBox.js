import './ChatBox.scss';
const ChatBox = ()=>{

    const username = '小土豆';

    const chatHistory = [
        {'message':'hello!','userid':1},
        {'message':'早上好呀','userid':2},
        {'message':'今天中午吃什么？今天中午吃什么？今天中午吃什么？今天中午吃什么？今天中午吃什么？今天中午吃什么？今天中午吃什么？今天中午吃什么？今天中午吃什么？今天中午吃什么？','userid':1},
        {'message':'不知道呀','userid':2},
        {'message':'我也不到','userid':1}
    ]

    return(
        <div className="chatbox-container">
            <h3 className='chat-title'>{username}</h3>
            <div className='chat-screen'>
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
                <textarea className='input-box'></textarea>
                <button><box-icon name='send' color='white'></box-icon></button>
            </div>
        </div>
    )
}

export default ChatBox;