import './Login.scss'
export const Login = ()=>{
    return(
        <div id='login-container'>
            <div className='title'>Login</div>
            <form className='form-group'>
                <div className="form">
                    <input type="text" id="email" className="form__input"
                    autoComplete="off" placeholder=' '/>
                    <label htmlFor="email" className="form__label">
                        Email
                    </label>
                </div>
                <div className="form">
                    <input type="password" id="password" className="form__input"
                    autoComplete="off" placeholder=' '/>
                    <label htmlFor="password" className="form__label">
                        Password
                    </label>
                </div>
                <div className="form">
                    <button type="submit" id="password" className="submit-btn">
                        Login
                    </button>
                </div>
            </form>
            {/* <div className='help'>
                <a href='help'>help?</a>
            </div> */}
        </div>
    )
}