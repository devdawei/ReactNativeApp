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

export default class TestScrollPageViewSubPageB extends ScrollPageViewBasePage {
  scrollViewRef = React.createRef<ScrollView>();

  constructor(props: ScrollPageViewBasePageProps) {
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
        <Text>内容222内容222内容222内容222内容222</Text>
        <Text>内容222内容222内容222内容222内容222</Text>
      </ScrollView>
    );
  }

  pageWillAppear() {
    console.log('b页面即将显示');
  }

  pageDidAppear() {
    console.log('b页面已经显示');
  }

  pageWillDisappear() {
    console.log('b页面即将消失');
  }

  pageDidDisappear() {
    console.log('b页面已经消失');
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
    backgroundColor: 'rgb(255, 255, 0)',
  },
});
