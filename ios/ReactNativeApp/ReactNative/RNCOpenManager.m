//
//  RNCOpenManager.m
//  Bronco
//
//  Created by David on 2022/4/18.
//  Copyright © 2022 David. All rights reserved.
//

#import "RNCOpenManager.h"
//#import "ReactNativeApp-Swift.h"
#import "AppPageManager.h"
#import "WebViewController.h"
#import "LoginViewController.h"
#import "UserManager.h"

NSString * const RNCOpenManagerOpenApplinkNotification = @"RNCOpenManagerOpenApplinkNotification";
NSString * const RNCOpenManagerOpenWebNotification = @"RNCOpenManagerOpenWebNotification";
NSString * const RNCOpenManagerOpenLoginNotification = @"RNCOpenManagerOpenLoginNotification";

@implementation RNCOpenManager

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(openApplink:(NSDictionary *)info) {
    NSString *applink = info[@"applink"];
    NSString *fromPageID = info[@"fromPageID"];
    dispatch_async(dispatch_get_main_queue(), ^{
        [RNCOpenManager openApplink:applink fromViewController:nil fromPageID:fromPageID];
    });
}

+ (void)openApplink:(NSString *)applink fromViewController:(UIViewController *)fromViewController {
    [RNCOpenManager openApplink:applink fromViewController:fromViewController fromPageID:nil];
}

+ (void)openApplink:(NSString *)applink fromViewController:(UIViewController *)fromViewController fromPageID:(NSString *)fromPageID {
    if (fromViewController) {
        [AppPageManager openWithLink:applink fromViewController:fromViewController];
    } else if (fromPageID) {
        NSDictionary *userInfo = @{
            @"applink": applink,
            @"fromPageID": fromPageID,
        };
        [NSNotificationCenter.defaultCenter postNotificationName:RNCOpenManagerOpenApplinkNotification object:nil userInfo:userInfo];
    }
}

RCT_EXPORT_METHOD(openWeb:(NSDictionary *)info) {
    NSString *link = info[@"link"];
    NSString *fromPageID = info[@"fromPageID"];
    dispatch_async(dispatch_get_main_queue(), ^{
        [RNCOpenManager openWeb:link fromViewController:nil fromPageID:fromPageID];
    });
}

+ (void)openWeb:(NSString *)link fromViewController:(UIViewController *)fromViewController {
    [RNCOpenManager openWeb:link fromViewController:fromViewController fromPageID:nil];
}

+ (void)openWeb:(NSString *)link fromViewController:(UIViewController *)fromViewController fromPageID:(NSString *)fromPageID {
    if (fromViewController) {
        [WebViewController openWithLink:link fromViewController:fromViewController];
    } else if (fromPageID) {
        NSDictionary *userInfo = @{
            @"link": link,
            @"fromPageID": fromPageID,
        };
        [NSNotificationCenter.defaultCenter postNotificationName:RNCOpenManagerOpenWebNotification object:nil userInfo:userInfo];
    }
}

RCT_REMAP_METHOD(openLoginIfNeed, info:(NSDictionary *)info resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    NSString *fromPageID = info[@"fromPageID"];
    dispatch_async(dispatch_get_main_queue(), ^{
        [RNCOpenManager openLoginIfNeedFromViewController:nil fromPageID:fromPageID resolver:resolve rejecter:reject];
    });
}

+ (void)openLoginIfNeedFromViewController:(UIViewController *)fromViewController resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
    [RNCOpenManager openLoginIfNeedFromViewController:fromViewController fromPageID:nil resolver:resolve rejecter:reject];
}

+ (void)openLoginIfNeedFromViewController:(UIViewController *)fromViewController fromPageID:(NSString *)fromPageID resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
    if (UserManager.shared.isLogin) {
        resolve(nil);
    } else {
        if (fromViewController) {
          [LoginViewController openFromVC:fromViewController successHandler:^{
            if (resolve) {
              resolve(nil);
            }
          }];
        } else if (fromPageID) {
            NSDictionary *userInfo = @{
                @"resolve": resolve,
                @"reject": reject,
                @"fromPageID": fromPageID,
            };
            [NSNotificationCenter.defaultCenter postNotificationName:RNCOpenManagerOpenLoginNotification object:nil userInfo:userInfo];
        }
    }
}

@end
