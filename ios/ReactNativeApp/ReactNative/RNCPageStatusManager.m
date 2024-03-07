//
//  RNCPageStatusManager.m
//  Bronco
//
//  Created by David on 2022/5/30.
//  Copyright © 2022 David. All rights reserved.
//

#import "RNCPageStatusManager.h"

NSString * const RNPageViewWillAppearNotification = @"RNPageViewWillAppearNotification";
NSString * const RNPageViewDidAppearNotification = @"RNPageViewDidAppearNotification";
NSString * const RNPageViewWillDisappearNotification = @"RNPageViewWillDisappearNotification";
NSString * const RNPageViewDidDisappearNotification = @"RNPageViewDidDisappearNotification";

typedef void (^RNCPageStatusManagerCallbackBlock)(id result);

@interface RNCPageStatusManager ()

@property (nonatomic, copy) RCTPromiseResolveBlock callback;

@end

@implementation RNCPageStatusManager

RCT_EXPORT_MODULE();

- (instancetype)init
{
    self = [super init];
    if (self) {
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(didReceiveRNPageViewWillAppearNotification:) name:RNPageViewWillAppearNotification object:nil];
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(didReceiveRNPageViewDidAppearNotification:) name:RNPageViewDidAppearNotification object:nil];
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(didReceiveRNPageViewWillDisappearNotification:) name:RNPageViewWillDisappearNotification object:nil];
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(didReceiveRNPageViewDidDisappearNotification:) name:RNPageViewDidDisappearNotification object:nil];
    }
    return self;
}

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

- (NSArray<NSString *> *)supportedEvents {
  return @[@"NativePageWillAppear", @"NativePageDidAppear", @"NativePageWillDisappear", @"NativePageDidDisappear"];
}

- (void)didReceiveRNPageViewWillAppearNotification:(NSNotification *)notification {
    [self sendEventWithName:@"NativePageWillAppear" body:notification.userInfo];
}

- (void)didReceiveRNPageViewDidAppearNotification:(NSNotification *)notification {
    [self sendEventWithName:@"NativePageDidAppear" body:notification.userInfo];
}

- (void)didReceiveRNPageViewWillDisappearNotification:(NSNotification *)notification {
    [self sendEventWithName:@"NativePageWillDisappear" body:notification.userInfo];
}

- (void)didReceiveRNPageViewDidDisappearNotification:(NSNotification *)notification {
    [self sendEventWithName:@"NativePageDidDisappear" body:notification.userInfo];
}

@end
