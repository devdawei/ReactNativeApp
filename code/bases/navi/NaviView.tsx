import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BasePage, {BasePageProps, BasePageState} from '../page/BasePage';
import Screen from '../tool/Screen';
import Navi, {NaviOpenMode} from './Navi';

export interface NaviViewProps {
  page: BasePage<BasePageProps, BasePageState>;
}

export interface NaviViewState {}

export default class NaviView extends Component<NaviViewProps, NaviViewState> {
  mode = NaviOpenMode.push;
  statusBarHeight = Screen.statusBarHeight;
  static contentHeight = Screen.naviContentHeight;

  constructor(props: NaviViewProps) {
    super(props);
    this.mode = props.page.props.mode;
    this.statusBarHeight = props.page.props.statusBarHeight;
  }

  render() {
    return (
      <View
        style={{
          ...styles.container,
          height: this.statusBarHeight + NaviView.contentHeight,
        }}>
        <View style={{...styles.statusBar, height: this.statusBarHeight}} />
        <View style={styles.content}>
          <View style={styles.left}>
            <TouchableOpacity onPress={this.closeAction}>
              <Image
                source={{
                  uri:
                    this.mode === NaviOpenMode.push
                      ? 'ic_navi_back'
                      : 'ic_navi_close',
                }}
                resizeMode={'center'}
                style={styles.backImage}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.center}>
            <Text style={styles.title} numberOfLines={1}>
              {this.props.page.state.title}
            </Text>
          </View>
          <View style={styles.right}>
            <View style={{...styles.right, marginRight: 8}}>
              {this.props.page.naviRight()}
            </View>
          </View>
        </View>
      </View>
    );
  }

  closeAction = () => {
    let pageID = this.props.page.props.pageID;
    if (this.mode === NaviOpenMode.push) {
      Navi.pop(pageID);
    } else {
      Navi.close(pageID);
    }
  };
}

export const NaviRightStyles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    height: NaviView.contentHeight,
  },
  item: {
    justifyContent: 'center',
    height: NaviView.contentHeight,
  },
  icon: {
    width: 40,
    height: 44,
  },
  text: {
    marginLeft: 8,
    marginRight: 8,
    fontSize: 16,
  },
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
  },
  statusBar: {
    width: '100%',
    // backgroundColor: 'cyan',
  },
  content: {
    flexDirection: 'row',
    height: NaviView.contentHeight,
    // backgroundColor: 'green',
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'orange',
  },
  backImage: {
    width: NaviView.contentHeight,
    height: NaviView.contentHeight,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    // backgroundColor: 'green',
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'orange',
  },
});
