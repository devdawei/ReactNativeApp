//
//  RNCPageStatusManager.h
//  Bronco
//
//  Created by David on 2022/5/30.
//  Copyright © 2022 David. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

NS_ASSUME_NONNULL_BEGIN

extern NSString * const RNPageViewWillAppearNotification;
extern NSString * const RNPageViewDidAppearNotification;
extern NSString * const RNPageViewWillDisappearNotification;
extern NSString * const RNPageViewDidDisappearNotification;

@interface RNCPageStatusManager : RCTEventEmitter <RCTBridgeModule>

@end

NS_ASSUME_NONNULL_END
