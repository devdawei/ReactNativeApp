import React, {ReactNode} from 'react';
import BasePage, {
  BasePageProps,
  BasePageState,
} from '../../bases/page/BasePage';
import {StyleSheet, View} from 'react-native';
import Button from '../../bases/button/Button';

interface TestToastPageProps extends BasePageProps {}

interface TestToastPageState extends BasePageState {}

export default class TestToastPage extends BasePage<
  TestToastPageProps,
  TestToastPageState
> {
  static pageName = 'TestToastPage';

  constructor(props: TestToastPageProps) {
    super(props);
    this.state = {
      hasData: true,
    };
  }

  content(): ReactNode {
    return (
      <View style={styles.container}>
        <Button
          style={styles.button}
          data={'显示提示消息'}
          onPress={() => {
            this.showToast('我是提示消息，元芳你怎么看');
          }}
        />
        <Button
          style={styles.button}
          data={'显示提示消息 2'}
          onPress={() => {
            this.showToast(
              '有座小镇，被某种力量笼罩，变成只进不出的模式。一个个随机的赶路人，只要行经一棵横倒的大树，看见天空中的渡鸦，就会发现自己进入一座天黑以后有怪物出没的小镇，无论如何也找不到出路。每当夜幕降临，怪物就会变成故人的样子出现，设法进入屋内。早期的恐惧和艰难时期已经过去。而此时的小镇有夜间安全屋可供庇护，居民不再被怪物杀害，全靠小镇领袖博伊德警长找到一种“护身符”......',
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    height: 44,
  },
});
