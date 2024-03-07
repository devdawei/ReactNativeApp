//
//  RNCApiInfo.m
//  Bronco
//
//  Created by David on 2022/4/11.
//  Copyright © 2022 David. All rights reserved.
//

#import "RNCApiInfo.h"
//#import "ReactNativeApp-Swift.h"
#import "ApiInfo.h"

@implementation RNCApiInfo

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(headers, headersWithResolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    [RNCApiInfo headersWithResolver:resolve rejecter:reject];
//    dispatch_async(dispatch_get_main_queue(), ^{
//        [RNCApiInfo headersWithResolver:resolve rejecter:reject];
//    });
}

+ (void)headersWithResolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
    NSDictionary *info = [ApiInfo headers];
    resolve(info);
}

@end
