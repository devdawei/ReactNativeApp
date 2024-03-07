import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import Screen from '../tool/Screen';
import NestedScrollManager from '../../managers/NestedScrollManager';
import {PageShowOrHideInfo} from '../page/PageShowOrHideInfo';

export interface ScrollPageViewBasePageProps {
  nestedScrollManager?: NestedScrollManager;
}

export interface ScrollPageViewBasePageState {}

export default class ScrollPageViewBasePage<
    P extends ScrollPageViewBasePageProps = ScrollPageViewBasePageProps,
    S extends ScrollPageViewBasePageState = ScrollPageViewBasePageState,
  >
  extends Component<P, S>
  implements PageShowOrHideInfo
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

  isSelectPage = false;

  handleSelectPage() {
    console.log('处理选中页面-ScrollPageViewBasePage');
  }

  handleUnselectPage() {
    console.log('处理由选中页面变为未选中页面-ScrollPageViewBasePage');
  }
}

const styles = StyleSheet.create({
  page: {
    width: Screen.width(),
    height: '100%',
  },
});
