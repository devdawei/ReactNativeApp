//
//  RNCNotify.h
//  ReactNativeApp
//
//  Created by David on 2026/2/25.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

NS_ASSUME_NONNULL_BEGIN

extern NSString * const RNCNativeNotify;

@interface RNCNotify : RCTEventEmitter <RCTBridgeModule>

+ (void)post:(NSString *)name body:(NSDictionary *)body;

@end

NS_ASSUME_NONNULL_END
