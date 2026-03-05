//
//  RCTNativeNav.m
//  ReactNativeApp
//
//  Created by David on 2026/2/28.
//

#import "RCTNativeNav.h"
#import "RNCManager.h"

@implementation RCTNativeNav

- (void)open:(nonnull NSString *)pageName fromPageID:(NSString * _Nullable)fromPageID mode:(nonnull NSNumber *)mode params:(NSDictionary * _Nullable)params {
  dispatch_async(dispatch_get_main_queue(), ^{
    if (fromPageID) {
      NSMutableDictionary *pageInfo = [NSMutableDictionary dictionary];
      pageInfo[@"pageName"] = pageName;
      pageInfo[@"fromPageID"] = fromPageID;
      pageInfo[@"mode"] = mode;
      pageInfo[@"params"] = params;
      [NSNotificationCenter.defaultCenter postNotificationName:RNCPageOpenNotify object:nil userInfo:pageInfo];
      return;
    } else {
      RNCPageOpenMode openMode = (RNCPageOpenMode)mode.integerValue;
      [RNCManager.shared open:pageName mode:openMode params:params];
    }
  });
}

- (void)close:(nonnull NSString *)pageID {
  dispatch_async(dispatch_get_main_queue(), ^{
    [NSNotificationCenter.defaultCenter postNotificationName:RNCPageCloseNotify object:pageID];
  });
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeNavSpecJSI>(params);
}

+ (NSString *)moduleName {
  return @"NativeNav";
}

@end
