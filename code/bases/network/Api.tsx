import axios from 'axios';
import ApiConfig from './ApiConfig';
import Plugin from './Plugin';
import LogPlugin from './LogPlugin';
import ApiInfo from './ApiInfo';

export enum Method {
  get = 'GET',
  post = 'POST',
  head = 'HEAD',
  put = 'PUT',
  patch = 'PATCH',
  delete = 'DELETE',
}

export const MethodsParametersInURI = [Method.get, Method.head, Method.delete];

export enum RequestType {
  request,
  loadMore,
}

export type ApiSuccessHandler<T> = (api: T) => void;
export type ApiFailureHandler<T> = (api: T) => void;
export type ApiEndHandler<T> = (api: T) => void;

export interface BaseModel<M> {
  status: number;
  msg: string;
  data: M;
}

export default abstract class Api<T extends Api<T, M>, M> {
  protected constructor() {
    this.plugins.push(new LogPlugin());
  }

  plugins: Plugin[] = [];

  static session = axios.create({
    baseURL: ApiConfig.baseURL,
    timeout: 10 * 1000,
  });

  baseURL = ApiConfig.baseURL;
  path = '';
  method = Method.get;
  parameters: {[key: string]: any} = {};

  private _successHandler?: ApiSuccessHandler<T>;
  // 请求成功后的回调
  successHandler(handler: ApiSuccessHandler<T>): this {
    this._successHandler = handler;
    return this;
  }
  private _failureHandler?: ApiFailureHandler<T>;
  // 请求失败后的回调
  failureHandler(handler: ApiFailureHandler<T>): this {
    this._failureHandler = handler;
    return this;
  }
  private _endHandler?: ApiEndHandler<T>;
  // 请求结束后的回调
  endHandler(handler: ApiEndHandler<T>): this {
    this._endHandler = handler;
    return this;
  }

  /*
   子类需实现此方法，可以对数据进行再处理。
   如果数据不符合要求，可以设置 success = false; 则会走请求失败的回调
   */
  abstract parse(dataModel: M): void;

  // 是否正在请求
  requesting = false;
  // 本次请求是否成功
  success = false;
  // 基础数据模型
  baseModel?: BaseModel<M>;
  // 子类的数据模型
  dataModel?: M;

  // 本次请求的类型
  requestType: RequestType = RequestType.request;
  isRefresh() {
    return this.requestType === RequestType.request;
  }

  // 请求数据的方法
  request() {
    this._requestWithType(RequestType.request);
  }

  // 是否为分页加载。如果此 Api 是分页加载，则需要将此值置为 true。
  isPageRequest = false;
  // 页码
  page = ApiConfig.page;
  // 每页的数量
  pageSize = ApiConfig.pageSize;
  // 数据是否已经全部加载完了（适用于分页加载的情况）
  noMoreData = false;

  // 加载更多数据的方法（适用于分页加载的情况）
  loadMore() {
    this._requestWithType(RequestType.loadMore);
  }

  /*
  检查页码和数据是否已经全部加载完了（适用于分页加载的情况）
  建议在 parse(dataModel: M): void; 函数内的最后一行代码调用
   */
  checkPageAndNoMoreData(data?: Array<any>) {
    if (data && data.length === 0) {
      this.noMoreData = true;
    } else {
      this.noMoreData = false;
      this.page++;
    }
  }

  private _requestWithType(type: RequestType) {
    if (this.requesting) {
      return;
    }
    this.requesting = true;
    this.requestType = type;
    this._send();
  }

  private _lastPage = 0;

  private _send() {
    if (this.isPageRequest && this.requestType === RequestType.request) {
      this._lastPage = this.page;
      this.page = ApiConfig.page;
    }
    if (this.isPageRequest) {
      this.parameters[ApiConfig.pageParameterKey] = this.page;
      this.parameters[ApiConfig.pageSizeParameterKey] = this.pageSize;
    }
    this._callbackPluginWillRequest();
    ApiInfo.headers().then(headers => {
      for (let key in ApiConfig.headers) {
        headers[key] = ApiConfig.headers[key];
      }
      let params: any;
      let data: any;
      if (MethodsParametersInURI.includes(this.method)) {
        params = this.parameters;
      } else {
        data = this.parameters;
      }
      Api.session
        .request({
          method: this.method,
          url: this.path,
          params: params,
          data: data,
          headers: headers,
        })
        .then(response => response.data)
        .then(responseJSON => {
          this._callbackPluginReceivedResponse(responseJSON);
          this.requesting = false;
          this.success = true;
          this._handle(responseJSON);
          if (this.success) {
            this._callbackPluginRequestSuccess();
          } else {
            this._callbackPluginRequestFailure('处理数据失败');
          }
          this._callback();
        })
        .catch(error => {
          this.requesting = false;
          this.success = false;
          this._callbackPluginRequestFailure(error);
          this._callback();
        });
    });
  }

  private _handle(baseModel: BaseModel<M>) {
    this.baseModel = baseModel;
    this.dataModel = baseModel.data;
    this.parse(baseModel.data);
    // 在调用完 parse(dataModel: M): void; 函数后，处理 page 属性
    if (
      this.isPageRequest &&
      this.requestType === RequestType.request &&
      !this.success
    ) {
      this.page = this._lastPage;
    }
  }

  private _callback() {
    if (this.success) {
      if (this._successHandler) {
        // @ts-ignore
        this._successHandler(this);
      }
    } else {
      if (this._failureHandler) {
        // @ts-ignore
        this._failureHandler(this);
      }
    }
    if (this._endHandler) {
      // @ts-ignore
      this._endHandler(this);
    }
  }

  private _callbackPluginWillRequest() {
    for (let i = 0; i < this.plugins.length; i++) {
      this.plugins[i].willRequest(this);
    }
  }

  private _callbackPluginReceivedResponse(json: any) {
    for (let i = 0; i < this.plugins.length; i++) {
      this.plugins[i].receivedResponse(this, json);
    }
  }

  private _callbackPluginRequestSuccess() {
    for (let i = 0; i < this.plugins.length; i++) {
      this.plugins[i].requestSuccess(this);
    }
  }

  private _callbackPluginRequestFailure(error: any) {
    for (let i = 0; i < this.plugins.length; i++) {
      this.plugins[i].requestFailure(this, error);
    }
  }
}
