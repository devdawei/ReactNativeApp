//
//  RNCManager.m
//  ReactNativeApp
//
//  Created by David on 2026/2/25.
//

#import "RNCManager.h"
#import "RCTDefaultReactNativeFactoryDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <RCTAppDependencyProvider.h>
#import <ReactNativeApp-Swift.h>
#import "RNCBaseVC.h"

NSString * const RNCPageOpenNotify = @"RNCPageOpenNotify";
NSString * const RNCPageCloseNotify = @"RNCPageCloseNotify";

@interface ReactNativeBundleDelegate : RCTDefaultReactNativeFactoryDelegate

@end

@implementation ReactNativeBundleDelegate

- (NSURL *)bundleURL {
#if DEBUG
  /*
   真机调试设置电脑ip地址，可以在终端使用此命令查看：ifconfig | grep "inet "
   例如ip为：192.168.x.x
   启动服务的时候使用 yarn start --host 192.168.x.x
   */
  NSString *ip = @"";
  if (ip.length > 0)  {
    RCTBundleURLProvider.sharedSettings.jsLocation = ip;
  }
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end

@interface RNCManager ()

@property (nonatomic, strong) ReactNativeBundleDelegate *reactNativeDelegate;
@property (nonatomic, strong) RCTReactNativeFactory *factory;

@end

@implementation RNCManager

+ (instancetype)shared {
  static RNCManager *shared = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    shared = [[[RNCManager class] alloc] init];
    [shared config];
  });
  return shared;
}

- (void)config {
  self.reactNativeDelegate = [[ReactNativeBundleDelegate alloc] init];
  self.factory = [[RCTReactNativeFactory alloc] initWithDelegate:self.reactNativeDelegate];
  self.reactNativeDelegate.dependencyProvider = [[RCTAppDependencyProvider alloc] init];
}

- (void)startReactNativeWithModuleName:(NSString *)moduleName
                              inWindow:(UIWindow *)window
                         launchOptions:(NSDictionary *)launchOptions {
  [self.factory startReactNativeWithModuleName:moduleName inWindow:window launchOptions:launchOptions];
}

- (UIView *)viewWithModuleName:(NSString *)moduleName initialProperties:(NSDictionary *)initialProperties {
  return [self.factory.rootViewFactory viewWithModuleName:moduleName initialProperties:initialProperties];
}

- (void)open:(NSString *)pageName mode:(RNCPageOpenMode)mode params:(NSDictionary * _Nullable)params {
  [self open:pageName fromVC:[self currentViewController] mode:mode params:params];
}

- (void)open:(NSString *)pageName fromVC:(UIViewController *)fromVC mode:(RNCPageOpenMode)mode params:(NSDictionary * _Nullable)params {
  BOOL canPush = NO;
  RNCPageOpenMode openMode = mode;
  if (fromVC.navigationController && openMode == RNCPageOpenModePush) {
    canPush = YES;
  }
  if (!canPush && openMode == RNCPageOpenModePush) {
    openMode = RNCPageOpenModePresent;
  }
  UIViewController *targetVC = nil;
  if ([[RNCNativePageManager availablePages] containsObject:pageName]) {
    targetVC = [RNCNativePageManager getPageWith:pageName params:params];
  } else {
    NSMutableDictionary *pageInfo = [NSMutableDictionary dictionary];
    pageInfo[@"pageName"] = pageName;
    pageInfo[@"mode"] = @(openMode);
    RNCBaseVC *vc = [[RNCBaseVC alloc] init];
    vc.pageInfo = pageInfo;
    vc.params = params;
    targetVC = vc;
  }
  if (openMode == RNCPageOpenModePush) {
    targetVC.hidesBottomBarWhenPushed = YES;
    [fromVC.navigationController pushViewController:targetVC animated:YES];
  } else {
    UINavigationController *navVC = [[UINavigationController alloc] initWithRootViewController:targetVC];
    navVC.modalPresentationStyle = UIModalPresentationFullScreen;
    [fromVC presentViewController:navVC animated:true completion:nil];
  }
}

#pragma mark -

- (UIViewController *)rootViewController {
  UIWindow *window = [[[UIApplication sharedApplication] delegate] window];
  return window.rootViewController;
}

- (UIViewController *)currentViewController {
  UIViewController *currentViewController = [self rootViewController];
  while (TRUE) {
    if (currentViewController.presentedViewController) {
      currentViewController = currentViewController.presentedViewController;
    } else {
      if ([currentViewController isKindOfClass:[UINavigationController class]]) {
        currentViewController = ((UINavigationController *)currentViewController).visibleViewController;
      } else if ([currentViewController isKindOfClass:[UITabBarController class]]) {
        currentViewController = ((UITabBarController *)currentViewController).selectedViewController;
      } else {
        break;
      }
    }
  }
  return currentViewController;
}

@end
