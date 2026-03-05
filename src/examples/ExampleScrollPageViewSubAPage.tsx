import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { ScrollPageViewBasePageProps } from '@/bases/components/ScrollPageView/ScrollPageViewBasePage'

interface SubAPageProps extends ScrollPageViewBasePageProps {}

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

const ExampleScrollPageViewSubAPage = forwardRef((props: SubAPageProps, ref) => {

  useEffect(() => {
    console.log('ExampleScrollPageViewSubAPage init', props)
  }, [])

  useImperativeHandle(ref, () => ({
    isSelectPage,
    pageWillAppear,
    pageDidAppear,
    pageWillDisappear,
    pageDidDisappear,
    handleSelectPage,
    handleUnselectPage,
  }))

  // 是否为选中的页面
  const isSelectPage = false;

  const pageWillAppear = () => {
    console.log('A页面即将显示');
  }

  const pageDidAppear = () => {
    console.log('A页面已经显示');
  }

  const pageWillDisappear = () => {
    console.log('A页面即将消失');
  }

  const pageDidDisappear = () => {
    console.log('A页面已经消失');
  }

  const handleSelectPage = () => {
    console.log('A-处理选中页面');
  }

  const handleUnselectPage = () => {
    console.log('A-处理由选中页面变为未选中页面');
  }

  const renderItem = () => {
    return (
      <View>
        <Text>内容内容内容内容内容内容内容内容内容内容</Text>
        <Text style={styles.text}>内容内容内容内容内容内容内容内容内容</Text>
        <Text>内容内容内容内容内容内容内容内容内容内容</Text>
      </View>
    );
  };

  return (
    <FlatList
      style={styles.container}
      // ref={scrollViewRef}
      // onScroll={onScroll}
      scrollEventThrottle={16}
      data={DATA}
      renderItem={renderItem}
    />
  )
})

export const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: '100%',
    backgroundColor: 'rgb(255, 0, 0)',
  },
  text: {
    height: 300,
  },
})

export default ExampleScrollPageViewSubAPage
