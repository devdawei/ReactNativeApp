import UIKit
//import React
//import React_RCTAppDelegate
//import ReactAppDependencyProvider

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?

//  var reactNativeDelegate: ReactNativeDelegate?
//  var reactNativeFactory: RCTReactNativeFactory?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
//    let delegate = ReactNativeDelegate()
//    let factory = RCTReactNativeFactory(delegate: delegate)
//    delegate.dependencyProvider = RCTAppDependencyProvider()
//
//    reactNativeDelegate = delegate
//    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)

//    factory.startReactNative(
//      withModuleName: "ReactNativeApp",
//      in: window,
//      launchOptions: launchOptions
//    )
    RNCManager.shared().startReactNative(withModuleName: "ReactNativeApp", in: window, launchOptions: launchOptions)

    return true
  }
}

//- (NSDictionary<NSString *,Class<RCTComponentViewProtocol>> *)thirdPartyFabricComponents
//{
//  NSMutableDictionary * dictionary = [super thirdPartyFabricComponents].mutableCopy;
//  dictionary[@"CustomWebView"] = [RCTWebView class];
//  return dictionary;
//}


//class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
//  override func sourceURL(for bridge: RCTBridge) -> URL? {
//    self.bundleURL()
//  }
//
//  override func bundleURL() -> URL? {
//#if DEBUG
//    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
//#else
//    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
//#endif
//  }
//}
