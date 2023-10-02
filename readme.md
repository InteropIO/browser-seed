# IO.Connect Browser Seed Project

This is a fully configured [**io.Connect Browser+**](https://glue42.com/core-plus/) project consisting of multiple apps.

If you are unfamiliar with the [**io.Connect**](https://glue42.com/) products and their features, use this project to experience some of the io.Connect features without having to set up or configure a complex environment.

This setup is also an ideal starting point if you are a web developer looking to experiment, build a PoC, a demo or even eventually release into production a multi-app [**io.Connect Browser+**](https://glue42.com/core-plus/) project. Configuring the environment and initializing the libraries has already been taken care of, and what's left for you is to enjoy building awesome apps!

*See also the **io.Connect Browser+** [official documentation](https://core-docs.glue42.com/getting-started/what-is-glue42-core-plus/index.html).*

## Project Overview

Once you start the project, open a browser window at `http://localhost:3000`. The window will load a io.Connect [Workspaces App](https://core-docs.glue42.com/capabilities/windows/workspaces/workspaces-app/index.html) with a single [Workspace](https://core-docs.glue42.com/capabilities/windows/workspaces/overview/index.html#workspaces_concepts-workspace) containing the following apps:

- On the left is a standard io.Connect enabled app built with Create React App - the ideal starting point for React developers.
- On the right is a group of three tabs - the io.Connect documentation, a [Context Viewer](https://docs.glue42.com/developers/dev-tools/index.html#context_viewer) and an [Interop Viewer](https://docs.glue42.com/developers/dev-tools/index.html#interop_viewer) apps. The Context Viewer and the Interop Viewer are developer tool apps from [**io.Connect Desktop**](https://glue42.com/enterprise/) and are extremely useful when developing, testing or debugging io.Connect apps with extensive [Interop](https://core-docs.glue42.com/capabilities/data-sharing-between-apps/interop/index.html) or [Shared Contexts](https://core-docs.glue42.com/capabilities/data-sharing-between-apps/shared-contexts/index.html) functionalities.

The Workspaces App acts as a [io.Connect Browser Platform](https://core-docs.glue42.com/developers/core-concepts/web-platform/overview/index.html) (or "Main app") for this [**io.Connect Browser+**](https://glue42.com/core-plus/) project.

This is a fully unlocked and functioning [**io.Connect Browser+**](https://glue42.com/core-plus/) project - the user is free to add new apps to the Workspace, create a new Workspace, save it, move the apps around or even extract them into standalone windows.

React developers can immediately get started with extending the standard CRA app and use the Interop Viewer and the Context Viewer apps to monitor how their io.Connect enabled apps are registering methods and streams or manipulating contexts.

## Getting Started

*Note that to run this project, you must provide a valid license key for [**io.Connect Browser**](https://glue42.com/core-plus/). For more details, see the [Configuration > Licensing](#licensing) section.*

To launch the project, clone this repo and execute the following commands:

```cmd
npm install
npm run bootstrap
npm start
```

The `npm run bootstrap` command will install all dependencies for all apps. Each app in the project is deliberately self-sufficient so that it can be easily extracted and deployed on its own or placed in a different environment.

The `npm start` command will launch all development servers - one for each app. This will simulate more accurately a real-life environment where your [**io.Connect Browser+**](https://glue42.com/core-plus/) project will contain many apps deployed at different origins.

## Configuration

The only required configuration to be able to run the project is to provide a valid license key for [**io.Connect Browser+**](https://glue42.com/core-plus/). To obtain a license token, contact the io.Connect Sales team at `licensing@interop.io`. You can also add configurations for new apps, for [connecting to the io.Manager](https://core-docs.glue42.com/capabilities/connectivity-to-glue42-server/index.html), or for [connecting to io.Connect Desktop](https://core-docs.glue42.com/capabilities/connectivity-to-enterprise/index.html).

All configuration options are located in one place - in the `config.json` file at top level of the repo. When you update the configuration file, run the following command in order for the changes to take effect:

```cmd
npm run updateConfig
```

It isn't necessary to restart the project with the `npm start` command, because the development servers will auto-detect the change and reload any running apps.

### Licensing

When you receive your [**io.Connect Browser**](https://glue42.com/core-plus/) license token, open the `config.json` file and paste the token string in the `"licenseKey"` field:

```json
{
    "corePlusPlatform": {
        "licenseKey": "my-license-token"
    }
}
```

If the license key is invalid or missing, the project will load a blank screen and will throw errors in the browser console describing the issue.

### Adding Apps

To add already deployed apps to the project, open the `config.json` file and add [app definitions](https://core-docs.glue42.com/capabilities/application-management/index.html#app_definitions) for them to the `"local"` array under the `"applications"` key:

```json
{
    "browserPlatform": {
        "applications": {
            "local": [
                {
                    "name": "My New App",
                    "type": "window",
                    "title": "My New App Title",
                    "details": {
                        "url": "http://my-new-app.com/"
                    },
                    "customProperties": {
                        "includeInWorkspaces": true
                    }
                }
            ]
        }
    }
}
```

*Note that the `"includeInWorkspaces"` flag signals the [**io.Connect Browser**](https://glue42.com/core-plus/) environment that this app must be visible in the list of apps when the user clicks the `+` icon in the Workspace to add a new app.*

Once you add the definition, your app will become part of the [**io.Connect Browser**](https://glue42.com/core-plus/) environment and you can use the [App Management API](https://core-docs.glue42.com/capabilities/application-management/index.html) to launch it and manipulate it as a standalone window, or use the [Workspaces API](https://core-docs.glue42.com/capabilities/windows/workspaces/workspaces-api/index.html) to join it to a Workspace and manipulate it as a Workspace window.

*For details on how to add new client apps by adding their source code to this project, see the [How to Add New Clients](#add-new-clients) section.*

### Connecting to io.Manager

A [**io.Connect Browser**](https://glue42.com/core-plus/) project can [connect to a deployed io.Manager](https://core-docs.glue42.com/capabilities/connectivity-to-glue42-server/index.html) instance. To enable connection to an io.Manager instance, open the `config.json` file and add the necessary configuration details using the `"server"` key:

```json
{
    "browserPlatform": {
        "server": {
            "url": "https://my-glue42-server.com:4081/api",
            "auth": {
                "basic": {
                    "username": "username",
                    "password": "password"
                }
            },
            "fetchIntervalMS": 10000,
            "tokenRefreshIntervalMS": 15000,
            "critical": true
        }
    }
}
```

*For more details on configuring a connection to an io.Manager instance, see the [Connectivity to io.Manager](https://core-docs.glue42.com/capabilities/connectivity-to-glue42-server/index.html) documentation.*

### Connecting to io.Connect Desktop

A [**io.Connect Browser**](https://glue42.com/core-plus/) project can be configured to constantly check for the presence of a locally installed [**io.Connect Desktop**](https://glue42.com/enterprise/) project. If such an instance is discovered, the [**io.Connect Browser**](https://glue42.com/core-plus/) project will attempt to switch its io.Connect connection to [**io.Connect Desktop**](https://glue42.com/enterprise/). If this operation is successful, the [**io.Connect Browser**](https://glue42.com/core-plus/) clients will be able to fully interoperate with all [**io.Connect Desktop**](https://glue42.com/enterprise/) clients.

To enable this functionality, go to the `config.json` file and add the necessary configuration details using the `"connection"` key:

```json
{
    "browserPlatform": {
        "connection": {
            "preferred": {
                "url": "ws://localhost:8385/gw",
                "discoveryIntervalMS": 10000
            }
        }
    }
}
```

*For more details on configuring a connection to [**io.Connect Desktop**](https://glue42.com/enterprise/), see the [Connectivity to io.Connect Desktop](https://core-docs.glue42.com/capabilities/connectivity-to-enterprise/index.html) documentation.*

### Other Configuration Options

[**io.Connect Browser**](https://glue42.com/core-plus/) supports all available configuration options for a [io.Connect Browser Platform](https://core-docs.glue42.com/developers/core-concepts/web-platform/setup/index.html#configuration) app. You can provide any of these options under the `"browserPlatform"` property in the `config.json` file.

## How to...

### Extend the React Client

The `/react-client` directory contains the source code of the app which appears in the left side of the Workspace. This is the standard bootstrapped project that comes with the standard Create React App. The only addition is the initialization of the [io.Connect Browser](https://core-docs.glue42.com/reference/core/latest/glue42%20web/index.html) library, which connects this [io.Connect Browser Client](https://core-docs.glue42.com/developers/core-concepts/web-client/overview/index.html) to the [**io.Connect Browser**](https://glue42.com/core-plus/) environment. React developers can immediately start extending this simple app with the required business logic.

### Add New Clients

The [Configuration > Adding Apps](#adding-apps) section shows how to easily add an already deployed app to the [**io.Connect Browser**](https://glue42.com/core-plus/) environment by providing only its URL. You can also add the source code of your app to this seed project and take advantage of the development environment that has already been set up.

To do this, create a new directory - e.g., `/my-other-app`, place the source code there and make sure that the app is completely self-sufficient: it must have its own `package.json` file, a valid `"start"` command for hosting the app at some port, and a `"build"` command that produces a build ready for deployment.

Open the `gulpfile.js` file, locate the `clients` array at the top of the file, and add to the array the path to the source code of your app:

```javascript
const { series, parallel } = require("gulp");
const spawn = require("child_process").spawn;
const copyFile = require("node:fs/promises").copyFile;
const rimraf = require("rimraf");
const path = require("path");

const clients = ["workspace-platform/", "react-client/", "my-other-app/"];
```

Now, every time you execute an `npm run bootstrap` command from the base project directory, the development environment will clear the `node_modules` directory of your app, and will run a fresh `npm install` in it. Similarly, when executing an `npm start` command from the base project directory, the environment will run the `"start"` command defined in the `package.json` file of your app.

### io.Connect Enable Your Apps

Every web app can be a [io.Connect Browser Client](https://core-docs.glue42.com/developers/core-concepts/web-client/overview/index.html) in a [**io.Connect Browser**](https://glue42.com/core-plus/) project. A Client is any web app which has initialized one of the io.Connect packages and has connected to a running [**io.Connect Browser**](https://glue42.com/core-plus/) environment. To io.Conect enable your web app, you can use the following io.Connect packages which provide all available io.Connect functionalities:

- [`@interopio/browser`](https://www.npmjs.com/package/@interopio/browser) - a JavaScript package. For more details on using the package in your apps, see the [io.Connect Browser Client > JavaScript](https://core-docs.glue42.com/developers/core-concepts/web-client/javascript/index.html) documentation.

- [`@interopio/react-hooks`](https://www.npmjs.com/package/@interopio/react-hooks) - a React package based on React hooks. For more details on using the package in your apps, see the [io.Connect Browser Client > React](https://core-docs.glue42.com/developers/core-concepts/web-client/react/index.html) documentation.

- [`@interopio/ng`](https://www.npmjs.com/package/@interopio/ng) - an Angular package. For more details on using the package in your apps, see the [io.Connect Browser Client > Angular](https://core-docs.glue42.com/developers/core-concepts/web-client/angular/index.html) documentation.

*For more examples on using the libraries and the io.Connect APIs, see also the [Tutorials](https://core-docs.glue42.com/tutorials/javascript/index.html) section of the [**io.Connect Browser**](https://glue42.com/core/) documentation.*

### Customize the Workspaces App

The [Workspaces App](https://core-docs.glue42.com/capabilities/windows/workspaces/workspaces-app/index.html) is the visual orchestrator of this seed project and it's extremely customizable - from simple visual modifications using CSS to adding custom React components in it. For more details on how to do that, see the [Workspaces > Workspaces App](https://core-docs.glue42.com/capabilities/windows/workspaces/workspaces-app/index.html) section of the [**io.Connect Browser**](https://glue42.com/core/) documentation.

## FAQ

### Can't Extract an App from the Workspace

Extracting an app from the Workspace involves opening this app in a standalone window as a browser popup. Every modern browser requires an explicit permission from the user to allow the given origin to open popups. If this prompt is ignored or declined, then the [**io.Connect Browser**](https://glue42.com/core-plus/) environment won't be able to open standalone windows and therefore the user won't be able to extract apps from the Workspace. Sometimes browsers will "assume" the user won't allow popups, because they have declined popups many times before for other origins. In this situation, the only visual aid is a small red icon to the right of the address bar of the Workspaces Frame - clicking on it will open the permission prompt.