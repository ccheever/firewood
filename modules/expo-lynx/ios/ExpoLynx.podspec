Pod::Spec.new do |s|
  s.name           = 'ExpoLynx'
  s.version        = '1.0.0'
  s.summary        = 'A sample project summary'
  s.description    = 'A sample project description'
  s.author         = ''
  s.homepage       = 'https://docs.expo.dev/modules/'
  s.platforms      = {
    :ios => '15.1',
    :tvos => '15.1'
  }
  s.source         = { git: '' }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'

  # Lynx
  s.dependency 'Lynx/Framework', '3.2.0-rc.0'

  s.dependency 'PrimJS/quickjs', '2.11.1-rc.0'
  s.dependency 'PrimJS/napi', '2.11.1-rc.0'

  # integrate image-service, log-service, and http-service
  s.dependency 'LynxService/Image', '3.2.0-rc.0'
  s.dependency 'LynxService/Log', '3.2.0-rc.0'
  s.dependency 'LynxService/Http', '3.2.0-rc.0'

  # ImageService dependencies:
  s.dependency 'SDWebImage','5.15.5'
  s.dependency 'SDWebImageWebPCoder', '0.11.0'

  # Swift/Objective-C compatibility
  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
  }

  s.source_files = "**/*.{h,m,mm,swift,hpp,cpp}"
end
