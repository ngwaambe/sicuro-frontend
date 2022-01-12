export const isProd = () => {
  return (process.env.NODE_ENV != undefined) ? process.env.NODE_ENV.endsWith('production') : false;
}

export const isDev = () => {
  return (process.env.NODE_ENV != undefined) ? process.env.NODE_ENV.endsWith('development') : false;
}

export const isTest = () => {
  return (process.env.NODE_ENV != undefined) ? process.env.NODE_ENV.endsWith('test') : false;
}

export const isInt = () => {
  return (process.env.NODE_ENV != undefined) ? process.env.NODE_ENV.endsWith('intergration') : false;
}
