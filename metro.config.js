const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push("cjs");

module.exports = defaultConfig;

// the following code solve the error message:
// "Error: Unable to resolve module ./Libraries/Components/DatePicker/DatePickerIOS "
// we follow the solution provided in https://github.com/facebook/react-native/issues/36794
// and added the following code.

const new_object = {
  rewriteRequestUrl: (url) => {
    if (!url.endsWith(".bundle")) {
      return url;
    }
    // https://github.com/facebook/react-native/issues/36794
    // JavaScriptCore strips query strings, so try to re-add them with a best guess.
    return (
      url +
      "?platform=ios&dev=true&minify=false&modulesOnly=false&runModule=true"
    );
  },
};

module.exports.server = new_object;
