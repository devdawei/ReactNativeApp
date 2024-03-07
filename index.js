/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import Screen from './code/bases/tool/Screen';
import PageStatusManager from './code/managers/PageStatusManager';

import TestPage from './code/modules/test/TestPage';
import TestBannerPage from './code/modules/test/TestBannerPage';
import TestNativeViewPage from './code/modules/test/TestNativeViewPage';
import TestToastPage from './code/modules/test/TestToastPage';
import TestAlertPage from './code/modules/test/TestAlertPage';
import TestSegmentedViewPage from './code/modules/test/TestSegmentedViewPage';
import TestScrollPageViewPage from './code/modules/test/TestScrollPageViewPage';
import TestScrollTabPage from './code/modules/test/TestScrollTabPage';
import TestStorageManagerPage from './code/modules/test/TestStorageManagerPage';

import RecommendPage from './code/modules/Recommend/RecommendPage';
import LearnPage from './code/modules/learn/LearnPage';

AppRegistry.registerComponent(appName, () => App);

Screen.configStatusBarHeight();
PageStatusManager.manager.config();

AppRegistry.registerComponent(TestPage.pageName, () => TestPage);
AppRegistry.registerComponent(TestBannerPage.pageName, () => TestBannerPage);
AppRegistry.registerComponent(TestToastPage.pageName, () => TestToastPage);
AppRegistry.registerComponent(TestAlertPage.pageName, () => TestAlertPage);
AppRegistry.registerComponent(
  TestNativeViewPage.pageName,
  () => TestNativeViewPage,
);
AppRegistry.registerComponent(
  TestSegmentedViewPage.pageName,
  () => TestSegmentedViewPage,
);
AppRegistry.registerComponent(
  TestScrollPageViewPage.pageName,
  () => TestScrollPageViewPage,
);
AppRegistry.registerComponent(
  TestScrollTabPage.pageName,
  () => TestScrollTabPage,
);
AppRegistry.registerComponent(
  TestStorageManagerPage.pageName,
  () => TestStorageManagerPage,
);

AppRegistry.registerComponent(RecommendPage.pageName, () => RecommendPage);
AppRegistry.registerComponent(LearnPage.pageName, () => LearnPage);
