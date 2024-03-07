import React, {Component} from 'react';
import {Modal, ModalProps, StyleSheet, View} from 'react-native';
import Button from '../../bases/button/Button';
import {Animated} from 'react-native';
import AnimatedValue = Animated.AnimatedValue;

export interface AlertViewProps {}

export interface AlertViewState {
  visible: boolean;
  bgOpacity: AnimatedValue;
}

export default class TestAlertView extends Component<
  AlertViewProps,
  AlertViewState
> {
  constructor(props: AlertViewProps) {
    super(props);
    this.state = {
      visible: false,
      bgOpacity: new Animated.Value(0),
    };
  }

  show() {
    this.setState(() => ({
      visible: true,
    }));
    Animated.timing(this.state.bgOpacity, {
      useNativeDriver: false,
      toValue: 1,
      duration: 200,
    }).start();
  }

  hide() {
    Animated.timing(this.state.bgOpacity, {
      useNativeDriver: false,
      toValue: 0,
      duration: 200,
    }).start(() => {
      this.setState(() => ({
        visible: false,
      }));
    });
  }

  render() {
    return (
      <Modal
        animationType={'none'}
        transparent={true}
        visible={this.state.visible}
        onRequestClose={() => {
          console.log('点击按钮');
          this.hide();
        }}>
        <View style={styles.container}>
          <Animated.View
            style={{...styles.bg, opacity: this.state.bgOpacity}}
          />
          <View style={styles.content}>
            <Button
              style={styles.button}
              data={'点击按钮'}
              onPress={() => {
                console.log('点击按钮');
                this.hide();
              }}
            />
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
  bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
    backgroundColor: 'white',
  },
  button: {
    height: 44,
  },
});
