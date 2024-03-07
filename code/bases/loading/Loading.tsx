import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

export interface LoadingProps {
  // style?: StyleProp<ViewStyle>;
}

export interface LoadingState {}

export default class Loading extends Component<LoadingProps, LoadingState> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <ActivityIndicator size={'large'} color={'#333'} />
          {/*<ActivityIndicator size={'small'} color={'#EEE'} />*/}
          {/*<Text style={styles.text}>加载中</Text>*/}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 88,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderRadius: 10,
    // backgroundColor: 'rgba(80, 80, 80, 1)',
  },
  // text: {
  //   color: '#EEE',
  //   fontSize: 12,
  //   paddingTop: 4,
  // },
});
