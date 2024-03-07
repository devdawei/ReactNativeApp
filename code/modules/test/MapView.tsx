import React, {Component} from 'react';
import {requireNativeComponent, StyleProp, ViewStyle} from 'react-native';

interface MapViewProps {
  style?: StyleProp<ViewStyle>;
  zoomEnabled: boolean;
}

interface MapViewState {}

export default class MapView extends Component<MapViewProps, MapViewState> {
  constructor(props: MapViewProps) {
    super(props);
  }

  render() {
    return <RNTMap {...this.props} />;
  }
}

const RNTMap = requireNativeComponent('RNTMap');
