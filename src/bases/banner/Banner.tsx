import React, { ReactNode } from 'react';
import Swiper, {SwiperProps} from 'react-native-swiper';
import {Image, TouchableWithoutFeedback} from 'react-native';

export interface BannerProps extends SwiperProps {
  images?: string[];
  onPress?: (result: BannerResult) => void;
}

export interface BannerResult {
  index: number;
  image: string;
}

const Banner = (props: BannerProps) => {
  
  const renderItems = () => {
    let {width, height, images, onPress} = props;
    let items: ReactNode[] = [];
    if (!images) {
      return items;
    }
    for (let idx = 0; idx < images.length; idx++) {
      let img = images[idx];
      let result: BannerResult = {
        index: idx,
        image: img,
      }
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

  return (
    <Swiper
      // ref={this.swiperRef}
      autoplay={true}
      autoplayTimeout={3}
      paginationStyle={{bottom: 8}}
      activeDotStyle={{backgroundColor: '#EEE'}}
      {...props}>
      {renderItems()}
    </Swiper>
  );
};

export default Banner;