//
//  RNCOpenManager.h
//  Bronco
//
//  Created by David on 2022/4/18.
//  Copyright © 2022 David. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

NS_ASSUME_NONNULL_BEGIN

extern NSString * const RNCOpenManagerOpenApplinkNotification;
extern NSString * const RNCOpenManagerOpenWebNotification;
extern NSString * const RNCOpenManagerOpenLoginNotification;

@interface RNCOpenManager : NSObject <RCTBridgeModule>

+ (void)openApplink:(NSString *)applink fromViewController:(UIViewController *)fromViewController;

+ (void)openWeb:(NSString *)link fromViewController:(UIViewController *)fromViewController;

+ (void)openLoginIfNeedFromViewController:(UIViewController *)fromViewController resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject;

@end

NS_ASSUME_NONNULL_END
