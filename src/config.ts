/*!
* Contentstack DataSync Manager
* Copyright (c) 2019 Contentstack LLC
* MIT Licensed
*/

/**
 * @description Default application's internal config
 */
export const config = {
  assetStore: {},
  contentStore: {
    unwanted: {
      asset: {
        _in_progress: true,
        content_type_uid: true,
        data: true,
        publish_details: true,
        type: true,
      },
      contentType: {
        content_type_uid: true,
      },
      entry: {
        _content_type: true,
        _in_progress: true,
        content_type_uid: true,
        data: true,
        publish_details: true,
        type: true,
      }
    }
  },
  contentstack: {
    MAX_RETRY_LIMIT: 6,
    actions: {
      delete: 'delete',
      publish: 'publish',
      unpublish: 'unpublish',
    },
    apis: {
      content_types: '/v3/content_types/',
      sync: '/v3/stacks/sync',
    },
    host: 'cdn.contentstack.io',
    port: 443,
    protocol: 'https:',
    verbs: {
      get: 'GET',
    },
  },
  listener: {},
  locales: [],
  plugins: [
    {
      disabled: false,
      name: '_cs_internal_transform_entries',
      // path: '',
      options: {
        // other overrides...
      },
    },
    {
      disabled: false,
      name: '_cs_internal_transform_schemas',
      options: {
        logAssetPaths: true,
        logReferencePaths: true,
        // other overrides...
      },
    },
    {
      disabled: false,
      name: '_cs_internal_save_rte_markdown_assets',
      options: {
        // other overrides...
      },
    },
  ],
  syncManager: {
    cooloff: 3000,
    enableAssetReferences: true,
    enableContentReferences: true,
    enableRteMarkdownDownload: true,
    inet: {
      dns: '8.8.8.8',
      host: 'contentstack.io',
      // DNS port
      port: 53,
      retries: 5,
      retryIncrement: 5 * 1000,
      retryTimeout: 20 * 1000,
      timeout: 10 * 1000,
      type: 'A',
    },
    limit: 100,
    markdown: {
      breaks: true,
      gfm: true,
      smartLists: true,
      tables: true,
      xhtml: false,
    },
    // max file sizes in bytes
    maxsize: 2097152,
    queue: {
      pause_threshold: 10000,
      resume_threshold: 5000,
    },
    saveFailedItems: true,
    saveFilteredItems: true,
  },
}
