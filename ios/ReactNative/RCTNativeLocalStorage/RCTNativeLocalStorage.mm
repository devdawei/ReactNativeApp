//
//  RCTNativeLocalStorage.m
//  ReactNativeApp
//
//  Created by David on 2026/2/11.
//

#import "RCTNativeLocalStorage.h"

NS_ASSUME_NONNULL_BEGIN

@implementation RCTNativeLocalStorage

- (void)setItem:(nonnull NSString *)value key:(nonnull NSString *)key {
  [NSUserDefaults.standardUserDefaults setValue:value forKey:key];
}

- (NSString * _Nullable)getItem:(nonnull NSString *)key { 
  return [NSUserDefaults.standardUserDefaults stringForKey:key];
}

- (void)removeItem:(NSString *)key {
  [NSUserDefaults.standardUserDefaults removeObjectForKey:key];
}

- (void)clear {
  NSDictionary *keys = NSUserDefaults.standardUserDefaults.dictionaryRepresentation;
  for (NSString *key in keys) {
    [self removeItem:key];
  }
}
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeLocalStorageSpecJSI>(params);
}

+ (NSString *)moduleName {
  return @"NativeLocalStorage";
}

@end

NS_ASSUME_NONNULL_END
