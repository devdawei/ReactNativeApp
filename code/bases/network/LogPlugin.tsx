import Plugin from './Plugin';
import Api from './Api';

export default class LogPlugin extends Plugin {
  willRequest<T extends Api<any, any>>(api: T) {
    let url = api.baseURL + api.path;
    console.log('*** 开始请求 ***');
    console.log('方法：', api.method);
    console.log('接口：', url);
    console.log('参数：', JSON.stringify(api.parameters));
  }
  receivedResponse<T extends Api<any, any>>(api: T, json: any) {
    let url = api.baseURL + api.path;
    console.log('*** 结束请求 ***');
    console.log('方法：', api.method);
    console.log('接口：', url);
    console.log('参数：', JSON.stringify(api.parameters));
    console.log('返回内容：', JSON.stringify(json));
  }

  requestSuccess<T extends Api<any, any>>(api: T) {}

  requestFailure<T extends Api<any, any>>(api: T, error: any) {
    console.error('请求失败：', error);
  }
}
