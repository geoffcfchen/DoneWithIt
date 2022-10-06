import client from "./clients";

const register = (pushToken) =>
  client.post("/expoPushTokens", { token: pushToken });

export default {
  register,
};
