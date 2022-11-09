import React, { useContext } from 'react';
import './App.css';
import { GlueContext } from '@glue42/react-hooks';

function App() {

    const glue = useContext(GlueContext);

    (window as any).glue = glue;

    return (
        <div className="App">
            <header className="App-header">
                <img src="./logo512.png" className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://core-docs.glue42.com/getting-started/what-is-glue42-core-plus/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn Glue42 Core Plus
                </a>
            </header>
        </div>
    );
}

export default App;
