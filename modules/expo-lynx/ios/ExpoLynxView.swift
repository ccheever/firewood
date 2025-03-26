import ExpoModulesCore
import UIKit
import Lynx

class ExpoLynxView: ExpoView {
    private var lynxView: LynxView!
    
    required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)
        
        lynxView = LynxView { builder in
            builder.config = LynxConfig(provider: DemoLynxProvider())
            builder.screenSize = self.frame.size  // Add 'self.' here
            builder.fontScale = 1.0
        }
        
        lynxView.preferredLayoutWidth = frame.size.width
        lynxView.preferredLayoutHeight = frame.size.height
        lynxView.layoutWidthMode = .exact
        lynxView.layoutHeightMode = .exact
        
        clipsToBounds = true
        addSubview(lynxView)

        lynxView.loadTemplate(fromURL: "https://unpkg.com/@lynx-example/hello-world/dist/main.lynx.bundle", initData: nil)
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        
        lynxView.preferredLayoutWidth = bounds.size.width
        lynxView.preferredLayoutHeight = bounds.size.height
        
        lynxView.frame = bounds
    }
}
