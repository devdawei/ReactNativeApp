//
//  RCTCustomScrollViewHeader.h
//  ReactNativeApp
//
//  Created by David on 2024/3/7.
//

#ifndef RCTCustomScrollViewHeader_h
#define RCTCustomScrollViewHeader_h

/**
 * Include a custom scroll view subclass because we want to limit certain
 * default UIKit behaviors such as textFields automatically scrolling
 * scroll views that contain them.
 */
@interface RCTCustomScrollView : UIScrollView <UIGestureRecognizerDelegate>

@end

#endif /* RCTCustomScrollViewHeader_h */
