import React, { useEffect, useRef, useState } from 'react'
import { Button, Dimensions, Modal, ScrollView, StyleSheet, View } from 'react-native'
import { PageProps } from '@bases/page/usePage'
import NavView from '@bases/navigation/NavView'
import NavButton from '@bases/navigation/NavButton'
import ScrollPageView, { ScrollPageViewItem } from '@/bases/components/ScrollPageView/ScrollPageView'
import ExampleScrollPageViewSubAPage from './ExampleScrollPageViewSubAPage'
import ExampleScrollPageViewSubBPage from './ExampleScrollPageViewSubBPage'
import ExampleScrollPageViewSubCPage from './ExampleScrollPageViewSubCPage'
import { ScrollPageViewBasePageProps } from '@/bases/components/ScrollPageView/ScrollPageViewBasePage'

// 示例-ScrollPageView
const ExampleScrollPageViewPage = (props: PageProps) => {

  const scrollPageViewRef = useRef<ScrollPageView>(null)
  let pageKeys: string[] = ['a', 'b', 'c', 'd'];

  useEffect(() => {
    console.log('ExampleScrollPageViewPage init', props)
  }, [])

  const renderNavRight = () => {
    return (
      <NavButton {...props} data={'选中'} onPress={() => {
          scrollPageViewRef.current?.select(pageKeys.indexOf('c'));

          // pageKeys = ['a', 'b'];
          // // pageKeys = ['d', 'e'];
          // // pageKeys = ['a', 'b', 'c', 'd'];
          // scrollPageViewRef.current?.refresh(pageKeys.length);

      }} />
    )
  }

  const renderItem = (item: ScrollPageViewItem) => {
    let key = pageKeys[item.index];
    if (key === 'a') {
      let ref = React.createRef<ScrollPageViewBasePageProps>();
      let ele = <ExampleScrollPageViewSubAPage ref={ref} />;
      return {ele: ele, ref: ref};
    } else if (key === 'b') {
      let ref = React.createRef<ScrollPageViewBasePageProps>();
      let ele = <ExampleScrollPageViewSubBPage ref={ref} />;
      return {ele: ele, ref: ref};
    } else {
      let ref = React.createRef<ScrollPageViewBasePageProps>();
      let ele = <ExampleScrollPageViewSubCPage ref={ref} content={key} />;
      return {ele: ele, ref: ref};
    }
  };

  const onSelected = (index: number) => {
    console.log('回调选中', index);
  };

  const onScrollToIndex = (index: number) => {
    console.log('回调 onScrollToIndex', index);
  };

  return (
    <View style={styles.container}>
      <NavView {...props} title='示例-ScrollPageView' renderNavRight={renderNavRight} />
      <ScrollPageView
        style={styles.scrollPageView}
        ref={scrollPageViewRef}
        pageCount={pageKeys.length}
        selectedIndex={0}
        renderItem={renderItem}
        onSelected={onSelected}
        onScrollToIndex={onScrollToIndex}
      />
    </View>
  )
}

export const styles = StyleSheet.create({
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
})

export default ExampleScrollPageViewPage
