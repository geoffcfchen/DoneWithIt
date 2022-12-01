import moment from "moment";

const tweets = [
  {
    id: "t1",
    user: {
      id: "u1",
      username: "SavinVadim_",
      displayName: "Vadim Savin",
      photoURL: "https://picsum.photos/200",
    },
    createdAt: moment(Date("2017-01-04T08:05:10")),
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    image: "https://picsum.photos/200",
    numberOfComments: 123,
    numberOfRetweets: 11,
    numberOfLikes: 10,
  },
  {
    id: "t2",
    user: {
      id: "u1",
      username: "SavinVadim_",
      displayName: "Vadim Savin",
      photoURL: "https://picsum.photos/200",
    },
    createdAt: moment(Date("2017-01-04T08:05:10")),
    content:
      "Hey Hey Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    image: "https://picsum.photos/200",
    numberOfComments: 4,
    numberOfRetweets: 11,
    numberOfLikes: 99,
  },
  {
    id: "t3",
    user: {
      id: "u1",
      username: "SavinVadim_",
      displayName: "Vadim Savin",
      photoURL: "https://picsum.photos/200",
    },
    createdAt: moment(Date("2017-01-04T08:05:10")),
    content: "Hello World",
    numberOfComments: 4,
    numberOfRetweets: 11,
    numberOfLikes: 99,
  },
  {
    id: "t4",
    user: {
      id: "u1",
      username: "SavinVadim_",
      displayName: "Vadim Savin",
      photoURL: "https://picsum.photos/200",
    },
    createdAt: moment(Date("2017-01-04T08:05:10")),
    content:
      "Hey Hey Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    image: "https://picsum.photos/200",
    numberOfComments: 4,
    numberOfRetweets: 11,
    numberOfLikes: 99,
  },
];

export default tweets;
