import React, {ReactNode} from 'react';
import BasePage, {
  BasePageProps,
  BasePageState,
} from '../../bases/page/BasePage';
import {StyleSheet, View} from 'react-native';
import Button from '../../bases/button/Button';
import StorageManager from '../../managers/StorageManager';

interface TestStorageManagerPageProps extends BasePageProps {}

interface TestStorageManagerPageState extends BasePageState {}

export default class TestStorageManagerPage extends BasePage<
  TestStorageManagerPageProps,
  TestStorageManagerPageState
> {
  static pageName = 'TestStorageManagerPage';

  constructor(props: TestStorageManagerPageProps) {
    super(props);
    this.state = {
      hasData: true,
    };
  }

  content(): ReactNode {
    return (
      <View style={styles.container}>
        <Button
          style={{...styles.button}}
          data={'存储字符串'}
          onPress={() => {
            StorageManager.setString('k_str', 'v_str');
          }}
        />
        <Button
          style={styles.button}
          data={'读取字符串'}
          onPress={() => {
            StorageManager.getString('k_str').then(value => {
              console.log(value);
            });
          }}
        />
        <Button
          style={styles.button}
          data={'存储对象'}
          onPress={() => {
            let d: {[key: string]: any} = {
              k: 'v',
              k2: 'v2',
            };
            StorageManager.setObject('k_obj', d);
          }}
        />
        <Button
          style={styles.button}
          data={'读取对象'}
          onPress={() => {
            StorageManager.getObject('k_obj').then(value => {
              console.log(value);
            });
          }}
        />
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
