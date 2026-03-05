//
//  RNCManager.h
//  ReactNativeApp
//
//  Created by David on 2026/2/25.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

extern NSString * const RNCPageOpenNotify;
extern NSString * const RNCPageCloseNotify;

typedef NS_ENUM(NSInteger, RNCPageOpenMode) {
  RNCPageOpenModePush = 0,
  RNCPageOpenModePresent = 1,
};

@interface RNCManager : NSObject

+ (instancetype)shared;

- (void)config;

- (void)startReactNativeWithModuleName:(NSString *)moduleName
                              inWindow:(UIWindow *_Nullable)window
                         launchOptions:(NSDictionary *_Nullable)launchOptions;

- (void)open:(NSString *)pageName mode:(RNCPageOpenMode)mode params:(NSDictionary * _Nullable)params;

- (void)open:(NSString *)pageName fromVC:(UIViewController *)fromVC mode:(RNCPageOpenMode)mode params:(NSDictionary * _Nullable)params;

- (UIView *)viewWithModuleName:(NSString *)moduleName initialProperties:(NSDictionary *)initialProperties;

- (UIViewController *)currentViewController;

@end

NS_ASSUME_NONNULL_END
