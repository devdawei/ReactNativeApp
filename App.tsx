/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Nav from '@/bases/navigation/nav';
import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  const onPressExample = () => {
    // 跳转到示例页面
    console.log('点击了示例按钮')
    Nav.present('ExamplesPage')
  };

  return (
    <View style={styles.container}>
      <View style={[styles.example, {top: safeAreaInsets.top}]}>
        <Text style={styles.text} onPress={onPressExample}>点击打开示例页面</Text>
      </View>
      <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={{top: safeAreaInsets.top + 44, bottom: safeAreaInsets.bottom, left: safeAreaInsets.left, right: safeAreaInsets.right}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  example: {
    position: 'absolute',
    backgroundColor: 'cyan',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    height: 44,
    zIndex: 999,
  },
  text: {
    textDecorationLine: 'underline',
  },
});

export default App;
