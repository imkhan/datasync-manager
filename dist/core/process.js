"use strict";
/*!
* Contentstack DataSync Manager
* Copyright (c) 2019 Contentstack LLC
* MIT Licensed
*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @note 'SIGKILL' cannot have a listener installed, it will unconditionally terminate Node.js on all platforms.
 * @note 'SIGSTOP' cannot have a listener installed.
 */
const logger_1 = require("../util/logger");
const _1 = require("./");
/**
 * @description Handles process exit. Stops the current application and manages a graceful shutdown
 * @param {String} signal - Process signal
 */
const handleExit = (signal) => {
    _1.lock();
    const killDuration = (process.env.KILLDURATION) ? calculateKillDuration() : 1000;
    logger_1.logger.info(`Received ${signal}. This will shut down the process in ${killDuration}ms..`);
    setTimeout(abort, killDuration);
};
/**
 * https://www.joyent.com/node-js/production/design/errors
 * https://stackoverflow.com/questions/7310521/node-js-best-practice-exception-handling/23368579
 *
 * @description Manage unhandled errors
 * @param {Object} error - Unhandled error object
 */
const unhandledErrors = (error) => {
    logger_1.logger.error('Unhandled exception caught. Locking down process for 10s to recover..');
    logger_1.logger.error(error);
    _1.lock();
    setTimeout(() => {
        _1.unlock();
    }, 10000);
};
/**
 * @description Validates 'process.env.KILLDURATION' time passed
 */
const calculateKillDuration = () => {
    const killDuration = parseInt(process.env.KILLDURATION, 10);
    if (isNaN(killDuration)) {
        return 15000;
    }
    return killDuration;
};
/**
 * @description Aborts the current application
 */
const abort = () => {
    process.abort();
};
exports.configure = () => {
    process.on('SIGTERM', handleExit);
    process.on('SIGINT', handleExit);
    process.on('uncaughtException', unhandledErrors);
    process.on('unhandledRejection', unhandledErrors);
};
