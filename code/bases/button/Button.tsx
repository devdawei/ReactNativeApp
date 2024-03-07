import React, {Component} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewProps,
} from 'react-native';

export interface ButtonImageProsType {
  width: number;
  height: number;
  source: ImageSourcePropType;
}

export interface ButtonProps extends ViewProps {
  data: string | ButtonImageProsType;
  onPress: () => void;
}

export interface ButtonState {}

export default class Button extends Component<ButtonProps, ButtonState> {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.style]}
        onPress={this.props.onPress}>
        {this.content()}
      </TouchableOpacity>
    );
  }

  content() {
    let {data} = this.props;
    if (typeof data === 'string') {
      return <Text style={styles.text}>{data}</Text>;
    } else {
      return (
        <Image
          style={{...styles.icon, width: data.width, height: data.height}}
          source={data.source}
          resizeMode={'center'}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'rgb(10, 130, 255)',
    // color: 'rgb(51, 51, 51)',
    fontSize: 15,
  },
  icon: {
    flex: 1,
  },
});
