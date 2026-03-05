import NativeNav from "@specs/NativeNav"
import { PageOpenMode } from "@bases/page/usePage"

export default class Nav {

  // 以栈的方式打开页面
  static push(pageName: string, fromPageID?: string, params?: { [key: string]: unknown }) {
    NativeNav.open(pageName, fromPageID, PageOpenMode.push, params)
  }

  // 关闭栈页面
  static pop(pageID: string) {
    NativeNav.close(pageID)
  }

  // 以模态的方式打开页面
  static present(pageName: string, fromPageID?: string, params?: { [key: string]: unknown }) {
    NativeNav.open(pageName, fromPageID, PageOpenMode.present, params)
  }

  // 关闭模态页面
  static dismiss(pageID: string) {
    NativeNav.close(pageID)
  }

  // 关闭页面
  static close(pageID: string) {
    NativeNav.close(pageID)
  }
}
