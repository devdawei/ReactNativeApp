import React, {Component} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';

export interface ToastProps {}

export interface ToastState {
  visible: boolean;
  text: string;
}

export default class Toast extends Component<ToastProps, ToastState> {
  constructor(props: ToastProps) {
    super(props);
    this.state = {
      visible: false,
      text: '',
    };
  }

  show(text: string) {
    this.setState(() => ({
      visible: true,
      text: text,
    }));
    this.removeAfterDelay(text);
  }

  hide() {
    this.setState(() => ({
      visible: false,
    }));
  }

  timeoutHandler = () => {
    this.hide();
  };

  timer?: NodeJS.Timeout;
  removeAfterDelay(text: string) {
    this.removeTimerIfNeed();
    let ms = text.length * 200;
    if (ms < 3000) {
      ms = 3000;
    }
    this.timer = setTimeout(this.timeoutHandler, ms);
  }

  removeTimerIfNeed() {
    this.timer && clearTimeout(this.timer);
  }

  componentWillUnmount() {
    this.removeTimerIfNeed();
  }

  render() {
    return (
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={this.state.visible}
        onRequestClose={() => {
          this.hide();
        }}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.text}>{this.state.text}</Text>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
    borderRadius: 10,
    backgroundColor: 'rgba(80, 80, 80, 1)',
  },
  text: {
    margin: 12,
    color: '#EEE',
    fontSize: 15,
  },
});
