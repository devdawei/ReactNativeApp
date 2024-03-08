import React, {Component} from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import Screen from '../tool/Screen';
import ScrollPageViewBasePage from './ScrollPageViewBasePage';
import {PageShowOrHideInfo} from '../page/PageShowOrHideInfo';

export class ScrollPageViewItem {
  index: number = 0;
  loaded: boolean = false;
  key: string = '';
}

export interface ScrollPageViewRenderItem<T extends ScrollPageViewBasePage> {
  ele: T;
  ref: React.RefObject<T>;
}

export interface ScrollPageViewProps {
  style?: StyleProp<ViewStyle>;
  pageCount: number;
  selectedIndex?: number;
  renderItem: (item: ScrollPageViewItem) => ScrollPageViewRenderItem<any>;
  onSelected?: (index: number) => void;
  onScrollToIndex?: (index: number) => void;
}

export interface ScrollPageViewState {
  dataSource: ScrollPageViewItem[];
}

export default class ScrollPageView
  extends Component<ScrollPageViewProps, ScrollPageViewState>
  implements PageShowOrHideInfo
{
  flatListRef = React.createRef<FlatList>();

  selectedIndex = 0;
  offsetX: number = 0;

  constructor(props: ScrollPageViewProps) {
    super(props);
    let {pageCount, selectedIndex} = this.props;
    let dataSource = this.getDataSource(pageCount, selectedIndex);
    if (dataSource.length === 0) {
      dataSource.push({
        index: 0,
        loaded: true,
        key: 'default',
      });
    }
    this.state = {
      dataSource: dataSource,
    };
  }

  pageWillAppear() {
    console.log('ScrollPageView-页面即将显示');
    if (this.didHandleDefaultSelected) {
      let ref = this.getPageRef(this.selectedIndex);
      if (ref && ref.current) {
        ref.current.pageWillAppear();
      }
    }
  }

  pageDidAppear() {
    console.log('ScrollPageView-页面已经显示');
    if (this.didHandleDefaultSelected) {
      let ref = this.getPageRef(this.selectedIndex);
      if (ref && ref.current) {
        ref.current.pageDidAppear();
      }
    }
  }

  pageWillDisappear() {
    console.log('ScrollPageView-页面即将消失');
    if (this.didHandleDefaultSelected) {
      let ref = this.getPageRef(this.selectedIndex);
      if (ref && ref.current) {
        ref.current.pageWillDisappear();
      }
    }
  }

  pageDidDisappear() {
    console.log('ScrollPageView-页面已经消失');
    if (this.didHandleDefaultSelected) {
      let ref = this.getPageRef(this.selectedIndex);
      if (ref && ref.current) {
        ref.current.pageDidDisappear();
      }
    }
  }

  itemKey = 0;

  getDataSource(pageCount: number, selectedIndex?: number) {
    let dataSource: ScrollPageViewItem[] = [];
    let index = 0;
    if (selectedIndex && selectedIndex >= 0 && selectedIndex < pageCount) {
      index = selectedIndex;
    }
    for (let idx = 0; idx < pageCount; idx++) {
      let loaded = idx === index;
      if (loaded) {
        this.selectedIndex = idx;
        this.offsetX = Screen.width() * idx;
      }
      dataSource.push({
        index: idx,
        loaded: loaded,
        key: String(++this.itemKey),
      });
    }
    return dataSource;
  }

  refresh(pageCount: number, selectedIndex?: number) {
    this.renderedItems = {};
    let dataSource = this.getDataSource(pageCount, selectedIndex);
    this.setState(() => ({
      dataSource: dataSource,
    }));
    this.handleDefaultSelected();
  }

  private scrollToIndex = -1;

  select(index: number) {
    console.log('选中一项', index);
    if (index === this.selectedIndex) {
      return;
    }
    if (index < 0 || index >= this.state.dataSource.length) {
      return;
    }
    let offsetX = Screen.width() * index;
    console.log(index, offsetX);
    this.scrollToIndex = index;
    this.flatListRef.current?.scrollToOffset({
      animated: true,
      offset: offsetX,
    });
  }

  render() {
    return (
      <View style={this.props.style}>
        <FlatList
          ref={this.flatListRef}
          style={styles.container}
          data={this.state.dataSource}
          renderItem={({item}) => this.renderItem(item)}
          getItemLayout={this.getItemLayout}
          keyExtractor={item => item.key}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          bounces={false}
          onContentSizeChange={this.onContentSizeChange}
          onScroll={this.onScroll}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
        />
      </View>
    );
  }

  componentDidMount() {
    console.log('组件已经加载-ScrollPageView');
  }

  getItemLayout = (
    data: ArrayLike<ScrollPageViewItem> | null | undefined,
    index: number,
  ) => {
    // console.log('getItemLayout: ', index);
    let width = Screen.width();
    return {length: width, offset: width * index, index: index};
  };

  renderedItems: {[key: string]: ScrollPageViewRenderItem<any>} = {};

  renderItem = (item: ScrollPageViewItem) => {
    console.log('加载页面：', item);
    if (item.loaded) {
      if (item.key === 'default') {
        return <View style={styles.page} />;
      } else {
        let ri = this.renderedItems[String(item.index)];
        if (ri) {
          console.log('缓存');
          return ri.ele;
        } else {
          console.log('新加载');
          ri = this.props.renderItem(item);
          this.renderedItems[String(item.index)] = ri;
          return ri.ele;
        }
      }
    } else {
      return <View style={styles.page} />;
    }
  };

  didHandleDefaultSelected = false;

  onContentSizeChange = (w: number, h: number) => {
    console.log('宽', w, ' ', '高', h);
    if (w > Screen.width() && !this.didHandleDefaultSelected) {
      this.didHandleDefaultSelected = true;
      this.handleDefaultSelected();
    }
  };

  handleDefaultSelected = () => {
    this.flatListRef.current?.scrollToOffset({
      animated: false,
      offset: this.offsetX,
    });
    this.handleSelectPage();
  };

  onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    let offsetX = event.nativeEvent.contentOffset.x;
    let scrollToRight = false;
    if (offsetX > this.offsetX) {
      // console.log('向左滚动');
    } else if (offsetX < this.offsetX) {
      // console.log('向右滚动');
      scrollToRight = true;
    } else {
      // console.log('没变化');
    }
    this.offsetX = offsetX;
    let idx = this.indexWithOffsetX(offsetX);
    if (scrollToRight) {
      idx = Math.floor(offsetX / Screen.width());
    }
    // console.log('onScroll', offsetX, idx);
    if (this.props.onScrollToIndex) {
      if (this.scrollToIndex === -1) {
        this.props.onScrollToIndex(idx);
      } else {
        this.props.onScrollToIndex(this.scrollToIndex);
      }
    }
    if (
      this.scrollToIndex === -1 ||
      (this.scrollToIndex !== -1 && idx === this.scrollToIndex)
    ) {
      let dataSource = this.state.dataSource;
      let item = dataSource[idx];
      if (!item.loaded) {
        console.log('真正加载页面', idx);
        item.loaded = true;
        this.setState(() => ({
          dataSource: dataSource,
        }));
      }
    }
  };

  indexWithOffsetX(offsetX: number): number {
    return Math.ceil(offsetX / Screen.width());
  }

  onMomentumScrollEnd = () => {
    console.log('滚动结束', this.offsetX);
    this.selectedIndex = this.indexWithOffsetX(this.offsetX);
    this.props.onSelected && this.props.onSelected(this.selectedIndex);
    if (this.scrollToIndex !== -1) {
      this.scrollToIndex = -1;
    }
    this.handleSelectPage();
  };

  handleSelectPage() {
    console.log('');
    console.log('处理选中页面', this.selectedIndex);
    console.log('');
    let selectPageRef: React.RefObject<ScrollPageViewBasePage> | null = null;
    let unselectPageRef: React.RefObject<ScrollPageViewBasePage> | null = null;
    for (let key in this.renderedItems) {
      let ref = this.getPageRef(Number(key));
      if (Number(key) === this.selectedIndex) {
        if (ref && ref.current && !ref.current.isSelectPage) {
          selectPageRef = ref;
        }
      } else {
        if (ref && ref.current && ref.current.isSelectPage) {
          unselectPageRef = ref;
        }
      }
      console.log(key, ref?.current?.isSelectPage);
      console.log('');
    }
    if (unselectPageRef && unselectPageRef.current) {
      unselectPageRef.current.isSelectPage = false;
      unselectPageRef.current.handleUnselectPage();
      unselectPageRef.current.pageWillDisappear();
      unselectPageRef.current.pageDidDisappear();
    }
    if (selectPageRef && selectPageRef.current) {
      selectPageRef.current.isSelectPage = true;
      selectPageRef.current.handleSelectPage();
      selectPageRef.current.pageWillAppear();
      selectPageRef.current.pageDidAppear();
    }
  }

  getPageRef(index: number): React.RefObject<ScrollPageViewBasePage> | null {
    let dataSource = this.state.dataSource;
    if (dataSource && index < dataSource.length) {
      let key = String(dataSource[index].index);
      let ri = this.renderedItems[key];
      if (ri) {
        return ri.ref;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    width: Screen.width(),
    height: '100%',
  },
});
