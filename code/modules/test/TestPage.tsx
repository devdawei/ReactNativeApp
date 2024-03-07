import React, {ReactNode} from 'react';
import BasePage, {
  BasePageProps,
  BasePageState,
} from '../../bases/page/BasePage';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {NaviRightStyles} from '../../bases/navi/NaviView';
import NaviButton from '../../bases/navi/NaviButton';
import RecommendPage from '../Recommend/RecommendPage';
import LearnPage from '../learn/LearnPage';
import Button from '../../bases/button/Button';
import TestBannerPage from './TestBannerPage';
import TestNativeViewPage from './TestNativeViewPage';
import TestToastPage from './TestToastPage';
import TestScrollPageViewPage from './TestScrollPageViewPage';
import TestStorageManagerPage from './TestStorageManagerPage';
import TestSegmentedViewPage from './TestSegmentedViewPage';
import TestScrollTabPage from './TestScrollTabPage';
import TestAlertPage from './TestAlertPage';

interface TestPageProps extends BasePageProps {}

interface TestPageState extends BasePageState {}

export default class TestPage extends BasePage<TestPageProps, TestPageState> {
  static pageName = 'TestPage';

  constructor(props: TestPageProps) {
    super(props);
    this.state = {
      title: '测试',
      hasData: true,
    };
  }

  naviRight = () => {
    return (
      <View style={NaviRightStyles.content}>
        <NaviButton
          data={'学习'}
          onPress={() => {
            // this.handleClick();
            this.push(LearnPage.pageName);
          }}
        />
        <NaviButton
          data={'推荐'}
          onPress={() => {
            // this.handleClick();
            this.push(RecommendPage.pageName);
          }}
        />
        {/*<NaviButton*/}
        {/*  data={{uri: 'ic_my_setting'}}*/}
        {/*  onPress={() => {*/}
        {/*    // this.handleClick();*/}
        {/*    this.push(LearnPage.pageName);*/}
        {/*  }}*/}
        {/*/>*/}
        {/*<NaviButton*/}
        {/*  data={{uri: 'ic_my_message'}}*/}
        {/*  onPress={() => {*/}
        {/*    // this.handleClick();*/}
        {/*    this.push(RecommendPage.pageName);*/}
        {/*  }}*/}
        {/*/>*/}
      </View>
    );
  };

  content(): ReactNode {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.topText}>{this.props.pageID}</Text>
        <Button
          style={styles.button}
          data={'测试 Banner 页面'}
          onPress={() => {
            this.push(TestBannerPage.pageName);
          }}
        />
        <Button
          style={styles.button}
          data={'测试 NativeView 页面'}
          onPress={() => {
            // this.push(TestNativeViewPage.pageName);
            this.present(TestNativeViewPage.pageName);
          }}
        />
        <Button
          style={styles.button}
          data={'测试 Toast 页面'}
          onPress={() => {
            this.push(TestToastPage.pageName);
          }}
        />
        <Button
          style={styles.button}
          data={'测试 Alert 页面'}
          onPress={() => {
            this.push(TestAlertPage.pageName);
          }}
        />
        <Button
          style={styles.button}
          data={'测试 SegmentedView 页面'}
          onPress={() => {
            this.push(TestSegmentedViewPage.pageName);
          }}
        />
        <Button
          style={styles.button}
          data={'测试 ScrollPageView 页面'}
          onPress={() => {
            this.push(TestScrollPageViewPage.pageName);
          }}
        />
        <Button
          style={styles.button}
          data={'测试 SegmentedView & ScrollPageView 组合页面'}
          onPress={() => {
            this.push(TestScrollTabPage.pageName);
          }}
        />
        <Button
          style={styles.button}
          data={'测试 StorageManagerPage 页面'}
          onPress={() => {
            this.push(TestStorageManagerPage.pageName);
          }}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 10,
    backgroundColor: 'rgb(245, 245, 245)',
  },
  topText: {
    padding: 10,
    textAlign: 'center',
  },
  button: {
    height: 44,
  },
});
