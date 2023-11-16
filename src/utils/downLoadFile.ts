import { notification } from "antd";
import request from './request';
/**
 * @description 下载文件
 * @param url fetch地址
 * @param options 请求选项，包括 token 等
 * @param fileType 下载文件的 MIME 类型,默认为application/octet-stream。浏览器可以自行处理，可以不传
 */
const fileDownLoad = (url: string, options: any, fileType: string = 'application/octet-stream') => {
  request(url, { ...options, responseType: 'blob' })
    .then(res => {
      if (res && res.data instanceof Blob) {
        // const blob = new Blob(response.data, { type: 'application/vnd.ms-excel' })//这是excle 对象
        const blob = new Blob([res.data], { type: fileType })
        let fileName = ''
        const headers = res?.response?.headers;
        // 从content-disposition中获取文件名称
        if (headers?.get('content-disposition')) {
          const fileCode = headers.get('content-disposition').match(/filename\*?=(.*)/)?.[1]
          fileName = decodeURI(fileCode)
        }

        const objectUrl = (window.URL || window.webkitURL).createObjectURL(blob);
        const link = document.createElement('a');
        link.href = objectUrl;
        link.style.display = 'none';
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(objectUrl);//释放blob
      } else {
        notification.error({
          message: '下载失败',
          description: '下载失败，请重试'
        })
      }
    }).catch(error => {
      console.log(error);

      notification.error({
        message: '下载失败',
        description: '下载失败，请重试'
      })
    })
}

/**
 * @description 更具某个code去重
 * @param {Array} array [{ id: 1, name: 'Alice' },{ id: 2, name: 'Bob'}, { id: 2, name: 'Eve' }]
 * @param {String} code 
 * @returns {Array}
 */
const removeDuplicatesByCode = <T>(array: T[], code: keyof T): T[] => {

  const uniqueObjects: { [key: string]: T } = {};

  const result: T[] = [];

  for (const item of array) {
    const itemCode = String(item[code]);
    if (!uniqueObjects[itemCode]) {
      uniqueObjects[itemCode] = item;
      result.push(item);
    }
  }

  return result;
}
export {
  fileDownLoad,
  removeDuplicatesByCode
}