import React, { useEffect, useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import { PageProps } from '@bases/page/usePage'
import NavView from '@bases/navigation/NavView'
import NavButton from '@bases/navigation/NavButton'
import Banner from '@/bases/banner/Banner'

// 示例-Banner
const ExampleBannerPage = (props: PageProps) => {

  const [imageUrls, setImageUrls] = useState<string[]>([])

  useEffect(() => {
    console.log('ExampleBannerPage init', props)
    
    setImageUrls([
      'https://bpic.51yuansu.com/backgd/cover/00/15/31/5b864d155ff51.jpg?x-oss-process=image/resize,h_300,m_lfit/sharpen,100',
      'https://t11.baidu.com/it/u=440017574,162033240&fm=30&app=106&f=JPEG?w=640&h=300&s=275352945B29740740423CD2030080B8',
      'https://bpic.51yuansu.com/backgd/cover/00/15/05/5b84abc6724b9.jpg?x-oss-process=image/resize,h_300,m_lfit/sharpen,100',
    ])
  }, [])

  const renderNavRight = () => {
    return (
      <NavButton {...props} data={'更新'} onPress={() => {
        setImageUrls([
          'https://t12.baidu.com/it/u=2145852578,2748080370&fm=170&s=28F04C875576BA7750C7ED8B0300F08B&w=640&h=300&img.JPEG',
          'https://img1.baidu.com/it/u=2704899688,490352217&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=300',
          'https://bpic.588ku.com/back_list_pic/21/05/26/14c8ff881efb7afac58f453475759c4f.jpg%21/fw/640.56939501779/quality/90/unsharp/true/compress/true',
        ])
      }} />
    )
  }

  return (
    <>
      <NavView {...props} title='示例-Banner' renderNavRight={renderNavRight} />
      <ScrollView style={styles.container}>
        <Banner
          width={Dimensions.get('window').width}
          height={Dimensions.get('window').width * (300 / 640)}
          images={imageUrls}
          onPress={result => {
            console.log(result.index, result.image);
          }}
        />
      </ScrollView>
    </>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default ExampleBannerPage
