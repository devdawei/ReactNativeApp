//
//  RCTCustomScrollView+NestedScroll.m
//  Bronco
//
//  Created by David on 2022/6/9.
//  Copyright © 2022 David. All rights reserved.
//

#import "RCTCustomScrollView+NestedScroll.h"
#import <objc/runtime.h>

@implementation RCTCustomScrollView (NestedScroll)

static char kCustomRecognizeSimultaneously;

- (void)setCustomRecognizeSimultaneously:(BOOL)customRecognizeSimultaneously {
    objc_setAssociatedObject(self, &kCustomRecognizeSimultaneously, @(customRecognizeSimultaneously), OBJC_ASSOCIATION_ASSIGN);
}

- (BOOL)customRecognizeSimultaneously {
    id obj = objc_getAssociatedObject(self, &kCustomRecognizeSimultaneously);
    if (obj) {
        return [obj boolValue];
    } else {
        return NO;
    }
}

- (BOOL)gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer shouldRecognizeSimultaneouslyWithGestureRecognizer:(UIGestureRecognizer *)otherGestureRecognizer {
    if (self.customRecognizeSimultaneously) {
        return [RCTCustomScrollView handleGestureRecognizer:gestureRecognizer shouldRecognizeSimultaneouslyWithGestureRecognizer:otherGestureRecognizer];
    } else {
        return NO;
    }
}

+ (BOOL)handleGestureRecognizer:(UIGestureRecognizer *)gestureRecognizer shouldRecognizeSimultaneouslyWithGestureRecognizer:(UIGestureRecognizer *)otherGestureRecognizer {
    if ([otherGestureRecognizer.view isKindOfClass:[self class]]) {
        return YES;
    } else {
        if ([otherGestureRecognizer isKindOfClass:[UIPanGestureRecognizer class]]
            && [otherGestureRecognizer.view isKindOfClass:[UIScrollView class]]) {
            UIScrollView *scrollView = (UIScrollView *)otherGestureRecognizer.view;
            // 解决 scrollView 横向滚动与其他 scrollView 纵向滚动同时进行的问题
            if (fabs(scrollView.contentOffset.x) > 0 && fabs(scrollView.contentOffset.y) == 0) {
                return NO;
            }
            if (fabs(scrollView.contentOffset.y) > 0 && fabs(scrollView.contentOffset.x) == 0) {
                return NO;
            }
            return YES;
        }
        return NO;
    }
}

@end
