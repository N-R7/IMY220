export const dummyPosts = [
  {
    id: 1,
    userId: 1,
    username: "sun_purple",
    userAvatar: null,  
    image: null,
    caption: "Beautiful sunset at the beach!",
    likes: 42,
    comments: [
      { id: 1, username: "janedoe", text: "Amazing view!" },
      { id: 2, username: "bobsmith", text: "Where is this?" }
    ],
    timestamp: "2026-09-02T10:30:00"
  },
  {
    id: 2,
    userId: 2,
    username: "BobWasHungry",
    userAvatar: null,
    image: null,
    caption: "My new puppy!",
    likes: 78,
    comments: [
      { id: 3, username: "johndoe", text: "So cute!" },
      { id: 4, username: "alicew", text: "What's its name?" }
    ],
    timestamp: "2026-09-02T08:15:00"
  },
  {
    id: 3,
    userId: 3,
    username: "IDK",
    userAvatar: null,
    image: null,
    caption: "Mountain climbing adventure",
    likes: 95,
    comments: [
      { id: 5, username: "janedoe", text: "So brave!" }
    ],
    timestamp: "2026-09-01T18:45:00"
  }
];

export const dummyUser = {
  id: 1,
  username: "sun_purple",
  email: "john@example.com",
  fullName: "Sam Lee",
  bio: "Photography enthusiast | Travel lover",
  profilePicture: null,
  postsCount: 15,
  followers: 120,
  following: 85,
  friends: [
    { id: 2, username: "janelow", avatar: null },
    { id: 3, username: "bobsmith", avatar: null },
    { id: 4, username: "alicew", avatar: null }
  ]
};

export const dummyComments = [
  { id: 1, username: "janelow", text: "Great post!", timestamp: "2026-09-02T11:00:00" },
  { id: 2, username: "bobsmith", text: "I love this!", timestamp: "2026-09-02T11:15:00" },
  { id: 3, username: "alicew", text: "Thanks for sharing!", timestamp: "2026-09-02T11:30:00" }
];