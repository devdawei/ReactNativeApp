import React from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Screen from '../../bases/tool/Screen';
import ScrollPageViewBasePage, {
  ScrollPageViewBasePageProps,
} from '../../bases/view/ScrollPageViewBasePage';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

export default class TestScrollPageViewSubPageA extends ScrollPageViewBasePage {
  scrollViewRef = React.createRef<FlatList>();

  constructor(props: ScrollPageViewBasePageProps) {
    super(props);
    props.nestedScrollManager?.addSubScrollViewRef(this.scrollViewRef);
  }

  render() {
    return (
      <FlatList
        style={styles.page}
        ref={this.scrollViewRef}
        onScroll={this.onScroll}
        scrollEventThrottle={16}
        data={DATA}
        renderItem={this.renderItem}
      />
    );
  }

  pageWillAppear() {
    console.log('A页面即将显示');
  }

  pageDidAppear() {
    console.log('A页面已经显示');
  }

  pageWillDisappear() {
    console.log('A页面即将消失');
  }

  pageDidDisappear() {
    console.log('A页面已经消失');
  }

  renderItem = () => {
    return (
      <View>
        <Text>内容内容内容内容内容内容内容内容内容内容</Text>
        <Text style={styles.text}>内容内容内容内容内容内容内容内容内容</Text>
        <Text>内容内容内容内容内容内容内容内容内容内容</Text>
      </View>
    );
  };

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
    backgroundColor: 'rgb(255, 0, 0)',
  },
  text: {
    height: 300,
  },
});
