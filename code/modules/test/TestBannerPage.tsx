import React, {ReactNode} from 'react';
import BasePage, {
  BasePageProps,
  BasePageState,
} from '../../bases/page/BasePage';
import {ScrollView, StyleSheet} from 'react-native';
import Screen from '../../bases/tool/Screen';
import Banner from '../../bases/banner/Banner';
import NaviButton from '../../bases/navi/NaviButton';

interface TestBannerPageProps extends BasePageProps {}

interface TestBannerPageState extends BasePageState {
  bannerImages: string[];
}

export default class TestBannerPage extends BasePage<
  TestBannerPageProps,
  TestBannerPageState
> {
  static pageName = 'TestBannerPage';

  constructor(props: TestBannerPageProps) {
    super(props);
    this.state = {
      hasData: true,
      bannerImages: [
        'https://bpic.51yuansu.com/backgd/cover/00/15/31/5b864d155ff51.jpg?x-oss-process=image/resize,h_300,m_lfit/sharpen,100',
        'https://t11.baidu.com/it/u=440017574,162033240&fm=30&app=106&f=JPEG?w=640&h=300&s=275352945B29740740423CD2030080B8',
        'https://bpic.51yuansu.com/backgd/cover/00/15/05/5b84abc6724b9.jpg?x-oss-process=image/resize,h_300,m_lfit/sharpen,100',
      ],
    };
  }

  naviRight(): React.ReactNode {
    return (
      <NaviButton
        data={'点击'}
        onPress={() => {
          this.setState(() => ({
            bannerImages: [
              'https://t12.baidu.com/it/u=2145852578,2748080370&fm=170&s=28F04C875576BA7750C7ED8B0300F08B&w=640&h=300&img.JPEG',
              'https://img1.baidu.com/it/u=2704899688,490352217&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=300',
              'https://bpic.588ku.com/back_list_pic/21/05/26/14c8ff881efb7afac58f453475759c4f.jpg%21/fw/640.56939501779/quality/90/unsharp/true/compress/true',
            ],
          }));
        }}
      />
    );
  }

  content(): ReactNode {
    return (
      <ScrollView style={styles.container}>
        <Banner
          width={Screen.width()}
          height={Screen.width() * (300 / 640)}
          images={this.state.bannerImages}
          onPress={result => {
            console.log(result.index, result.image);
          }}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
