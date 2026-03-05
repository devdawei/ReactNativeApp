import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import { PageParams, PageProps } from '@bases/page/usePage'
import NavView from '@bases/navigation/NavView'
import NavButton from '@bases/navigation/NavButton'
import WebView from '@/specs/WebViewNativeComponent'

export interface ExampleNativeComponentPageParams extends PageParams {
  sourceURL?: string;
}

// 示例-原生UI组件
const ExampleNativeComponentPage = (props: PageProps<ExampleNativeComponentPageParams>) => {

  const [sourceURL, setSourceURL] = useState<string>()

  useEffect(() => {
    console.log('ExampleNativeComponentPage init', props)
    
    if (props.params?.sourceURL) {
      setSourceURL(props.params.sourceURL)
    } else {
      setSourceURL('https://www.baidu.com/')
    }

    return () => {
      console.log('ExampleNativeComponentPage destroy')
    }
  }, [])

  const renderNavRight = () => {
    return (
      <NavButton {...props} data={'更新'} onPress={() => {
        setSourceURL('https://www.bing.com/')
      }} />
    )
  }

  return (
    <>
      <NavView {...props} title='示例-原生UI组件' renderNavRight={renderNavRight} />
      <View style={styles.container}>
        <WebView
          sourceURL={sourceURL}
          style={styles.webview}
          onScriptLoaded={() => {
            Alert.alert('Page Loaded');
          }}
        />
    </View>
    </>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    width: '100%',
    height: '100%',
  },
})

export default ExampleNativeComponentPage
