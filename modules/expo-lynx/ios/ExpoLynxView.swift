import ExpoModulesCore
import UIKit

// This view will be used as a native component. Make sure to inherit from `ExpoView`
// to apply the proper styling (e.g. border radius and shadows).
class ExpoLynxView: ExpoView {
    private let label: UILabel
    
    required init(appContext: AppContext? = nil) {
        // Create a UILabel for "Hello World"
        label = UILabel()
        label.text = "Hello World"
        label.textAlignment = .center
        label.font = UIFont.systemFont(ofSize: 24, weight: .bold)
        
        super.init(appContext: appContext)
        
        clipsToBounds = true
        addSubview(label)
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        // Position the label to fill the view
        label.frame = bounds
    }
}
