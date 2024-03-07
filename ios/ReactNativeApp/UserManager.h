//
//  UserManager.h
//  ReactNativeApp
//
//  Created by David on 2024/3/1.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface UserManager : NSObject

@property (nonatomic, readonly, assign) BOOL isLogin;

+ (instancetype)shared;

@end

NS_ASSUME_NONNULL_END
