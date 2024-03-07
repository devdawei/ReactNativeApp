//
//  RCTScrollViewManager+Refresh.m
//  Bronco
//
//  Created by David on 2022/4/15.
//  Copyright © 2022 David. All rights reserved.
//

#import "RCTScrollViewManager+Refresh.h"

@implementation RCTScrollViewManager (Refresh)

RCT_EXPORT_VIEW_PROPERTY(headerRefreshing, BOOL)
RCT_EXPORT_VIEW_PROPERTY(onHeaderRefresh, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(footerLoading, BOOL)
RCT_EXPORT_VIEW_PROPERTY(onFooterLoad, RCTDirectEventBlock)

@end
