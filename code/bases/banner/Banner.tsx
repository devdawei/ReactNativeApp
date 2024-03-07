import React, {Component, ReactNode} from 'react';
import Swiper, {SwiperProps} from 'react-native-swiper';
import {Image, TouchableWithoutFeedback} from 'react-native';

export class BannerResult {
  index: number = -1;
  image: string = '';
}

export interface BannerProps extends SwiperProps {
  images?: string[];
  onPress?: (result: BannerResult) => void;
}

export interface BannerState {}

export default class Banner extends Component<BannerProps, BannerState> {
  // private swiperRef = React.createRef<Swiper>();
  constructor(props: BannerProps) {
    super(props);
  }

  render() {
    // let {onPress} = this.props;
    return (
      <Swiper
        // ref={this.swiperRef}
        autoplay={true}
        autoplayTimeout={3}
        paginationStyle={{bottom: 8}}
        activeDotStyle={{backgroundColor: '#EEE'}}
        {...this.props}>
        {this.renderItems()}
      </Swiper>
    );
  }

  renderItems() {
    let {width, height, images, onPress} = this.props;
    let items: ReactNode[] = [];
    if (!images) {
      return items;
    }
    for (let idx = 0; idx < images.length; idx++) {
      let img = images[idx];
      let result = new BannerResult();
      result.index = idx;
      result.image = img;
      items.push(
        <TouchableWithoutFeedback
          onPress={() => {
            onPress && onPress(result);
          }}
          key={idx}>
          <Image style={{width: width, height: height}} source={{uri: img}} />
        </TouchableWithoutFeedback>,
        // <Image style={{width: width, height: height}} source={{uri: img}} />,
      );
    }
    return items;
  }
}
