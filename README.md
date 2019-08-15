Naprawa react-native not found:

react native:
export PATH="/Users/radoszszymon/.npm-global/bin/:\$PATH"

android:
export ANDROID_HOME=~/Library/Android/sdk
export PATH=${PATH}:${ANDROID_HOME}/tools
export PATH=${PATH}:${ANDROID_HOME}/platform-tools

=========================

1. Odpalenie ios:
   react-native run-ios

2. Odpalenie android:
   react-native run-android

=========================

Tworzenie apk:

1. Usunięcie android-> app -> src -> main -> res -> drawable
2. react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
3. Delete files inside directory android/app/src/main/assets.
4. W głównym folderze cd android && ./gradlew assembleRelease

=========================

Tworzenie wersji do google play - release/app.aab

1. react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
2. Delete files inside directory android/app/src/main/assets.
3. W głównym folderze cd android && ./gradlew bundleRelease

=========================

Reset cache:
react-native start --reset-cache
