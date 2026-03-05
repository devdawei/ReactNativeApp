//
//  RCTWebView.m
//  ReactNativeApp
//
//  Created by David on 2026/3/2.
//

#import "RCTWebView.h"

#import <react/renderer/components/NativeSpec/ComponentDescriptors.h>
#import <react/renderer/components/NativeSpec/EventEmitters.h>
#import <react/renderer/components/NativeSpec/Props.h>
#import <react/renderer/components/NativeSpec/RCTComponentViewHelpers.h>
#import <WebKit/WebKit.h>

using namespace facebook::react;

@interface RCTWebView () <RCTCustomWebViewViewProtocol, WKNavigationDelegate>
@end

@implementation RCTWebView {
  NSURL * _sourceURL;
  WKWebView * _webView;
  Boolean isRecycle;
}

-(instancetype)init
{
  if(self = [super init]) {
    NSLog(@"RCTWebView: init");
    _webView = [WKWebView new];
    _webView.navigationDelegate = self;
    [self addSubview:_webView];
  }
  return self;
}

- (void)dealloc
{
  NSLog(@"RCTWebView: dealloc");
}

- (void)layoutSubviews
{
  [super layoutSubviews];
  _webView.frame = self.bounds;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
  NSLog(@"RCTWebView: updateProps");
  
  const auto &oldViewProps = *std::static_pointer_cast<CustomWebViewProps const>(_props);
  const auto &newViewProps = *std::static_pointer_cast<CustomWebViewProps const>(props);
  
  // Handle your props here
  if (oldViewProps.sourceURL != newViewProps.sourceURL || isRecycle) {
    NSLog(@"RCTWebView: oldViewProps.sourceURL != newViewProps.sourceURL");
    NSString *urlString = [NSString stringWithCString:newViewProps.sourceURL.c_str() encoding:NSUTF8StringEncoding];
    _sourceURL = [NSURL URLWithString:urlString];
    if ([self urlIsValid:newViewProps.sourceURL]) {
      [_webView loadRequest:[NSURLRequest requestWithURL:_sourceURL]];
    }
  } else {
    NSLog(@"RCTWebView: oldViewProps.sourceURL == newViewProps.sourceURL");
  }
  
  if (isRecycle) isRecycle = NO;

  [super updateProps:props oldProps:oldProps];
}

- (void)prepareForRecycle {
  [super prepareForRecycle];
  NSLog(@"RCTWebView: prepareForRecycle");
  // 设置复用标识
  isRecycle = YES;
  // 停止加载网页
  [_webView stopLoading];
  [_webView loadHTMLString:@"" baseURL:nil];
}

#pragma mark - WKNavigationDelegate

-(void)webView:(WKWebView *)webView didFinishNavigation:(WKNavigation *)navigation
{
  NSLog(@"RCTWebView: webView didFinishNavigation");
  if (isRecycle) return;
  CustomWebViewEventEmitter::OnScriptLoaded result = CustomWebViewEventEmitter::OnScriptLoaded{CustomWebViewEventEmitter::OnScriptLoadedResult::Success};
  if (_eventEmitter) {
    self.eventEmitter.onScriptLoaded(result);
  }
}

#pragma mark -

- (BOOL)urlIsValid:(std::string)propString
{
  if (propString.length() > 0 && !_sourceURL) {
    CustomWebViewEventEmitter::OnScriptLoaded result = CustomWebViewEventEmitter::OnScriptLoaded{CustomWebViewEventEmitter::OnScriptLoadedResult::Error};
    if (_eventEmitter) {
      self.eventEmitter.onScriptLoaded(result);
    }
    return NO;
  }
  return YES;
}

// Event emitter convenience method
- (const CustomWebViewEventEmitter &)eventEmitter
{
  return static_cast<const CustomWebViewEventEmitter &>(*_eventEmitter);
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<CustomWebViewComponentDescriptor>();
}

Class<RCTComponentViewProtocol> WebViewCls(void)
{
  return RCTWebView.class;
}

@end
