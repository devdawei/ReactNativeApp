//
//  LoginViewController.h
//  ReactNativeApp
//
//  Created by David on 2024/3/1.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface LoginViewController : UIViewController

+ (void)openFromVC:(UIViewController *)fromViewController successHandler:(void (^)(void))successHandler;

@end

NS_ASSUME_NONNULL_END
