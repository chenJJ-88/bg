
const jsonToUrl = (data: any) => {
  return Object.keys(data).map(key => {
    return `${encodeURIComponent(key)}=${data[key] !== undefined && data[key] !== null ? encodeURIComponent(data[key]) : ''}`
  }).join('&')
}

export { jsonToUrl }