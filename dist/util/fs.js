"use strict";
/*!
* Contentstack Sync Manager
* Copyright © 2019 Contentstack LLC
* MIT Licensed
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Debug = require("debug");
const fs_1 = require("fs");
exports.existsSync = fs_1.existsSync;
const mkdirp_1 = __importDefault(require("mkdirp"));
const path_1 = require("path");
const write_file_atomic_1 = __importDefault(require("write-file-atomic"));
const stringify_1 = require("./stringify");
const debug = Debug('sm:util-fs');
exports.writeFile = (filePath, data) => {
    debug(`Write file called on ${filePath}`);
    return new Promise((resolve, reject) => {
        try {
            const fileDirectory = path_1.dirname(filePath);
            if (!fs_1.existsSync(fileDirectory)) {
                mkdirp_1.default.sync(fileDirectory);
            }
            return write_file_atomic_1.default(filePath, (typeof data === 'object') ? stringify_1.stringify(data) : data, (wfError) => {
                if (wfError) {
                    return reject(wfError);
                }
                return resolve();
            });
        }
        catch (writeFileError) {
            if (writeFileError.code === 'ENOENT') {
                return mkdirp_1.default(path_1.dirname(filePath), (createDirError) => {
                    if (createDirError) {
                        return reject(createDirError);
                    }
                    return exports.writeFile(data, filePath).then(resolve).catch(reject);
                });
            }
            return reject(writeFileError);
        }
    });
};
exports.readFile = (filePath) => {
    debug(`Read file called on ${filePath}`);
    return new Promise((resolve, reject) => {
        try {
            return fs_1.stat(filePath, (error, stats) => {
                if (error) {
                    return reject(error);
                }
                else if (stats.isFile) {
                    return fs_1.readFile(filePath, (rfError, data) => {
                        if (rfError) {
                            return reject(rfError);
                        }
                        return resolve(data);
                    });
                }
                const err = new Error(`Invalid 'read' operation on file. Expected ${filePath} to be of type 'file'!`);
                err.code = 'IOORF';
                return reject(err);
            });
        }
        catch (error) {
            return reject(error);
        }
    });
};
exports.readFileSync = (filePath) => {
    debug(`Read file sync called on ${filePath}`);
    if (fs_1.existsSync(filePath)) {
        return fs_1.readFileSync(filePath);
    }
    const err = new Error(`Invalid 'read' operation on file. Expected ${filePath} to be of type 'file'!`);
    err.code = 'IOORFS';
    throw err;
};
exports.mkdir = (path) => {
    debug(`mkdir called on ${path}`);
    return new Promise((resolve, reject) => {
        try {
            return mkdirp_1.default(path, (error) => {
                if (error) {
                    return reject(error);
                }
                return resolve();
            });
        }
        catch (error) {
            return reject(error);
        }
    });
};
//# sourceMappingURL=fs.js.map