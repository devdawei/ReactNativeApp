import React, {ReactNode} from 'react';
import BasePage, {
  BasePageProps,
  BasePageState,
} from '../../bases/page/BasePage';
import {
  LayoutChangeEvent,
  StyleSheet, Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SegmentedView, {SegmentedItem} from '../../bases/view/SegmentedView';
import Screen from '../../bases/tool/Screen';
import NaviButton from '../../bases/navi/NaviButton';
import setStyleAttributePreprocessor = StyleSheet.setStyleAttributePreprocessor;

interface TestSegmentedViewPageProps extends BasePageProps {}

interface TestSegmentedViewPageState extends BasePageState {}

export default class TestSegmentedViewPage extends BasePage<
  TestSegmentedViewPageProps,
  TestSegmentedViewPageState
> {
  static pageName = 'TestSegmentedViewPage';

  segmentedViewRef = React.createRef<SegmentedView>();
  segmentedTitles = [
    '第一个',
    '第二二个',
    '第三个',
    '第四四个',
    '第五个',
    '第六六个',
    '第七个',
  ];
  // segmentedTitles: string[] = [];

  constructor(props: TestSegmentedViewPageProps) {
    super(props);
    this.state = {
      hasData: true,
    };
  }

  naviRight(): React.ReactNode {
    return (
      <NaviButton
        data={'点击'}
        onPress={() => {
          // this.segmentedViewRef.current?.select(2);

          this.segmentedTitles = [
            '第一个',
            '第二二个',
            '第三个',
            '四四',
            '第五个',
            '第六六个',
            '米米米',
            '二二二',
          ];
          this.segmentedViewRef.current?.refresh(this.segmentedTitles, 3);
        }}
      />
    );
  }

  content(): ReactNode {
    return (
      <View style={styles.container}>
        <SegmentedView
          ref={this.segmentedViewRef}
          style={styles.segmentedView}
          titles={this.segmentedTitles}
          selectedIndex={1}
          configItem={this.configItem}
          // customItem={this.customItem}
          onSelected={this.onSelected}
        />
      </View>
    );
  }

  configItem = (item: SegmentedItem) => {
    console.log('配置item');
    // item.style = styles.item;
    // item.titleUnselectedStyle = styles.titleUnselected;
    // item.titleSelectedStyle = styles.titleSelected;
    // item.followBarStyle = styles.followBar;
  };

  // customItem = (item: SegmentedItem) => {
  //   return (
  //     <View>
  //       <Text>标题</Text>
  //       <Text>副标题</Text>
  //     </View>
  //   );
  // };

  onSelected = (index: number) => {
    console.log('回调选中', index);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  segmentedView: {
    width: Screen.width(),
    height: 44,
    backgroundColor: 'orange',
  },
  item: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  titleUnselected: {
    fontSize: 14,
    color: 'darkcyan',
  },
  titleSelected: {
    fontSize: 16,
    color: 'red',
  },
  followBar: {
    width: 30,
    marginBottom: 4,
    color: 'red',
  },
});
