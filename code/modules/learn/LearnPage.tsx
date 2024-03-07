import React from 'react';
import BasePage, {
  BasePageProps,
  BasePageState,
} from '../../bases/page/BasePage';
import {Modal, ScrollView, StyleSheet, Text, View} from 'react-native';
import Button from '../../bases/button/Button';

interface LearnPageProps extends BasePageProps {}

interface LearnPageStates extends BasePageState {
  modalVisible: boolean;
}

export default class LearnPage extends BasePage<
  LearnPageProps,
  LearnPageStates
> {
  static pageName = 'LearnPage';

  constructor(props: LearnPageProps) {
    super(props);
    this.state = {
      title: '学习',
      hasData: true,
      modalVisible: false,
    };
  }

  content() {
    return (
      <View style={styles.container}>
        <Button
          style={styles.button}
          data={'点击按钮'}
          onPress={() => {
            console.log('点击按钮');
            this.setState(() => ({
              modalVisible: true,
            }));
          }}
        />
        <ScrollView>
          <Text>内容内容内容内容内容内容内容内容内容内容内容</Text>
          <Text>内容内容内容内容内容内容内容内容内容内容内容</Text>
          <Text>内容内容内容内容内容内容内容内容内容内容内容</Text>
          <Text>内容内容内容内容内容内容内容内容内容内容内容</Text>
          <Text>内容内容内容内容内容内容内容内容内容内容内容</Text>
          <Text>内容内容内容内容内容内容内容内容内容内容内容</Text>
        </ScrollView>
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Button
                style={styles.button}
                data={'点击按钮'}
                onPress={() => {
                  console.log('点击按钮');
                  this.setState(() => ({
                    modalVisible: false,
                  }));
                }}
              />
            </View>
          </View>
        </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: 300,
    height: 300,
    backgroundColor: 'red',
  },
});
