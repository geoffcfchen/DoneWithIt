import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://10.0.1.41:9000/api",
});

export default apiClient;
