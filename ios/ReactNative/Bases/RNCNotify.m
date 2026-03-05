//
//  RNCNotify.m
//  ReactNativeApp
//
//  Created by David on 2026/2/25.
//

#import "RNCNotify.h"

NS_ASSUME_NONNULL_BEGIN

NSString * const RNCNativeNotify = @"RNCNativeNotify";

@implementation RNCNotify

RCT_EXPORT_MODULE();

- (instancetype)init
{
  self = [super init];
  if (self) {
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(didReceiveNativeNotify:) name:RNCNativeNotify object:nil];
  }
  return self;
}

+ (BOOL)requiresMainQueueSetup {
  return YES;
}

- (NSArray<NSString *> *)supportedEvents {
  return @[@"NativeNotify"];
}

- (void)didReceiveNativeNotify:(NSNotification *)notification {
  [self sendEventWithName:@"NativeNotify" body:notification.userInfo];
}

+ (void)post:(NSString *)name body:(NSDictionary *)body {
  NSMutableDictionary *info = [NSMutableDictionary dictionary];
  info[@"name"] = name;
  info[@"body"] = body;
  [NSNotificationCenter.defaultCenter postNotificationName:RNCNativeNotify object:nil userInfo:info];
}

@end

NS_ASSUME_NONNULL_END

