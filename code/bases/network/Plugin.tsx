import Api from './Api';

export default abstract class Plugin {
  // 即将发起请求
  abstract willRequest<T extends Api<any, any>>(api: T): void;
  // 接收到请求数据
  abstract receivedResponse<T extends Api<any, any>>(api: T, json: any): void;
  // 请求成功
  abstract requestSuccess<T extends Api<any, any>>(api: T): void;
  // 请求失败
  abstract requestFailure<T extends Api<any, any>>(api: T, error: any): void;
}
