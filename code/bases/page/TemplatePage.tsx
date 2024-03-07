import React, {ReactNode} from 'react';
import BasePage, {
  BasePageProps,
  BasePageState,
} from '../../bases/page/BasePage';
import {StyleSheet, View} from 'react-native';

interface TemplatePageProps extends BasePageProps {}

interface TemplatePageState extends BasePageState {}

export default class TemplatePage extends BasePage<
  TemplatePageProps,
  TemplatePageState
> {
  static pageName = 'TemplatePage';

  constructor(props: TemplatePageProps) {
    super(props);
    this.state = {
      hasData: false,
    };
  }

  content(): ReactNode {
    return (
      <View style={styles.container}>
        {/* 这个是模板页面，创建新页面时，可复制此页面内容，搜索 TemplatePage 进行替换 */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
