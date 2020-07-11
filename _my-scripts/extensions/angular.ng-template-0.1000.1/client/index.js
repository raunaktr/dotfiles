'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));
var vscode = _interopDefault(require('vscode'));
var vscodeLanguageclient = _interopDefault(require('vscode-languageclient'));

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var commands = createCommonjsModule(function (module, exports) {
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCommands = void 0;

/**
 * Restart the language server by killing the process then spanwing a new one.
 * @param client language client
 */
function restartNgServer(client) {
    return {
        id: 'angular.restartNgServer',
        execute() {
            return __awaiter(this, void 0, void 0, function* () {
                yield client.stop();
                return client.start();
            });
        },
    };
}
/**
 * Register all supported vscode commands for the Angular extension.
 * @param client language client
 */
function registerCommands(client) {
    const commands = [
        restartNgServer(client),
    ];
    const disposables = commands.map((command) => {
        return vscode.commands.registerCommand(command.id, command.execute);
    });
    return disposables;
}
exports.registerCommands = registerCommands;

});

unwrapExports(commands);
var commands_1 = commands.registerCommands;

var protocol = createCommonjsModule(function (module, exports) {
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectLoadingNotification = void 0;

exports.projectLoadingNotification = {
    start: new vscodeLanguageclient.NotificationType0('angular-language-service/projectLoadingStart'),
    finish: new vscodeLanguageclient.NotificationType0('angular-language-service/projectLoadingFinish')
};

});

unwrapExports(protocol);
var protocol_1 = protocol.projectLoadingNotification;

var extension = createCommonjsModule(function (module, exports) {
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;






function activate(context) {
    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    const serverOptions = {
        run: getServerOptions(context, false /* debug */),
        debug: getServerOptions(context, true /* debug */),
    };
    // Options to control the language client
    const clientOptions = {
        // Register the server for Angular templates and TypeScript documents
        documentSelector: [
            // scheme: 'file' means listen to changes to files on disk only
            // other option is 'untitled', for buffer in the editor (like a new doc)
            { scheme: 'file', language: 'html' },
            { scheme: 'file', language: 'typescript' },
        ],
        synchronize: {
            fileEvents: [
                // Notify the server about file changes to tsconfig.json contained in the workspace
                vscode.workspace.createFileSystemWatcher('**/tsconfig.json'),
            ]
        },
        // Don't let our output console pop open
        revealOutputChannelOn: vscodeLanguageclient.RevealOutputChannelOn.Never
    };
    // Create the language client and start the client.
    const forceDebug = process.env['NG_DEBUG'] === 'true';
    const client = new vscodeLanguageclient.LanguageClient('Angular Language Service', serverOptions, clientOptions, forceDebug);
    // Push the disposable to the context's subscriptions so that the
    // client can be deactivated on extension deactivation
    context.subscriptions.push(...commands.registerCommands(client), client.start());
    client.onDidChangeState((e) => {
        let task;
        if (e.newState == vscodeLanguageclient.State.Running) {
            client.onNotification(protocol.projectLoadingNotification.start, () => {
                if (task) {
                    task.resolve();
                    task = undefined;
                }
                vscode.window.withProgress({
                    location: vscode.ProgressLocation.Window,
                    title: 'Initializing Angular language features',
                }, () => new Promise((resolve) => {
                    task = { resolve };
                }));
            });
            client.onNotification(protocol.projectLoadingNotification.finish, () => {
                if (task) {
                    task.resolve();
                    task = undefined;
                }
            });
        }
    });
}
exports.activate = activate;
/**
 * Return the paths for the module that corresponds to the specified `configValue`,
 * and use the specified `bundled` as fallback if none is provided.
 * @param configName
 * @param bundled
 */
function getProbeLocations(configValue, bundled) {
    const locations = [];
    // Always use config value if it's specified
    if (configValue) {
        locations.push(configValue);
    }
    // Prioritize the bundled version
    locations.push(bundled);
    // Look in workspaces currently open
    const workspaceFolders = vscode.workspace.workspaceFolders || [];
    for (const folder of workspaceFolders) {
        locations.push(folder.uri.fsPath);
    }
    return locations;
}
/**
 * Construct the arguments that's used to spawn the server process.
 * @param ctx vscode extension context
 * @param debug true if debug mode is on
 */
function constructArgs(ctx, debug) {
    const config = vscode.workspace.getConfiguration();
    const args = [];
    const ngLog = config.get('angular.log', 'off');
    if (ngLog !== 'off') {
        // Log file does not yet exist on disk. It is up to the server to create the file.
        const logFile = path.join(ctx.logPath, 'nglangsvc.log');
        args.push('--logFile', logFile);
        args.push('--logVerbosity', debug ? 'verbose' : ngLog);
    }
    const ngdk = config.get('angular.ngdk', null);
    const ngProbeLocations = getProbeLocations(ngdk, ctx.asAbsolutePath('server'));
    args.push('--ngProbeLocations', ngProbeLocations.join(','));
    const tsdk = config.get('typescript.tsdk', null);
    const tsProbeLocations = getProbeLocations(tsdk, ctx.extensionPath);
    args.push('--tsProbeLocations', tsProbeLocations.join(','));
    return args;
}
function getServerOptions(ctx, debug) {
    // Environment variables for server process
    const prodEnv = {
        // Force TypeScript to use the non-polling version of the file watchers.
        TSC_NONPOLLING_WATCHER: true,
    };
    const devEnv = Object.assign(Object.assign({}, prodEnv), { NG_DEBUG: true });
    // Node module for the language server
    const prodBundle = ctx.asAbsolutePath('server');
    const devBundle = ctx.asAbsolutePath(path.join('server', 'out', 'server.js'));
    // Argv options for Node.js
    const prodExecArgv = [];
    const devExecArgv = [
        // do not lazily evaluate the code so all breakpoints are respected
        '--nolazy',
        // If debugging port is changed, update .vscode/launch.json as well
        '--inspect=6009',
    ];
    return {
        // VS Code Insider launches extensions in debug mode by default but users
        // install prod bundle so we have to check whether dev bundle exists.
        module: debug && fs.existsSync(devBundle) ? devBundle : prodBundle,
        transport: vscodeLanguageclient.TransportKind.ipc,
        args: constructArgs(ctx, debug),
        options: {
            env: debug ? devEnv : prodEnv,
            execArgv: debug ? devExecArgv : prodExecArgv,
        },
    };
}

});

var extension$1 = unwrapExports(extension);
var extension_1 = extension.activate;

exports.activate = extension_1;
exports.default = extension$1;
