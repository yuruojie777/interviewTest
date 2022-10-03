import './SideBar.scss';
import 'boxicons';
const SideBar = ()=>{
    return(
        <div className="sidebar">
            <ul>
                <li><a><box-icon name='home-alt-2' type='solid' color='#f9f5f5' ></box-icon></a></li>
                <li><a><box-icon name='message-rounded-dots' color='#f9f5f5' ></box-icon></a></li>
                <li><a><box-icon name='user-pin' type='solid' color='#f9f5f5' ></box-icon></a></li>
            </ul>
        </div>
    )
}

export default SideBar;