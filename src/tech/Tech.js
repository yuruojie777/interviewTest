import { useContext, useState } from 'react';
import './Tech.scss';
import { ThemeContext } from './TechContext';
export const Tech = ()=>{

    const [darkMode, setDarkMode] = useState(false);
    const darkTheme = useContext(ThemeContext);
    const themeStyle = {
        backgroundColor: darkMode?'#333':'#ccc',
        // color: darkTheme?'#ccc':'#333',
    }

    const headStyle = {
        color: darkMode?'white':'black'
    }


    const changeBackgroundColor = (e)=>{
        e.preventDefault();
        setDarkMode(!darkMode);
    }


    // return(
    //     <ThemeContext.Consumer>
    //         {darkTheme => {
                return (
                    <div className="tech-container" style={themeStyle}>
                        <h1 style={headStyle}>Tech</h1>
                        <button onClick={e=>{changeBackgroundColor(e)}}>Change the background color</button>
                    </div>
                )
        //     }}
        // </ThemeContext.Consumer>
    // )
}