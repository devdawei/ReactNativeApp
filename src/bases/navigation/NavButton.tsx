import { Image, ImageSourcePropType, StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native"

export interface NavButtonProps {
  styles?: StyleProp<ViewStyle>
  data: string | ImageSourcePropType
  onPress: () => void
}

const NavButton = (props: NavButtonProps) => {
  const renderContent = () => {
    let {data} = props
    if (typeof data === 'string') {
      return <Text style={[styles.text, props.styles]}>{data}</Text>
    } else {
      return (
        <Image
          style={styles.icon}
          source={data}
          resizeMode={'center'}
        />
      )
    }
  }
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={props.onPress}>
      {renderContent()}
    </TouchableOpacity>
  )
}

export const styles = StyleSheet.create({
  item: {
    // backgroundColor: 'red',
    justifyContent: 'center',
    height: '100%',
  },
  icon: {
    width: 40,
    height: '100%',
  },
  text: {
    marginLeft: 8,
    marginRight: 8,
    fontSize: 15,
  },
})

export default NavButton
