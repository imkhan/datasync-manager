"use strict";
/*!
* Contentstack DataSync Manager
* Copyright (c) 2019 Contentstack LLC
* MIT Licensed
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const lodash_1 = require("lodash");
const core_1 = require("./core");
const inet_1 = require("./core/inet");
const process_1 = require("./core/process");
const q_1 = require("./core/q");
exports.notifications = q_1.notifications;
const config_1 = require("./config");
const build_paths_1 = require("./util/build-paths");
const index_1 = require("./util/index");
const logger_1 = require("./util/logger");
const validations_1 = require("./util/validations");
const debug = debug_1.default('registration');
let assetStoreInstance;
let appConfig = {};
let contentStore;
let assetStore;
let listener;
let q;
exports.push = (data) => {
    validations_1.validateExternalInput(data);
    q.emit('push', data);
};
exports.unshift = (data) => {
    validations_1.validateExternalInput(data);
    q.emit('unshift', data);
};
exports.pop = () => {
    q.emit('pop');
};
exports.getAssetLocation = (asset) => {
    return assetStoreInstance.getAssetLocation(asset);
};
/**
 * @public
 * @method setContentStore
 * @summary Register content store
 * @param {object} instance Content store instance
 */
exports.setContentStore = (instance) => {
    contentStore = instance;
};
/**
 * @public
 * @method setAssetStore
 * @summary Register asset store
 * @param {object} instance Asset store instance
 */
exports.setAssetStore = (instance) => {
    assetStore = instance;
};
/**
 * @public
 * @method setListener
 * @summary Register listener
 * @param {object} instance Listener instance
 */
exports.setListener = (instance) => {
    validations_1.validateListener(instance);
    listener = instance;
};
/**
 * @public
 * @method setConfig
 * @summary Sets the application's configuration
 * @param {object} config Application config
 */
exports.setConfig = (config) => {
    appConfig = config;
};
/**
 * @public
 * @method getConfig
 * @summary Returns the application's configuration
 * @returns {object} Application config
 */
exports.getConfig = () => {
    return appConfig;
};
/**
 * @public
 * @method setLogger
 * @summary Sets custom logger for logging data sync operations
 * @param {object} instance Custom logger instance
 */
var logger_2 = require("./util/logger");
exports.setLogger = logger_2.setLogger;
/**
 * @public
 * @method start
 * @summary Starts the sync manager utility
 * @description
 * Registers, validates asset, content stores and listener instances.
 * Once done, builds the app's config and logger
 * @param {object} config Optional application config overrides
 * @returns {Promise} Returns a promise
 */
exports.start = (config = {}) => {
    return new Promise((resolve, reject) => {
        try {
            validations_1.validateInstances(assetStore, contentStore, listener);
            appConfig = lodash_1.merge({}, config_1.config, appConfig, config);
            validations_1.validateConfig(appConfig);
            appConfig.paths = build_paths_1.buildConfigPaths();
            // since logger is singleton, if previously set, it'll return that isnstance!
            logger_1.setLogger();
            process_1.configure();
            return assetStore.start(appConfig).then((assetInstance) => {
                debug('Asset store instance has returned successfully!');
                validations_1.validateAssetConnector(assetInstance);
                assetStoreInstance = assetInstance;
                return contentStore.start(assetInstance, appConfig);
            }).then((contentStoreInstance) => {
                debug('Content store instance has returned successfully!');
                validations_1.validateContentConnector(contentStoreInstance);
                appConfig = index_1.formatSyncFilters(appConfig);
                return core_1.init(contentStoreInstance, assetStoreInstance);
            }).then(() => {
                debug('Sync Manager initiated successfully!');
                listener.register(core_1.poke);
                // start checking for inet 10 secs after the app has started
                inet_1.init();
                q = new q_1.Q({}, {}, {});
                return listener.start(appConfig);
            }).then(() => {
                logger_1.logger.info('Contentstack sync utility started successfully!');
                return resolve();
            }).catch(reject);
        }
        catch (error) {
            return reject(error);
        }
    });
};
