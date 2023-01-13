import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GlueProvider } from "@glue42/react-hooks";
import Glue from "@glue42/desktop";
import Glue42CorePlus, { Glue42CorePlusConfig, Glue42WebPlatform } from "@glue42/core-plus";
import GlueWorkspaces from "@glue42/workspaces-api";
import { Glue42Web } from "@glue42/web";
import config from "./config.json";

const myControlInterceptionHandler = async (controlMessage: Glue42WebPlatform.ControlMessage, platform: Glue42WebPlatform.Plugins.PlatformControls): Promise<any> => {
    console.log("My totally custom notifications raise implementation");
    console.log("Received message:");
    console.log(controlMessage);

    // OPTIONAL calling the default implementation:
    const result = await platform.control({ ...controlMessage, settings: { skipInterception: true } });

    return result;
};

const myPluginStartFunc = async (glue: Glue42Web.API, config: any, platform: Glue42WebPlatform.Plugins.PlatformControls): Promise<void> => {

    const interceptionRequest: Glue42WebPlatform.Plugins.InterceptorRegistrationRequest = {
        callInterceptor: (config) => myControlInterceptionHandler(config, platform),
        interceptions: [
            { domain: "notifications", operation: "raiseNotification" }
        ]
    };

    await platform.interception.register(interceptionRequest);

};

const myNotificationsPlugin: Glue42WebPlatform.Plugins.PluginDefinition = {
    name: "notifications-interceptor",
    start: myPluginStartFunc,
    version: "1.0.0",
    config: {},
    critical: true
};

ReactDOM.render(
    <React.StrictMode>
        <GlueProvider settings={{
            webPlatform: {
                config: Object.assign({}, config.corePlusPlatform, {
                    glue: { libraries: [GlueWorkspaces] },
                    serviceWorker: { url: "/service-worker.js" },
                    plugins: {
                        definitions: [myNotificationsPlugin]
                    }
                }) as Glue42CorePlusConfig,
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
