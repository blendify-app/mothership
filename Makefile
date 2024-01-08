HERMES_DIR:= ./hermes
APP_DIR = ./app


.PHONY: all-ios all-android hermes android-emulator ios-simulator

all-android: hermes android-emulator

all-ios: hermes ios-emulator

hermes:
	cd $(HERMES_DIR) && doppler run -- go run cmd/http/main.go &

android-emulator:
	cd $(APP_DIR) && npx expo run:android

ios-emulator:
	cd $(APP_DIR) && npx expo run:ios -d