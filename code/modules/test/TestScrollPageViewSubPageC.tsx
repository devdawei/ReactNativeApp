import React from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import Screen from '../../bases/tool/Screen';
import ScrollPageViewBasePage, {
  ScrollPageViewBasePageProps,
} from '../../bases/view/ScrollPageViewBasePage';

export interface TestScrollPageViewContentCProps
  extends ScrollPageViewBasePageProps {
  content: string;
}

export default class TestScrollPageViewSubPageC extends ScrollPageViewBasePage<TestScrollPageViewContentCProps> {
  scrollViewRef = React.createRef<ScrollView>();

  constructor(props: TestScrollPageViewContentCProps) {
    super(props);
    props.nestedScrollManager?.addSubScrollViewRef(this.scrollViewRef);
  }

  render() {
    return (
      <ScrollView
        style={styles.page}
        ref={this.scrollViewRef}
        onScroll={this.onScroll}
        scrollEventThrottle={16}>
        <Text>内容内容内容内容内容{this.props.content}</Text>
        <Text>内容内容内容内容内容{this.props.content}</Text>
      </ScrollView>
    );
  }

  pageWillAppear() {
    console.log('c页面即将显示');
  }

  pageDidAppear() {
    console.log('c页面已经显示');
  }

  pageWillDisappear() {
    console.log('c页面即将消失');
  }

  pageDidDisappear() {
    console.log('c页面已经消失');
  }

  onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    this.props.nestedScrollManager?.handleSubScroll(
      this.scrollViewRef.current,
      event,
    );
  };
}

const styles = StyleSheet.create({
  page: {
    width: Screen.width(),
    height: '100%',
    backgroundColor: 'rgb(0, 255, 255)',
  },
});
