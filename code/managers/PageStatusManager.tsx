import React from 'react';
import {
  DeviceEventEmitter,
  EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';

const {RNCPageStatusManager} = NativeModules;

export default class PageStatusManager {
  static manager = new PageStatusManager();

  rncPageStatusManagerEmitter = new NativeEventEmitter(RNCPageStatusManager);
  willAppearSubs?: EmitterSubscription;
  didAppearSubs?: EmitterSubscription;
  willDisappearSubs?: EmitterSubscription;
  didDisappearSubs?: EmitterSubscription;

  config() {
    this.willAppearSubs = this.rncPageStatusManagerEmitter.addListener(
      'NativePageWillAppear',
      result => {
        DeviceEventEmitter.emit('PageWillAppear', result);
      },
    );
    this.didAppearSubs = this.rncPageStatusManagerEmitter.addListener(
      'NativePageDidAppear',
      result => {
        DeviceEventEmitter.emit('PageDidAppear', result);
      },
    );
    this.willDisappearSubs = this.rncPageStatusManagerEmitter.addListener(
      'NativePageWillDisappear',
      result => {
        DeviceEventEmitter.emit('PageWillDisappear', result);
      },
    );
    this.didDisappearSubs = this.rncPageStatusManagerEmitter.addListener(
      'NativePageDidDisappear',
      result => {
        DeviceEventEmitter.emit('PageDidDisappear', result);
      },
    );
  }
}
