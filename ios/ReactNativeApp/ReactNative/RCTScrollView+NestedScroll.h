//
//  RCTScrollView+NestedScroll.h
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

NS_ASSUME_NONNULL_BEGIN

@interface RCTScrollView (NestedScroll)

@property (nonatomic, assign) BOOL recognizeSimultaneously;

@end

NS_ASSUME_NONNULL_END
