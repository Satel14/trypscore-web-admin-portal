import * as reactDeviceDetect from "react-device-detect";

const BrowserUtils = () => {
  const browser = reactDeviceDetect.browserName;

  const BrowserTypes = {
    Chrome: "Chrome",
    Firefox: "Firefox",
    Opera: "Opera",
    Yandex: "Yandex",
    Safari: "Safari",
    InternetExplorer: "Internet Explorer",
    Edge: "Edge",
    Chromium: "Chromium",
    Ie: "IE",
    MobileSafari: "Mobile Safari",
    EdgeChromium: "Edge Chromium",
    MIUI: "MIUI Browser",
    SamsungBrowser: "Samsung Browser",
  };

  const getUserBrowserName = () => {
    return browser;
  };

  const isBrowserSafari = () => {
    return browser === BrowserTypes.Safari;
  };
  const isBrowserChrome = () => {
    return browser === BrowserTypes.Chrome || browser === BrowserTypes.Chromium;
  };

  return {
    BrowserTypes,
    getUserBrowserName,
    isBrowserSafari,
    isBrowserChrome,
  };
};

export default BrowserUtils;
