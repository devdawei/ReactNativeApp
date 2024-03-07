import React, {ReactNode} from 'react';
import BasePage, {
  BasePageProps,
  BasePageState,
} from '../../bases/page/BasePage';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import MapView from './MapView';
import NaviButton from '../../bases/navi/NaviButton';

interface TestNativeViewPageProps extends BasePageProps {}

interface TestNativeViewPageState extends BasePageState {
  zoomEnabled: boolean;
}

export default class TestNativeViewPage extends BasePage<
  TestNativeViewPageProps,
  TestNativeViewPageState
> {
  static pageName = 'TestNativeViewPage';

  constructor(props: TestNativeViewPageProps) {
    super(props);
    this.state = {
      hasData: true,
      zoomEnabled: false,
    };
  }

  naviRight(): React.ReactNode {
    return (
      <NaviButton
        data={'点击'}
        onPress={() => {
          this.setState(prevState => ({
            zoomEnabled: !prevState.zoomEnabled,
          }));
        }}
      />
    );
  }

  content(): ReactNode {
    let {zoomEnabled} = this.state;
    return (
      <ScrollView style={styles.container}>
        <MapView style={styles.map} zoomEnabled={zoomEnabled} />
        <Text style={styles.text}>{zoomEnabled ? 'ON' : 'OFF'}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: 400,
  },
  text: {
    paddingTop: 10,
    textAlign: 'center',
  },
});
