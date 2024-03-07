import React, {ReactNode} from 'react';
import BasePage, {
  BasePageProps,
  BasePageState,
} from '../../bases/page/BasePage';
import {StyleSheet, Text, View} from 'react-native';
import NaviButton from '../../bases/navi/NaviButton';
import {FlatList, RefreshControl} from 'react-native';
import RecommendApi, {RecommendItemModel} from './RecommendApi';
import {RecommendItem} from './RecommendItem';

import ApiInfo from '../../bases/network/ApiInfo';
import OpenManager from '../../managers/OpenManager';

export interface RecommendPageState extends BasePageState {
  dataSource: RecommendItemModel[];
}

export default class RecommendPage extends BasePage<
  BasePageProps,
  RecommendPageState
> {
  static pageName = 'RecommendPage';

  recommendApi = new RecommendApi();

  constructor(props: BasePageProps) {
    super(props);
    this.state = {
      title: '推荐',
      hasData: false,
      dataSource: [],
      headerRefreshing: false,
      footerLoading: false,
    };

    this.recommendApi
      .successHandler(api => {
        console.log('successHandler');
        console.log(api.dataSource.length);
        this.setState(() => ({
          dataSource: api.dataSource,
          headerRefreshing: false,
          footerLoading: false,
        }));
      })
      .failureHandler(() => {
        console.log('failureHandler');
      })
      .endHandler(() => {
        this.setState(() => ({
          hasData: true,
        }));
        console.log('endHandler');
      });
  }

  componentDidMount() {
    super.componentDidMount();
    this.recommendApi.request();
  }

  naviRight = () => {
    return (
      <NaviButton
        data={'右侧'}
        onPress={() => {
          // ApiInfo.headers().then(headers => {
          //   console.log('headers: ', headers);
          // });

          // let applink = 'xxx://xxx';
          // OpenManager.openApplink(applink, this.props.pageID);

          // let link = 'https://www.react-native.cn/docs/getting-started';
          // OpenManager.openWeb(link, this.props.pageID);

          OpenManager.openLoginIfNeed(this.props.pageID).then(() => {
            console.log('openLoginIfNeed');
            let applink = 'xxx://xxx';
            OpenManager.openApplink(applink, this.props.pageID);
          });
        }}
      />
    );
  };

  content(): ReactNode {
    return (
      <FlatList
        style={styles.container}
        data={this.state.dataSource}
        renderItem={({item}) => RecommendItem.renderItem(item)}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={this.state.headerRefreshing!}
        //     onRefresh={this.onHeaderRefresh}
        //   />
        // }
        onHeaderRefresh={this.onHeaderRefresh}
        headerRefreshing={this.state.headerRefreshing}
        onFooterLoad={this.onFooterLoad}
        footerLoading={this.state.footerLoading}
      />
    );
  }

  onHeaderRefresh = () => {
    console.log('onHeaderRefresh');
    this.setState(() => ({
      headerRefreshing: true,
    }));
    this.recommendApi.request();
  };

  onFooterLoad = () => {
    console.log('onFooterLoad');
    this.setState(() => ({
      footerLoading: true,
    }));
    this.recommendApi.loadMore();
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(245, 245, 245)',
  },
});
