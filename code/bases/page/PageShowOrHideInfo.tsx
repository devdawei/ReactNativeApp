export interface PageShowOrHideInfo {
  pageWillAppear: () => void;
  pageDidAppear: () => void;
  pageWillDisappear: () => void;
  pageDidDisappear: () => void;
}
