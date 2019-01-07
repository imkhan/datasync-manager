"use strict";
/*!
* Contentstack Sync Manager
* Copyright © 2019 Contentstack LLC
* MIT Licensed
*/
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const mandatoryCCMethods = ['publish', 'unpublish', 'delete', 'find', 'findOne'];
const mandatoryACMethods = ['delete', 'download', 'unpublish'];
const mandatoryListenerMethods = ['register', 'start'];
const mandatoryConfigKeys = ['listener', 'asset-connector', 'content-connector', 'sync-manager', 'contentstack',
    'locales',
];
exports.validateConfig = (config) => {
    mandatoryConfigKeys.forEach((key) => {
        if (config[key] === undefined) {
            throw new Error(`Config ${key} key cannot be undefined`);
        }
    });
    if (!Array.isArray(config.locales) || config.locales.length === 0) {
        throw new Error('Config \'locales\' should be an array and not empty!');
    }
    if (typeof config.contentstack !== 'object' || !config.contentstack.apiKey || !config.contentstack.token) {
        throw new Error('Config \'contentstack\' should be of type object and have \'apiKey\' and \'token\'');
    }
};
exports.validateInstances = (assetConnector, contentConnector, listener) => {
    if (typeof assetConnector === 'undefined') {
        throw new Error('Call \'setAssetConnector()\' before calling sync-manager start!');
    }
    else if (typeof contentConnector === 'undefined') {
        throw new Error('Call \'setContentConnector()\' before calling sync-manager start!');
    }
    else if (typeof listener === 'undefined') {
        throw new Error('Call \'setListener()\' before calling sync-manager start!');
    }
    else if (!assetConnector.start || !contentConnector.start || !listener.start) {
        throw new Error('Connector and listener instances should have \'start()\' method');
    }
};
exports.validateContentConnector = (instance) => {
    mandatoryCCMethods.forEach((methodName) => {
        if (!(lodash_1.hasIn(instance, methodName))) {
            throw new Error(`${instance} content connector does not support ${methodName}`);
        }
    });
};
exports.validateAssetConnector = (instance) => {
    mandatoryACMethods.forEach((methodName) => {
        if (!(lodash_1.hasIn(instance, methodName))) {
            throw new Error(`${instance} asset connector does not support ${methodName}`);
        }
    });
};
exports.validateListener = (instance) => {
    mandatoryListenerMethods.forEach((methodName) => {
        if (!(lodash_1.hasIn(instance, methodName))) {
            throw new Error(`${instance} listener does not support ${methodName}`);
        }
    });
};
//# sourceMappingURL=validations.js.map