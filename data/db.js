export const db = {
  users: [
    { _id: "u1", email: "u1@u1.com", pw: "u1", books: ["b1"] },
    { _id: "u2", email: "u2@u2.com", pw: "u2", books: ["b1", "b2"] },
    {
      _id: "u3",
      email: "u3@u3.com",
      pw: "u3",
      books: ["b1", "b2", "b3"],
    },
  ],
  books: [
    { _id: "b1", title: "Der Prozess", author: "Franz Kafka" },
    { _id: "b2", title: "Alice in Wonderland", author: "Lewis Carrol" },
    { _id: "b3", title: "Das Glasperlenspiel", author: "Hermann Hesse" },
  ],
}
