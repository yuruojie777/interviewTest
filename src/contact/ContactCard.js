import { Avatar } from '@mui/material';
import './css/ContactCard.css';
export const ContactCard = (props)=> {

    function handleOnClick(e) {
        e.preventDefault();
        console.log(JSON.stringify(props.user));
        let modal = document.getElementById("modal");
        modal.style.display = 'block';
        props.onSelectUser(props.user);
    }

    return (
        <div className="contact-card">
            <hr/>
            <Avatar sx={{width: 25, height:25}} alt={props.user.name} style={{float: 'left', marginRight:'1em'}}></Avatar>
            <span className="name" onClick={handleOnClick}>{props.user.name}</span>
        </div>
    )
}