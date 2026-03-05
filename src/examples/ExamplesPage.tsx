import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { PageProps } from '@bases/page/usePage'
import NavView from '@bases/navigation/NavView'
import NavButton from '@bases/navigation/NavButton'
import Nav from '@bases/navigation/nav'

// 示例页
const ExamplesPage = (props: PageProps) => {

  useEffect(() => {
    console.log('ExamplesPage init', props)
  }, [])

  const renderNavRight = () => {
    return (
      <NavButton {...props} data={'模版页'} onPress={() => {
        console.log('点击了导航栏按钮')
        Nav.push('TemplatePage', props.pageID)
      }} />
    )
  }

  return (
    <>
      <NavView {...props} title='示例' renderNavRight={renderNavRight} />
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => {
          Nav.push('ExampleBannerPage', props.pageID)
        }}>
          <Text style={styles.buttonText}>Banner</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {
          Nav.push('ExampleNativeComponentPage', props.pageID)
          // Nav.push('ExampleNativeComponentPage', props.pageID, {sourceURL: 'https://developer.apple.com'})
        }}>
          <Text style={styles.buttonText}>原生UI组件</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() => {
          Nav.push('ExampleSegmentedPage', props.pageID)
        }}>
          <Text style={styles.buttonText}>SegmentedView</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {
          Nav.push('ExampleScrollPageViewPage', props.pageID)
        }}>
          <Text style={styles.buttonText}>ScrollPageView</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {
          Nav.push('ExampleLocalStoragePage', props.pageID)
        }}>
          <Text style={styles.buttonText}>本地存储</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(245, 245, 245)',
  },
  button: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: 'black',
  },
})

export default ExamplesPage
