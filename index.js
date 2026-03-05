/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// 模版页
import TemplatePage from '@bases/page/TemplatePage';
// 示例列表页
import ExamplesPage from '@examples/ExamplesPage';
// 示例-Banner
import ExampleBannerPage from '@examples/ExampleBannerPage';
// 示例-原生UI组件
import ExampleNativeComponentPage from '@examples/ExampleNativeComponentPage';
// 示例-SegmentedView
import ExampleSegmentedPage from '@examples/ExampleSegmentedPage';
// 示例-ScrollPageView
import ExampleScrollPageViewPage from '@examples/ExampleScrollPageViewPage';
// 示例-本地存储
import ExampleLocalStoragePage from '@examples/ExampleLocalStoragePage';

AppRegistry.registerComponent(appName, () => App);

AppRegistry.registerComponent('TemplatePage', () => TemplatePage);

AppRegistry.registerComponent('ExamplesPage', () => ExamplesPage);
AppRegistry.registerComponent('ExampleBannerPage', () => ExampleBannerPage);
AppRegistry.registerComponent('ExampleNativeComponentPage', () => ExampleNativeComponentPage);
AppRegistry.registerComponent('ExampleSegmentedPage', () => ExampleSegmentedPage);
AppRegistry.registerComponent('ExampleScrollPageViewPage', () => ExampleScrollPageViewPage);
AppRegistry.registerComponent('ExampleLocalStoragePage', () => ExampleLocalStoragePage);