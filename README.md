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
2. W głównym folderze cd android && ./gradlew assembleRelease

Pełna konfiguracja: https://dev.to/zilurrane/generate-release-mode-apk-for-react-native-project-to-publish-on-playstore-5f78
