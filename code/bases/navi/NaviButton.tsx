import React, {Component} from 'react';
import {Image, ImageSourcePropType, Text, TouchableOpacity} from 'react-native';
import {NaviRightStyles} from './NaviView';

export interface NaviButtonProps {
  data: string | ImageSourcePropType;
  onPress: () => void;
}

export interface NaviButtonState {}

export default class NaviButton extends Component<
  NaviButtonProps,
  NaviButtonState
> {
  constructor(props: NaviButtonProps) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={NaviRightStyles.item}
        onPress={this.props.onPress}>
        {this.content()}
      </TouchableOpacity>
    );
  }

  content() {
    let {data} = this.props;
    if (typeof data === 'string') {
      return <Text style={NaviRightStyles.text}>{data}</Text>;
    } else {
      return (
        <Image
          style={NaviRightStyles.icon}
          source={data}
          resizeMode={'center'}
        />
      );
    }
  }
}
