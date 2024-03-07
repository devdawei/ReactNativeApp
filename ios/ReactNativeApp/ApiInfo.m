//
//  ApiInfo.m
//  ReactNativeApp
//
//  Created by David on 2024/3/1.
//

#import "ApiInfo.h"

@implementation ApiInfo

+ (NSDictionary *)headers {
  // 接口请求的Header里需要填写的参数
  NSMutableDictionary *dict = [NSMutableDictionary dictionary];
  dict[@"xxx"] = @"xxx";
//  ...
  return dict;
}

@end
