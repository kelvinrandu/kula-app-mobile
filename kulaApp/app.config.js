import "dotenv/config";
export default {
  expo: {
    name: "mekoapp",
    slug: "mekoapp",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/splash.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.meko.kulaapp",
      config: {
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
    },
    android: {
      package: "com.meko.kulaapp",
      versionCode: 1,
      permissions: ["ACCESS_BACKGROUND_LOCATION"],
      config: {
    
        googleMaps: {
          apiKey: "AIzaSyBEEGhDViP0-DC6KGIqx5H59qEFY2vQBWA",
        },
      },
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      databaseURL: process.env.DATABASE_URL,
      appId: process.env.APP_ID,
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      eas: {
        projectId: process.env.EAS_PROJECT_ID,
      },
    },
  },
};
