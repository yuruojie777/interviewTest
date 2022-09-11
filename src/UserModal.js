import CloseIcon from '@mui/icons-material/Close';
import './UserModal.css';
export const UserModal = (props)=>{

    function onClose(e) {
        let modal = document.getElementById('modal');
        modal.style.display = 'none';
    }


    return(
        <div id='modal' className='modal'>

            <div className='modal-diag'>
                <div className='topBar'>
                    <div className='close' id='close' onClick={(e) => onClose(e)}><CloseIcon/></div>
                </div>
                <span style={{fontWeight: 'bolder'}}>{props.user.name}</span>
                <div className="modal-content" style={{clear: 'both'}}>
                    <label style={{fontWeight:'bold'}}>Username: </label><span>{props.user.username}</span><br/>
                    <label style={{fontWeight:'bold'}}>Email: </label><span>{props.user.email}</span><br/>
                    <label style={{fontWeight:'bold'}}>Tel: </label><span>{props.user.phone}</span><br/>
                    <label style={{fontWeight:'bold'}}>Addr: </label>
                    <span>
                        {[props.user.address.street,props.user.address.suite,props.user.address.city,props.user.address.zip].join(" ")}
                    </span><br/> 
                    <label style={{fontWeight:'bold'}}>Company: </label><span>{props.user.company.name}</span><br/>
                    <label style={{fontWeight:'bold'}}>Website: </label><a target='_blank' rel="noreferrer" href={'http://'+props.user.website}>{props.user.website}</a><br/>
                    <button className="updateBtn" style={{float: 'left', marginTop: '1em'}}>Save</button>
                    <button className="deleteBtn" style={{float: 'right', marginTop: '1em'}}>Delete</button>
                </div>
            </div>
        </div>
    )
}