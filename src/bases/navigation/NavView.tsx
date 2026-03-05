import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { PageOpenMode, PageProps } from "@bases/page/usePage"
import Nav from './nav'

interface NaviViewProps extends PageProps {
  title: string | undefined
  closeAction?: () => void
  renderNavRight?: () => React.ReactNode
  renderNavRights?: () => React.ReactNode
}

const NavView = (props: NaviViewProps) => {

  const closeAction = () => {
    if (props.closeAction) {
      props.closeAction()
    } else {
      Nav.close(props.pageID)
    }
  }

  const renderNavRight = () => {
    if (!props.renderNavRight) {
      return null
    }
    return props.renderNavRight()
  }

  const renderNavRights = () => {
    if (!props.renderNavRights) {
      return null
    }
    return (
      <View style={[styles.rightContent, {height: props.navContentHeight}]}>
        {props.renderNavRights()}
      </View>
    )
  }

  return (
    <View
       style={{
        ...styles.container,
        height: props.statusBarHeight + props.navContentHeight,
      }}>
      <View style={{...styles.statusBar, height: props.statusBarHeight}} />
      <View style={[styles.content, {height: props.navContentHeight}]}>
        {/* 标题 */}
        <View style={styles.center}>
          <Text style={styles.title} numberOfLines={1}>
            {props.title}
          </Text>
        </View>
        {/* 左侧 */}
        <View style={styles.left}>
          <TouchableOpacity onPress={closeAction}>
            <Image
              source={{
                uri:
                  props.mode === PageOpenMode.push
                    ? 'ic_nav_back_black'
                    : 'ic_nav_close_black',
              }}
              resizeMode={'center'}
              style={[styles.backImage, {width: props.navContentHeight, height: props.navContentHeight}]}
            />
          </TouchableOpacity>
        </View>
        {/* 右侧 */}
        <View style={styles.right}>
          <View style={{...styles.right, marginRight: 8, height: props.navContentHeight}}>
            {renderNavRight()}
            {renderNavRights()}
          </View>
        </View>
      </View>
    </View>
  )
}

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
    justifyContent: 'space-between'
    // backgroundColor: 'green',
  },
  center: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 88,
    right: 88,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    // backgroundColor: 'green',
  },
  left: {
    width: 88,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'orange',
  },
  backImage: {
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'orange',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
})

export default NavView
