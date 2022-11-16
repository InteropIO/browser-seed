import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GlueProvider } from "@glue42/react-hooks";
import Glue from "@glue42/desktop";
import Glue42CorePlus, { Glue42CorePlusConfig } from "@glue42/core-plus";
import GlueWorkspaces from "@glue42/workspaces-api";
import config from "./config.json";

ReactDOM.render(
  <React.StrictMode>
    <GlueProvider settings={{
      webPlatform: {
        config: Object.assign({}, config.corePlusPlatform, { glue: { libraries: [GlueWorkspaces] }, serviceWorker: { url: "/service-worker.js" } }) as Glue42CorePlusConfig,
        factory: Glue42CorePlus
      },
      desktop: {
        config: { libraries: [GlueWorkspaces], appManager: "skipIcons" },
        factory: Glue
      }
    }}>
      <App />
    </GlueProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
