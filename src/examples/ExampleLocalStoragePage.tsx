import React, { useEffect, useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { PageProps } from '@bases/page/usePage'
import NavView from '@bases/navigation/NavView'
import NativeLocalStorage from '@/specs/NativeLocalStorage'

// 示例-本地存储
const ExampleLocalStoragePage = (props: PageProps) => {

  const [text, setText] = useState<string>('显示内容')

  useEffect(() => {
    console.log('ExampleLocalStoragePage init', props)
  }, [])

  return (
    <>
      <NavView {...props} title='示例-本地存储' />
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
        <TouchableOpacity style={styles.button} onPress={() => {
          NativeLocalStorage.setItem('value1', 'key1')
        }}>
          <Text style={styles.buttonText}>存储</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {
          const value = NativeLocalStorage.getItem('key1')
          setText(value || '')
        }}>
          <Text style={styles.buttonText}>读取</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {
          NativeLocalStorage.removeItem('key1')
          setText('')
        }}>
          <Text style={styles.buttonText}>移除</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(245, 245, 245)',
  },
  text: {
    margin: 16,
    textAlign: 'center',
    color: 'orange',
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

export default ExampleLocalStoragePage
