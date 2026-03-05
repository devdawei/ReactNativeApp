import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { ScrollPageViewBasePageProps } from '@/bases/components/ScrollPageView/ScrollPageViewBasePage'

interface SubBPageProps extends ScrollPageViewBasePageProps {}

const ExampleScrollPageViewSubBPage = forwardRef((props: SubBPageProps, ref) => {

  useEffect(() => {
    console.log('ExampleScrollPageViewSubBPage init', props)
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
    console.log('B页面即将显示');
  }

  const pageDidAppear = () => {
    console.log('B页面已经显示');
  }

  const pageWillDisappear = () => {
    console.log('B页面即将消失');
  }

  const pageDidDisappear = () => {
    console.log('B页面已经消失');
  }

  const handleSelectPage = () => {
    console.log('B-处理选中页面');
  }

  const handleUnselectPage = () => {
    console.log('B-处理由选中页面变为未选中页面');
  }

  return (
    <ScrollView
      style={styles.container}
      // ref={this.scrollViewRef}
      // onScroll={this.onScroll}
      scrollEventThrottle={16}>
      <Text>内容222内容222内容222内容222内容222</Text>
      <Text>内容222内容222内容222内容222内容222</Text>
    </ScrollView>
  )
})

export const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: '100%',
    backgroundColor: 'rgb(255, 255, 0)',
  },
})

export default ExampleScrollPageViewSubBPage
