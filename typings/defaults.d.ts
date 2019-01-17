/*!
* Contentstack Sync Manager
* Copyright (c) 2019 Contentstack LLC
* MIT Licensed
*/
export declare const config: {
    'asset-connector': {};
    'content-connector': {};
    'contentstack': {
        MAX_RETRY_LIMIT: number;
        actions: {
            delete: string;
            publish: string;
            unpublish: string;
        };
        apis: {
            content_types: string;
            sync: string;
        };
        host: string;
        port: number;
        protocol: string;
        verbs: {
            get: string;
        };
    };
    'listener': {};
    'locales': any[];
    'sync-manager': {
        cooloff: number;
        enableAssetReferences: boolean;
        enableContentReferences: boolean;
        limit: number;
        maxsize: number;
        saveFailedItems: boolean;
        saveFilteredItems: boolean;
    };
};
