import client from "./clients";

const endpoint = "/listings";

const getListings = () => client.get(endpoint);

export default {
  getListings,
};
