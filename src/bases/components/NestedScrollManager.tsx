import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';
import {RefObject} from 'react';

export default class NestedScrollManager {
  docked = false;

  superScrollViewHeight = 0;

  subScrollViewRefs: RefObject<ScrollView | FlatList>[] = [];
  addSubScrollViewRef(ref: RefObject<ScrollView | FlatList>) {
    this.subScrollViewRefs?.push(ref);
  }

  subScrollViewScrollToTop() {
    for (let ref of this.subScrollViewRefs) {
      let info = {x: 0, y: 0, animated: false};
      this.scrollTo(info, ref.current);
    }
  }

  isScrollView(obj: ScrollView | FlatList): obj is ScrollView {
    return obj && (obj as ScrollView).scrollTo !== undefined;
  }

  isFlatList(obj: ScrollView | FlatList): obj is FlatList {
    return obj && (obj as FlatList).scrollToOffset !== undefined;
  }

  scrollTo(
    info: {x: number; y: number; animated: boolean},
    scrollView: ScrollView | FlatList | null,
  ) {
    if (!scrollView) {
      return;
    }
    if (this.isScrollView(scrollView)) {
      scrollView.scrollTo(info);
    } else if (this.isFlatList(scrollView)) {
      scrollView.scrollToOffset({
        animated: info.animated,
        offset: info.y,
      });
    }
  }

  handleSuperContentSizeChange(w: number, h: number) {
    this.docked = h <= this.superScrollViewHeight;
  }

  handleSuperScroll(
    scrollView: ScrollView | FlatList | null,
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) {
    if (this.subScrollViewRefs.length === 0) {
      return;
    }
    let scrollViewContentHeight = event.nativeEvent.contentSize.height;
    if (scrollViewContentHeight <= 0) {
      return;
    }
    let offsetY = event.nativeEvent.contentOffset.y;
    let scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    let maxOffsetY = scrollViewContentHeight - scrollViewHeight;
    if (maxOffsetY < 0) {
      return;
    }
    // 设置/维持停靠状态
    if (offsetY > maxOffsetY || this.docked) {
      this.docked = true;
      let info = {x: 0, y: maxOffsetY, animated: false};
      this.scrollTo(info, scrollView);
    }
  }

  handleSubScroll(
    scrollView: ScrollView | FlatList | null,
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) {
    if (this.subScrollViewRefs.length === 0) {
      return;
    }
    if (this.docked) {
      if (event.nativeEvent.contentOffset.y < 0) {
        // 由停靠状态变为未停靠
        this.docked = false;
        this.subScrollViewScrollToTop();
      }
    } else {
      let info = {x: 0, y: 0, animated: false};
      this.scrollTo(info, scrollView);
    }
  }
}
