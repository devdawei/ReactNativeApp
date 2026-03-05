import React, {Component} from 'react';
import {StyleSheet, ScrollView, Dimensions} from 'react-native';
import NestedScrollManager from '../NestedScrollManager';

export interface PageLifecycle {
  pageWillAppear: () => void;
  pageDidAppear: () => void;
  pageWillDisappear: () => void;
  pageDidDisappear: () => void;
}

export interface ScrollPageViewBasePageProps {
  nestedScrollManager?: NestedScrollManager;
}

export interface ScrollPageViewBasePageState {}

export default class ScrollPageViewBasePage<
    P extends ScrollPageViewBasePageProps = ScrollPageViewBasePageProps,
    S extends ScrollPageViewBasePageState = ScrollPageViewBasePageState,
  >
  extends Component<P, S>
  implements PageLifecycle
{
  constructor(props: P) {
    super(props);
  }

  render() {
    return <ScrollView style={styles.page} />;
  }

  componentDidMount() {
    console.log('组件已经加载-ScrollPageViewBasePage');
  }

  // 是否为选中的页面
  isSelectPage = false;

  pageWillAppear() {
    // console.log('页面即将显示');
  }

  pageDidAppear() {
    // console.log('页面已经显示');
  }

  pageWillDisappear() {
    // console.log('页面即将消失');
  }

  pageDidDisappear() {
    // console.log('页面已经消失');
  }

  handleSelectPage() {
    console.log('处理选中页面-ScrollPageViewBasePage');
  }

  handleUnselectPage() {
    console.log('处理由选中页面变为未选中页面-ScrollPageViewBasePage');
  }
}

const styles = StyleSheet.create({
  page: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
});
