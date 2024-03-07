//
//  RCTCustomScrollView+NestedScroll.h
//  Bronco
//
//  Created by David on 2022/6/9.
//  Copyright © 2022 David. All rights reserved.
//

#if __has_include(<React/RCTScrollView.h>)
#import <React/RCTScrollView.h>
#else
#import "RCTScrollView.h"
#endif
#import "RCTCustomScrollViewHeader.h"

NS_ASSUME_NONNULL_BEGIN

@interface RCTCustomScrollView (NestedScroll)

@property (nonatomic, assign) BOOL customRecognizeSimultaneously;

@end

NS_ASSUME_NONNULL_END
