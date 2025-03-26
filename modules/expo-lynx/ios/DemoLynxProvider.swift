import Foundation
import Lynx

class DemoLynxProvider: NSObject, LynxTemplateProvider {
    func loadTemplate(withUrl url: String!, onComplete callback: LynxTemplateLoadBlock!) {
        if let remoteURL = URL(string: url) {
            let task = URLSession.shared.dataTask(with: remoteURL) { data, response, error in
                if let error = error {
                    callback(nil, error)
                } else if let data = data {
                    callback(data, nil)
                }
            }
            
            task.resume()
        }
    }
}
