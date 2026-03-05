import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { PageProps } from '@bases/page/usePage'
import NavView from '@bases/navigation/NavView'
import NavButton from '@bases/navigation/NavButton'
import Nav from '@bases/navigation/nav'
import Notify from '@bases/notify/notify'

// 参考模板页
const TemplatePage = (props: PageProps) => {

  useEffect(() => {
    console.log('TemplatePage init', props)
    // 订阅通知
    const emit = Notify.subscribe('TestNotify', (data) => {
      console.log('TemplatePage 收到通知:', data)
    })
    return () => {
      console.log('TemplatePage destroy')
      // 移除订阅
      emit.remove()
    }
  }, [])

  const [showRedView, setShowRedView] = useState(false)

  const onPressRed = () => {
    console.log('Red button clicked')
    setShowRedView(!showRedView)
    // 发送通知
    Notify.post('TestNotify', {
      name: 'test',
      age: 18,
    })
  }

  const renderRedView = () => {
    if (!showRedView) {
      return null
    }
    return (
      <View style={styles.redView}></View>
    )
  }

  const onPressGreen = () => {
    console.log('Green button clicked')
    Nav.present('TemplatePage', props.pageID)
  }

  const renderNavRight = () => {
    return (
      <NavButton {...props} data={'按钮'} onPress={() => {
        console.log('点击了导航栏按钮')
        Nav.push('TemplatePage', props.pageID)
      }} />
    )
  }

  const renderNavRights = () => {
    return (
      <>
        <NavButton {...props} data={'按钮'} onPress={() => {
          console.log('点击了按钮')
        }} />
        <NavButton {...props} data={'按钮1'} onPress={() => {
          console.log('点击了按钮1')
        }} />
      </>
    )
  }

  return (
    <>
      <NavView {...props} title='标题' renderNavRight={renderNavRight} />
      <ScrollView style={styles.container}>
        <View style={styles.cyanView}></View>
        <TouchableOpacity style={styles.redButton} onPress={onPressRed}>
          <Text>点击</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.greenButton} onPress={onPressGreen}>
          <Text>点击</Text>
        </TouchableOpacity>
        {renderRedView()}
      </ScrollView>
    </>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cyanView: {
    backgroundColor: 'cyan',
    width: '100%',
    height: 300,
  },
  redButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 40,
  },
  greenButton: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 40,
  },
  redView: {
    backgroundColor: 'rgb(255, 0, 0)',
    width: '100%',
    height: 300,
  },
})

export default TemplatePage
