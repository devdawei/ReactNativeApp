//
//  RCTNativeNotify.m
//  ReactNativeApp
//
//  Created by David on 2026/2/24.
//

#import "RCTNativeNotify.h"

NS_ASSUME_NONNULL_BEGIN

@implementation RCTNativeNotify

- (void)post:(NSString *)name body:(NSString *)body {
  NSData *jsonData = [body dataUsingEncoding:NSUTF8StringEncoding];
  NSError *error;
  id jsonObject = [NSJSONSerialization JSONObjectWithData:jsonData
                                                  options:kNilOptions
                                                    error:&error];
  if (error) {
    NSLog(@"JSON 解析错误: %@", error.localizedDescription);
    return;
  }
  if (![jsonObject isKindOfClass:[NSDictionary class]]) {
    NSLog(@"jsonObject 不是字典");
    return;
  }
  NSDictionary *dict = (NSDictionary *)jsonObject;
  dispatch_async(dispatch_get_main_queue(), ^{
    [NSNotificationCenter.defaultCenter postNotificationName:name object:nil userInfo:dict];
  });
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeNotifySpecJSI>(params);
}

+ (NSString *)moduleName {
  return @"NativeNotify";
}

@end

NS_ASSUME_NONNULL_END
