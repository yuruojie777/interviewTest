import './SideBar.scss';
import 'boxicons';
const SideBar = ()=>{

    

    function HandleClickChatButton(e){
        const chatBox = document.querySelector('.chatbox-container');
        const friend_list = document.querySelector('.friend-container');
        if(chatBox.classList.contains('show')) chatBox.classList.remove('show');
        else if(friend_list.classList.contains('show')) {
            friend_list.classList.remove('show');
            chatBox.classList.add('show');
        }
        else chatBox.classList.add('show');
    }


    function HandleClickAddFriendButton(e){
        const chatBox = document.querySelector('.chatbox-container');
        const friend_list = document.querySelector('.friend-container');
        if(friend_list.classList.contains('show')) friend_list.classList.remove('show');
        else if(chatBox.classList.contains('show')){
            chatBox.classList.remove('show');
            friend_list.classList.add('show');
        }
        else friend_list.classList.add('show');
    }


    return(
        <div className="sidebar">
            <ul>
                <li><a href='/'><box-icon name='home-alt-2' type='solid' color='#f9f5f5' ></box-icon></a></li>
                <li onClick={HandleClickChatButton}><a><box-icon name='message-rounded-dots' color='#f9f5f5' ></box-icon></a></li>
                <li onClick={HandleClickAddFriendButton}><a><box-icon name='user-pin' type='solid' color='#f9f5f5' ></box-icon></a></li>
            </ul>
        </div>
    )
}

export default SideBar;