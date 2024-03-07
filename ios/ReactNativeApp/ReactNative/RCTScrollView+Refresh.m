//
//  RCTScrollView+Refresh.m
//  Bronco
//
//  Created by David on 2022/4/15.
//  Copyright © 2022 David. All rights reserved.
//

#import "RCTScrollView+Refresh.h"
#import <objc/runtime.h>
#import "MJRefresh.h"

@implementation RCTScrollView (Refresh)

- (RCTCustomScrollView *)contentScrollView {
    return [self valueForKeyPath:@"_scrollView"];
}

- (void)addHeaderRefresh {
    MJRefreshNormalHeader *header = [MJRefreshNormalHeader headerWithRefreshingTarget:self refreshingAction:@selector(headerRefreshAction)];
    header.lastUpdatedTimeLabel.hidden = YES;
    self.contentScrollView.mj_header = header;
}

- (void)headerRefreshAction {
    if (self.onHeaderRefresh) {
        self.onHeaderRefresh(nil);
    }
}

- (void)addFooterLoad {
    MJRefreshAutoNormalFooter *footer = [MJRefreshAutoNormalFooter footerWithRefreshingTarget:self refreshingAction:@selector(footerLoadAction)];
    self.contentScrollView.mj_footer = footer;
}

- (void)footerLoadAction {
    if (self.onFooterLoad) {
        self.onFooterLoad(nil);
    }
}

static char kHeaderRefreshing;

- (void)setHeaderRefreshing:(BOOL)headerRefreshing {
    objc_setAssociatedObject(self, &kHeaderRefreshing, @(headerRefreshing), OBJC_ASSOCIATION_ASSIGN);
    MJRefreshHeader *header = [self contentScrollView].mj_header;
    if (headerRefreshing) {
        [header beginRefreshing];
    } else {
        [header endRefreshing];
    }
}

- (BOOL)headerRefreshing {
    id obj = objc_getAssociatedObject(self, &kHeaderRefreshing);
    if (obj) {
        return [obj boolValue];
    } else {
        return NO;
    }
}

static char kOnHeaderRefresh;

- (void)setOnHeaderRefresh:(RCTDirectEventBlock)onHeaderRefresh {
    [self addHeaderRefresh];
    objc_setAssociatedObject(self, &kOnHeaderRefresh, onHeaderRefresh, OBJC_ASSOCIATION_COPY);
}

- (RCTDirectEventBlock)onHeaderRefresh {
    return objc_getAssociatedObject(self, &kOnHeaderRefresh);
}

static char kFooterLoading;

- (void)setFooterLoading:(BOOL)footerLoading {
    objc_setAssociatedObject(self, &kFooterLoading, @(footerLoading), OBJC_ASSOCIATION_ASSIGN);
    MJRefreshFooter *footer = [self contentScrollView].mj_footer;
    if (footerLoading) {
        [footer beginRefreshing];
    } else {
        [footer endRefreshing];
    }
}

- (BOOL)footerLoading {
    id obj = objc_getAssociatedObject(self, &kFooterLoading);
    if (obj) {
        return [obj boolValue];
    } else {
        return NO;
    }
}

static char kOnFooterLoad;

- (void)setOnFooterLoad:(RCTDirectEventBlock)onFooterLoad {
    [self addFooterLoad];
    objc_setAssociatedObject(self, &kOnFooterLoad, onFooterLoad, OBJC_ASSOCIATION_COPY);
}

- (RCTDirectEventBlock)onFooterLoad {
    return objc_getAssociatedObject(self, &kOnFooterLoad);
}

@end
