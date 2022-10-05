import client from "./clients";

const register = (userInfo) => client.post("/users", userInfo);

export default { register };
