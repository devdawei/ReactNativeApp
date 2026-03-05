//
//  RNCNativePageManager.swift
//  ReactNativeApp
//
//  Created by David on 2026/2/25.
//

import UIKit

@objcMembers
class RNCNativePageManager: NSObject {
  
  static func availablePages() -> [String] {
    return [
      "WebPage",
      "TestNativePage",
    ]
  }
  
  static func getPage(with pageName: String, params: [String: Any]?) -> UIViewController? {
    if pageName == "WebPage" {
      guard let params = params else { return nil }
      let urlString = params["url"] as? String ?? ""
      //            let vc = WebVC(urlString: urlString)
      //            return vc
      return nil
    } else if pageName == "TestNativePage" {
      //            let vc = TrackDetailVC()
      //            if let params = params, let id = params["id"] as? NSNumber {
      //                vc.id = id.stringValue
      //            }
      //            return vc
      return nil
    }
    return nil
  }
}
