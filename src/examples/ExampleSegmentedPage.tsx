import React, { useEffect, useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { PageProps } from '@bases/page/usePage'
import NavView from '@bases/navigation/NavView'
import NavButton from '@bases/navigation/NavButton'
import SegmentedView, { SegmentedItem } from '@/bases/components/SegmentedView'

// 示例-SegmentedView
const ExampleSegmentedPage = (props: PageProps) => {

  const segmentedViewRef = React.createRef<SegmentedView>()
  let segmentedTitles = [
    '第一个',
    '第二二个',
    '第三个',
    '第四四个',
    '第五个',
    '第六六个',
    '第七个',
  ]

  useEffect(() => {
    console.log('ExampleSegmentedPage init', props)
  }, [])

  const renderNavRight = () => {
    return (
      <NavButton {...props} data={'操作'} onPress={() => {
        segmentedViewRef.current?.select(3);
        // segmentedTitles = [
        //   '第一个',
        //   '第二二个',
        //   '第三个',
        //   '四四',
        //   '第五个',
        //   '第六六个',
        //   '米米米',
        //   '二二二',
        // ]
        // segmentedViewRef.current?.refresh(segmentedTitles, 3);
      }} />
    )
  }
  
  const configItem = (item: SegmentedItem) => {
    console.log('配置item');
    // item.style = styles.item;
    // item.titleUnselectedStyle = styles.titleUnselected;
    // item.titleSelectedStyle = styles.titleSelected;
    // item.followBarStyle = styles.followBar;
  };

  // const customItem = (item: SegmentedItem) => {
  //   return (
  //     <View>
  //       <Text>标题</Text>
  //       <Text>副标题</Text>
  //     </View>
  //   );
  // };

  const onSelected = (index: number) => {
    console.log('回调选中', index);
  };

  return (
    <>
      <NavView {...props} title='示例-SegmentedView' renderNavRight={renderNavRight} />
      <View style={styles.container}>
        <SegmentedView
          ref={segmentedViewRef}
          style={styles.segmentedView}
          titles={segmentedTitles}
          selectedIndex={1}
          configItem={configItem}
          // customItem={this.customItem}
          onSelected={onSelected}
        />
      </View>
    </>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  segmentedView: {
    width: Dimensions.get('window').width,
    height: 44,
    backgroundColor: 'orange',
  },
  item: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  titleUnselected: {
    fontSize: 14,
    color: 'darkcyan',
  },
  titleSelected: {
    fontSize: 16,
    color: 'red',
  },
  followBar: {
    width: 30,
    marginBottom: 4,
    color: 'red',
  },
})

export default ExampleSegmentedPage
