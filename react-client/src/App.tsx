import React, { useContext } from 'react';
import './App.css';
import logo from './core-plus-symbol.svg';
import { GlueContext } from '@glue42/react-hooks';

function App() {

    const glue = useContext(GlueContext);

    (window as any).glue = glue;

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit "react-client/src/App.tsx" and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://core-docs.glue42.com/getting-started/what-is-glue42-core-plus/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn Glue42 Core+
                </a>
            </header>
        </div>
    );
}

export default App;
