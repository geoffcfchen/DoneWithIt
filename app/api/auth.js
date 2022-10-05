import client from "./clients";

const login = (email, password) => client.post("/auth", { email, password });

export default {
  login,
};
