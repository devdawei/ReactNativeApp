//
//  RNCBaseVC.m
//  ReactNativeApp
//
//  Created by David on 2026/2/25.
//

#import "RNCBaseVC.h"
#import "RNCManager.h"
#import "UINavigationController+FDFullscreenPopGesture.h"

NS_ASSUME_NONNULL_BEGIN

@interface RNCBaseVC ()

@property (nonatomic, copy) NSString *pageID;
@property (nonatomic, strong) UIView *rnView;

@end

@implementation RNCBaseVC

- (void)viewDidLoad {
  [super viewDidLoad];
  self.view.backgroundColor = [UIColor colorWithRed:245/255.0 green:245/255.0 blue:245/255.0 alpha:1];
  self.fd_prefersNavigationBarHidden = YES;
  
  [NSNotificationCenter.defaultCenter addObserver:self selector:@selector(didReceiveRNCPageOpenNotify:) name:RNCPageOpenNotify object:nil];
  [NSNotificationCenter.defaultCenter addObserver:self selector:@selector(didReceiveRNCPageCloseNotify:) name:RNCPageCloseNotify object:nil];
  
  double timeInterval = [[NSDate date] timeIntervalSince1970]*1000;
  NSString *pageName = self.pageInfo[@"pageName"];
  self.pageID = [NSString stringWithFormat:@"%@_%.0f", pageName, timeInterval];
  CGFloat statusBarHeight = 44;
  CGFloat homeBarHeight = 0;
  NSSet<UIScene *> *connectedScenes = UIApplication.sharedApplication.connectedScenes;
  if (connectedScenes.count > 0) {
    UIWindowScene *scene = (UIWindowScene *)connectedScenes.anyObject;
    statusBarHeight = scene.statusBarManager.statusBarFrame.size.height;
    homeBarHeight = scene.keyWindow.safeAreaInsets.bottom;
  }
  NSDictionary *props = @{
    @"pageID": self.pageID,
    @"mode": self.pageInfo[@"mode"],
    @"statusBarHeight": @(statusBarHeight),
    @"navContentHeight": @(44),
    @"bottonSafeAreaHeight": @(homeBarHeight),
    @"params": self.params ?: [NSDictionary new],
  };
  self.rnView = [RNCManager.shared viewWithModuleName:pageName initialProperties:props];
  [self.view addSubview:self.rnView];
  self.rnView.translatesAutoresizingMaskIntoConstraints = NO;
  [NSLayoutConstraint activateConstraints:@[
    [self.rnView.topAnchor constraintEqualToAnchor:self.view.topAnchor],
    [self.rnView.bottomAnchor constraintEqualToAnchor:self.view.bottomAnchor],
    [self.rnView.leftAnchor constraintEqualToAnchor:self.view.leftAnchor],
    [self.rnView.rightAnchor constraintEqualToAnchor:self.view.rightAnchor]
  ]];
}

#pragma mark -

- (void)didReceiveRNCPageOpenNotify:(NSNotification *)notification {
  NSDictionary *pageInfo = notification.userInfo;
  NSString *fromPageID = pageInfo[@"fromPageID"];
  if ([fromPageID isEqualToString:self.pageID]) {
    NSString *pageName = pageInfo[@"pageName"];
    RNCPageOpenMode openMode = (RNCPageOpenMode)[pageInfo[@"mode"] integerValue];
    [RNCManager.shared open:pageName fromVC:self mode:openMode params:pageInfo[@"params"]];
  }
}

- (void)didReceiveRNCPageCloseNotify:(NSNotification *)notification {
  NSString *pageID = notification.object;
  if ([pageID isEqualToString:self.pageID]) {
    RNCPageOpenMode mode = [self.pageInfo[@"mode"] integerValue];
    if (mode == RNCPageOpenModePush) {
      [self.navigationController popViewControllerAnimated:YES];
    } else {
      [self dismissViewControllerAnimated:true completion:nil];
    }
  }
}

@end

NS_ASSUME_NONNULL_END
