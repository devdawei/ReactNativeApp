import AsyncStorage from '@react-native-async-storage/async-storage';

export default class StorageManager {
  static async setString(key: string, value: string): Promise<boolean> {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (e) {
      // saving error
      return false;
    }
  }

  static async getString(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      // error reading value
      return null;
    }
  }

  static async setObject(key: string, value: any): Promise<boolean> {
    try {
      let jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (e) {
      // saving error
      return false;
    }
  }

  static async getObject(key: string) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      return null;
    }
  }
}
