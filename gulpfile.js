const { series, parallel } = require("gulp");
const spawn = require("child_process").spawn;
const copyFile = require("node:fs/promises").copyFile;
const rimraf = require("rimraf");

const clients = ["workspace-platform/", "react-client/"];

const installAllDeps = (client) => async () => {
    return new Promise((resolve, reject) => {
        console.log(`Installing dependencies in ${client}`);

        spawn("npm", ["install"], { cwd: `${client}`, stdio: "inherit", shell: true }).on("close", resolve).on("error", reject);
    });
};

const clearNodeModules = (client) => () => {
    return new Promise((resolve, reject) => {
        rimraf(`./${client}/node_modules/*`, (err) => {
            console.log(`Deleting: ./${client}/node_modules/*`);

            if (err) {
                return reject(err);
            }

            console.log(`Deleted: ./${client}/node_modules/*`);
            resolve()
        });
    });
};

const copyPlatformConfig = async () => {
    await copyFile("./config.json", "./workspace-platform/src/config.json");
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

exports.bootstrap = series(
    parallel(clients.map((client) => clearNodeModules(client))),
    parallel(clients.map((client) => installAllDeps(client))),
    copyPlatformConfig
);

exports.build = parallel(clients.map((client) => buildProdApp(client)));

exports.start = parallel(clients.map((client) => startApp(client)));

exports.updateConfig = series(
    copyPlatformConfig
);