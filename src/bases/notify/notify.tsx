import { DeviceEventEmitter, NativeEventEmitter, NativeModules } from 'react-native';
import NativeNotify from '@specs/NativeNotify';

const RNCNotify = NativeModules.RNCNotify;

export default class Notify {

  // 全局单例
  static manager = new Notify();

  eventEmitter = new NativeEventEmitter(RNCNotify);

  constructor() {
    this.eventEmitter.addListener('NativeNotify', (eventData) => {
      console.log('收到原生通知:', eventData);
      const { name, body } = eventData;
      DeviceEventEmitter.emit(name, body);
    });
  }

  // 发送通知
  static post(name: string, body: Record<string, any>) {
    DeviceEventEmitter.emit(name, body);
    const json = JSON.stringify(body);
    NativeNotify.post(name, json);
  }

  // 订阅通知（一定要接收返回的结果，销毁的时候需要移除）
  static subscribe(name: string, callback: (data: any) => void) {
    return DeviceEventEmitter.addListener(name, callback);
  }
}
