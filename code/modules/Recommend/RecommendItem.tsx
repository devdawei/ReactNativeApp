import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {RecommendItemModel} from './RecommendApi';
import Screen from '../../bases/tool/Screen';

export class RecommendItem {
  static renderItem(item: RecommendItemModel) {
    return (
      <View style={styles.container}>
        <Image source={{uri: item.pic}} style={styles.image} />
        <Text style={styles.text}>{item.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'cyan',
  },
  image: {
    width: Screen.width(),
    height: Screen.width() * (360 / 640) + 40,
  },
  text: {
    fontSize: 14,
    padding: 10,
    height: 40,
  },
});
