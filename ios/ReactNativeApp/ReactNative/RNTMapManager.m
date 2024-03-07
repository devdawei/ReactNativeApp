//
//  RNTMapManager.m
//  AwesomeProject
//
//  Created by David on 2022/3/24.
//

#import "RNTMapManager.h"

@implementation RNTMapManager

RCT_EXPORT_MODULE(RNTMap)

RCT_EXPORT_VIEW_PROPERTY(zoomEnabled, BOOL)

- (UIView *)view
{
  return [[MKMapView alloc] init];
}

@end
