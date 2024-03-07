//
//  RNCNavi.h
//  Bronco
//
//  Created by David on 2022/3/28.
//  Copyright © 2022 David. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

NS_ASSUME_NONNULL_BEGIN

extern NSString * const RNCNaviPushNotification;
extern NSString * const RNCNaviPopNotification;
extern NSString * const RNCNaviCloseNotification;

typedef NS_ENUM(NSUInteger, RNCNaviOpenMode) {
  RNCNaviOpenModePush = 0,
  RNCNaviOpenModePresent = 1,
};

@interface RNCNavi : NSObject <RCTBridgeModule>

+ (void)open:(NSString *)pageName fromViewController:(UIViewController *)fromViewController mode:(RNCNaviOpenMode)mode;

@end

NS_ASSUME_NONNULL_END
