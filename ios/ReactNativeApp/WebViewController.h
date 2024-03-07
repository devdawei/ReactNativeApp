//
//  WebViewController.h
//  ReactNativeApp
//
//  Created by David on 2024/3/1.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface WebViewController : UIViewController

+ (void)openWithLink:(NSString *)link fromViewController:(UIViewController *)fromViewController;

@end

NS_ASSUME_NONNULL_END
