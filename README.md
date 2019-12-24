## Juff app - social app

People like you in your neighborhood.
Find people with same interests like you.

### Technology Stack:

- PHP/Laravel(external API)
- React native
- Typescript

### React-native components file structure

    .
    ├── ...
    ├── components                          # React components container (./app/components/)
    │   ├── Example                         # component directory
    │   │   ├── Example.tsx                 # component logic
    │   │   ├── Example.view.tsx            # component view
    │   │   └── Example.interface.tsx       # ts interfaces
    │   └── ...
    └── ...

### Running test cases

npm test

### Fixed react-native not found issue:

react native:
export PATH="/Users/radoszszymon/.npm-global/bin/:\$PATH"

android:
export ANDROID_HOME=~/Library/Android/sdk
export PATH=${PATH}:${ANDROID_HOME}/tools
export PATH=${PATH}:${ANDROID_HOME}/platform-tools

### Running locally

1. ios:
   react-native run-ios

2. android:
   react-native run-android

### Build .apk

1. remove android-> app -> src -> main -> res -> drawable
2. react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
3. Delete files inside directory android/app/src/main/assets
4. in main directory: cd android && ./gradlew assembleRelease

### Build google play store project - release/app.aab

1. react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
2. Delete files inside directory android/app/src/main/assets
3. in main directory: cd android && ./gradlew bundleRelease
   or cd android && ./gradlew app:assembleRelease

### Reset cache

react-native start --reset-cache

### Author:

- **Szymon Radosz**, _Warsaw, Poland_, https://tech-bulb.com/
