/* 是否为线上环境 */
const release = false;

export default class ApiConfig {
  static baseURL = release
    ? 'https://www.gitee.com'
    : 'https://www.gitee.com';

  static headers: {[key: string]: any} = {
    // App 里面有原生，Web 和 RN 请求，这个参数标识真正的请求源
    'Request-OS-Type': 'RN',
  };

  static page = 1;
  static pageSize = 10;
  static pageParameterKey = 'page';
  static pageSizeParameterKey = 'pageSize';
}
