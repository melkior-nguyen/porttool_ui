import isNil from "lodash/isNil";

const AsyncStorage = window.localStorage;
const prefix = "porttools";
const asyncStorageKeys = {
  appConfig: `${prefix}/appConfig`,
  refreshToken: `${prefix}/refreshToken`,
  accessToken: `${prefix}/accessToken`,
  jwtToken: `jwtToken`,
};

const AppConfig = {
  set: async (config: any) => {
    await AsyncStorage.setItem(
      asyncStorageKeys.appConfig,
      JSON.stringify(config)
    );
  },
  get: async () => {
    try {
      const config = await AsyncStorage.getItem(asyncStorageKeys.appConfig);
      if (!isNil(config)) {
        return JSON.parse(config);
      }
      return {};
    } catch (error) {
      return {};
    }
  },
  remove: async () => {
    await AsyncStorage.removeItem(asyncStorageKeys.appConfig);
  },
};

const RefreshToken = {
  set: async (value: any) => {
    await AsyncStorage.setItem(asyncStorageKeys.refreshToken, value);
  },
  get: async () => {
    try {
      const value = await AsyncStorage.getItem(asyncStorageKeys.refreshToken);
      if (!isNil(value)) {
        return value;
      }
      return "";
    } catch (error) {
      return "";
    }
  },
  remove: async () => {
    await AsyncStorage.removeItem(asyncStorageKeys.refreshToken);
  },
};

const AccessToken = {
  set: async (value: any) => {
    await AsyncStorage.setItem(asyncStorageKeys.accessToken, value);
  },
  get: async () => {
    try {
      const value = await AsyncStorage.getItem(asyncStorageKeys.accessToken);
      if (!isNil(value)) {
        return value;
      }
      return "";
    } catch (error) {
      return "";
    }
  },
  getToken: () => {
    try {
      const value = AsyncStorage.getItem(asyncStorageKeys.accessToken);
      if (!isNil(value)) {
        return value;
      }
      return "";
    } catch (error) {
      return "";
    }
  },
  remove: async () => {
    await AsyncStorage.removeItem(asyncStorageKeys.accessToken);
  },
};

const JwtToken = {
  set: async (value: any) => {
    await AsyncStorage.setItem(asyncStorageKeys.jwtToken, value);
  },
  get: async () => {
    try {
      const value = await AsyncStorage.getItem(asyncStorageKeys.jwtToken);
      if (!isNil(value)) {
        return value;
      }
      return "";
    } catch (error) {
      return "";
    }
  },
  remove: async () => {
    await AsyncStorage.removeItem(asyncStorageKeys.jwtToken);
  },
};

export default { AppConfig, RefreshToken, AccessToken, JwtToken };
