//
//  RNCNavi.m
//  Bronco
//
//  Created by David on 2022/3/28.
//  Copyright © 2022 David. All rights reserved.
//

#import "RNCNavi.h"
#import "RNCBaseViewController.h"
//#import "ReactNativeApp-Swift.h"
#import "React-Core/React/RCTRootView.h"
#import "AppDelegate.h"

NSString * const RNCNaviPushNotification = @"RNCNaviPushNotification";
NSString * const RNCNaviPopNotification = @"RNCNaviPopNotification";
NSString * const RNCNaviCloseNotification = @"RNCNaviCloseNotification";

@implementation RNCNavi

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(open:(NSDictionary *)info) {
    NSString *pageName = info[@"pageName"];
    NSString *fromPageID = info[@"fromPageID"];
    NSString *mode = info[@"mode"];
    dispatch_async(dispatch_get_main_queue(), ^{
      [RNCNavi checkOpen:pageName fromPageID:fromPageID mode:mode];
    });
}

+ (void)checkOpen:(NSString *)pageName fromPageID:(NSString *)fromPageID mode:(NSString *)mode {
    if (fromPageID) {
        NSDictionary *userInfo = @{
            @"pageName": pageName,
            @"fromPageID": fromPageID,
            @"mode": mode,
        };
        [NSNotificationCenter.defaultCenter postNotificationName:RNCNaviPushNotification object:nil userInfo:userInfo];
    } else {
        [self open:pageName fromViewController:[self currentViewController] mode:RNCNaviOpenModePush];
    }
}

+ (void)open:(NSString *)pageName fromViewController:(UIViewController *)fromViewController mode:(RNCNaviOpenMode)mode {
  BOOL canPush = NO;
  if (fromViewController.navigationController && mode == RNCNaviOpenModePush) {
      canPush = YES;
  }
  RNCNaviOpenMode openMode = mode;
  if (mode == RNCNaviOpenModePush && !canPush) {
    openMode = RNCNaviOpenModePresent;
  }
  double timeInterval = [[NSDate date] timeIntervalSince1970]*1000;
  NSString *pageID = [NSString stringWithFormat:@"%@_%.0f", pageName, timeInterval];
  CGFloat statusBarHeight = UIApplication.sharedApplication.statusBarFrame.size.height;
  NSDictionary *props = @{
      @"mode": @(openMode),
      @"pageID": pageID,
      @"statusBarHeight": @(statusBarHeight),
  };
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:[AppDelegate rnBridge] moduleName:pageName initialProperties:props];
  RNCBaseViewController *vc = [[RNCBaseViewController alloc] init];
  vc.rnView = rootView;
  vc.pageID = pageID;
  if (openMode == RNCNaviOpenModePush) {
      vc.hidesBottomBarWhenPushed = YES;
      [fromViewController.navigationController pushViewController:vc animated:YES];
  } else {
      UINavigationController *naviVC = [[UINavigationController alloc] initWithRootViewController:vc];
      [fromViewController presentViewController:naviVC animated:true completion:nil];
  }
}

RCT_EXPORT_METHOD(pop:(NSString *)pageID) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [NSNotificationCenter.defaultCenter postNotificationName:RNCNaviPopNotification object:pageID];
    });
}

RCT_EXPORT_METHOD(close:(NSString *)pageID) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [NSNotificationCenter.defaultCenter postNotificationName:RNCNaviCloseNotification object:pageID];
    });
}

#pragma mark -

+ (UIViewController *)rootViewController {
    UIWindow *window = [[[UIApplication sharedApplication] delegate] window];
    return window.rootViewController;
}

+ (UIViewController *)currentViewController {
    UIViewController *currentViewController = [self rootViewController];
    while (TRUE) {
        if (currentViewController.presentedViewController) {
            currentViewController = currentViewController.presentedViewController;
        } else {
            if ([currentViewController isKindOfClass:[UINavigationController class]]) {
                currentViewController = ((UINavigationController *)currentViewController).visibleViewController;
            } else if ([currentViewController isKindOfClass:[UITabBarController class]]) {
                currentViewController = ((UITabBarController* )currentViewController).selectedViewController;
            } else {
                break;
            }
        }
    }
    return currentViewController;
}

@end

