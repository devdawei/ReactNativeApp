import React, {Component} from 'react';
import {
  Animated,
  LayoutChangeEvent,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

export interface SegmentedItemStyle {
  width?: number;
  paddingLeft: number;
  paddingRight: number;
}

export interface SegmentedFollowBarStyle {
  width?: number;
  marginBottom?: number;
  color: string;
}

export class SegmentedItem {
  index: number = 0;
  selected: boolean = false;
  title: string = '';
  x: number = 0;
  width: number = 0;

  style: SegmentedItemStyle = {
    paddingLeft: 8,
    paddingRight: 8,
  };
  titleUnselectedStyle = styles.titleUnselected;
  titleSelectedStyle = styles.titleSelected;
  followBarStyle: SegmentedFollowBarStyle = {
    color: styles.titleSelected.color,
  };

  key: string = '';
}

export interface SegmentedViewProps {
  style?: StyleProp<ViewStyle>;
  titles: string[];
  selectedIndex?: number;
  configItem?: (item: SegmentedItem) => void;
  customItem?: (item: SegmentedItem) => React.ReactNode;
  onSelected?: (index: number) => void;
}

export interface SegmentedViewState {
  dataSource: SegmentedItem[];
  followBarOffsetX: Animated.Value;
  followBarWidth: Animated.Value;
  followBarMarginBottom: number;
  followBarColor: string;
}

export default class SegmentedView extends Component<
  SegmentedViewProps,
  SegmentedViewState
> {
  scrollViewRef = React.createRef<ScrollView>();

  selectedIndex = 0;

  constructor(props: SegmentedViewProps) {
    super(props);
    let dataSource = this.getDataSource(props.titles, props.selectedIndex);
    this.state = {
      dataSource: dataSource,
      followBarOffsetX: new Animated.Value(0),
      followBarWidth: new Animated.Value(0),
      followBarMarginBottom: 0,
      followBarColor: styles.titleSelected.color,
    };
  }

  itemKey = 0;

  getDataSource(titles: string[], selectedIndex?: number) {
    let dataSource: SegmentedItem[] = [];
    let index = 0;
    if (selectedIndex && selectedIndex >= 0 && selectedIndex < titles.length) {
      index = selectedIndex;
    }
    for (let idx = 0; idx < titles.length; idx++) {
      let selected = idx === index;
      if (selected) {
        this.selectedIndex = idx;
      }
      let item = new SegmentedItem();
      item.index = idx;
      item.selected = selected;
      item.title = titles[idx];
      item.key = String(++this.itemKey);
      this.props.configItem && this.props.configItem(item);
      dataSource.push(item);
    }
    return dataSource;
  }

  refresh(titles: string[], selectedIndex?: number) {
    // console.log('刷新');
    this.itemsLayoutFinish = false;
    this.needHandleDefaultSelected = true;

    let dataSource = this.getDataSource(titles, selectedIndex);
    this.setState(() => ({
      dataSource: dataSource,
    }));
  }

  select(index: number) {
    // console.log('选中一项', index);
    if (index === this.selectedIndex) {
      return;
    }
    if (index < 0 || index >= this.state.dataSource.length) {
      return;
    }
    let dataSource = this.state.dataSource;
    for (let obj of dataSource) {
      if (obj.selected) {
        obj.selected = false;
      } else if (obj.index === index) {
        obj.selected = true;
        this.selectedIndex = obj.index;
      }
    }
    this.setState(() => ({
      dataSource: dataSource,
    }));
    this.scrollTo(index);
  }

  private scrollTo(index: number) {
    this.scrollToItem(index);
    this.scrollFollowBar(index);
  }

  private scrollToItem(index: number) {
    let dataSource = this.state.dataSource;
    let item = dataSource[index];
    let itemContentWidth =
      item.width - item.style.paddingLeft - item.style.paddingRight;
    let toCenterX = item.x + item.style.paddingLeft + itemContentWidth / 2;
    let offsetX;
    let maxOffsetX = this.totalWidth - this.lislltWidth;
    let flagOffsetX = toCenterX - this.lislltWidth / 2;
    if (flagOffsetX < 0) {
      offsetX = 0;
    } else if (flagOffsetX > maxOffsetX) {
      offsetX = maxOffsetX;
    } else {
      offsetX = flagOffsetX;
    }
    this.scrollViewRef.current?.scrollTo({x: offsetX, y: 0, animated: true});
  }

  private scrollFollowBar(index: number) {
    let dataSource = this.state.dataSource;
    let item = dataSource[index];
    let followBarWidth;
    if (item.followBarStyle.width) {
      followBarWidth = item.followBarStyle.width;
    } else {
      let itemContentWidth =
        item.width - item.style.paddingLeft - item.style.paddingRight;
      followBarWidth = itemContentWidth - 2;
    }
    let followBarOffsetX = item.x + (item.width - followBarWidth) / 2 - 1 / 2;
    let animatedDuration = 300;
    Animated.parallel([
      Animated.timing(this.state.followBarOffsetX, {
        useNativeDriver: false,
        toValue: followBarOffsetX,
        duration: animatedDuration,
      }),
      Animated.timing(this.state.followBarWidth, {
        useNativeDriver: false,
        toValue: followBarWidth,
        duration: animatedDuration,
      }),
    ]).start();
    let marginBottom = 0;
    if (item.followBarStyle.marginBottom) {
      marginBottom = item.followBarStyle.marginBottom;
    }
    if (marginBottom > 0) {
      this.setState(() => ({
        followBarMarginBottom: marginBottom,
        followBarColor: item.followBarStyle.color,
      }));
    } else {
      this.setState(() => ({
        followBarColor: item.followBarStyle.color,
      }));
    }
  }

  render() {
    return (
      <View style={[styles.view, this.props.style]}>
        <ScrollView
          ref={this.scrollViewRef}
          style={styles.container}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onLayout={this.onLayout}>
          {this.getItems()}
          <Animated.View
            style={{
              ...styles.followBarContainer,
              marginLeft: this.state.followBarOffsetX,
              width: this.state.followBarWidth,
            }}>
            <View
              style={{
                ...styles.followBar,
                marginBottom: this.state.followBarMarginBottom,
                backgroundColor: this.state.followBarColor,
              }}
            />
          </Animated.View>
        </ScrollView>
      </View>
    );
  }

  getItems() {
    let items = [];
    let dataSource = this.state.dataSource;
    for (let d of dataSource) {
      items.push(this.renderItem(d));
    }
    return items;
  }

  renderItem = (item: SegmentedItem) => {
    // console.log('加载项：', item);
    let {customItem, onSelected} = this.props;
    return (
      <TouchableOpacity
        key={item.key}
        style={[styles.item, item.style]}
        onPress={() => {
          if (!item.selected) {
            this.select(item.index);
            onSelected && onSelected(item.index);
          }
        }}
        onLayout={(event: LayoutChangeEvent) => {
          this.onItemLayout(item, event);
        }}>
        {this.getItemContent(item, customItem)}
      </TouchableOpacity>
    );
  };

  getItemContent(
    item: SegmentedItem,
    customItem?: (item: SegmentedItem) => React.ReactNode,
  ) {
    if (customItem) {
      return customItem(item);
    } else {
      return (
        <Text
          style={
            item.selected ? item.titleSelectedStyle : item.titleUnselectedStyle
          }>
          {item.title}
        </Text>
      );
    }
  }

  lislltWidth = 0;
  listLayoutFinish = false;
  needHandleDefaultSelectedWhenListLayoutFinish = false;

  onLayout = (event: LayoutChangeEvent) => {
    // console.log('父布局完成', event.nativeEvent.layout);
    this.lislltWidth = event.nativeEvent.layout.width;
    this.listLayoutFinish = true;
    if (this.needHandleDefaultSelectedWhenListLayoutFinish) {
      this.needHandleDefaultSelectedWhenListLayoutFinish = false;
      // console.log('父布局处理默认选中');
      this.scrollTo(this.selectedIndex);
    }
  };

  itemsLayoutFinish = false;
  itemsLayoutCount = 0;
  totalWidth = 0;

  needHandleDefaultSelected = true;

  onItemLayout = (item: SegmentedItem, event: LayoutChangeEvent) => {
    // console.log('子项布局', item.index, event.nativeEvent.layout);
    let width = event.nativeEvent.layout.width;
    if (this.itemsLayoutFinish) {
      // console.log('更新子项布局');
      if (width !== item.width) {
        item.width = width;
        this.handleTotalWidth();
        // console.log('更新子项布局，处理默认选中');
        this.scrollTo(this.selectedIndex);
      }
    } else {
      item.width = width;
      if (++this.itemsLayoutCount === this.state.dataSource.length) {
        // console.log('子项布局结束');
        this.itemsLayoutFinish = true;
        this.itemsLayoutCount = 0;
        this.handleTotalWidth();
        if (this.needHandleDefaultSelected) {
          this.needHandleDefaultSelected = false;
          if (this.listLayoutFinish) {
            // console.log('父布局已结束，可以进行处理默认选中');
            this.scrollTo(this.selectedIndex);
          } else {
            // console.log('父布局没完成，稍后处理');
            this.needHandleDefaultSelectedWhenListLayoutFinish = true;
          }
        }
      }
    }
  };

  handleTotalWidth() {
    this.totalWidth = 0;
    let dataSource = this.state.dataSource;
    let x = 0;
    for (let obj of dataSource) {
      obj.x = x;
      x += obj.width;
      this.totalWidth += obj.width;
      // console.log(obj);
    }
    // console.log('内容总宽度', this.totalWidth);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    backgroundColor: 'white',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleUnselected: {
    fontSize: 15,
    color: 'rgb(51, 51, 51)',
  },
  titleSelected: {
    fontSize: 15,
    color: 'rgb(0, 100, 255)',
  },
  followBarContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  followBar: {
    width: '100%',
    height: 2,
    borderRadius: 1,
  },
});
