
export enum PageOpenMode {
  push = 0,
  present = 1,
}

export interface PageProps<T = PageParams> {
  pageID: string
  mode: PageOpenMode
  statusBarHeight: number
  navContentHeight: number
  bottonSafeAreaHeight: number
  params?: T
}

export interface PageParams {
  [key: string]: unknown
}