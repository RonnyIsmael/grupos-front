// metro.config.cjs (CommonJS, compatible con Node 22 + Expo SDK 54)
const { getDefaultConfig } = require("@expo/metro-config");
const { createRequire } = require("module");

// Cargar el módulo ESM de NativeWind desde CJS, sin await ni import.meta
const requireESM = createRequire(__filename);
const { withNativeWind } = requireESM("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Si NO usas un global.css propio, puedes quitar el segundo argumento
module.exports = withNativeWind(config, { input: "./global.css" });
