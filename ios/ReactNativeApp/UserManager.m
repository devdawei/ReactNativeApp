//
//  UserManager.m
//  ReactNativeApp
//
//  Created by David on 2024/3/1.
//

#import "UserManager.h"

@implementation UserManager

+ (instancetype)shared {
    static UserManager *manager = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        manager = [[[self class] alloc] init];
    });
    return manager;
}

- (BOOL)isLogin {
  // 判断逻辑
  // ...
  return false;
}

@end
