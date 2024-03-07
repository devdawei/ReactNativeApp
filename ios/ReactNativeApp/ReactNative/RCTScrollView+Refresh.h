//
//  RCTScrollView+Refresh.h
//  Bronco
//
//  Created by David on 2022/4/15.
//  Copyright © 2022 David. All rights reserved.
//

#if __has_include(<React/RCTScrollView.h>)
#import <React/RCTScrollView.h>
#else
#import "RCTScrollView.h"
#endif
#import "RCTCustomScrollViewHeader.h"

NS_ASSUME_NONNULL_BEGIN

@interface RCTScrollView (Refresh)

@property (nonatomic, assign) BOOL headerRefreshing;
@property (nonatomic, copy) RCTDirectEventBlock onHeaderRefresh;

@property (nonatomic, assign) BOOL footerLoading;
@property (nonatomic, copy) RCTDirectEventBlock onFooterLoad;

@end

NS_ASSUME_NONNULL_END
