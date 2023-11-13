
const jsonToUrl = (data: any) => {
  return Object.keys(data).map(key => {
    return `${encodeURIComponent(key)}=${data[key] !== undefined && data[key] !== null ? encodeURIComponent(data[key]) : ''}`
  }).join('&')
}
/**
 * @description: 判断文件格式
 * @param {string} url
 * @return {*}
 */
const judgeUrlType = (url: string): any => {
  const docuArr = ['doc', 'docx', 'pdf', 'txt', 'md'];
  const imgArr = ['bmp', 'jpg', 'png', 'tif', 'gif', 'pcx', 'tga', 'exif', 'fpx', 'svg', 'psd', 'cdr', 'pcd', 'dxf', 'ufo', 'eps', 'ai', 'raw', 'WMF', 'webp', 'apng']
  let arr = url.split('.');
  if (url) {
    if (imgArr.includes(arr[arr.length - 1].toLowerCase())) {
      return 'img'
    } else if (docuArr.includes(arr[arr.length - 1].toLowerCase())) {
      return 'document'
    }
  }
};
export { jsonToUrl, judgeUrlType }