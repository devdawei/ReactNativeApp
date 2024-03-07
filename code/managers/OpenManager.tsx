import {NativeModules} from 'react-native';
const RNCOpenManager = NativeModules.RNCOpenManager;

export default class OpenManager {
  static async openLoginIfNeed(fromPageID: string): Promise<void> {
    let info = {
      fromPageID: fromPageID,
    };
    return await RNCOpenManager.openLoginIfNeed(info);
  }

  static openWeb(link: string, fromPageID: string) {
    let info = {
      link: link,
      fromPageID: fromPageID,
    };
    RNCOpenManager.openWeb(info);
  }

  static openApplink(applink: string, fromPageID: string) {
    let info = {
      applink: applink,
      fromPageID: fromPageID,
    };
    RNCOpenManager.openApplink(info);
  }
}
