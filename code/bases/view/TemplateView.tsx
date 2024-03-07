import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

export interface TemplateViewProps {}

export interface TemplateViewState {}

export default class TemplateView extends Component<
  TemplateViewProps,
  TemplateViewState
> {
  constructor(props: TemplateViewProps) {
    super(props);
  }

  render() {
    return (
      <View>
        {/* 这个是模板页面，创建新页面时，可复制此页面内容，搜索 TemplateView 进行替换 */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
