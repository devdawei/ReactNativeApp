import {NativeModules} from 'react-native';
// import BasePage, { BasePageProps, BasePageState } from '../page/BasePage';
const RNCApiInfo = NativeModules.RNCApiInfo;

export default class ApiInfo {
  /*
  获取请求头信息
  ApiInfo.headers().then(headers => {
    console.log('headers: ', headers);
  });
  */
  static async headers(): Promise<{[key: string]: any}> {
    return await RNCApiInfo.headers();
  }
}
