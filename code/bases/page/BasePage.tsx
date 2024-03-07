import React, {Component, ReactNode, RefObject} from 'react';
import {
  DeviceEventEmitter,
  EmitterSubscription,
  StyleSheet,
  View,
} from 'react-native';
import NaviView from '../navi/NaviView';
import Loading from '../loading/Loading';
import Navi, {NaviOpenMode} from '../navi/Navi';
import Toast from '../toast/Toast';
import Screen from '../tool/Screen';
import {PageShowOrHideInfo} from './PageShowOrHideInfo';

export interface BasePageProps {
  mode: NaviOpenMode;
  pageID: string;
  statusBarHeight: number;
}

export interface BasePageState {
  title?: string;
  hasData: boolean;
  headerRefreshing?: boolean;
  footerLoading?: boolean;
}

export default abstract class BasePage<
    P extends BasePageProps = BasePageProps,
    S extends BasePageState = BasePageState,
  >
  extends Component<P, S>
  implements PageShowOrHideInfo
{
  private readonly _toastRef = React.createRef<Toast>();

  willAppearSubs?: EmitterSubscription;
  didAppearSubs?: EmitterSubscription;
  willDisappearSubs?: EmitterSubscription;
  didDisappearSubs?: EmitterSubscription;

  pageShowOrHideNoticeObjs: RefObject<PageShowOrHideInfo>[] = [];

  protected constructor(props: P) {
    super(props);
    if (Screen.statusBarHeight === 0) {
      Screen.updateStatusBarHeight(props.statusBarHeight);
    }
  }

  render(): ReactNode {
    return (
      <View style={styles.container}>
        <NaviView page={this} />
        {this._content()}
        <Toast ref={this._toastRef} />
      </View>
    );
  }

  componentDidMount() {
    console.log('组件已经加载');
    this.willAppearSubs = DeviceEventEmitter.addListener(
      'PageWillAppear',
      result => {
        if (result.pageID === this.props.pageID) {
          // console.log('RN页面状态：PageWillAppear');
          // console.log(result);
          this.pageWillAppear();
        }
      },
    );
    this.didAppearSubs = DeviceEventEmitter.addListener(
      'PageDidAppear',
      result => {
        if (result.pageID === this.props.pageID) {
          // console.log('RN页面状态：PageDidAppear');
          // console.log(result);
          this.pageDidAppear();
        }
      },
    );
    this.willDisappearSubs = DeviceEventEmitter.addListener(
      'PageWillDisappear',
      result => {
        if (result.pageID === this.props.pageID) {
          // console.log('RN页面状态：PageWillDisappear');
          // console.log(result);
          this.pageWillDisappear();
        }
      },
    );
    this.didDisappearSubs = DeviceEventEmitter.addListener(
      'PageDidDisappear',
      result => {
        if (result.pageID === this.props.pageID) {
          // console.log('RN页面状态：PageDidDisappear');
          // console.log(result);
          this.pageDidDisappear();
        }
      },
    );
  }

  componentWillUnmount() {
    console.log('组件将要卸载');
    this.didAppearSubs && this.didAppearSubs.remove();
    this.willDisappearSubs && this.willDisappearSubs.remove();
  }

  pageWillAppear() {
    // console.log('页面即将显示');
    for (let obj of this.pageShowOrHideNoticeObjs) {
      obj.current?.pageWillAppear();
    }
  }

  pageDidAppear() {
    // console.log('页面已经显示');
    for (let obj of this.pageShowOrHideNoticeObjs) {
      obj.current?.pageDidAppear();
    }
  }

  pageWillDisappear() {
    // console.log('页面即将消失');
    for (let obj of this.pageShowOrHideNoticeObjs) {
      obj.current?.pageWillDisappear();
    }
  }

  pageDidDisappear() {
    // console.log('页面已经消失');
    for (let obj of this.pageShowOrHideNoticeObjs) {
      obj.current?.pageDidDisappear();
    }
  }

  naviRight(): ReactNode {
    return <View />;
  }

  private _content(): ReactNode {
    if (this.state.hasData) {
      return this.content();
    } else {
      return <Loading />;
    }
  }

  content(): ReactNode {
    return <View style={styles.content} />;
  }

  push(pageName: string) {
    Navi.push(pageName, this.props.pageID);
  }

  present(pageName: string) {
    Navi.present(pageName, this.props.pageID);
  }

  showToast(text: string) {
    this._toastRef.current?.show(text);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(245, 245, 245)',
  },
  content: {
    flex: 1,
    backgroundColor: 'rgb(245, 245, 245)',
  },
  loading: {
    flex: 1,
    paddingBottom: 88,
  },
});
