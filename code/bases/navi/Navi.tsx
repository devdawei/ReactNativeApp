import {NativeModules} from 'react-native';
// import BasePage, { BasePageProps, BasePageState } from '../page/BasePage';
const RNCNavi = NativeModules.RNCNavi;

export enum NaviOpenMode {
  push = 0,
  present = 1,
}
export default class Navi {
  // static push<T extends Function>(page: T) {
  //   RNCNavi.push(page.toString());
  // }
  static push(pageName: string, fromPageID: string) {
    this.open(pageName, fromPageID, NaviOpenMode.push);
  }

  // static pop(page: BasePage) {
  //   RNCNavi.pop(page.props.pageID);
  // }
  static pop(pageID: string) {
    RNCNavi.pop(pageID);
  }

  static present(pageName: string, fromPageID: string) {
    this.open(pageName, fromPageID, NaviOpenMode.present);
  }

  static close(pageID: string) {
    RNCNavi.close(pageID);
  }

  static open(pageName: string, fromPageID?: string, mode?: NaviOpenMode) {
    let info = {
      pageName: pageName,
      fromPageID: fromPageID,
      mode: mode,
    };
    RNCNavi.open(info);
  }
}
