//
//  RNCBaseViewController.h
//  Bronco
//
//  Created by David on 2022/3/28.
//  Copyright © 2022 David. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNCBaseViewController : UIViewController

@property (nonatomic, strong) UIView *rnView;

@property (nonatomic, copy) NSString *pageID;

@end

NS_ASSUME_NONNULL_END
