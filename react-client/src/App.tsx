import React, { useContext } from 'react';
import './App.css';
import logo from './connect-browser.svg';
import { IOConnectContext } from '@interopio/react-hooks';

function App() {

    const io = useContext(IOConnectContext);

    (window as any).io = io;

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit "react-client/src/App.tsx" and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://docs.interop.io/browser/getting-started/what-is-io-connect-browser/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn io.Connect Browser
                </a>
            </header>
        </div>
    );
}

export default App;
