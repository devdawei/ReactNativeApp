import React, {ReactNode} from 'react';
import BasePage, {
  BasePageProps,
  BasePageState,
} from '../../bases/page/BasePage';
import {Modal, ScrollView, StyleSheet, Text, View} from 'react-native';
import ScrollPageView, {
  ScrollPageViewItem,
} from '../../bases/view/ScrollPageView';
import NaviButton from '../../bases/navi/NaviButton';
import TestScrollPageViewSubPageA from './TestScrollPageViewSubPageA';
import TestScrollPageViewSubPageB from './TestScrollPageViewSubPageB';
import TestScrollPageViewSubPageC from './TestScrollPageViewSubPageC';
import Button from '../../bases/button/Button';

interface TestScrollPageViewPageProps extends BasePageProps {}

interface TestScrollPageViewPageState extends BasePageState {
  modalVisible: boolean;
}

export default class TestScrollPageViewPage extends BasePage<
  TestScrollPageViewPageProps,
  TestScrollPageViewPageState
> {
  static pageName = 'TestScrollPageViewPage';

  scrollPageViewRef = React.createRef<ScrollPageView>();
  pageKeys: string[] = ['a', 'b', 'c', 'd'];
  // pageKeys: string[] = ['a', 'b', 'c'];
  // pageKeys: string[] = ['a', 'b'];
  // pageKeys: string[] = ['a'];
  // pageKeys: string[] = [];

  constructor(props: TestScrollPageViewPageProps) {
    super(props);
    this.state = {
      hasData: true,
      modalVisible: false,
    };
    this.pageShowOrHideNoticeObjs.push(this.scrollPageViewRef);
  }

  naviRight(): React.ReactNode {
    return (
      <NaviButton
        data={'点击'}
        onPress={() => {
          // this.scrollPageViewRef.current?.select(this.pageKeys.indexOf('a'));

          // this.pageKeys = ['a', 'b'];
          // // this.pageKeys = ['d', 'e'];
          // this.pageKeys = ['a', 'b', 'c', 'd'];
          // this.scrollPageViewRef.current?.refresh(this.pageKeys.length);

          this.setState(() => ({
            modalVisible: true,
          }));
        }}
      />
    );
  }

  content(): ReactNode {
    return (
      <View style={styles.container}>
        <ScrollPageView
          style={styles.scrollPageView}
          ref={this.scrollPageViewRef}
          pageCount={this.pageKeys.length}
          selectedIndex={0}
          renderItem={this.renderItem}
          onSelected={this.onSelected}
          onScrollToIndex={this.onScrollToIndex}
        />
        <Modal
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Button
                style={styles.button}
                data={'点击按钮'}
                onPress={() => {
                  console.log('点击按钮');
                  this.setState(() => ({
                    modalVisible: false,
                  }));
                }}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  renderItem = (item: ScrollPageViewItem) => {
    let key = this.pageKeys[item.index];
    if (key === 'a') {
      let ref = React.createRef<TestScrollPageViewSubPageA>();
      let ele = <TestScrollPageViewSubPageA ref={ref} />;
      return {ele: ele, ref: ref};
    } else if (key === 'b') {
      let ref = React.createRef<TestScrollPageViewSubPageB>();
      let ele = <TestScrollPageViewSubPageB ref={ref} />;
      return {ele: ele, ref: ref};
    } else {
      let ref = React.createRef<TestScrollPageViewSubPageC>();
      let ele = <TestScrollPageViewSubPageC ref={ref} content={key} />;
      return {ele: ele, ref: ref};
    }
  };

  onSelected = (index: number) => {
    console.log('回调选中', index);
  };

  onScrollToIndex = (index: number) => {
    console.log('回调 onScrollToIndex', index);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollPageView: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
    backgroundColor: 'red',
  },
  button: {
    height: 44,
  },
});
