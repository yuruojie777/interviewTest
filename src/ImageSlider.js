import { useEffect } from 'react';
import './ImageSlider.scss';
const ImageSlider = ()=> {



    const autoSilde = ()=>{
        let count = 1;
        setInterval(
            ()=>{
                document.getElementById('radio'+count).checked = true;
                count++;
                if(count == 4) count = 1;
            },
            5000
        )
    }

    // autoSilde();

    const imageList = [

    ]

    return (
        <div id='image-container'>
            <div className="slider">
                <div className="slides">
                    <input type="radio" name="radio-btn" id="radio1"/>
                    <input type="radio" name="radio-btn" id="radio2"/>
                    <input type="radio" name="radio-btn" id="radio3"/>
                    <input type="radio" name="radio-btn" id="radio4"/>

                    <div className="slide first">
                        <img src="https://img.seadn.io/files/755a84acf11005ef7d9dee0d60f066b1.jpg?auto=format&fit=max&w=512" alt=""></img>
                    </div>
                    <div className="slide">
                        <img src="https://img.seadn.io/files/f055335de6904e719954d91dca68da57.jpg?auto=format&fit=max&w=512" alt=""></img>
                    </div>
                    <div className="slide">
                        <img src="https://img.seadn.io/files/639391389c035a5eeb4981189c9b0efa.jpg?auto=format&fit=max&w=512" alt=""></img>
                    </div>
                    <div className="slide">
                        <img src="https://img.seadn.io/files/b6f40781eba2b747cd06feab95b25345.jpg?auto=format&fit=max&w=512" alt=""></img>
                    </div>

                    <div className="naviagtion-auto">
                        <div className="auto-btn1"></div>
                        <div className="auto-btn2"></div>
                        <div className="auto-btn3"></div>
                        <div className="auto-btn4"></div>
                    </div>

                    <div className="navigation-manual">
                        <label htmlFor="radio1" className="manual-btn"></label>
                        <label htmlFor="radio2" className="manual-btn"></label>
                        <label htmlFor="radio3" className="manual-btn"></label>
                        <label htmlFor="radio4" className="manual-btn"></label>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ImageSlider;