import { message, notification } from 'antd'
import { jsonToUrl } from '@/utils';
type CodeMessage = {
  [key: number]: string;
};
class RequestError extends Error {
  response: any;

  constructor(message: string, status: number, response: any) {
    super(message);
    this.name = String(status);
    this.response = response;
  }
}
const codeMessage: CodeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};

const checkStatus = (res: any) => {

  if ((res.status >= 200 && res.status < 300) || res.status === 400 || res.status === 500) {
    return res
  }
  const errText = res.statusText || codeMessage[res.status]
  notification.error({
    message: `请求错误，${res.status}:${res.url}`,
    description: errText
  })
  throw new RequestError(errText, res.status, res);
}
const checkServerCode = (res: any, options: any) => {
  let tempCode = Number(res.code)
  if (tempCode >= 200 && tempCode < 300) {
    if (res.success && !res.data) {
      notification.success({
        message: res.showMsg
      })
    }
    return {
      success: true,
      ...res
    }
  }
  if (!options.success) {
    return res
  }

  if (tempCode === 400) {
    notification.error({
      message: res.msg || codeMessage[res.code]
    })
  } else if (tempCode === 401) {
    if (window.location.href.endsWith('login')) {
      return false
    }
    notification.error({
      message: res.msg || codeMessage[res.code]
    })
  }
}
export default function request(url: string, options: any = {}) {
  const defaultOptions = {
    credentials: 'include',
    method: 'POST',
    showMsg: false
  }

  const newOptions = { ...defaultOptions, ...options, }
  // 如果自己加的有
  newOptions.headers = {
    ...newOptions.headers,
  }
  let fetchUrl = url
  if (['POST', 'DELETE', 'PUT', 'PATCH'].includes(newOptions.method)) {
    newOptions.headers = {
      ...newOptions.headers,
      Accept: 'application/json',
      'Content-Type': newOptions.method === 'POST' && !(newOptions.data instanceof FormData)
        ? 'application/json;charset=utf-8'
        : undefined,
    };
  }

  if (newOptions.params) {
    fetchUrl = url + '?' + jsonToUrl(newOptions.params)
  }
  return fetch(fetchUrl, newOptions)
    .then(checkStatus)
    .then(res => {
      if (options.method === 'DELETE' || res.status === 204 || res.status === 205) {
        return res.text()
      }
      return res.json()
    })
    .then(res => {
      return checkServerCode(res, newOptions)
    })
    .catch(error => {
      if (error instanceof RequestError) {
        // 自定义处理方法
        console.log(error.message);

      } else {
        // 处理其他类型的错误...
        console.error(error);
      }
    })
}