//
//  RNCBaseViewController.m
//  Bronco
//
//  Created by David on 2022/3/28.
//  Copyright © 2022 David. All rights reserved.
//

#import "RNCBaseViewController.h"
#import "PureLayout.h"
#import "UINavigationController+FDFullscreenPopGesture.h"
#import "RNCNavi.h"
#import "RNCOpenManager.h"
#import "RNCPageStatusManager.h"

@interface RNCBaseViewController ()

@end

@implementation RNCBaseViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.fd_prefersNavigationBarHidden = YES;
    
    [NSNotificationCenter.defaultCenter addObserver:self selector:@selector(didReceiveRNCNaviPushNotification:) name:RNCNaviPushNotification object:nil];
    [NSNotificationCenter.defaultCenter addObserver:self selector:@selector(didReceiveRNCNaviPopNotification:) name:RNCNaviPopNotification object:nil];
    [NSNotificationCenter.defaultCenter addObserver:self selector:@selector(didReceiveRNCNaviCloseNotification:) name:RNCNaviCloseNotification object:nil];
    [NSNotificationCenter.defaultCenter addObserver:self selector:@selector(didReceiveRNCOpenManagerOpenApplinkNotification:) name:RNCOpenManagerOpenApplinkNotification object:nil];
    [NSNotificationCenter.defaultCenter addObserver:self selector:@selector(didReceiveRNCOpenManagerOpenWebNotification:) name:RNCOpenManagerOpenWebNotification object:nil];
    [NSNotificationCenter.defaultCenter addObserver:self selector:@selector(didReceiveRNCOpenManagerOpenLoginNotification:) name:RNCOpenManagerOpenLoginNotification object:nil];
    
    [self.view addSubview:self.rnView];
    [self.rnView autoPinEdgeToSuperviewEdge:ALEdgeTop];
    [self.rnView autoPinEdgeToSuperviewEdge:ALEdgeBottom];
    [self.rnView autoPinEdgeToSuperviewEdge:ALEdgeLeft];
    [self.rnView autoPinEdgeToSuperviewEdge:ALEdgeRight];
}

#pragma mark -

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    NSDictionary *userInfo = @{@"pageID": self.pageID};
    [NSNotificationCenter.defaultCenter postNotificationName:RNPageViewWillAppearNotification object:nil userInfo:userInfo];
}

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    NSDictionary *userInfo = @{@"pageID": self.pageID};
    [NSNotificationCenter.defaultCenter postNotificationName:RNPageViewDidAppearNotification object:nil userInfo:userInfo];
}

- (void)viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:animated];
    NSDictionary *userInfo = @{@"pageID": self.pageID};
    [NSNotificationCenter.defaultCenter postNotificationName:RNPageViewWillDisappearNotification object:nil userInfo:userInfo];
}

- (void)viewDidDisappear:(BOOL)animated {
    [super viewDidDisappear:animated];
    NSDictionary *userInfo = @{@"pageID": self.pageID};
    [NSNotificationCenter.defaultCenter postNotificationName:RNPageViewDidDisappearNotification object:nil userInfo:userInfo];
}

#pragma mark -

- (void)didReceiveRNCNaviPushNotification:(NSNotification *)notification {
    NSDictionary *userInfo = notification.userInfo;
    NSString *pageName = userInfo[@"pageName"];
    NSString *fromPageID = userInfo[@"fromPageID"];
    RNCNaviOpenMode mode = [userInfo[@"mode"] integerValue];
    if ([fromPageID isEqualToString:self.pageID]) {
        [RNCNavi open:pageName fromViewController:self mode:mode];
    }
}

- (void)didReceiveRNCNaviPopNotification:(NSNotification *)notification {
    NSString *pageID = notification.object;
    if ([pageID isEqualToString:self.pageID]) {
        [self.navigationController popViewControllerAnimated:YES];
    }
}

- (void)didReceiveRNCNaviCloseNotification:(NSNotification *)notification {
    NSString *pageID = notification.object;
    if ([pageID isEqualToString:self.pageID]) {
        [self dismissViewControllerAnimated:true completion:nil];
    }
}

- (void)didReceiveRNCOpenManagerOpenApplinkNotification:(NSNotification *)notification {
    NSDictionary *userInfo = notification.userInfo;
    NSString *applink = userInfo[@"applink"];
    NSString *fromPageID = userInfo[@"fromPageID"];
    if ([fromPageID isEqualToString:self.pageID]) {
        [RNCOpenManager openApplink:applink fromViewController:self];
    }
}

- (void)didReceiveRNCOpenManagerOpenWebNotification:(NSNotification *)notification {
    NSDictionary *userInfo = notification.userInfo;
    NSString *link = userInfo[@"link"];
    NSString *fromPageID = userInfo[@"fromPageID"];
    if ([fromPageID isEqualToString:self.pageID]) {
        [RNCOpenManager openWeb:link fromViewController:self];
    }
}

- (void)didReceiveRNCOpenManagerOpenLoginNotification:(NSNotification *)notification {
    NSDictionary *userInfo = notification.userInfo;
    RCTPromiseResolveBlock resolve = userInfo[@"resolve"];
    RCTPromiseRejectBlock reject = userInfo[@"reject"];
    NSString *fromPageID = userInfo[@"fromPageID"];
    if ([fromPageID isEqualToString:self.pageID]) {
        [RNCOpenManager openLoginIfNeedFromViewController:self resolver:resolve rejecter:reject];
    }
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
