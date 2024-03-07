import React, {ReactNode} from 'react';
import BasePage, {
  BasePageProps,
  BasePageState,
} from '../../bases/page/BasePage';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SegmentedView from '../../bases/view/SegmentedView';
import Screen from '../../bases/tool/Screen';
import ScrollPageView, {
  ScrollPageViewItem,
} from '../../bases/view/ScrollPageView';
import TestScrollPageViewSubPageA from './TestScrollPageViewSubPageA';
import TestScrollPageViewSubPageB from './TestScrollPageViewSubPageB';
import TestScrollPageViewSubPageC from './TestScrollPageViewSubPageC';
import NestedScrollManager from '../../bases/view/NestedScrollManager';
import NaviButton from '../../bases/navi/NaviButton';
import LearnPage from '../learn/LearnPage';

interface TestScrollTabPageProps extends BasePageProps {}

interface TestScrollTabPageState extends BasePageState {}

export default class TestScrollTabPage extends BasePage<
  TestScrollTabPageProps,
  TestScrollTabPageState
> {
  static pageName = 'TestScrollTabPage';

  nestedScrollManager = new NestedScrollManager();
  scrollViewRef = React.createRef<ScrollView>();

  segmentedViewRef = React.createRef<SegmentedView>();
  segmentedTitles = ['第一个', '第二二个', '第三个', '第四四个', '第五个'];

  scrollPageViewRef = React.createRef<ScrollPageView>();
  pageKeys: string[] = ['a', 'b', 'c', 'd', 'e'];

  constructor(props: TestScrollTabPageProps) {
    super(props);
    this.state = {
      hasData: true,
    };
    this.pageShowOrHideNoticeObjs.push(this.scrollPageViewRef);
    this.nestedScrollManager.superScrollViewHeight =
      Screen.height() - Screen.naviHeight();
  }

  naviRight = () => {
    return (
      <NaviButton
        data={'右侧'}
        onPress={() => {
          this.push(LearnPage.pageName);
        }}
      />
    );
  };

  content(): ReactNode {
    return (
      <ScrollView
        ref={this.scrollViewRef}
        style={this.styles.container}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={this.onContentSizeChange}
        onScroll={this.onScroll}
        scrollEventThrottle={16}
        recognizeSimultaneously={true}>
        <View style={this.styles.topView}>
          <Text>文本文本文本文本文本文本</Text>
          <Text>文本文本文本文本文本文本</Text>
          <Text>文本文本文本文本文本文本</Text>
          <Text>文本文本文本文本文本文本</Text>
          <Text>文本文本文本文本文本文本</Text>
        </View>
        <SegmentedView
          ref={this.segmentedViewRef}
          style={this.styles.segmentedView}
          titles={this.segmentedTitles}
          selectedIndex={1}
          onSelected={this.segmentedViewOnSelected}
        />
        <ScrollPageView
          ref={this.scrollPageViewRef}
          style={this.styles.scrollPageView}
          pageCount={this.pageKeys.length}
          selectedIndex={1}
          renderItem={this.scrollPageViewRenderItem}
          onSelected={this.scrollPageViewOnSelected}
          onScrollToIndex={this.scrollPageViewOnScrollToIndex}
        />
      </ScrollView>
    );
  }

  onContentSizeChange = (w: number, h: number) => {
    this.nestedScrollManager.handleSuperContentSizeChange(w, h);
  };

  onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    this.nestedScrollManager.handleSuperScroll(
      this.scrollViewRef.current,
      event,
    );
  };

  segmentedViewOnSelected = (index: number) => {
    console.log('SegmentedView 回调选中', index);
    this.scrollPageViewRef.current?.select(index);
  };

  scrollPageViewOnSelected = (index: number) => {
    console.log('ScrollPageView 回调选中', index);
    this.segmentedViewRef.current?.select(index);
  };

  scrollPageViewOnScrollToIndex = (index: number) => {
    console.log('回调 onScrollToIndex', index);
    this.segmentedViewRef.current?.select(index);
  };

  scrollPageViewRenderItem = (item: ScrollPageViewItem) => {
    let key = this.pageKeys[item.index];
    if (key === 'a') {
      let ref = React.createRef<TestScrollPageViewSubPageA>();
      let ele = (
        <TestScrollPageViewSubPageA
          ref={ref}
          nestedScrollManager={this.nestedScrollManager}
        />
      );
      return {ele: ele, ref: ref};
    } else if (key === 'b') {
      let ref = React.createRef<TestScrollPageViewSubPageB>();
      let ele = (
        <TestScrollPageViewSubPageB
          ref={ref}
          nestedScrollManager={this.nestedScrollManager}
        />
      );
      return {ele: ele, ref: ref};
    } else {
      let ref = React.createRef<TestScrollPageViewSubPageC>();
      let ele = (
        <TestScrollPageViewSubPageC
          ref={ref}
          nestedScrollManager={this.nestedScrollManager}
          content={key}
        />
      );
      return {ele: ele, ref: ref};
    }
  };

  styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    topView: {
      width: Screen.width(),
      height: 300,
      backgroundColor: 'gray',
    },
    segmentedView: {
      width: Screen.width(),
      height: 44,
      backgroundColor: 'orange',
    },
    scrollPageView: {
      // flex: 1,
      width: Screen.width(),
      height: Screen.height() - Screen.naviHeight() - 44,
    },
  });
}
