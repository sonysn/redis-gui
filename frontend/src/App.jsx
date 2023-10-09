import { useEffect, useState } from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import { Greet, TestWailsNet } from "../wailsjs/go/main/App";

function App() {
    const [resultText, setResultText] = useState("Please enter your name below 👇");
    const [name, setName] = useState('');
    const updateName = (e) => setName(e.target.value);
    const updateResultText = (result) => setResultText(result);
    const [sCode, sCodeText] = useState('');
    const updateResCode = (result) => sCodeText(result);

    function greet() {
        Greet(name).then(updateResultText);
    }

    function url() {
        TestWailsNet().then(updateResCode);
    }

    return (
        <div id="App">
            <img src={logo} id="logo" alt="logo" />
            <div id="result" className="result">{resultText}</div>
            <div id="input" className="input-box">
                <input id="name" className="input" onChange={updateName} autoComplete="off" name="input" type="text" />
                <button className="btn" onClick={greet}>Greet</button>
                <button className="btn" onClick={url}>Check</button>
            </div>
            <div id="result" className="result">{sCode}</div>
        </div>
    )
}

export default App
