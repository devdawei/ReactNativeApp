//
//  RNCApiInfo.h
//  Bronco
//
//  Created by David on 2022/4/11.
//  Copyright © 2022 David. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNCApiInfo : NSObject <RCTBridgeModule>

+ (void)headersWithResolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject;

@end

NS_ASSUME_NONNULL_END
