import React, {ReactNode} from 'react';
import BasePage, {
  BasePageProps,
  BasePageState,
} from '../../bases/page/BasePage';
import {StyleSheet, View} from 'react-native';
import TestAlertView from './TestAlertView';
import Button from '../../bases/button/Button';

interface TestAlertPageProps extends BasePageProps {}

interface TestAlertPageState extends BasePageState {}

export default class TestAlertPage extends BasePage<
  TestAlertPageProps,
  TestAlertPageState
> {
  static pageName = 'TestAlertPage';

  testAlertViewRef = React.createRef<TestAlertView>();

  constructor(props: TestAlertPageProps) {
    super(props);
    this.state = {
      hasData: true,
    };
  }

  content(): ReactNode {
    return (
      <View style={styles.container}>
        <Button
          style={styles.button}
          data={'点击按钮'}
          onPress={() => {
            console.log('点击按钮');
            this.testAlertViewRef.current?.show();
          }}
        />
        <TestAlertView ref={this.testAlertViewRef} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    height: 44,
  },
});
