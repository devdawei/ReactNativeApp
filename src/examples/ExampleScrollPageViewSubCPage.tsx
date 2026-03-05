import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { ScrollPageViewBasePageProps } from '@/bases/components/ScrollPageView/ScrollPageViewBasePage'

interface SubCPageProps extends ScrollPageViewBasePageProps {
  content: string;
}

const ExampleScrollPageViewSubCPage = forwardRef((props: SubCPageProps, ref) => {

  useEffect(() => {
    console.log('ExampleScrollPageViewSubCPage init', props)
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
    console.log('C页面即将显示');
  }

  const pageDidAppear = () => {
    console.log('C页面已经显示');
  }

  const pageWillDisappear = () => {
    console.log('C页面即将消失');
  }

  const pageDidDisappear = () => {
    console.log('C页面已经消失');
  }

  const handleSelectPage = () => {
    console.log('C-处理选中页面');
  }

  const handleUnselectPage = () => {
    console.log('C-处理由选中页面变为未选中页面');
  }

  return (
    <ScrollView
      style={styles.container}
      // ref={this.scrollViewRef}
      // onScroll={this.onScroll}
      scrollEventThrottle={16}>
      <Text>内容内容内容内容内容{props.content}</Text>
      <Text>内容内容内容内容内容</Text>
    </ScrollView>
  )
})

export const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: '100%',
    backgroundColor: 'rgb(0, 255, 255)',
  },
})

export default ExampleScrollPageViewSubCPage
