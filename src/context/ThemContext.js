import React, { useState } from "react";

export const ThemeContext = React.createContext();

export default function TechContext() {
    const [darkTheme, setDarkTheme] = useState(true);

    function toggleTheme() {
        setDarkTheme(preDarkTheme=>!preDarkTheme);
    }

    return (
        <>
            <ThemeContext.Provider value={darkTheme}>
                <button onClick={toggleTheme}>Toggle Theme</button>
                <Tech/>
            </ThemeContext.Provider>
        </>
    )
}