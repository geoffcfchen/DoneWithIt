import client from "./clients";

const send = (message, listingId) =>
  client.post("/messages", {
    message,
    listingId,
  });

export default {
  send,
};
