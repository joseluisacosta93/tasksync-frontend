import AsyncStorage from "@react-native-async-storage/async-storage";
const sessionKey = "session";

const storeToken = () => {
  return { setToken, getToken, removeToken };
};

const setToken = (token: string) => {
  AsyncStorage.setItem(sessionKey, token);
};

const getToken = async () => {
  return await AsyncStorage.getItem(sessionKey);
};

const removeToken = async () => {
  return await AsyncStorage.removeItem(sessionKey);
};

export default storeToken();
