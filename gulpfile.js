const { series, parallel } = require("gulp");
const spawn = require("child_process").spawn;
const copyFile = require("node:fs/promises").copyFile;
const rimraf = require("rimraf");
const path = require("path");

const clientsSources = [
    "workspace-platform/",
    "react-client/",
    "salesforce-core-plus-demo/",
];
const builtClients = [
    {
        command: "http-server",
        args: ["intents-resolver-ui/", "-p", "4221"],
        id: "Intents Resolver UI",
    }
    ];

const originalStdoutWrite = process.stdout.write.bind(process.stdout);

process.stdout.write = (chunk, encoding, callback) => {
    if (chunk === '\x1B[2J\x1B[0f' || chunk === '\x1B[2J\x1B[3J\x1B[H') {
        return;
    }

    return originalStdoutWrite(chunk, encoding, callback);
};


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

        const child = spawn("npm", ["run", "build"], { cwd: `${client}`, shell: true }).on("close", resolve).on("error", reject);

        child.stdout.on('data', process.stdout.write);
    });
};

const startApp = (client) => async () => {
    return new Promise((resolve, reject) => {
        console.log(`Glue Starting ${client}`);

        const child = spawn("npm", ["start"], { cwd: `${client}`, shell: true }).on("close", resolve).on("error", reject);

        child.stdout.on('data', process.stdout.write);
    });
};

const startBuildClient = (clientCfg) => async () => {
    return new Promise((resolve, reject) => {
        console.log(`Glue Starting ${clientCfg.id}`);
        const more = { stdio: "inherit", shell: true };
        if (clientCfg.folder) {
            more.cwd = `${clientCfg.folder}`;
        }

        spawn(clientCfg.command, clientCfg.args, more).on("close", resolve).on("error", reject);
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
    ...builtClients.map((clientCfg) => startBuildClient(clientCfg))
);

exports.updateConfig = series(
    copyPlatformConfig
);