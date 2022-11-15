const { series, parallel } = require("gulp");
const spawn = require("child_process").spawn;
const copyFile = require("node:fs/promises").copyFile;
const rimraf = require("rimraf");
const path = require("path");

const clientsSources = ["workspace-platform/", "react-client/"];
const builtClients = ["intents-resolver-ui/"];

const installAllDeps = (client) => async () => {
    return new Promise((resolve, reject) => {
        console.log(`Installing dependencies in ${client}`);

        spawn("npm", ["install"], { cwd: `${client}`, stdio: "inherit", shell: true }).on("close", resolve).on("error", reject);
    });
};

const clearNodeModules = (client) => () => {
    return new Promise((resolve, reject) => {

        const node_modulesPath = path.join(__dirname, client, "node_modules", "*");

        console.log(`Deleting: ${node_modulesPath}`);

        rimraf(node_modulesPath, (err) => {

            if (err) {
                return reject(err);
            }

            console.log(`Deleted: ${node_modulesPath}`);

            resolve()
        });
    });
};

const copyPlatformConfig = async () => {
    await copyFile(path.join(__dirname, "config.json"), path.join(__dirname, "workspace-platform", "src", "config.json"));
};

const buildProdApp = (client) => async () => {
    return new Promise((resolve, reject) => {
        console.log(`Building prod bundle of ${client}`);

        spawn("npm", ["build"], { cwd: `${client}`, stdio: "inherit", shell: true }).on("close", resolve).on("error", reject);
    });
};

const startApp = (client) => async () => {
    return new Promise((resolve, reject) => {
        console.log(`Starting ${client}`);

        spawn("npm", ["start"], { cwd: `${client}`, stdio: "inherit", shell: true }).on("close", resolve).on("error", reject);
    });
};

const startBuildClient = (client) => async () => {
    return new Promise((resolve, reject) => {
        console.log(`Starting ${client}`);

        spawn("http-server", [`${client}`, "-p", "4221"], { stdio: "inherit", shell: true }).on("close", resolve).on("error", reject);
    });
};

exports.bootstrap = series(
    parallel(clientsSources.map((client) => clearNodeModules(client))),
    parallel(clientsSources.map((client) => installAllDeps(client))),
    copyPlatformConfig
);

exports.build = parallel(clientsSources.map((client) => buildProdApp(client)));

exports.start = parallel(
    ...clientsSources.map((client) => startApp(client)),
    ...builtClients.map((client) => startBuildClient(client))
);

exports.updateConfig = series(
    copyPlatformConfig
);