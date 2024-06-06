import { notification } from "antd";
/**
 * @description 根据某个code去重
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

const getFileNameFronHeaders = (headers: Headers): any => {
  if (headers.get('content-disposition')) {
    const fileCode = headers.get('content-disposition')?.split('filename=')[1]
    return decodeURI(fileCode as string)
  }
}
const createDownloadFile = (fileUrl: string, fileName: string) => {
  const fileCode = document.createElement('a');
  fileCode.style.display = 'none';
  fileCode.href = fileUrl;
  fileCode.download = fileName;
  document.body.appendChild(fileCode);
  return fileCode;
}
const cleanUp = (fileUrl: string, downFile: HTMLAnchorElement) => {
  window.URL.revokeObjectURL(fileUrl);
  document.body.removeChild(downFile);
}
/**
 * @description 文件下载 -- 此方法针对不同后端返回的数据格式需要进行小改动
 * @param url 下载地址
 * @param options fetch 配置 method | headers | body | params | mode | cache 
 */
const filedDownLoadOfFetch = async (url: string, options?: any) => {
  try {
    const requestOptions = {
      method: 'GET',
      // responseType: 'blob',
      ...options
    }
    const response: any = await fetch(url, requestOptions)
    if (!response.ok) {
      throw new Error('文件下载失败')
    }
    const blob = await response.blob();
    const fileName = getFileNameFronHeaders(response.headers)
    // 创建URL对象
    const fileUrl = (window.URL || window.webkitURL).createObjectURL(blob);
    const downFile = createDownloadFile(fileUrl, fileName);
    downFile.click();
    cleanUp(fileUrl, downFile);
  } catch (error) {
    console.log(error);

  }
}
export {
  fileDownLoad,
  removeDuplicatesByCode,
  filedDownLoadOfFetch
}