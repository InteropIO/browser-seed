# Glue42 Core Plus Seed Project

This project is a fully configured multi-app [**Glue42 Core Plus**](https://core-docs.glue42.com/getting-started/what-is-glue42-core-plus/index.html) environment and it servers two main purposes.

First, people unfamiliar with Glue42 and our products, can quickly launch the project and experience some of the Glue42 features without wasting time configuring a complex setup.

Second, this is an ideal starting point for web developers looking to experiment, build a PoC, a demo or even go production with a multi-app Glue42 Core Plus project. We have already did the boring part - setting up the configs and initializing the libraries, and now the devs can do the fun stuff - build awesome products.

## Project Overview

Once the project is started, open a browser window at `http://localhost:3000`. You will be presented with a single Glue42 Workspace Frame, containing a single Workspace with the following applications:
- On the right side: a Glue42-enabled standard Create-React-App application - the ideal starting point for React developers.
- On the left side: a group of three applications. The first one is our documentation, the second one is our Enterprise-level `Context Viewer` and the last one is our Enterprise-level `Interop Viewer`. Both applications are a great help when developing Glue42 applications containing heavy `Interop` and `Contexts` logic.

This is a fully unlocked and functioning Glue42 Core Plus project, meaning the user is free to add new applications to the Workspace, create a new Workspace, save it, move the apps around or event extract them into standalone windows.

React developers can immediately get started in extending the standard CRA application and use the `Interop Viewer` and the `Context Viewer` apps to make sure that their apps are correctly registering methods, streams, updating or getting contexts.

## Getting Started

Launching the project as simple as cloning this repo and executing the following commands:

```cmd
npm i
npm run bootstrap
npm start
```

- `npm run bootstrap` will make sure to install all dependencies in all of the applications. Each application in the project is deliberately self-sufficient so that it can easily be extracted and deployed on its own or placed in a different environment.

- `npm start` will launch all development servers - one for each application. This is done so that it accurately simulates a real-life environment where your Glue42 Core Plus system will contain many applications deployed at different origins.

## Configuration

The only configuration required to run the project is to add your license key for Glue42 Core Plus, because it requires a license token to initialize. Please contact Glue42 Sales team at licensing@glue42.com to obtain a license token.

All of the configuration is located in one place - the `./config.json` file. 

Once you have changed the config file, you need to run this command in order for the change to go into effect:

```cmd
npm run updateConfig
```

It is not necessary to re-start the `npm start` command, because the development servers should auto-detect the change and reload any running apps.

### Licensing

Once you have received your Glue42 Core Plus license token, you need to open the `./config.json` file and paste the token string in the `"licenseKey"` field:

```json
{
    "corePlusPlatform": {
        "licenseKey": "", // paste your token here
        "workspaces": {
            "src": "/",
            "isFrame": true
        },
    ...
}
```

If you try to run the project with an invalid or missing license key, you will be presented with a blank screen and there will be errors in the dev-tools console describing the issue.

### Adding Applications

Adding more applications to this project cannot be easier. All you need to do is open the `./config.json`, locate the local applications array and add your application definition like this:

```json
{
    "corePlusPlatform": {
    ...
        "applications": {
         "local": [
            ...
             {
                 "name": "My New App",
                 "type": "window",
                 "title": "My new app title",
                 "details": {
                     "url": "http://my-new-app.com/"
                 },
                 "customProperties": {
                     "includeInWorkspaces": true
                 }
             },
             ...
        }
}
```

The `includeInWorkspaces` flag signals to the Glue42 Core Plus system that this application should be visible in the list of apps when adding a new app from the `+` icon in the workspace.

Once you have added your new application definition, this app will be discoverable from our [**AppManager API**](https://core-docs.glue42.com/capabilities/application-management/index.html) and you are free to launch an instance as standalone window or as workspace window from the[**Workspaces API**](https://core-docs.glue42.com/capabilities/windows/workspaces/overview/index.html).

### Enabling Glue42 Server


Glue42 Core Plus is cable of connection and communication with a deployed [**Glue42 Server**](https://core-docs.glue42.com/capabilities/connectivity-to-glue42-server/index.html) instance. However, this is not enabled by default. To do so, you need to head over to the `./config.json` and add the details of your Glue42 Server instance:

```json
    "corePlusPlatform": {
    ...
        "server": {
            "url": "https://my-glue42-server.com:4081/api",
            "auth": {
                "basic": {
                    "username": "coreplususer",
                    "password": "1234"
                }
            },
            "critical": true,
            "fetchIntervalMS": 10000,
            "tokenRefreshIntervalMS": 15000
        }
}
```

The full configuration options when setting up and Glue42 Server connection are listed [**here**](https://core-docs.glue42.com/capabilities/connectivity-to-glue42-server/index.html) here.

### Enabling Glue42 Enterprise Discovery

Glue42 Core Plus can continuously search for a locally running Glue42 Enterprise instance. If a running Glue42 Enterprise instance is detected, Glue42 Core Plus can connect to it together with all of the client apps it currently has. This way your Glue42 Core Plus system can interop with Glue42 Enterprise apps and other locally installed applications like MS Excel. To enable this functionality go to `./config.json` and add the details of the Glue42 Enterprise instance:

```json
    "corePlusPlatform": {
    ...
        "connection": {
            "preferred": {
                "url": "ws://localhost:8385/gw",
                "discoveryIntervalMS": 10000
            }
        }
}
```

Head over to the full documentation of the [**Enterprise Connectivity**](https://core-docs.glue42.com/capabilities/connectivity-to-enterprise/index.html) for all configuration options and examples.

### Other Configuration Options

Glue42 Core Plus also supports all the available configuration options offered by the [**Glue42 Core Web Platform**](https://core-docs.glue42.com/developers/core-concepts/web-platform/setup/index.html#configuration). All of those can be place inside the `"corePlusPlatform"` property in `./config.json`;


## Extending the Project

### Extending the React Client
The `./react-client/` directory contains the source of the application which appears to the left side of the workspace. This source is the standard bootstrap project that comes with the standard Create React App. The only addition is the initialization of Glue42 Web, which connects the client to the Glue42 Core Plus environment. This means that any react dev should feel at home playing extending this simple application with whatever business logic is required.

### Adding new clients to the project

The configuration section show can any one can easily add an application to the Glue42 Core Plus environment. However, this application can either be already deployed, meaning you just provide the URL, or you can also add the source to this seed project and take advantage of the development environment that has already been set up.

All you need to do is create a new directory `./my-other-app`, place there your source and make sure that it is completely self-sufficient - meaning it has it's own package.json, valid `start` (should host the app at some port) and `build` (should provide a deploy-ready build) commands.

Next head over to `./gulpfile.js`, locate the `clients` array at the top of the file and add to the array the path to your source, something like that

```javascript
const { series, parallel } = require("gulp");
const spawn = require("child_process").spawn;
const copyFile = require("node:fs/promises").copyFile;
const rimraf = require("rimraf");
const path = require("path");

const clients = ["workspace-platform/", "react-client/", "my-other-app/"];
```

Now, every time you run `npm run bootstrap`, the dev environment will clear the `node_modules` in that directory and run a fresh `npm i`. Similarly, running `npm start` the environment will run the `start` command defined in that app's `package.json`. 

### Glue-enabling existing applications

Every web application can be a [**Glue42 Client**](https://core-docs.glue42.com/developers/core-concepts/web-client/overview/index.html). A Glue42 Client is any web application which has initialized one of our packages and has connected to a running Glue42 Core Plus instance. We have dedicated [**React package**](https://core-docs.glue42.com/developers/core-concepts/web-client/react/index.html), built on top of `react hooks`, there is also a dedicated [**Angular package**](https://core-docs.glue42.com/developers/core-concepts/web-client/angular/index.html), exposing a Glue42 Service and of course there is the standard [**JS package**](https://core-docs.glue42.com/developers/core-concepts/web-client/javascript/index.html), which is actually the foundation of the other. 

For those looking to for a more structured step-by-step exploration path, we have number of [**Tutorials**](https://core-docs.glue42.com/tutorials/javascript/index.html), which cover all of the major Glue42 APIs.

### Customizing workspace frame

The workspaces frame application is the visual orchestrator of this seed project and the best part of it is that is very customizable. Any developer can do simple changes like changing some colors in `.css` or going further and adding custom React components to the Workspaces Frame. We have a detailed explanation on what are the customization options for a [**Workspaces Frame App**](https://core-docs.glue42.com/capabilities/windows/workspaces/workspaces-app/index.html). 

## FAQ

### Cannot extract an app from the workspace

Extracting an app from the workspace involves opening this application in a standalone window as a browser popup. Every modern browser requires the explicit permission from the user to allow the given origin permission to open or block popups. If this prompt is ignored, not noticed or declined, then Glue42 Core Plus cannot open stand alone windows and therefore cannot extract apps from the Workspace. Sometimes the browsers will "assume" the user does not allow popups, because they have declined them many times before for other origins. In this situation the only visual aid is a small red icon to the right of the address bar of the Workspaces Frame, clicking on it will open the permission prompt.

