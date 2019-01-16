let consumer

// Build a dummy asset connector
export const assetConnector = {
  delete: () => {
    return Promise.resolve()
  },
  download: () => {
    return Promise.resolve()
  },
  setLogger: () => {
    return
  },
  start: () => {
    return Promise.resolve(assetConnector)
  },
  unpublish: () => {
    return Promise.resolve()
  },
}

// Build a dummy content connector
export const contentConnector = {
  delete: () => {
    return Promise.resolve()
  },
  find: () => {
    return Promise.resolve()
  },
  findOne: () => {
    return Promise.resolve()
  },
  publish: () => {
    return Promise.resolve()
  },
  setLogger: () => {
    return
  },
  start: () => {
    return Promise.resolve(contentConnector)
  },
  unpublish: () => {
    return Promise.resolve()
  },
}

// Dummy listener instance
export const listener = {
  register: (fn) => {
    if (typeof fn !== 'function') {
      throw new Error(`${fn} should be a function!`)
    }
    consumer = fn

    return
  },
  setLogger: () => {
    return
  },
  start: () => {
    // simply fire events every 10 seconds
    setInterval(consumer, 10 * 1000)

    return Promise.resolve()
  },
}