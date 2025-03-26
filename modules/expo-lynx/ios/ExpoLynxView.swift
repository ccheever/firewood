import ExpoModulesCore
import UIKit
import Lynx

// This view will be used as a native component
class ExpoLynxView: ExpoView {
    private var lynxView: LynxView!
    
    required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)
        
        // Create and configure the LynxView
        lynxView = LynxView { builder in
            builder.config = LynxConfig(provider: DemoLynxProvider())
            builder.screenSize = self.frame.size  // Add 'self.' here
            builder.fontScale = 1.0
        }
        
        // Configure layout properties
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
        
        // Since we can't access builder directly after initialization,
        // we need to use appropriate methods to update properties
        
        // Update layout properties
        lynxView.preferredLayoutWidth = bounds.size.width
        lynxView.preferredLayoutHeight = bounds.size.height
        
        // Position the lynxView to fill the view
        lynxView.frame = bounds
        
        // If LynxView provides a method to update screen size, use it
        // For example:
        // lynxView.updateScreenSize(bounds.size)
    }
}
