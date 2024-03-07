import {Dimensions} from 'react-native';
import {Platform, NativeModules, StatusBar} from 'react-native';
const {StatusBarManager} = NativeModules;

export default class Screen {
  static width(): number {
    return Dimensions.get('screen').width;
  }

  static height(): number {
    return Dimensions.get('screen').height;
  }

  static statusBarHeight = 0;
  static naviContentHeight = 44;

  static naviHeight(): number {
    return this.statusBarHeight + this.naviContentHeight;
  }

  static configStatusBarHeight() {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight((info: any) => {
        this.updateStatusBarHeight(info.height);
      });
    } else {
      let currentHeight = StatusBar.currentHeight;
      if (currentHeight) {
        this.updateStatusBarHeight(currentHeight);
      }
    }
  }

  static updateStatusBarHeight(statusBarHeight: number) {
    this.statusBarHeight = statusBarHeight;
    console.log('状态栏高度：', this.statusBarHeight);
  }
}
