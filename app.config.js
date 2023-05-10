import 'dotenv/config';
export default  {
  "expo": {
    "name": "radicle-rider-app",
    "slug": "radicle-rider-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "config": {
        "usesNonExemptEncryption": false,
        "googleMapsApiKey": process.env.API_KEY_MAP
      },
      "bundleIdentifier": "com.radicle.radiclerider"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.radicle.radiclerider",
      "config": {
        "googleMaps": {
          "apiKey": process.env.API_KEY_MAP
        }
      },
      "permissions": [
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.FOREGROUND_SERVICE"
      ]
    },
    "plugins": [
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location."
        }
      ]
    ],
    "web": {
      "favicon": "./assets/favicon.png"
    },
    extra: {
      eas: {
        projectId: "e99ace3d-d210-48db-9b7d-e0d40b21bcd7"
      },
      API_KEY_MAP: process.env.API_KEY_MAP
    }
  }
}
