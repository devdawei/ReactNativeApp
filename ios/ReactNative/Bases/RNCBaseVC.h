//
//  RNCBaseVC.h
//  ReactNativeApp
//
//  Created by David on 2026/2/25.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNCBaseVC : UIViewController

@property (nonatomic, copy) NSDictionary *pageInfo;
@property (nonatomic, copy) NSDictionary * _Nullable params;

@end

NS_ASSUME_NONNULL_END
