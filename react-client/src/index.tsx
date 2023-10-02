import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { IOConnectProvider } from '@interopio/react-hooks';
import IOBrowser from "@interopio/browser";
import IOWorkspaces from '@interopio/workspaces-api';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <IOConnectProvider settings={{
            browser: {
                config: { libraries: [IOWorkspaces] },
                factory: IOBrowser
            }
        }}>
            <App />
        </IOConnectProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
